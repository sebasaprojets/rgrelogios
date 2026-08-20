-- Substituindo URLs do Unsplash que estão falhando por URLs de alta confiabilidade de outros bancos de imagens ou variações do Unsplash
UPDATE public.products 
SET images = ARRAY['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800'] 
WHERE name = 'Speedmaster Professional';

UPDATE public.products 
SET images = ARRAY['https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800'] 
WHERE name = 'Tank Louis';

UPDATE public.products 
SET images = ARRAY['https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800'] 
WHERE name = 'Submariner Date';
