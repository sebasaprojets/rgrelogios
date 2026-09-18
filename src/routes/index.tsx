import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Clock3, MapPin, MessageCircle, ShieldCheck, Sparkles, Star } from "lucide-react";
import { getProducts, getReviews } from "@/lib/api.functions";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ImageLift, PrecisionCard, Reveal, SoftFloat, TextReveal } from "@/components/MotionBits";
import { WatchPhotoStage } from "@/components/WatchPhotoStage";
import { SiteFooter, SiteHeader, openWhatsApp, SectionEyebrow } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import movadoPoster from "@/assets/movado-clean.jpg.asset.json";
import storefront from "@/assets/storefront.jpeg.asset.json";
import oratorioAntes from "@/assets/oratorio-antes.jpg.asset.json";
import oratorioDepois from "@/assets/oratorio-depois.jpg.asset.json";
import bolsoTissot from "@/assets/bolso-tissot.png.asset.json";
import bolsoEsmaltado from "@/assets/bolso-esmaltado.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RG Relógios | Relógios e Restauração em Curitiba" },
      { name: "description", content: "Relógios selecionados, peças antigas e restauração especializada em Curitiba. Conheça a RG Relógios e fale conosco pelo WhatsApp." },
      { property: "og:title", content: "RG Relógios | Relógios e Restauração em Curitiba" },
      { property: "og:description", content: "Curadoria de relógios e cuidado técnico para peças que atravessam gerações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const CURATED = [
  { id: "curated-1", name: "Tissot Antimagnétique", detail: "Relógio de bolso", image: bolsoTissot.url },
  { id: "curated-2", name: "Clássico esmaltado", detail: "Peça antiga", image: bolsoEsmaltado.url },
  { id: "curated-3", name: "Movado Kingmatic", detail: "Mecânica suíça", image: movadoPoster.url },
] as const;

const SERVICES = [
  { title: "Manutenção", text: "Revisão preventiva, limpeza e regulagem para preservar precisão e vida útil.", icon: Clock3 },
  { title: "Restauração", text: "Recuperação criteriosa de caixa, mostrador e mecanismo, respeitando a história da peça.", icon: Sparkles },
  { title: "Reparos", text: "Diagnóstico técnico e correção de falhas com ferramentas adequadas e acabamento preciso.", icon: ShieldCheck },
] as const;

function HomePage() {
  const fetchProducts = useServerFn(getProducts);
  const fetchReviews = useServerFn(getReviews);
  const { data: products = [] } = useQuery({ queryKey: ["home-products"], queryFn: () => fetchProducts({ data: { featured: true } }) });
  const { data: reviews = [] } = useQuery({ queryKey: ["home-reviews"], queryFn: () => fetchReviews({ data: undefined }) });
  const catalog = products.length > 0 ? products.slice(0, 3).map((product) => ({ id: product.id, name: product.name, detail: product.brand, image: product.images?.[0] ?? movadoPoster.url })) : CURATED;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[92svh] items-end overflow-hidden px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:min-h-[760px]">
          <img src={heroPoster.url} alt="Relógio clássico fotografado em detalhe" className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[pulse_14s_ease-in-out_infinite]" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-foreground/20" />
          <Reveal className="relative mx-auto w-full max-w-7xl text-background">
            <p className="mb-5 text-xs font-bold uppercase text-gold-soft">Curitiba · tradição relojoeira</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] sm:text-6xl lg:text-8xl"><TextReveal delay={0.08}>O tempo merece cuidado.</TextReveal></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-background/80 sm:text-lg">Relógios selecionados, manutenção precisa e restaurações que preservam histórias.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link to="/relogios-antigos">Ver relógios <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-background/60 bg-background/10 text-background hover:bg-background hover:text-foreground"><Link to="/servicos">Conhecer serviços</Link></Button>
            </div>
          </Reveal>
        </section>

        <section className="border-b border-border bg-surface px-5 py-7 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 text-sm sm:grid-cols-3">
            {["Atendimento personalizado", "Especialistas em peças antigas", "Garantia nos serviços"].map((item) => <div key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><SectionEyebrow>Seleção da casa</SectionEyebrow><h2 className="max-w-xl font-serif text-4xl sm:text-5xl">Relógios com presença e história</h2></div>
              <Button asChild variant="outline"><Link to="/relogios-antigos">Explorar galeria <ArrowRight /></Link></Button>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {catalog.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <PrecisionCard className="overflow-hidden border border-border bg-card editorial-shadow">
                    <WatchPhotoStage src={item.image} alt={item.name} className="aspect-[4/5] p-6 sm:p-8" />
                    <div className="flex items-end justify-between p-5"><div><p className="text-xs uppercase text-primary">{item.detail}</p><h3 className="mt-1 font-serif text-2xl">{item.name}</h3></div><ArrowRight className="h-5 w-5 text-primary" /></div>
                  </PrecisionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <Reveal><SectionEyebrow>Antes e depois</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">A beleza do tempo, recuperada.</h2><p className="mt-6 max-w-xl leading-7 text-muted-foreground">Cada restauração começa com uma avaliação cuidadosa e termina com uma peça pronta para atravessar novas gerações.</p><Button asChild className="mt-8" variant="outline"><Link to="/restauracoes">Ver restaurações <ArrowRight /></Link></Button></Reveal>
             <SoftFloat><BeforeAfterSlider beforeSrc={oratorioAntes.url} afterSrc={oratorioDepois.url} alt="Restauração de relógio de parede em madeira" className="aspect-[4/5] editorial-shadow" /></SoftFloat>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12 max-w-2xl"><SectionEyebrow>Oficina especializada</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Precisão em cada serviço</h2><p className="mt-5 leading-7 text-muted-foreground">Do cuidado preventivo à recuperação completa, cada relógio recebe atenção individual.</p></Reveal>
            <div className="grid border-y border-border md:grid-cols-3">
              {SERVICES.map((service, index) => <Reveal key={service.title} delay={index * 0.08} className="border-b border-border p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10"><service.icon className="mb-8 h-6 w-6 text-primary" /><h3 className="font-serif text-3xl">{service.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.text}</p></Reveal>)}
            </div>
            <Button asChild className="mt-10"><Link to="/servicos">Todos os serviços <ArrowRight /></Link></Button>
          </div>
        </section>

        {reviews.length > 0 && <section className="bg-surface px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionEyebrow>Confiança</SectionEyebrow><h2 className="font-serif text-4xl">O que dizem nossos clientes</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.slice(0, 3).map((review) => <blockquote key={review.id} className="border-l border-primary p-6"><div className="mb-4 flex text-primary">{Array.from({ length: Math.floor(review.rating) }).map((_, i) => <Star key={`${review.id}-${i}`} className="h-4 w-4 fill-current" />)}</div><p className="leading-7 text-muted-foreground">“{review.comment}”</p><footer className="mt-5 text-sm font-bold">{review.customer_name}</footer></blockquote>)}</div></div></section>}

        <section className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <ImageLift className="aspect-[5/4] bg-muted"><img src={storefront.url} alt="Fachada da RG Relógios em Curitiba" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></ImageLift>
            <Reveal><SectionEyebrow>RG Relógios</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Atendimento próximo. Trabalho preciso.</h2><p className="mt-6 leading-7 text-muted-foreground">Estamos no Água Verde, em Curitiba, para avaliar, cuidar e orientar sobre o seu relógio.</p><div className="mt-8 space-y-4 text-sm"><p className="flex gap-3"><MapPin className="h-5 w-5 text-primary" />R. João Antônio Xavier, 420 — Água Verde</p><p className="flex gap-3"><Clock3 className="h-5 w-5 text-primary" />Segunda a sexta, 9h às 18h · Sábado, 9h às 13h</p></div><Button className="mt-8" onClick={() => openWhatsApp("Olá! Gostaria de falar com a RG Relógios.")}><MessageCircle /> Falar no WhatsApp</Button></Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}