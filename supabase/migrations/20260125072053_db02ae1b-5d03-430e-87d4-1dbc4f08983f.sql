-- Create enum for field categories
CREATE TYPE public.field_category AS ENUM ('engineering', 'medical', 'business', 'arts', 'science', 'law', 'design', 'education', 'agriculture', 'other');

-- Create enum for growth trend
CREATE TYPE public.growth_trend AS ENUM ('rapidly_growing', 'growing', 'stable', 'declining');

-- Main fields table
CREATE TABLE public.fields (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category field_category NOT NULL,
    description TEXT NOT NULL,
    icon TEXT, -- lucide icon name
    total_students INTEGER NOT NULL DEFAULT 0,
    current_jobs INTEGER NOT NULL DEFAULT 0,
    projected_jobs_5y INTEGER NOT NULL DEFAULT 0,
    competition_level INTEGER NOT NULL DEFAULT 50, -- 0-100 scale
    growth_trend growth_trend NOT NULL DEFAULT 'stable',
    avg_salary_entry DECIMAL(12,2),
    avg_salary_senior DECIMAL(12,2),
    preparation_duration TEXT, -- e.g., "4 years"
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skills required for each field
CREATE TABLE public.field_skills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    skill_name TEXT NOT NULL,
    importance_level INTEGER NOT NULL DEFAULT 50, -- 0-100 scale
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Top companies hiring in each field
CREATE TABLE public.field_companies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    jobs_available INTEGER NOT NULL DEFAULT 0,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sectors/industries for each field
CREATE TABLE public.field_sectors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    field_id UUID REFERENCES public.fields(id) ON DELETE CASCADE NOT NULL,
    sector_name TEXT NOT NULL,
    growth_rate DECIMAL(5,2), -- percentage
    job_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public read access)
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_sectors ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can view fields" ON public.fields FOR SELECT USING (true);
CREATE POLICY "Anyone can view field skills" ON public.field_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can view field companies" ON public.field_companies FOR SELECT USING (true);
CREATE POLICY "Anyone can view field sectors" ON public.field_sectors FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_fields_category ON public.fields(category);
CREATE INDEX idx_fields_growth_trend ON public.fields(growth_trend);
CREATE INDEX idx_field_skills_field_id ON public.field_skills(field_id);
CREATE INDEX idx_field_companies_field_id ON public.field_companies(field_id);
CREATE INDEX idx_field_sectors_field_id ON public.field_sectors(field_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_fields_updated_at
BEFORE UPDATE ON public.fields
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();