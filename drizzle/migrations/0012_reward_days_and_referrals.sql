-- Reward rules v3 (days, not points):
--  * newcomer: 25 check-in days within the first 30 days after registration -> 30 membership days, once;
--  * monthly: each completed PAID membership month with >=25 check-in days -> 7 days;
--    reward days themselves never count as paid months, so rewards cannot chain;
--  * referral: friend registers with the inviter's code (within 7 days of signup) and
--    keeps a paid period for 7 days -> inviter gets 15 days; one level only; max 12 per 365 days.
-- Reward days always queue behind active paid coverage and other reward days.

ALTER TABLE public.reward_grants DROP CONSTRAINT IF EXISTS reward_grants_kind_check;
ALTER TABLE public.reward_grants ADD CONSTRAINT reward_grants_kind_check
  CHECK (kind IN ('newcomer','streak','points','partner','monthly','referral'));

CREATE TABLE public.referral_codes (
  user_id uuid PRIMARY KEY,
  code text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.referral_codes TO authenticated;
GRANT ALL ON public.referral_codes TO service_role;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own referral code read" ON public.referral_codes FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.referrals (
  invitee_id uuid PRIMARY KEY,
  inviter_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  rewarded_at timestamptz
);
CREATE INDEX referrals_inviter_idx ON public.referrals(inviter_id);
GRANT SELECT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invitee reads own referral" ON public.referrals FOR SELECT TO authenticated USING (auth.uid() = invitee_id);

-- ---------- internal helpers ----------
CREATE OR REPLACE FUNCTION public.checkin_day_count(_uid uuid, _from timestamptz, _to timestamptz)
RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*)::int FROM (
    SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date
    FROM public.practice_records
    WHERE user_id = _uid AND score > 0 AND created_at >= _from AND created_at < _to
    GROUP BY 1 HAVING count(*) >= 3
  ) x
$$;

CREATE OR REPLACE FUNCTION public.grant_reward_days(_uid uuid, _kind text, _key text, _days int)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE start_at timestamptz := now(); t timestamptz; seg record; n int;
BEGIN
  SELECT max(ends_at) INTO t FROM public.reward_grants WHERE user_id = _uid AND ends_at > now();
  IF t IS NOT NULL AND t > start_at THEN start_at := t; END IF;
  SELECT * INTO seg FROM public.latest_coverage_segment(_uid);
  IF seg.seg_end IS NOT NULL AND seg.seg_end > start_at THEN start_at := seg.seg_end; END IF;
  SELECT max(current_period_end) INTO t FROM public.subscriptions
    WHERE user_id = _uid AND status IN ('active','trialing','past_due') AND current_period_end > now();
  IF t IS NOT NULL AND t > start_at THEN start_at := t; END IF;
  INSERT INTO public.reward_grants(user_id, kind, period_key, starts_at, ends_at)
    VALUES (_uid, _kind, _key, start_at, start_at + make_interval(days => _days))
    ON CONFLICT (user_id, kind, period_key) DO NOTHING;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n > 0;
END $$;

-- Paid wins: reward days overlapping new paid coverage move behind it.
CREATE OR REPLACE FUNCTION public.defer_point_grants(_uid uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE g record; seg record; remaining interval;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(_uid::text));
  SELECT * INTO seg FROM public.latest_coverage_segment(_uid);
  IF seg.seg_end IS NULL OR seg.seg_end <= now() THEN RETURN; END IF;
  FOR g IN SELECT id, starts_at, ends_at FROM public.reward_grants
           WHERE user_id = _uid AND kind IN ('points','newcomer','streak','monthly','referral')
             AND ends_at > seg.seg_start AND starts_at < seg.seg_end
           ORDER BY starts_at LOOP
    remaining := g.ends_at - greatest(g.starts_at, seg.seg_start);
    IF remaining > interval '0' THEN
      UPDATE public.reward_grants SET starts_at = seg.seg_end, ends_at = seg.seg_end + remaining WHERE id = g.id;
      seg.seg_end := seg.seg_end + remaining;
    END IF;
  END LOOP;
END $$;

-- ---------- learner-facing ----------
CREATE OR REPLACE FUNCTION public.claim_reward_days()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  joined timestamptz;
  got_new boolean := false; got_month int := 0; got_ref int := 0;
  r record; s timestamptz; e timestamptz; w timestamptz; k int;
  seg_s timestamptz[] := '{}'; seg_e timestamptz[] := '{}'; i int;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('status', 'denied'); END IF;
  PERFORM pg_advisory_xact_lock(hashtext(uid::text));

  -- 1. Newcomer (once per account).
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;
  IF joined IS NOT NULL
     AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'newcomer')
     AND NOT EXISTS(SELECT 1 FROM public.reward_point_events WHERE user_id = uid AND reason = 'newcomer')
     AND public.checkin_day_count(uid, joined, joined + interval '30 days') >= 25 THEN
    got_new := public.grant_reward_days(uid, 'newcomer', 'first', 30);
  END IF;

  -- 2. Monthly: completed paid membership months (anchored at each continuous paid segment start).
  s := NULL;
  FOR r IN SELECT period_start, period_end FROM public.membership_periods
           WHERE user_id = uid AND NOT revoked ORDER BY period_start LOOP
    IF s IS NULL THEN s := r.period_start; e := r.period_end;
    ELSIF r.period_start <= e + interval '1 day' THEN e := greatest(e, r.period_end);
    ELSE seg_s := seg_s || s; seg_e := seg_e || e; s := r.period_start; e := r.period_end;
    END IF;
  END LOOP;
  IF s IS NOT NULL THEN seg_s := seg_s || s; seg_e := seg_e || e; END IF;
  FOR i IN 1 .. coalesce(array_length(seg_s, 1), 0) LOOP
    k := 0;
    LOOP
      w := seg_s[i] + make_interval(months => k);
      EXIT WHEN w + interval '1 month' > seg_e[i] + interval '1 day' OR w + interval '1 month' > now();
      IF public.checkin_day_count(uid, w, w + interval '1 month') >= 25
         AND public.grant_reward_days(uid, 'monthly', to_char(w AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI'), 7) THEN
        got_month := got_month + 1;
      END IF;
      k := k + 1;
    END LOOP;
  END LOOP;

  -- 3. Referral: invitee kept a paid period for 7 days; max 12 rewards per 365 days.
  FOR r IN SELECT invitee_id FROM public.referrals WHERE inviter_id = uid AND rewarded_at IS NULL ORDER BY created_at LOOP
    EXIT WHEN (SELECT count(*) FROM public.reward_grants WHERE user_id = uid AND kind = 'referral'
               AND created_at > now() - interval '365 days') >= 12;
    IF EXISTS(SELECT 1 FROM public.membership_periods WHERE user_id = r.invitee_id AND NOT revoked
              AND period_start <= now() - interval '7 days') THEN
      IF public.grant_reward_days(uid, 'referral', r.invitee_id::text, 15) THEN got_ref := got_ref + 1; END IF;
      UPDATE public.referrals SET rewarded_at = now() WHERE invitee_id = r.invitee_id;
    END IF;
  END LOOP;

  RETURN jsonb_build_object('status', 'ok', 'newcomer', got_new, 'monthly', got_month, 'referral', got_ref);
END $$;

-- Legacy entry point kept for older app builds: same new rules.
CREATE OR REPLACE FUNCTION public.claim_rewards()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d jsonb;
BEGIN
  d := public.claim_reward_days();
  IF (d->>'newcomer')::boolean THEN RETURN 'newcomer'; END IF;
  IF coalesce((d->>'monthly')::int, 0) + coalesce((d->>'referral')::int, 0) > 0 THEN RETURN 'streak'; END IF;
  RETURN 'none';
END $$;

CREATE OR REPLACE FUNCTION public.my_referral_info()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid(); c text; joined timestamptz; alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; tries int := 0;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('status', 'denied'); END IF;
  SELECT code INTO c FROM public.referral_codes WHERE user_id = uid;
  WHILE c IS NULL AND tries < 20 LOOP
    c := (SELECT string_agg(substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1), '') FROM generate_series(1, 7));
    BEGIN
      INSERT INTO public.referral_codes(user_id, code) VALUES (uid, c);
    EXCEPTION WHEN unique_violation THEN
      SELECT code INTO c FROM public.referral_codes WHERE user_id = uid;
    END;
    tries := tries + 1;
  END LOOP;
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;
  RETURN jsonb_build_object(
    'status', 'ok',
    'code', c,
    'invited', (SELECT count(*) FROM public.referrals WHERE inviter_id = uid),
    'rewarded', (SELECT count(*) FROM public.referrals WHERE inviter_id = uid AND rewarded_at IS NOT NULL),
    'applied', EXISTS(SELECT 1 FROM public.referrals WHERE invitee_id = uid),
    'can_apply', joined IS NOT NULL AND joined > now() - interval '7 days'
      AND NOT EXISTS(SELECT 1 FROM public.referrals WHERE invitee_id = uid)
      AND NOT EXISTS(SELECT 1 FROM public.membership_periods WHERE user_id = uid)
  );
END $$;

CREATE OR REPLACE FUNCTION public.apply_referral_code(_code text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid(); joined timestamptz; inv uuid;
BEGIN
  IF uid IS NULL THEN RETURN 'denied'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext(uid::text));
  IF EXISTS(SELECT 1 FROM public.referrals WHERE invitee_id = uid) THEN RETURN 'already'; END IF;
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;
  IF joined IS NULL OR joined < now() - interval '7 days' THEN RETURN 'expired'; END IF;
  IF EXISTS(SELECT 1 FROM public.membership_periods WHERE user_id = uid) THEN RETURN 'not_new'; END IF;
  SELECT user_id INTO inv FROM public.referral_codes WHERE code = upper(trim(coalesce(_code, '')));
  IF inv IS NULL THEN RETURN 'invalid'; END IF;
  IF inv = uid THEN RETURN 'self'; END IF;
  IF EXISTS(SELECT 1 FROM public.referrals WHERE inviter_id = uid AND invitee_id = inv) THEN RETURN 'invalid'; END IF;
  INSERT INTO public.referrals(invitee_id, inviter_id) VALUES (uid, inv);
  RETURN 'ok';
END $$;

REVOKE EXECUTE ON FUNCTION public.checkin_day_count(uuid, timestamptz, timestamptz) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_reward_days(uuid, text, text, int) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_reward_days() FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.my_referral_info() FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.apply_referral_code(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.checkin_day_count(uuid, timestamptz, timestamptz) TO service_role;
GRANT EXECUTE ON FUNCTION public.grant_reward_days(uuid, text, text, int) TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_reward_days() TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_referral_info() TO authenticated;
GRANT EXECUTE ON FUNCTION public.apply_referral_code(text) TO authenticated;

COMMENT ON FUNCTION public.redeem_points(int) IS 'DEPRECATED: rewards are granted directly as membership days by claim_reward_days';
COMMENT ON FUNCTION public.reward_points_balance() IS 'DEPRECATED: rewards are granted directly as membership days';
COMMENT ON TABLE public.reward_point_events IS 'DEPRECATED: legacy points ledger; new rewards go straight to reward_grants';