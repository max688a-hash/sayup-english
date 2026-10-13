CREATE TABLE public.reward_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  kind text NOT NULL CHECK (kind IN ('newcomer','streak')),
  period_key text NOT NULL,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, kind, period_key)
);
GRANT SELECT ON public.reward_grants TO authenticated;
GRANT ALL ON public.reward_grants TO service_role;
ALTER TABLE public.reward_grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rewards read" ON public.reward_grants FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- A day counts when the learner made at least 3 real scored recordings (Shanghai time).
CREATE OR REPLACE FUNCTION public.checkin_days(_from timestamptz, _to timestamptz)
RETURNS TABLE(day date) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date AS day
  FROM public.practice_records
  WHERE user_id = auth.uid() AND score > 0 AND created_at >= _from AND created_at < _to
  GROUP BY 1 HAVING count(*) >= 3 ORDER BY 1;
$$;

CREATE OR REPLACE FUNCTION public.claim_rewards()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  joined timestamptz;
  paid boolean;
  cur_month date := date_trunc('month', (now() AT TIME ZONE 'Asia/Shanghai'))::date;
  m date; ok boolean := true; n int; key text; last_end timestamptz;
BEGIN
  IF uid IS NULL THEN RETURN 'none'; END IF;
  SELECT created_at INTO joined FROM public.profiles WHERE id = uid;
  SELECT EXISTS(SELECT 1 FROM public.subscriptions WHERE user_id = uid AND status IN ('active','trialing','past_due')) INTO paid;

  -- Newcomer gift: once per account, free learners, 25 check-in days within the first 30 days.
  IF NOT paid AND joined IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'newcomer') THEN
    SELECT count(*) INTO n FROM (SELECT (created_at AT TIME ZONE 'Asia/Shanghai')::date d FROM public.practice_records
      WHERE user_id = uid AND score > 0 AND created_at >= joined AND created_at < joined + interval '30 days' GROUP BY 1 HAVING count(*) >= 3) x;
    IF n >= 25 THEN
      INSERT INTO public.reward_grants(user_id, kind, period_key, ends_at) VALUES (uid, 'newcomer', 'first', now() + interval '1 month');
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
    IF ok AND NOT EXISTS(SELECT 1 FROM public.reward_grants WHERE user_id = uid AND kind = 'streak' AND period_key >= to_char(cur_month - interval '3 month', 'YYYY-MM')) THEN
      SELECT max(ends_at) INTO last_end FROM public.reward_grants WHERE user_id = uid;
      INSERT INTO public.reward_grants(user_id, kind, period_key, starts_at, ends_at)
        VALUES (uid, 'streak', key, greatest(now(), coalesce(last_end, now())), greatest(now(), coalesce(last_end, now())) + interval '1 month');
      RETURN 'streak';
    END IF;
  END IF;
  RETURN 'none';
END $$;
REVOKE EXECUTE ON FUNCTION public.claim_rewards() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.checkin_days(timestamptz, timestamptz) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_rewards() TO authenticated;
GRANT EXECUTE ON FUNCTION public.checkin_days(timestamptz, timestamptz) TO authenticated;