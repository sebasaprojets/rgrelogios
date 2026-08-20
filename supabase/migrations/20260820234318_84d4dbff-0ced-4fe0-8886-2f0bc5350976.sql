-- Atualizando as URLs das imagens dos produtos para URLs funcionais do Unsplash
UPDATE public.products 
SET images = ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'] 
WHERE name = 'Submariner Date';

UPDATE public.products 
SET images = ARRAY['https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800'] 
WHERE name = 'Speedmaster Professional';

UPDATE public.products 
SET images = ARRAY['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800'] 
WHERE name = 'Patek Philippe Calatrava Vintage';

UPDATE public.products 
SET images = ARRAY['https://images.unsplash.com/photo-1639037687665-684c304d98d7?auto=format&fit=crop&q=80&w=800'] 
WHERE name = 'Tank Louis';

-- Garantir que o produto extra exista
INSERT INTO public.products (name, brand, model, category, condition, price, is_featured, images) 
VALUES ('Vacheron Constantin Patrimony', 'Vacheron Constantin', 'Patrimony 81180', 'Luxo', 'Excelente', 125000, true, ARRAY['https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800'])
ON CONFLICT (id) DO NOTHING;
