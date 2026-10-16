CREATE TABLE public.vocab_reviews (
  user_id uuid NOT NULL,
  word text NOT NULL,
  box smallint NOT NULL DEFAULT 0,
  due_day integer NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, word)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vocab_reviews TO authenticated;
GRANT ALL ON public.vocab_reviews TO service_role;
ALTER TABLE public.vocab_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own vocab read" ON public.vocab_reviews FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own vocab insert" ON public.vocab_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own vocab update" ON public.vocab_reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own vocab delete" ON public.vocab_reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);