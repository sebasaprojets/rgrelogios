-- Create categories enum
CREATE TYPE public.watch_category AS ENUM (
  'Clássicos', 
  'Luxo', 
  'Antigos', 
  'Vintage', 
  'Masculinos', 
  'Femininos', 
  'Peças Exclusivas'
);

-- Create watch condition enum
CREATE TYPE public.watch_condition AS ENUM (
  'Novo',
  'Excelente',
  'Bom',
  'Vintage/Antigo',
  'Restauração necessária'
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category public.watch_category NOT NULL,
  price DECIMAL(12, 2),
  condition public.watch_condition NOT NULL,
  year TEXT,
  description TEXT,
  features TEXT[],
  images TEXT[],
  availability BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create service requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  customer_email TEXT,
  watch_brand TEXT,
  watch_model TEXT,
  service_type TEXT NOT NULL,
  description TEXT,
  image_urls TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

GRANT SELECT, INSERT ON public.service_requests TO anon, authenticated;
GRANT ALL ON public.service_requests TO service_role;

GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;

-- Policies
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public can submit service requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own service requests" ON public.service_requests FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON public.reviews FOR SELECT USING (true);

-- Seed demo products
INSERT INTO public.products (name, brand, model, category, price, condition, year, description, is_featured) VALUES
('Submariner Date', 'Rolex', '126610LN', 'Luxo', 75000.00, 'Novo', '2023', 'O relógio de mergulho de referência.', true),
('Speedmaster Professional', 'Omega', 'Moonwatch', 'Clássicos', 42000.00, 'Excelente', '2022', 'O primeiro relógio na lua.', true),
('Patek Philippe Calatrava Vintage', 'Patek Philippe', '96', 'Antigos', 85000.00, 'Vintage/Antigo', '1945', 'Uma peça rara de coleção.', true),
('Tank Louis', 'Cartier', 'Large Model', 'Luxo', 58000.00, 'Novo', '2024', 'Elegância atemporal em ouro rosa.', true);

-- Seed demo reviews
INSERT INTO public.reviews (customer_name, rating, comment) VALUES
('Ricardo Silva', 5, 'Atendimento impecável e restauração perfeita do meu relógio de família.'),
('Ana Paula', 5, 'A melhor seleção de relógios vintage em Curitiba. Confiança total.'),
('Carlos Eduardo', 5, 'Equipe extremamente técnica e cuidadosa. Recomendo fortemente.');
