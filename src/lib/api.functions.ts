import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getProducts = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ 
    category: z.string().optional(),
    featured: z.boolean().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    let query = supabase.from("products").select("*");
    
    if (data.category && data.category !== "Todos") {
      query = query.eq("category", data.category);
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
      .insert([data]);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });
