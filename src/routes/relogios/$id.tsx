import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts } from "@/lib/api.functions";
import { motion } from "framer-motion";
import { ChevronLeft, MessageCircle, Shield, Clock, Award, ShoppingCart } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CheckoutModal } from "@/components/CheckoutModal";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { useState } from "react";

export const Route = createFileRoute("/relogios/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes do relógio | RG Relógios" },
      {
        name: "description",
        content:
          "Conheça os detalhes, condição e disponibilidade desta peça selecionada pela RG Relógios.",
      },
      { property: "og:title", content: "Relógio selecionado | RG Relógios" },
      {
        property: "og:description",
        content: "Detalhes e atendimento especializado para relógios selecionados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const fetchProducts = useServerFn(getProducts);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const products = await fetchProducts({ data: {} });
      return products.find((p) => p.id === id);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <h2 className="text-4xl font-serif">Relógio não encontrado</h2>
          <Link to="/" className="text-primary hover:underline">
            Voltar para o início
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      <WhatsAppButton
        message={`Olá! Tenho interesse no relógio ${product.brand} ${product.name}. Gostaria de mais informações.`}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={product}
        />
      )}

      <div className="flex-1 max-w-7xl mx-auto w-full pt-32 pb-20 px-6 sm:px-8">
        <a
          href="/#relógios"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 uppercase text-xs font-bold tracking-widest"
        >
          <ChevronLeft size={16} /> Voltar
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden border border-primary/20 shadow-2xl">
              <img
                src={
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1524592094714-0f0654e20314"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden border border-primary/15"
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-2">
              {product.brand}
            </h1>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-primary/15">
              <span className="text-3xl font-bold text-primary">
                {product.price ? `R$ ${product.price.toLocaleString()}` : "Sob Consulta"}
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                {product.condition}
              </span>
            </div>

            <div className="space-y-6 mb-10 text-muted-foreground font-light leading-relaxed">
              <p>
                {product.description ||
                  "Uma peça excepcional de relojoaria que combina precisão técnica com design atemporal."}
              </p>

              <div className="grid grid-cols-2 gap-8 py-6 border-y border-primary/15">
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                    Marca
                  </h4>
                  <p className="text-sm font-medium">{product.brand}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                    Modelo
                  </h4>
                  <p className="text-sm font-medium">{product.model}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                    Ano
                  </h4>
                  <p className="text-sm font-medium">{product.year || "Não especificado"}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                    Categoria
                  </h4>
                  <p className="text-sm font-medium">{product.category}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded font-bold hover:bg-primary/85 transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Comprar Agora
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/5541992399650?text=${encodeURIComponent(`Olá! Tenho interesse no relógio ${product.brand} ${product.name} e gostaria de falar com um especialista.`)}`,
                    "_blank",
                  )
                }
                className="flex-1 border border-primary text-primary py-4 rounded font-bold hover:bg-primary/10 transition-all uppercase text-sm tracking-widest"
              >
                Falar com Especialista
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-primary/15">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Compra Protegida
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Certificado</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Entrega Segura
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
