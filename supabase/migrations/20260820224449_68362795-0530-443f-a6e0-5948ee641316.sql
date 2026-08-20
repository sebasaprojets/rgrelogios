DROP POLICY IF EXISTS "Users can view their own service requests" ON public.service_requests;
REVOKE SELECT ON public.service_requests FROM anon, authenticated;
GRANT INSERT ON public.service_requests TO anon, authenticated;
GRANT ALL ON public.service_requests TO service_role;