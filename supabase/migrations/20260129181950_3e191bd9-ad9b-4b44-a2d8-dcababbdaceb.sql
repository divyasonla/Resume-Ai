-- Add settings column for theme color and font size
ALTER TABLE public.resumes 
ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{"themeColor": "217 91% 60%", "fontSize": 11}'::jsonb;