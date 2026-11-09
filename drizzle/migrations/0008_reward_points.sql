-- Check-in rewards become points: 1 point = 1 day of membership, redeemed on demand.
-- Paid auto-renewal is never touched; the user's points are an account asset.
CREATE TABLE public.reward_point_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  points int NOT NULL,
  reason text NOT NULL CHECK (reason IN ('newcomer','streak','redeem')),
  period_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, reason, period_key)
);
GRANT SELECT ON public.reward_point_events TO authenticated;
GRANT ALL ON public.reward_point_events TO service_role;
ALTER TABLE public.reward_point_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own point events read" ON public.reward_point_events FOR SELECT TO authenticated USING (auth.uid() = user_id);

ALTER TABLE public.reward_grants DROP CONSTRAINT reward_grants_kind_check;
ALTER TABLE public.reward_grants ADD CONSTRAINT reward_grants_kind_check CHECK (kind IN ('newcomer','streak','points'));

CREATE OR REPLACE FUNCTION public.reward_points_balance()
RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT coalesce(sum(points), 0)::int FROM public.reward_point_events WHERE user_id = auth.uid();
$$;

-- Spend points -> a 'points' grant that stacks after the latest existing grant.
CREATE OR REPLACE FUNCTION public.redeem_points(_days int)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  bal int;
  last_end timestamptz;
  start_at timestamptz;
  key text;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('status', 'denied'); END IF;
  IF _days IS NULL OR _days < 1 OR _days > 365 THEN RETURN jsonb_build_object('status', 'invalid'); END IF;
  PERFORM pg_advisory_xact_lock(hashtext(uid::text));
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

-- Same qualification rules as before, but success now credits +30 points
-- (legacy grants still count toward "already claimed" so nobody double-dips).
CREATE OR REPLACE FUNCTION public.claim_rewards()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  joined timestamptz;
  paid boolean;
  cur_month date := date_trunc('month', (now() AT TIME ZONE 'Asia/Shanghai'))::date;
  m date; ok boolean := true; n int; key text;
BEGIN
  IF uid IS NULL THEN RETURN 'none'; END IF;
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;
  SELECT EXISTS(SELECT 1 FROM public.subscriptions WHERE user_id = uid AND status IN ('active','trialing','past_due')) INTO paid;

  -- Newcomer gift: once per account, free learners, 25 check-in days within the first 30 days.
  IF NOT paid AND joined IS NOT NULL
     AND NOT EXISTS(SELECT 1 FROM public.reward_point_events WHERE user_id = uid AND reason = 'newcomer')
     AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'newcomer') THEN
    SELECT count(*) INTO n FROM (SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date d FROM public.practice_records
      WHERE user_id = uid AND score > 0 AND created_at >= joined AND created_at < joined + interval '30 days' GROUP BY 1 HAVING count(*) >= 3) x;
    IF n >= 25 THEN
      INSERT INTO public.reward_point_events(user_id, points, reason, period_key) VALUES (uid, 30, 'newcomer', 'first');
      RETURN 'newcomer';
    END IF;
  END IF;

  -- Paid streak: last 3 full months each >= 25 days while subscribed, months not used before.
  IF paid THEN
    FOR i IN 1..3 LOOP
      m := (cur_month - (i || ' month')::interval)::date;
      SELECT count(*) INTO n FROM (SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date d FROM public.practice_records
        WHERE user_id = uid AND score > 0 AND (created_at AT TIME ZONE 'Asia/Shanghai') >= m AND (created_at AT TIME ZONE 'Asia/Shanghai') < m + interval '1 month' GROUP BY 1 HAVING count(*) >= 3) x;
      IF n < 25 THEN ok := false; END IF;
    END LOOP;
    IF ok AND NOT EXISTS(SELECT 1 FROM public.subscriptions WHERE user_id = uid AND created_at < ((cur_month - interval '3 month') + interval '1 day') AT TIME ZONE 'Asia/Shanghai') THEN ok := false; END IF;
    key := to_char(cur_month - interval '1 month', 'YYYY-MM');
    IF ok
       AND NOT EXISTS(SELECT 1 FROM public.reward_point_events WHERE user_id = uid AND reason = 'streak' AND period_key >= to_char(cur_month - interval '3 month', 'YYYY-MM'))
       AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'streak' AND period_key >= to_char(cur_month - interval '3 month', 'YYYY-MM')) THEN
      INSERT INTO public.reward_point_events(user_id, points, reason, period_key) VALUES (uid, 30, 'streak', key);
      RETURN 'streak';
    END IF;
  END IF;
  RETURN 'none';
END $$;

REVOKE EXECUTE ON FUNCTION public.claim_rewards() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.reward_points_balance() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.redeem_points(int) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_rewards() TO authenticated;
GRANT EXECUTE ON FUNCTION public.reward_points_balance() TO authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_points(int) TO authenticated;
