import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
        content:
          "Compare o antes e o depois das restaurações realizadas em nossa oficina especializada.",
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
  /** Enquadramento de cada foto no comparador (as proporções originais diferem). */
  readonly beforePosition: string;
  readonly afterPosition: string;
}

const RESTORATIONS: readonly Restoration[] = [
  {
    id: "oratorio-madeira",
    title: "Relógio de Parede em Madeira",
    period: "Peça antiga",
    service: "Restauração completa da caixa",
    summary:
      "Caixa chegou coberta de poeira, com verniz desgastado, vidros opacos e acabamento comprometido pelo tempo.",
    initialState:
      "Madeira ressecada, verniz oxidado, vidros manchados e detalhes torneados sem brilho.",
    result:
      "Madeira recuperada, verniz reaplicado, vidros limpos e todos os detalhes originais preservados.",
    services: [
      "Limpeza profunda da madeira",
      "Recuperação do verniz e do brilho",
      "Restauração das colunas e detalhes torneados",
      "Limpeza e ajuste dos vidros",
    ],
    before: "/images/restauracoes/madeira-antes-hd.jpg",
    after: "/images/restauracoes/madeira-depois-hd.jpg",
    beforePosition: "50% 37%",
    afterPosition: "50% 69%",
  },
  {
    id: "tokei-monogatari",
    title: "Relógio Octogonal Tokei",
    period: "Made in Japan",
    service: "Restauração completa",
    summary:
      "Relógio octogonal recebido com mostrador manchado, vidro do pêndulo apagado e caixa sem acabamento.",
    initialState:
      "Mostrador escurecido, letras do vidro desgastadas, caixa opaca e mecanismo parado.",
    result:
      "Mostrador restaurado, filetes dourados refeitos, vidro recuperado e relógio funcionando novamente.",
    services: [
      "Restauração do mostrador",
      "Recuperação dos filetes dourados da caixa",
      "Restauração do vidro do pêndulo",
      "Limpeza e regulagem do mecanismo",
    ],
    before: "/images/restauracoes/tokei-antes-hd.jpg",
    after: "/images/restauracoes/tokei-depois.jpg",
    beforePosition: "50% 100%",
    afterPosition: "50% 50%",
  },
];

const PROCESS_STEPS = [
  { title: "Avaliação", desc: "Análise completa do relógio." },
  { title: "Diagnóstico", desc: "Identificação dos componentes e serviços necessários." },
  { title: "Restauração", desc: "Execução dos reparos com cuidado e precisão." },
  { title: "Regulagem", desc: "Ajustes do mecanismo e testes." },
  { title: "Finalização", desc: "Limpeza, acabamento e revisão final." },
  { title: "Entrega", desc: "Relógio pronto para voltar ao pulso do cliente." },
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
} as const;

function RestorationsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1917] antialiased selection:bg-[#C5A059] selection:text-[#14110D]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="px-5 pt-32 pb-12 sm:px-6 md:px-8 md:pt-44 md:pb-24">
          <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionEyebrow>Antes e depois</SectionEyebrow>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 font-serif text-[clamp(2.4rem,min(calc(8vw+1rem),15svh),5.5rem)] leading-[0.95] tracking-tight"
              >
                Restaurando histórias, <em className="text-[#8A6624]">detalhe</em> por detalhe.
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-[#1C1917]/60 md:text-lg"
            >
              Relógios que chegaram até nós precisando de cuidado e ganharam uma nova vida. Arraste
              o divisor em cada foto para comparar.
            </motion.p>
          </div>
        </section>

        {/* Antes e depois */}
        <section className="px-5 pb-20 sm:px-6 md:px-8 md:pb-32">
          <div className="mx-auto max-w-7xl space-y-16 md:space-y-32">
            {RESTORATIONS.map((item, index) => (
              <motion.article
                key={item.id}
                {...fadeUp}
                className="grid items-center gap-8 border-t border-[#1C1917]/10 pt-10 md:gap-10 md:pt-12 lg:grid-cols-2 lg:gap-20"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <BeforeAfterSlider
                    beforeSrc={item.before}
                    afterSrc={item.after}
                    alt={item.title}
                    beforePosition={item.beforePosition}
                    afterPosition={item.afterPosition}
                    className="mx-auto aspect-[9/14] w-full max-w-[calc(82vh*9/14)] rounded-2xl border border-[#1C1917]/10"
                  />
                </div>

                <div>
                  <p className="font-mono text-xs text-[#1C1917]/40">
                    {String(index + 1).padStart(2, "0")} — {item.period}
                  </p>
                  <h2 className="mt-4 font-serif text-[clamp(2rem,7vw,3rem)] leading-[1.05] tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#8A6624]">{item.service}</p>
                  <p className="mt-6 text-base leading-relaxed text-[#1C1917]/60 md:text-lg">
                    {item.summary}
                  </p>

                  <dl className="mt-10 grid gap-6 border-t border-[#1C1917]/10 pt-8 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium">Como chegou</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[#1C1917]/60">
                        {item.initialState}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium">Como saiu</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[#1C1917]/60">
                        {item.result}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-8 space-y-3 border-t border-[#1C1917]/10 pt-8">
                    {item.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-3 text-sm text-[#1C1917]/70"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] text-[#8A6624]">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        {service}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      openWhatsApp(
                        `Olá! Vi a restauração do ${item.title} no site e gostaria de uma avaliação para o meu relógio.`,
                      )
                    }
                    className="group mt-8 inline-flex items-center gap-2 md:mt-10 py-2 font-medium underline decoration-[#1C1917] decoration-1 underline-offset-[6px]"
                  >
                    Quero restaurar o meu
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Processo */}
        <section className="bg-[#FAF7F0] px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <SectionEyebrow>Método de trabalho</SectionEyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
                Do diagnóstico à entrega.
              </h2>
            </motion.div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-[#1C1917]/10 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.05 }}
                  className="bg-white p-6 sm:p-8 md:p-10"
                >
                  <span className="font-mono text-xs text-[#8A6624]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1C1917]/60">{step.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA final */}
        <section className="px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <motion.div
            {...fadeUp}
            className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-y border-[#1C1917]/10 py-12 md:gap-10 md:py-16 lg:flex-row lg:items-end"
          >
            <h2 className="max-w-2xl font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
              Seu relógio também pode ganhar uma <em className="text-[#8A6624]">nova história</em>.
            </h2>
            <button
              onClick={() =>
                openWhatsApp("Olá! Gostaria de uma avaliação para restauração do meu relógio.")
              }
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C5A059] px-7 py-3.5 font-medium text-[#14110D] shadow-[0_10px_30px_-10px_rgba(197,160,89,0.7)] transition-colors hover:bg-[#D4B473]"
            >
              Pedir avaliação no WhatsApp
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
