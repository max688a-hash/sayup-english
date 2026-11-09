-- Unify rewards with the cross-platform spec:
--  * membership months anchored on verified paid coverage (membership_periods),
--    not calendar months; a paid gap restarts the streak;
--  * streak consumes non-overlapping 3-month blocks, then re-counts;
--  * points redeem only while no entitlement is active (paid or grant);
--  * new paid coverage defers remaining point-grant days (paid always wins);
--  * Apple App Store Server Notifications V2 intake with dedupe.
-- 1 point = 1 day; newcomer +30, streak +30; points never expire.

-- ============ 1. Verified paid coverage ledger ============
CREATE TABLE public.membership_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  original_transaction_id text NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  environment text NOT NULL DEFAULT 'live',
  revoked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, original_transaction_id, period_start)
);
ALTER TABLE public.membership_periods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own periods read" ON public.membership_periods FOR SELECT TO authenticated USING (auth.uid() = user_id);
GRANT SELECT ON public.membership_periods TO authenticated;
GRANT ALL ON public.membership_periods TO service_role;

INSERT INTO public.membership_periods (user_id, original_transaction_id, period_start, period_end, environment)
SELECT user_id, substr(paddle_subscription_id, 7), current_period_start, current_period_end, coalesce(environment, 'live')
FROM public.subscriptions
WHERE paddle_subscription_id LIKE 'apple:%' AND current_period_start IS NOT NULL AND current_period_end IS NOT NULL
ON CONFLICT DO NOTHING;

-- ============ 2. Apple notification dedupe ============
CREATE TABLE public.apple_notification_events (
  notification_uuid text PRIMARY KEY,
  notification_type text NOT NULL,
  subtype text,
  original_transaction_id text,
  processed boolean NOT NULL DEFAULT false,
  received_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.apple_notification_events TO service_role;

ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS last_event_at timestamptz;

-- ============ 3. Latest continuous paid-coverage segment (<=1 day gaps merge) ============
CREATE OR REPLACE FUNCTION public.latest_coverage_segment(_uid uuid)
RETURNS TABLE(seg_start timestamptz, seg_end timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE r record; s timestamptz; e timestamptz;
BEGIN
  s := NULL; e := NULL;
  FOR r IN SELECT period_start, period_end FROM public.membership_periods
           WHERE user_id = _uid AND NOT revoked ORDER BY period_start LOOP
    IF s IS NULL THEN
      s := r.period_start; e := r.period_end;
    ELSIF r.period_start <= e + interval '1 day' THEN
      IF r.period_end > e THEN e := r.period_end; END IF;
    ELSE
      s := r.period_start; e := r.period_end;
    END IF;
  END LOOP;
  seg_start := s; seg_end := e;
  RETURN NEXT;
END $$;

-- ============ 4. Defer remaining point-grant days behind paid coverage ============
CREATE OR REPLACE FUNCTION public.defer_point_grants(_uid uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  g record; seg record; remaining interval;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(_uid::text));
  SELECT * INTO seg FROM public.latest_coverage_segment(_uid);
  IF seg.seg_end IS NULL OR seg.seg_end <= now() THEN RETURN; END IF;
  FOR g IN SELECT id, starts_at, ends_at FROM public.reward_grants
           WHERE user_id = _uid AND kind = 'points' AND ends_at > seg.seg_start AND starts_at < seg.seg_end LOOP
    remaining := g.ends_at - greatest(g.starts_at, seg.seg_start);
    IF remaining > interval '0' THEN
      UPDATE public.reward_grants SET starts_at = seg.seg_end, ends_at = seg.seg_end + remaining WHERE id = g.id;
    END IF;
  END LOOP;
END $$;

-- ============ 5. Redeem: only while no entitlement is active ============
CREATE OR REPLACE FUNCTION public.redeem_points(_days int)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  bal int; last_end timestamptz; start_at timestamptz; key text;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('status', 'denied'); END IF;
  IF _days IS NULL OR _days < 1 OR _days > 365 THEN RETURN jsonb_build_object('status', 'invalid'); END IF;
  PERFORM pg_advisory_xact_lock(hashtext(uid::text));
  IF EXISTS(SELECT 1 FROM public.subscriptions WHERE user_id = uid
            AND status IN ('active','trialing','past_due')
            AND (current_period_end IS NULL OR current_period_end > now()))
     OR EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid
            AND starts_at <= now() AND ends_at > now()) THEN
    RETURN jsonb_build_object('status', 'has_active');
  END IF;
  SELECT coalesce(sum(points), 0) INTO bal FROM public.reward_point_events WHERE user_id = uid;
  IF bal < _days THEN RETURN jsonb_build_object('status', 'insufficient', 'balance', bal); END IF;
  key := 'r' || replace(gen_random_uuid()::text, '-', '');
  INSERT INTO public.reward_point_events(user_id, points, reason, period_key) VALUES (uid, -_days, 'redeem', key);
  SELECT max(ends_at) INTO last_end FROM public.reward_grants WHERE user_id = uid;
  start_at := greatest(now(), coalesce(last_end, now()));
  INSERT INTO public.reward_grants(user_id, kind, period_key, starts_at, ends_at)
    VALUES (uid, 'points', key, start_at, start_at + (_days || ' days')::interval);
  RETURN jsonb_build_object('status', 'ok', 'balance', bal - _days, 'ends_at', start_at + (_days || ' days')::interval);
END $$;

-- ============ 6. Claim: anchored membership months, non-overlapping blocks ============
CREATE OR REPLACE FUNCTION public.claim_rewards()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  joined timestamptz;
  seg record;
  w_start timestamptz; w_end timestamptz;
  run_start timestamptz; run int := 0;
  awarded boolean := false;
  n int; key text;
BEGIN
  IF uid IS NULL THEN RETURN 'none'; END IF;
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;

  -- Newcomer: once per account, 25 check-in days within the first 30 days of registration.
  IF joined IS NOT NULL
     AND NOT EXISTS(SELECT 1 FROM public.reward_point_events WHERE user_id = uid AND reason = 'newcomer')
     AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'newcomer') THEN
    SELECT count(*) INTO n FROM (SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date d FROM public.practice_records
      WHERE user_id = uid AND score > 0 AND created_at >= joined AND created_at < joined + interval '30 days' GROUP BY 1 HAVING count(*) >= 3) x;
    IF n >= 25 THEN
      INSERT INTO public.reward_point_events(user_id, points, reason, period_key) VALUES (uid, 30, 'newcomer', 'first');
      RETURN 'newcomer';
    END IF;
  END IF;

  -- Paid streak: inside the latest continuous coverage segment, each completed
  -- membership month (anchored at segment start) needs >=25 check-in days.
  -- Three consecutive qualifying months = one +30 award; the block is consumed.
  SELECT * INTO seg FROM public.latest_coverage_segment(uid);
  IF seg.seg_start IS NULL THEN RETURN 'none'; END IF;
  w_start := seg.seg_start;
  LOOP
    EXIT WHEN w_start >= seg.seg_end;
    w_end := w_start + interval '1 month';
    EXIT WHEN w_end > now();
    IF w_end <= seg.seg_end THEN
      SELECT count(*) INTO n FROM (SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date d FROM public.practice_records
        WHERE user_id = uid AND score > 0 AND created_at >= w_start AND created_at < w_end
        GROUP BY 1 HAVING count(*) >= 3) x;
      IF n >= 25 THEN
        IF run = 0 THEN run_start := w_start; END IF;
        run := run + 1;
      ELSE
        run := 0;
      END IF;
    ELSE
      run := 0;
    END IF;
    IF run = 3 THEN
      key := to_char(run_start AT TIME ZONE 'Asia/Shanghai', 'YYYY-MM-DD');
      IF NOT EXISTS(SELECT 1 FROM public.reward_point_events WHERE user_id = uid AND reason = 'streak' AND period_key = key)
         AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'streak'
                        AND starts_at < w_end AND ends_at > run_start) THEN
        INSERT INTO public.reward_point_events(user_id, points, reason, period_key) VALUES (uid, 30, 'streak', key);
        awarded := true;
      END IF;
      run := 0;
    END IF;
    w_start := w_end;
  END LOOP;
  RETURN CASE WHEN awarded THEN 'streak' ELSE 'none' END;
END $$;

REVOKE EXECUTE ON FUNCTION public.claim_rewards() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.redeem_points(int) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.latest_coverage_segment(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.defer_point_grants(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_rewards() TO authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_points(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.latest_coverage_segment(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.defer_point_grants(uuid) TO service_role;
