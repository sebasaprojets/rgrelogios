import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Search, ClipboardList, PenTool, Gauge, Sparkles, PackageCheck, CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import oratorioAntes from "@/assets/oratorio-antes.jpg.asset.json";
import oratorioDepois from "@/assets/oratorio-depois.jpg.asset.json";
import tokeiAntes from "@/assets/tokei-antes.jpg.asset.json";
import tokeiDepois from "@/assets/tokei-depois.jpg.asset.json";

export const Route = createFileRoute("/restauracoes")({
  head: () => ({
    meta: [
      { title: "Restaurações — Antes e Depois | RG Relógios" },
      {
        name: "description",
        content:
          "Veja transformações reais de relógios restaurados pela RG Relógios: limpeza de mecanismo, polimento de caixa, restauração de mostrador e regulagem.",
      },
      { property: "og:title", content: "Restaurações — Antes e Depois | RG Relógios" },
      {
        property: "og:description",
        content: "Compare o antes e o depois das restaurações realizadas em nossa oficina especializada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestorationsPage,
});

interface Restoration {
  readonly id: string;
  readonly title: string;
  readonly period: string;
  readonly service: string;
  readonly summary: string;
  readonly initialState: string;
  readonly result: string;
  readonly services: readonly string[];
  readonly before: string;
  readonly after: string;
  readonly process: readonly string[];
}

const RESTORATIONS: readonly Restoration[] = [
  {
    id: "oratorio-madeira",
    title: "Relógio de Parede em Madeira",
    period: "Peça antiga",
    service: "Restauração completa da caixa",
    summary:
      "Caixa chegou coberta de poeira, com verniz desgastado, vidros opacos e acabamento comprometido pelo tempo.",
    initialState: "Madeira ressecada, verniz oxidado, vidros manchados e detalhes torneados sem brilho.",
    result: "Madeira recuperada, verniz reaplicado, vidros limpos e todos os detalhes originais preservados.",
    services: [
      "Limpeza profunda da madeira",
      "Recuperação do verniz e do brilho",
      "Restauração das colunas e detalhes torneados",
      "Limpeza e ajuste dos vidros",
    ],
    before: oratorioAntes.url,
    after: oratorioDepois.url,
    process: [oratorioAntes.url, oratorioDepois.url],
  },
  {
    id: "tokei-monogatari",
    title: "Relógio Octogonal Tokei",
    period: "Made in Japan",
    service: "Restauração completa",
    summary:
      "Relógio octogonal recebido com mostrador manchado, vidro do pêndulo apagado e caixa sem acabamento.",
    initialState: "Mostrador escurecido, letras do vidro desgastadas, caixa opaca e mecanismo parado.",
    result: "Mostrador restaurado, filetes dourados refeitos, vidro recuperado e relógio funcionando novamente.",
    services: [
      "Restauração do mostrador",
      "Recuperação dos filetes dourados da caixa",
      "Restauração do vidro do pêndulo",
      "Limpeza e regulagem do mecanismo",
    ],
    before: tokeiAntes.url,
    after: tokeiDepois.url,
    process: [tokeiAntes.url, tokeiDepois.url],
  },
];

const PROCESS_STEPS = [
  { number: "01", title: "Avaliação", desc: "Análise completa do relógio.", icon: Search },
  { number: "02", title: "Diagnóstico", desc: "Identificação dos componentes e serviços necessários.", icon: ClipboardList },
  { number: "03", title: "Restauração", desc: "Execução dos reparos com cuidado e precisão.", icon: PenTool },
  { number: "04", title: "Regulagem", desc: "Ajustes do mecanismo e testes.", icon: Gauge },
  { number: "05", title: "Finalização", desc: "Limpeza, acabamento e revisão final.", icon: Sparkles },
  { number: "06", title: "Entrega", desc: "Relógio pronto para voltar ao pulso do cliente.", icon: PackageCheck },
] as const;

function RestorationsPage() {
  const [selected, setSelected] = useState<Restoration | null>(null);

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative pt-44 pb-28 px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Relojoeiro restaurando um relógio"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00050A]/95 via-[#00050A]/85 to-[#00050A]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <SectionEyebrow>Antes e depois</SectionEyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-[#C5A059]"
            >
              Restaurando histórias, detalhe por detalhe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#E5D3B3]/70 text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              Veja algumas das transformações realizadas em relógios que chegaram até nós precisando de
              cuidado e ganharam uma nova vida através de um trabalho preciso e especializado.
            </motion.p>
          </div>
        </section>

        {/* Galeria Antes e Depois */}
        <section className="px-8 pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {RESTORATIONS.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0A101A] border border-[#C5A059]/15 rounded-lg overflow-hidden hover:border-[#C5A059]/40 transition-all duration-500 flex flex-col"
              >
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={item.title}
                  className="aspect-[3/4] rounded-none border-0 border-b border-[#C5A059]/15"
                />

                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h2 className="text-2xl font-serif text-[#C5A059]">{item.title}</h2>
                    <p className="text-xs text-[#E5D3B3]/50 mt-1">
                      {item.period} · {item.service}
                    </p>
                  </div>

                  <p className="text-sm text-[#E5D3B3]/60 leading-relaxed flex-1">{item.summary}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E5D3B3]/60">
                    {item.services.slice(0, 4).map((service) => (
                      <li key={service} className="flex gap-2">
                        <CheckCircle2 size={13} className="text-[#C5A059] shrink-0 mt-0.5" />
                        {service}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelected(item)}
                    className="w-full border border-[#C5A059]/50 text-[#C5A059] py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#00050A] transition-all"
                  >
                    Ver restauração
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Nosso processo */}
        <section className="py-32 px-8 bg-[#0A101A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <SectionEyebrow>Método de trabalho</SectionEyebrow>
              <h2 className="text-4xl md:text-5xl font-serif text-[#C5A059]">Nosso processo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#00050A] border border-[#C5A059]/15 rounded-lg p-8 space-y-4 hover:border-[#C5A059]/40 transition-all duration-500"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#C5A059]">{step.number}</span>
                    <step.icon size={20} className="text-[#C5A059]/70" />
                  </div>
                  <h3 className="text-xl font-serif text-[#E5D3B3]">{step.title}</h3>
                  <p className="text-sm text-[#E5D3B3]/60 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-32 px-8 bg-[#00050A]">
          <div className="max-w-4xl mx-auto text-center space-y-8 border border-[#C5A059]/20 rounded-lg p-12 bg-[#0A101A]">
            <h2 className="text-3xl md:text-5xl font-serif text-[#C5A059]">
              Seu relógio também pode ganhar uma nova história.
            </h2>
            <p className="text-[#E5D3B3]/70 leading-relaxed max-w-2xl mx-auto">
              Se você possui um relógio antigo, danificado ou que precisa de manutenção, entre em contato
              conosco para uma avaliação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#serviços"
                className="bg-[#C5A059] text-[#00050A] px-8 py-4 rounded font-bold tracking-wide hover:bg-[#D4B473] transition-all"
              >
                Solicitar avaliação
              </a>
              <button
                onClick={() => openWhatsApp("Olá! Gostaria de uma avaliação para restauração do meu relógio.")}
                className="border border-[#C5A059]/50 text-[#C5A059] px-8 py-4 rounded font-bold tracking-wide hover:bg-[#C5A059]/10 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Falar pelo WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selected && <RestorationModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}

function RestorationModal({ item, onClose }: { item: Restoration; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl my-12 bg-[#0A101A] border border-[#C5A059]/30 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#E5D3B3]/50 hover:text-[#C5A059]"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-serif text-[#C5A059]">{item.title}</h2>
            <p className="text-sm text-[#E5D3B3]/50 mt-1">
              {item.period} · {item.service}
            </p>
          </div>

          <BeforeAfterSlider beforeSrc={item.before} afterSrc={item.after} alt={item.title} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Estado inicial</h3>
              <p className="text-[#E5D3B3]/70 leading-relaxed">{item.initialState}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Resultado final</h3>
              <p className="text-[#E5D3B3]/70 leading-relaxed">{item.result}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">Serviços executados</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#E5D3B3]/70">
              {item.services.map((service) => (
                <li key={service} className="flex gap-2">
                  <CheckCircle2 size={14} className="text-[#C5A059] shrink-0 mt-1" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {item.process.map((src) => (
              <img
                key={src}
                src={src}
                alt={`Processo de restauração — ${item.title}`}
                className="w-full h-48 object-cover rounded-lg border border-[#C5A059]/15"
              />
            ))}
          </div>

          <button
            onClick={() => openWhatsApp(`Olá! Vi a restauração do ${item.title} e gostaria de uma avaliação.`)}
            className="w-full bg-[#C5A059] text-[#00050A] py-4 rounded font-bold uppercase text-xs tracking-widest hover:bg-[#D4B473] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Falar pelo WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
}
