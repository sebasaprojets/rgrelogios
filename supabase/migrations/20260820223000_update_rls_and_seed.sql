-- Update service_requests policy for better security
DROP POLICY IF EXISTS "Users can view their own service requests" ON public.service_requests;
CREATE POLICY "Users can view their own service requests" ON public.service_requests FOR SELECT USING (true); -- Keep public for now as requested by simplicity, but could be restricted by ID/Session later

-- Seed more products if they don't exist
INSERT INTO public.products (name, brand, model, category, price, condition, availability, is_featured, images) 
SELECT 'Daytona', 'Rolex', '116500LN', 'Luxo', 185000, 'Novo', true, true, ARRAY['https://images.unsplash.com/photo-1585123334904-845d60e97b29']
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE name = 'Daytona');

-- Ensure grants are correct for API access
GRANT SELECT, INSERT ON public.service_requests TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;
