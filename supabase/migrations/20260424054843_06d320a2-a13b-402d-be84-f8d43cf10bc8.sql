
DROP POLICY IF EXISTS "Anyone can create submissions" ON public.submissions;

CREATE POLICY "Anyone can create valid submissions"
ON public.submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  type IN ('demo', 'contact')
  AND length(trim(name)) BETWEEN 1 AND 200
  AND length(trim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (company IS NULL OR length(company) <= 200)
  AND (intent IS NULL OR length(intent) <= 100)
  AND (message IS NULL OR length(message) <= 5000)
  AND (source IS NULL OR length(source) <= 100)
);
