-- ==========================================
-- SUPABASE SCHEMA FOR LOAN APPLICATION APP
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create `applications` table to store loan applicants' phone numbers
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast sorting by creation date
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications (created_at DESC);

-- 2. Create `settings` table to store key-value configurations (e.g. dynamic redirect URL)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial redirect URL setting
INSERT INTO public.settings (key, value)
VALUES ('redirect_url', 'https://example.com/thank-you')
ON CONFLICT (key) DO NOTHING;

-- 3. Enable Row Level Security (RLS) & Define Public Access Policies
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous users to insert loan applications
CREATE POLICY "Allow public insert into applications" 
ON public.applications FOR INSERT 
WITH CHECK (true);

-- Allow public anonymous users to select settings (to fetch redirect_url)
CREATE POLICY "Allow public select settings" 
ON public.settings FOR SELECT 
USING (true);

-- Allow all operations for service_role / full access
CREATE POLICY "Allow full access to service_role on applications" 
ON public.applications FOR ALL 
USING (true);

CREATE POLICY "Allow full access to service_role on settings" 
ON public.settings FOR ALL 
USING (true);
