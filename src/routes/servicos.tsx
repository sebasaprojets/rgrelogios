import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, MessageCircle, Search, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/MotionBits";
import { SiteFooter, SiteHeader, openWhatsApp, SectionEyebrow } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import movadoPoster from "@/assets/movado-clean.jpg.asset.json";

export const Route = createFileRoute("/servicos")({
  head: () => ({ meta: [
    { title: "Serviços de Relojoaria em Curitiba | RG Relógios" },
    { name: "description", content: "Manutenção, restauração, reparos, troca de bateria e avaliação profissional de relógios em Curitiba." },
    { property: "og:title", content: "Serviços de Relojoaria | RG Relógios" },
    { property: "og:description", content: "Cuidado técnico para relógios clássicos, contemporâneos e antigos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ServicesPage,
});

const SERVICES = [
  { title: "Manutenção completa", text: "Desmontagem, limpeza, lubrificação, montagem, regulagem e testes de funcionamento.", icon: Clock3 },
  { title: "Restauração", text: "Recuperação criteriosa de relógios antigos, preservando identidade, materiais e detalhes originais.", icon: Sparkles },
  { title: "Reparos técnicos", text: "Diagnóstico e correção de falhas mecânicas ou eletrônicas com ferramentas de precisão.", icon: Wrench },
  { title: "Troca de bateria", text: "Substituição segura, verificação de vedação e testes básicos de funcionamento.", icon: ShieldCheck },
  { title: "Ajuste e conservação", text: "Ajuste de pulseira, limpeza externa e orientações para manter a peça bem conservada.", icon: Check },
  { title: "Avaliação profissional", text: "Análise do estado, características e necessidades de manutenção ou restauração da peça.", icon: Search },
] as const;

function ServicesPage() {
  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="relative min-h-[70svh] overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
        <img src={movadoPoster.url} alt="Mecanismo de relógio em bancada especializada" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/15" />
        <Reveal className="relative mx-auto max-w-7xl text-background">
          <p className="mb-5 text-xs font-bold uppercase text-gold-soft">Oficina RG Relógios</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">Cuidado técnico para cada movimento.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-background/80">Manutenção, restauração e reparos conduzidos com método, transparência e atenção à história de cada relógio.</p>
          <Button className="mt-8" onClick={() => openWhatsApp("Olá! Gostaria de solicitar uma avaliação para o meu relógio.")}><MessageCircle /> Solicitar avaliação</Button>
        </Reveal>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><Reveal className="max-w-2xl"><SectionEyebrow>Serviços</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Da revisão ao restauro completo</h2><p className="mt-5 leading-7 text-muted-foreground">O serviço indicado é definido somente após uma avaliação cuidadosa da peça.</p></Reveal><div className="mt-14 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">{SERVICES.map((service, index) => <Reveal key={service.title} delay={(index % 3) * .07} className="min-h-64 border-b border-r border-border p-7 lg:p-9"><service.icon className="mb-10 h-6 w-6 text-primary" /><h2 className="font-serif text-2xl">{service.title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.text}</p></Reveal>)}</div></div></section>

      <section className="bg-surface px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionEyebrow>Como funciona</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Um processo claro, do início ao fim</h2><div className="mt-14 grid gap-8 md:grid-cols-4">{["Avaliação da peça", "Diagnóstico e orçamento", "Execução e regulagem", "Testes e entrega"].map((step, i) => <Reveal key={step} delay={i * .08}><span className="text-sm text-primary">0{i + 1}</span><div className="mt-4 border-t border-primary pt-5 font-serif text-2xl">{step}</div></Reveal>)}</div></div></section>

      <section className="px-5 py-24 text-center sm:px-8 lg:py-32"><Reveal className="mx-auto max-w-3xl"><SectionEyebrow>Atendimento personalizado</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Conte-nos o que o seu relógio precisa.</h2><p className="mx-auto mt-6 max-w-xl leading-7 text-muted-foreground">Envie uma mensagem para uma primeira orientação e combine a avaliação da peça.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={() => openWhatsApp("Olá! Gostaria de solicitar um orçamento para o meu relógio.")}><MessageCircle /> Pedir orçamento</Button><Button asChild variant="outline"><Link to="/restauracoes">Ver restaurações <ArrowRight /></Link></Button></div></Reveal></section>
    </main>
    <SiteFooter /><WhatsAppButton message="Olá! Gostaria de solicitar um orçamento para o meu relógio." />
  </div>;
}