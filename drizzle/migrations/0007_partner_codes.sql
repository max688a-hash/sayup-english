CREATE TABLE public.partner_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  org_name text NOT NULL,
  days integer NOT NULL DEFAULT 30,
  expires_at timestamptz,
  used_by uuid,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_codes TO authenticated;
GRANT ALL ON public.partner_codes TO service_role;
ALTER TABLE public.partner_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage partner codes" ON public.partner_codes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.redeem_partner_code(_code text)
RETURNS timestamptz LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE c public.partner_codes; uid uuid := auth.uid(); start_at timestamptz; end_at timestamptz;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'not_signed_in'; END IF;
  SELECT * INTO c FROM public.partner_codes WHERE code = upper(trim(_code)) FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'invalid_code'; END IF;
  IF c.used_by IS NOT NULL THEN RAISE EXCEPTION 'code_used'; END IF;
  IF c.expires_at IS NOT NULL AND c.expires_at < now() THEN RAISE EXCEPTION 'code_expired'; END IF;
  IF EXISTS (SELECT 1 FROM public.partner_codes WHERE used_by = uid AND used_at > now() - interval '30 days') THEN RAISE EXCEPTION 'too_frequent'; END IF;
  SELECT greatest(now(), coalesce(max(ends_at), now())) INTO start_at FROM public.reward_grants WHERE user_id = uid;
  end_at := start_at + make_interval(days => c.days);
  INSERT INTO public.reward_grants(user_id, kind, period_key, starts_at, ends_at)
    VALUES (uid, 'partner', 'partner:' || c.id, start_at, end_at);
  UPDATE public.partner_codes SET used_by = uid, used_at = now() WHERE id = c.id;
  RETURN end_at;
END $$;
REVOKE ALL ON FUNCTION public.redeem_partner_code(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.redeem_partner_code(text) TO authenticated;