import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Search, Sparkles, Wrench, X } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Reveal } from "@/components/MotionBits";
import { SiteFooter, SiteHeader, openWhatsApp, SectionEyebrow } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import oratorioAntes from "@/assets/oratorio-antes.jpg.asset.json";
import oratorioDepois from "@/assets/oratorio-depois.jpg.asset.json";
import tokeiAntes from "@/assets/tokei-antes.jpg.asset.json";
import tokeiDepois from "@/assets/tokei-depois.jpg.asset.json";

export const Route = createFileRoute("/restauracoes")({
  head: () => ({ meta: [
    { title: "Restaurações — Antes e Depois | RG Relógios" },
    { name: "description", content: "Veja transformações reais de relógios restaurados pela RG Relógios em Curitiba." },
    { property: "og:title", content: "Restaurações — Antes e Depois | RG Relógios" },
    { property: "og:description", content: "Compare o antes e o depois de restaurações realizadas em nossa oficina." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: RestorationsPage,
});

interface Restoration { readonly id: string; readonly title: string; readonly period: string; readonly service: string; readonly summary: string; readonly initialState: string; readonly result: string; readonly services: readonly string[]; readonly before: string; readonly after: string; }

const RESTORATIONS: readonly Restoration[] = [
  { id: "oratorio-madeira", title: "Relógio de parede em madeira", period: "Peça antiga", service: "Restauração completa da caixa", summary: "A madeira, os vidros e os detalhes torneados recuperaram profundidade e presença sem apagar as marcas da história.", initialState: "Madeira ressecada, verniz oxidado, vidros manchados e detalhes sem brilho.", result: "Madeira recuperada, verniz reaplicado, vidros limpos e detalhes originais preservados.", services: ["Limpeza profunda", "Recuperação do verniz", "Restauração dos detalhes", "Limpeza e ajuste dos vidros"], before: oratorioAntes.url, after: oratorioDepois.url },
  { id: "tokei-monogatari", title: "Relógio octogonal Tokei", period: "Made in Japan", service: "Restauração completa", summary: "Mostrador, caixa e mecanismo foram tratados em conjunto para devolver leitura, equilíbrio e funcionamento à peça.", initialState: "Mostrador escurecido, letras desgastadas, caixa opaca e mecanismo parado.", result: "Mostrador restaurado, filetes dourados refeitos, vidro recuperado e relógio funcionando.", services: ["Restauração do mostrador", "Recuperação dos filetes", "Restauração do vidro", "Limpeza e regulagem"], before: tokeiAntes.url, after: tokeiDepois.url },
];

function RestorationsPage() {
  const [selected, setSelected] = useState<Restoration | null>(null);
  return <div className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <main>
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:pb-24 lg:pt-44"><Reveal className="mx-auto max-w-5xl text-center"><SectionEyebrow>Antes e depois</SectionEyebrow><h1 className="font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">Restaurações que deixam a história à vista.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Compare transformações reais e conheça o cuidado aplicado em cada etapa.</p></Reveal></section>
      <section className="px-5 pb-24 sm:px-8 lg:pb-32"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">{RESTORATIONS.map((item, index) => <Reveal key={item.id} delay={index * .08}><article className="overflow-hidden border border-border bg-card editorial-shadow"><BeforeAfterSlider beforeSrc={item.before} afterSrc={item.after} alt={item.title} className="aspect-[4/5] rounded-none border-0 border-b" /><div className="p-6 sm:p-8"><p className="text-xs uppercase text-primary">{item.period} · {item.service}</p><h2 className="mt-2 font-serif text-3xl">{item.title}</h2><p className="mt-4 leading-7 text-muted-foreground">{item.summary}</p><Button variant="outline" className="mt-6 w-full" onClick={() => setSelected(item)}>Ver detalhes</Button></div></article></Reveal>)}</div></section>
      <section className="bg-surface px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionEyebrow>Nosso método</SectionEyebrow><h2 className="font-serif text-4xl sm:text-5xl">Cuidado em três etapas</h2><div className="mt-12 grid gap-8 md:grid-cols-3">{[{ title: "Avaliação", text: "Exame cuidadoso da peça e de seu estado atual.", icon: Search }, { title: "Intervenção", text: "Execução técnica com respeito aos materiais originais.", icon: Wrench }, { title: "Finalização", text: "Regulagem, testes, acabamento e revisão final.", icon: Sparkles }].map((step, i) => <Reveal key={step.title} delay={i * .08} className="border-t border-primary pt-6"><step.icon className="mb-7 h-6 w-6 text-primary" /><h3 className="font-serif text-3xl">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p></Reveal>)}</div></div></section>
      <section className="px-5 py-24 text-center sm:px-8"><Reveal className="mx-auto max-w-2xl"><h2 className="font-serif text-4xl">Seu relógio pode ser o próximo.</h2><p className="mt-5 leading-7 text-muted-foreground">Envie uma mensagem para solicitar uma avaliação inicial.</p><Button className="mt-8" onClick={() => openWhatsApp("Olá! Gostaria de uma avaliação para restauração do meu relógio.")}><MessageCircle /> Solicitar avaliação</Button></Reveal></section>
    </main>
    <AnimatePresence>{selected && <RestorationDialog item={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    <SiteFooter /><WhatsAppButton message="Olá! Gostaria de uma avaliação para restauração do meu relógio." />
  </div>;
}

function RestorationDialog({ item, onClose }: { item: Restoration; onClose: () => void }) {
  return <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4" role="dialog" aria-modal="true" aria-label={`Detalhes da restauração: ${item.title}`}><motion.button type="button" aria-label="Fechar detalhes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" onClick={onClose} /><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="relative my-10 w-full max-w-3xl bg-card p-6 editorial-shadow sm:p-9"><Button size="icon" variant="ghost" className="absolute right-3 top-3 z-10" onClick={onClose} aria-label="Fechar"><X /></Button><p className="text-xs uppercase text-primary">{item.period}</p><h2 className="mt-2 pr-12 font-serif text-3xl">{item.title}</h2><BeforeAfterSlider beforeSrc={item.before} afterSrc={item.after} alt={item.title} className="mt-7 aspect-[4/5]" /><div className="mt-8 grid gap-6 sm:grid-cols-2"><div><h3 className="text-xs font-bold uppercase text-primary">Estado inicial</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.initialState}</p></div><div><h3 className="text-xs font-bold uppercase text-primary">Resultado</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.result}</p></div></div><ul className="mt-7 grid gap-3 sm:grid-cols-2">{item.services.map((service) => <li key={service} className="flex gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary" />{service}</li>)}</ul><Button className="mt-8 w-full" onClick={() => openWhatsApp(`Olá! Vi a restauração do ${item.title} e gostaria de uma avaliação.`)}><MessageCircle /> Falar sobre esta restauração</Button></motion.div></div>;
}