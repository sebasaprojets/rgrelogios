import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts, getReviews, submitServiceRequest } from "@/lib/api.functions";
import {
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Shield,
  PenTool as Tool,
  History,
  Smartphone,
  CheckCircle2,
  Search,
  ArrowRight,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";

import storefrontAsset from "@/assets/storefront.jpeg.asset.json";
import heroWatchLight from "@/assets/hero-watch-light.jpg";
import movadoVideo from "@/assets/movado-assembly.mp4.asset.json";
import movadoPoster from "@/assets/movado-clean.jpg.asset.json";

const TRUST_INDICATORS = [
  { label: "4,9/5 no Google", icon: Star },
  { label: "+100 avaliações", icon: CheckCircle2 },
  { label: "Especialistas em relojoaria", icon: Shield },
  { label: "Atendimento em Curitiba", icon: MapPin },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RG Relógios | Relojoaria e restauração em Curitiba" },
      {
        name: "description",
        content:
          "Venda, manutenção e restauração de relógios clássicos e contemporâneos em Curitiba, com atendimento especializado.",
      },
      { property: "og:title", content: "RG Relógios | Tempo, arte e precisão" },
      {
        property: "og:description",
        content:
          "Relógios selecionados e serviços especializados para preservar histórias e precisão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useServerFn(getProducts);
  const fetchReviews = useServerFn(getReviews);
  const submitRequest = useServerFn(submitServiceRequest);

  const { data: products = [] } = useQuery({
    queryKey: ["products", activeCategory],
    queryFn: () => fetchProducts({ data: { category: activeCategory } }),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews({ data: undefined }),
  });

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.model.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await submitRequest({
        data: {
          customer_name: formData.get("name") as string,
          customer_whatsapp: formData.get("whatsapp") as string,
          customer_email: (formData.get("email") as string) || undefined,
          service_type: "Contato pelo site",
          description: (formData.get("message") as string) || undefined,
        },
      });
      setShowConfirm(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setShowConfirm(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  const categories = [
    "Todos",
    "Clássicos",
    "Luxo",
    "Antigos",
    "Vintage",
    "Masculinos",
    "Femininos",
    "Peças Exclusivas",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SiteHeader />

      <main>
        <section
          id="início"
          className="relative min-h-[760px] pt-32 flex items-center overflow-hidden border-b border-border/60"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,var(--gold-soft),transparent_38%)] opacity-55" />
          <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] items-center gap-10 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="z-10 max-w-xl order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 mb-6 text-primary">
                <span className="h-px w-10 bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]">
                  Atelier de alta relojoaria
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-foreground leading-[0.98]">
                Tempo, arte <span className="text-primary italic">e precisão</span>
              </h1>
              <p className="mt-7 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Venda, manutenção e restauração de relógios clássicos e contemporâneos.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#relógios"
                  className="inline-flex justify-center bg-primary text-primary-foreground px-8 py-4 rounded-md font-bold tracking-wide hover:bg-primary/85 transition-colors shadow-sm"
                >
                  Ver Relógios
                </a>
                <a
                  href="#serviços"
                  className="inline-flex justify-center bg-card border border-primary/50 text-foreground px-8 py-4 rounded-md font-bold tracking-wide hover:bg-primary/10 transition-colors"
                >
                  Solicitar Avaliação
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/60 pt-8">
                {TRUST_INDICATORS.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <item.icon size={16} className="text-primary shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/75">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative order-1 lg:order-2 min-h-[380px] sm:min-h-[500px] lg:min-h-[620px]"
            >
              <div className="absolute inset-0 lg:-right-20 overflow-hidden rounded-lg border border-primary/15 shadow-[0_24px_70px_color-mix(in_oklab,var(--foreground)_10%,transparent)]">
                <img
                  src={heroWatchLight}
                  alt="Relógio mecânico clássico em fotografia de produto"
                  width={1600}
                  height={1200}
                  className="w-full h-full object-cover object-[65%_center]"
                />
              </div>
              <div className="absolute bottom-5 left-5 bg-background/90 backdrop-blur-sm border border-primary/20 px-4 py-3 rounded-md">
                <p className="text-[9px] uppercase tracking-[0.28em] text-primary font-bold">
                  Curitiba · Paraná
                </p>
                <p className="font-serif text-foreground mt-1">Tradição em cada detalhe</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catálogo de Relógios */}
        <section id="relógios" className="py-32 px-6 sm:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <SectionEyebrow>Catálogo selecionado</SectionEyebrow>
              <h2 className="text-4xl md:text-6xl font-serif text-primary">
                Encontre o relógio ideal
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
                Peças clássicas, de luxo e vintage, cada uma avaliada e preparada por nossa equipe.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-10">
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-primary/25 text-muted-foreground hover:border-primary/60 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-72 shrink-0">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome, marca ou modelo"
                  className="w-full pl-11 pr-4 py-3 bg-secondary border border-primary/20 rounded text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-primary/25 rounded-lg">
                <p className="text-muted-foreground font-light">
                  Nenhum relógio encontrado com esses filtros no momento.
                </p>
                <button
                  onClick={() =>
                    openWhatsApp(
                      "Olá! Gostaria de saber quais relógios estão disponíveis no catálogo.",
                    )
                  }
                  className="mt-6 inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest hover:text-primary/80 transition-colors"
                >
                  <MessageCircle size={14} />
                  Perguntar disponibilidade no WhatsApp
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 8) * 0.05 }}
                    className="group bg-card rounded-lg overflow-hidden border border-border/80 shadow-[0_12px_35px_color-mix(in_oklab,var(--foreground)_7%,transparent)] hover:-translate-y-1 hover:border-primary/35 transition-all duration-500 flex flex-col"
                  >
                    <Link
                      to="/relogios/$id"
                      params={{ id: product.id }}
                      className="block aspect-square overflow-hidden bg-secondary relative"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800"
                        }
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm border border-primary/20 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest text-primary">
                        {product.condition}
                      </span>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                        {product.brand}
                      </p>
                      <h3 className="font-serif text-xl text-foreground mb-1 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 mb-4">{product.model}</p>
                      <p className="text-lg font-bold text-primary mt-auto mb-5">
                        {product.price
                          ? `R$ ${product.price.toLocaleString("pt-BR")}`
                          : "Sob Consulta"}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        <Link
                          to="/relogios/$id"
                          params={{ id: product.id }}
                          className="inline-flex items-center justify-center gap-2 border border-primary/50 text-primary py-2.5 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          Ver detalhes <ArrowRight size={13} />
                        </Link>
                        <button
                          onClick={() =>
                            openWhatsApp(
                              `Olá! Tenho interesse no relógio ${product.brand} ${product.name}. Gostaria de saber mais informações.`,
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest hover:text-primary/80 transition-colors"
                        >
                          <MessageCircle size={13} />
                          Tenho interesse
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Relógios Antigos */}
        <section id="antigos" className="relative py-32 px-8 bg-secondary overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl sm:text-5xl font-serif text-primary">
                Relógios que carregam histórias
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Peças antigas restauradas com respeito à sua origem, mantendo o mecanismo original
                sempre que possível.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/relogios-antigos"
                  className="bg-primary text-primary-foreground px-7 py-3.5 rounded font-bold tracking-wide hover:bg-primary/85 transition-all"
                >
                  Explorar Relógios Antigos
                </Link>
                <a
                  href="#serviços"
                  className="border border-primary/50 text-primary px-7 py-3.5 rounded font-bold tracking-wide hover:bg-primary/10 transition-all"
                >
                  Restaurar meu relógio
                </a>
              </div>
            </div>

            <div className="relative h-[480px]">
              <div className="absolute inset-0 z-10 overflow-hidden rounded-lg shadow-lg border border-primary/20 bg-background">
                <video
                  src={movadoVideo.url}
                  poster={movadoPoster.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Relógio Movado Kingmatic sendo desmontado e montado novamente"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
              </div>

              {/* Elementos Decorativos de Design */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full z-0" />
            </div>
          </div>
        </section>

        {/* Seção de Serviços Premium */}
        <section id="serviços" className="py-32 px-8 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="text-center mb-20 space-y-4">
              <div className="flex flex-col items-center gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase block"
                >
                  Excelência em cada detalhe
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  className="w-12 h-[1px] bg-primary/50 relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rotate-45" />
                </motion.div>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif text-primary"
              >
                Nossos Serviços Especializados
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed"
              >
                Cuidamos do seu relógio com precisão, técnica e paixão.
                <br className="hidden md:block" />
                Serviços completos para manter, restaurar e valorizar o que é especial.
              </motion.p>
            </div>

            {/* Grid de Cards Premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                {
                  title: "Manutenção",
                  desc: "Manutenção preventiva que prolonga a vida útil do seu relógio e garante precisão.",
                  img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Shield,
                },
                {
                  title: "Reparação",
                  desc: "Diagnóstico preciso e reparos especializados para qualquer tipo de problema.",
                  img: "https://images.pexels.com/photos/1198264/pexels-photo-1198264.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Tool,
                },
                {
                  title: "Restauração",
                  desc: "Devolvemos a originalidade e beleza de relógios antigos e peças especiais.",
                  img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: History,
                },
                {
                  title: "Avaliação",
                  desc: "Avaliação profissional para relógios antigos, coleções e peças raras.",
                  img: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Star,
                },
                {
                  title: "Revisão Completa",
                  desc: "Revisão completa do mecanismo para garantir o perfeito funcionamento do relógio.",
                  img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Tool,
                },
                {
                  title: "Troca de Bateria",
                  desc: "Substituição de bateria com técnica e ferramentas adequadas.",
                  img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Smartphone,
                },
                {
                  title: "Ajuste de Pulseira",
                  desc: "Ajuste preciso para máximo conforto e segurança no seu dia a dia.",
                  img: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Tool,
                },
                {
                  title: "Limpeza e Conservação",
                  desc: "Limpeza profissional que mantém a estética e o brilho do seu relógio.",
                  img: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=800",
                  icon: Star,
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card rounded-lg overflow-hidden border border-border/80 shadow-[0_12px_35px_color-mix(in_oklab,var(--foreground)_7%,transparent)] hover:-translate-y-1 hover:border-primary/35 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <motion.img
                      src={service.img}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-7 flex flex-col min-h-[245px]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <service.icon size={20} />
                      </div>
                      <h4 className="text-2xl font-serif text-primary">{service.title}</h4>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {service.desc}
                    </p>

                    <button
                      onClick={() =>
                        window.open(
                          `https://wa.me/5541992399650?text=${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o serviço de ${service.title} do meu relógio.`)}`,
                          "_blank",
                        )
                      }
                      className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest hover:text-primary/80 transition-colors"
                    >
                      <MessageCircle size={14} className="text-primary" />
                      Solicitar via WhatsApp
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Barra de Confiança (Trust Bar) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full bg-card border border-border rounded-lg p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm relative"
            >
              <div className="flex items-center gap-6 lg:pr-12">
                <div className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center text-primary shrink-0">
                  <Shield size={28} />
                </div>
                <p className="text-xl font-serif text-foreground leading-tight">
                  Confiança, precisão e tradição desde o primeiro atendimento.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-12 gap-y-6 w-full lg:w-auto">
                {[
                  { label: "Profissionais qualificados", icon: Star },
                  { label: "Ferramentas de alta precisão", icon: Tool },
                  { label: "Peças originais e selecionadas", icon: Star },
                  { label: "Garantia em todos os serviços", icon: Shield },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon size={18} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Avaliações Section */}
        <section id="avaliações" className="py-32 px-8 bg-secondary">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
              Depoimentos
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              O que nossos clientes dizem
            </h3>
            <div className="flex justify-center items-center gap-2 mb-16">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-foreground font-bold">4,9 ⭐</span>
              <span className="text-muted-foreground/70">• +100 avaliações</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  whileHover={{ y: -10 }}
                  className="bg-background p-8 rounded-xl border border-primary/15 text-left"
                >
                  <div className="flex text-primary mb-4">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-6">"{review.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {review.customer_name[0]}
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold text-sm">{review.customer_name}</h4>
                      {review.is_verified && (
                        <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">
                          Cliente Verificado
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="py-32 px-8 bg-background">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <img
                src={storefrontAsset.url}
                alt="Loja RG Relógios"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover border border-primary/20"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 hidden md:block rounded-lg shadow-lg">
                <span className="block text-4xl font-serif text-primary-foreground mb-1">25+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Anos de Experiência
                </span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">
                Sobre a RG Relógios
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
                Experiência, tradição e paixão pela relojoaria
              </h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed font-light">
                <p>
                  Localizada no coração de Curitiba, a RG Relógios é referência em alta relojoaria,
                  especializada em peças de luxo e relógios antigos.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-widest text-primary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Atendimento Personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Conhecimento Técnico
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Peças Originais
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Garantia em Serviços
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Localização & Contato */}
        <section id="contato" className="py-32 px-8 bg-secondary">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-serif text-primary mb-8">Visite nossa loja</h3>
              <div className="space-y-8 text-foreground/80">
                <div className="flex gap-4">
                  <MapPin className="text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">R. João Antônio Xavier, 420</p>
                    <p>Água Verde, Curitiba - PR, 80620-360</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">Horário de Atendimento</p>
                    <p>Segunda a Sexta: 09h às 18h</p>
                    <p>Sábado: 09h às 13h</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Smartphone className="text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground">WhatsApp & Telefone</p>
                    <p>+55 41 99239-9650</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 h-64 rounded-lg bg-background border border-primary/20 flex items-center justify-center relative overflow-hidden group">
                {/* Visual context instead of active map */}
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all"
                  alt="RG Relógios Storefront"
                />
                <div className="relative z-10 text-center p-6">
                  <MapPin className="text-primary mx-auto mb-4" size={32} />
                  <p className="text-foreground font-bold text-sm tracking-widest uppercase mb-4">
                    Visite nossa loja física
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=RG+Relógios+R.+João+Antônio+Xavier+420+Água+Verde+Curitiba+PR",
                        "_blank",
                      )
                    }
                    className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold text-[10px] tracking-widest uppercase shadow-lg hover:bg-primary/85 transition-colors"
                  >
                    Abrir no GPS
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-background p-10 rounded-xl border border-primary/20">
              <h3 className="text-3xl font-serif text-primary mb-8">Envie uma mensagem</h3>
              {showConfirm ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
                  <CheckCircle2 size={40} className="text-primary" />
                  <p className="text-foreground font-serif text-xl">
                    Mensagem enviada com sucesso!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Em breve retornaremos pelo WhatsApp ou e-mail informado.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Nome"
                      className="w-full p-4 bg-secondary border border-primary/20 rounded text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                    />
                    <input
                      name="whatsapp"
                      required
                      type="text"
                      placeholder="WhatsApp"
                      className="w-full p-4 bg-secondary border border-primary/20 rounded text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-4 bg-secondary border border-primary/20 rounded text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                  />
                  <textarea
                    name="message"
                    placeholder="Mensagem"
                    className="w-full p-4 bg-secondary border border-primary/20 rounded text-foreground min-h-[150px] placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full border border-primary text-primary py-4 rounded font-bold hover:bg-primary/10 transition-all uppercase tracking-[0.2em] text-sm"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
