CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES auth.users(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_whatsapp TEXT,
    items JSONB NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    payment_method TEXT,
    shipping_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Grant access to orders
GRANT SELECT, INSERT ON public.orders TO authenticated, anon;
GRANT ALL ON public.orders TO service_role;

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Anyone can create an order" ON public.orders FOR INSERT WITH CHECK (true);

-- Add some extra fields to service_requests if they don't exist
ALTER TABLE public.service_requests ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES auth.users(id);
ALTER TABLE public.service_requests ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
