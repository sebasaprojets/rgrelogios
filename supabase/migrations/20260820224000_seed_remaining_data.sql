-- Seed more products if they don't exist
INSERT INTO public.products (name, brand, model, category, price, condition, availability, is_featured, images) 
SELECT 'Daytona', 'Rolex', '116500LN', 'Luxo', 185000, 'Novo', true, true, ARRAY['https://images.unsplash.com/photo-1585123334904-845d60e97b29']
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Daytona');

INSERT INTO public.products (name, brand, model, category, price, condition, availability, is_featured, images) 
SELECT 'Seamaster Diver 300M', 'Omega', '210.30.42.20.01.001', 'Luxo', 32000, 'Excelente', true, false, ARRAY['https://images.unsplash.com/photo-1547996160-81dfa63595dd']
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Seamaster Diver 300M');

-- Seed more reviews
INSERT INTO public.reviews (customer_name, rating, comment, is_verified)
SELECT 'Marcos Vinícius', 5, 'Melhor relojoaria de Curitiba. Atendimento de primeira.', true
WHERE NOT EXISTS (SELECT 1 FROM public.reviews WHERE customer_name = 'Marcos Vinícius');

INSERT INTO public.reviews (customer_name, rating, comment, is_verified)
SELECT 'Julia Ferreira', 5, 'Encontrei um relógio vintage maravilhoso para presentear meu pai.', true
WHERE NOT EXISTS (SELECT 1 FROM public.reviews WHERE customer_name = 'Julia Ferreira');
