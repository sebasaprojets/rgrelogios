import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Search, MessageCircle, Watch } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProducts } from "@/lib/api.functions";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Relógios à Venda | RG Relógios" },
      {
        name: "description",
        content:
          "Relógios antigos e relógios de mão disponíveis para venda na RG Relógios. Veja marca, modelo, estado e fale conosco pelo WhatsApp.",
      },
      { property: "og:title", content: "Catálogo de Relógios à Venda | RG Relógios" },
      {
        property: "og:description",
        content: "Peças disponíveis para venda: relógios antigos e relógios de mão selecionados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

/** Agrupamento comercial exibido em abas no catálogo. */
const SECTIONS = [
  { label: "Todos", categories: [] as readonly string[] },
  { label: "Relógios Antigos", categories: ["Antigos", "Vintage", "Peças Exclusivas"] },
  { label: "Relógios de Mão", categories: ["Clássicos", "Luxo", "Masculinos", "Femininos"] },
] as const;

const PLACEHOLDER_IMAGE =
  "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1200";

function formatPrice(price: number | null): string {
  if (price === null || Number.isNaN(price)) return "Sob consulta";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function CatalogPage() {
  const fetchProducts = useServerFn(getProducts);
  const [section, setSection] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: () => fetchProducts({ data: {} }),
    staleTime: 60_000,
  });

  const filtered = useMemo(() => {
    const active = SECTIONS.find((s) => s.label === section);
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const inSection =
        !active ||
        active.categories.length === 0 ||
        (active.categories as readonly string[]).includes(product.category);
      const matchesTerm =
        term.length === 0 ||
        `${product.name} ${product.brand} ${product.model} ${product.year ?? ""}`
          .toLowerCase()
          .includes(term);
      return inSection && matchesTerm;
    });
  }, [products, section, search]);

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <SiteHeader />

      <main>
        <section className="relative pt-44 pb-20 px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <SectionEyebrow>Peças à venda</SectionEyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-[#C5A059]"
            >
              Catálogo RG Relógios
            </motion.h1>
            <p className="text-[#E5D3B3]/70 text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Relógios antigos e relógios de mão selecionados, revisados na nossa oficina e prontos para
              um novo pulso.
            </p>
          </div>
        </section>

        {/* Abas + busca */}
        <section className="px-8 pb-10">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {SECTIONS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSection(item.label)}
                  className={`px-6 py-3 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    section === item.label
                      ? "bg-[#C5A059] text-[#00050A] border-[#C5A059]"
                      : "border-[#C5A059]/25 text-[#E5D3B3]/60 hover:border-[#C5A059]/60 hover:text-[#C5A059]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]/60" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por marca, modelo ou ano"
                className="w-full bg-[#0A101A] border border-[#C5A059]/20 rounded pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Grade */}
        <section className="px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[26rem] rounded-lg border border-[#C5A059]/10 bg-[#0A101A] animate-pulse"
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="border border-[#C5A059]/15 rounded-lg py-24 text-center space-y-4">
                <Watch size={28} className="mx-auto text-[#C5A059]/60" />
                <p className="text-[#E5D3B3]/60">Nenhuma peça cadastrada nesta seção por enquanto.</p>
                <button
                  onClick={() => openWhatsApp("Olá! Gostaria de saber quais relógios estão à venda.")}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] hover:text-[#D4B473]"
                >
                  Consultar disponibilidade
                </button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/40 mb-8">
                  {filtered.length} {filtered.length === 1 ? "peça disponível" : "peças disponíveis"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((product, index) => (
                    <motion.article
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 6) * 0.05 }}
                      className="group bg-[#0A101A] border border-[#C5A059]/15 rounded-lg overflow-hidden hover:border-[#C5A059]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.images?.[0] || PLACEHOLDER_IMAGE}
                          alt={`${product.brand} ${product.model}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A101A] via-transparent to-transparent" />
                        <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-[#C5A059] text-[#00050A] px-3 py-1.5 rounded">
                          {product.category}
                        </span>
                        {!product.availability && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-[#00050A]/90 text-[#E5D3B3]/70 px-3 py-1.5 rounded border border-[#C5A059]/30">
                            Vendido
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                            {product.brand}
                          </p>
                          <h2 className="text-xl font-serif text-[#E5D3B3]">{product.name}</h2>
                          <p className="text-xs text-[#E5D3B3]/50 mt-1">
                            {product.model}
                            {product.year ? ` · ${product.year}` : ""}
                          </p>
                        </div>

                        <p className="text-sm text-[#E5D3B3]/60 leading-relaxed flex-1 line-clamp-3">
                          {product.description || "Peça revisada em nossa oficina. Consulte detalhes."}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-[#C5A059]/10">
                          <span className="text-lg font-serif text-[#C5A059]">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/40">
                            {product.condition}
                          </span>
                        </div>

                        <button
                          onClick={() =>
                            openWhatsApp(
                              `Tenho interesse neste relógio do catálogo: ${product.brand} ${product.model} (${product.name}).`,
                            )
                          }
                          className="w-full bg-[#C5A059] text-[#00050A] py-3 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4B473] transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={15} />
                          Tenho interesse
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
