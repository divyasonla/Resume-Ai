-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template TEXT NOT NULL DEFAULT 'modern',
  
  -- Personal Info
  personal_info JSONB DEFAULT '{}'::jsonb,
  
  -- Career Objective
  career_objective TEXT,
  
  -- Education (array of education entries)
  education JSONB DEFAULT '[]'::jsonb,
  
  -- Skills
  skills JSONB DEFAULT '[]'::jsonb,
  
  -- Projects
  projects JSONB DEFAULT '[]'::jsonb,
  
  -- Experience/Internships
  experience JSONB DEFAULT '[]'::jsonb,
  
  -- Certifications & Achievements
  certifications JSONB DEFAULT '[]'::jsonb,
  
  -- AI Feedback
  ai_feedback JSONB,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Resumes RLS policies
CREATE POLICY "Users can view their own resumes"
ON public.resumes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes"
ON public.resumes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes"
ON public.resumes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes"
ON public.resumes FOR DELETE
USING (auth.uid() = user_id);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON public.resumes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();