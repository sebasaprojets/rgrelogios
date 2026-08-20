import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Database } from "@/integrations/supabase/types";

type WatchCategory = Database["public"]["Enums"]["watch_category"];

export const getProducts = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ 
    category: z.string().optional(),
    featured: z.boolean().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    let query = supabase.from("products").select("*");
    
    if (data.category && data.category !== "Todos") {
      query = query.eq("category", data.category as WatchCategory);
    }
    
    if (data.featured) {
      query = query.eq("is_featured", true);
    }
    
    const { data: products, error } = await query.order("created_at", { ascending: false });
    
    if (error) throw new Error(error.message);
    return products;
  });

export const getReviews = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw new Error(error.message);
    return reviews;
  });

export const submitServiceRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    customer_name: z.string().min(2),
    customer_whatsapp: z.string().min(10),
    customer_email: z.string().email().optional(),
    watch_brand: z.string().optional(),
    watch_model: z.string().optional(),
    service_type: z.string(),
    description: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("service_requests")
      .insert([{
        customer_name: data.customer_name,
        customer_whatsapp: data.customer_whatsapp,
        customer_email: data.customer_email ?? null,
        watch_brand: data.watch_brand ?? null,
        watch_model: data.watch_model ?? null,
        service_type: data.service_type,
        description: data.description ?? null,
      }]);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    customer_name: z.string().min(2),
    customer_email: z.string().email(),
    customer_whatsapp: z.string().optional(),
    items: z.array(z.any()),
    total_amount: z.number(),
    payment_method: z.string(),
    shipping_address: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("orders")
      .insert([{
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_whatsapp: data.customer_whatsapp ?? null,
        items: data.items,
        total_amount: data.total_amount,
        payment_method: data.payment_method,
        shipping_address: data.shipping_address ?? null,
      }]);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getOrders = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw new Error(error.message);
    return orders;
  });

export const getServiceRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: requests, error } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw new Error(error.message);
    return requests;
  });
