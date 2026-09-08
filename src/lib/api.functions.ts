import { supabase } from "@/integrations/supabase/client";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Database } from "@/integrations/supabase/types";

type WatchCategory = Database["public"]["Enums"]["watch_category"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

/**
 * Leituras públicas devem degradar com elegância: se o backend não estiver
 * configurado no ambiente (ex.: projeto exportado para outra plataforma sem as
 * variáveis de ambiente), a página ainda precisa renderizar em vez de gerar 500.
 */
async function safeRead<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await read();
  } catch (error) {
    console.error("[api] leitura pública falhou, usando fallback vazio:", error);
    return fallback;
  }
}

export const getProducts = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ 
    category: z.string().optional(),
    featured: z.boolean().optional()
  }).parse(data))
  .handler(async ({ data }): Promise<Product[]> =>
    safeRead<Product[]>(async () => {
      let query = supabase.from("products").select("*");

      if (data.category && data.category !== "Todos") {
        query = query.eq("category", data.category as WatchCategory);
      }

      if (data.featured) {
        query = query.eq("is_featured", true);
      }

      const { data: products, error } = await query.order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return products ?? [];
    }, []),
  );

export const getReviews = createServerFn({ method: "GET" })
  .handler(async (): Promise<Review[]> =>
    safeRead<Review[]>(async () => {
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return reviews ?? [];
    }, []),
  );




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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("orders" as any)
      .insert([{
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_whatsapp: data.customer_whatsapp ?? undefined,
        items: data.items,
        total_amount: data.total_amount,
        payment_method: data.payment_method,
        shipping_address: data.shipping_address ?? undefined,
        status: "pending"
      } as any]);
      
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const getOrders = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: orders, error } = await supabaseAdmin
      .from("orders" as any)
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw new Error(error.message);
    return orders as any[];
  });

export const getServiceRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: requests, error } = await supabaseAdmin
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) throw new Error(error.message);
    return requests;
  });

/** Cria um novo relógio no catálogo de vendas (uso administrativo). */
export const createProduct = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        name: z.string().min(2),
        brand: z.string().min(1),
        model: z.string().min(1),
        category: z.string().min(1),
        condition: z.string().min(1),
        price: z.number().nonnegative().optional(),
        year: z.string().optional(),
        description: z.string().optional(),
        image_url: z.string().url().optional(),
        availability: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").insert([
      {
        name: data.name,
        brand: data.brand,
        model: data.model,
        category: data.category as WatchCategory,
        condition: data.condition as Database["public"]["Enums"]["watch_condition"],
        price: data.price ?? null,
        year: data.year ?? null,
        description: data.description ?? null,
        images: data.image_url ? [data.image_url] : [],
        availability: data.availability ?? true,
      },
    ]);

    if (error) throw new Error(error.message);
    return { success: true };
  });
