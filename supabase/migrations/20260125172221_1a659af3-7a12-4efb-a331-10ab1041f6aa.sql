-- Add new columns for languages, achievements, and interests
ALTER TABLE public.resumes 
ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS achievements jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS interests jsonb DEFAULT '[]'::jsonb;