
-- Create a table to store portfolio responses and contact information
CREATE TABLE public.portfolio_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_response TEXT NOT NULL,
  contact_info TEXT,
  contact_type TEXT CHECK (contact_type IN ('email', 'github')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert responses (public form)
CREATE POLICY "Anyone can submit portfolio responses" 
  ON public.portfolio_responses 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading responses (for admin purposes)
CREATE POLICY "Anyone can read portfolio responses" 
  ON public.portfolio_responses 
  FOR SELECT 
  USING (true);
