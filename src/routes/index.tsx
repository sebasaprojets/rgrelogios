import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getReviews } from "@/lib/api.functions";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { OpenStatus } from "@/components/home/LiveClock";
import { Marquee } from "@/components/home/Marquee";
import { CountUp } from "@/components/home/CountUp";
import { Testimonials } from "@/components/home/Testimonials";
import { WatchVideo, type WatchClip } from "@/components/home/WatchVideo";

const STOREFRONT_URL = "/images/loja-rg.jpg";
const HERO_IMAGE_URL = "/images/hero-movado.jpg";
/** Relógios desmontando e montando, tocados em sequência na seção de relógios antigos. */
const WATCH_CLIPS: readonly WatchClip[] = [
  {
    src: "/videos/relogio-desmontando.mp4",
    title: "Relógio de pulso",
    label: "Relógio de pulso sendo desmontado e montado novamente",
  },
  {
    src: "/videos/relogio-parede-desmontando.mp4",
    title: "Relógio de parede",
    label: "Relógio de parede de madeira sendo desmontado e montado novamente",
  },
];
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=RG+Relógios+R.+João+Antônio+Xavier+420+Água+Verde+Curitiba+PR";

export const Route = createFileRoute("/")({
  component: Index,
});

const SERVICES = [
  {
    title: "Manutenção",
    desc: "Preventiva, para prolongar a vida útil e manter a precisão do relógio.",
  },
  {
    title: "Reparação",
    desc: "Diagnóstico e conserto de mecanismos parados, atrasando ou danificados.",
  },
  {
    title: "Restauração",
    desc: "Relógios antigos e de família devolvidos à aparência e ao funcionamento originais.",
  },
  {
    title: "Revisão completa",
    desc: "Desmontagem, limpeza, lubrificação e regulagem de todo o mecanismo.",
  },
  {
    title: "Avaliação",
    desc: "Avaliação profissional de peças antigas, coleções e relógios raros.",
  },
  {
    title: "Bateria e pulseira",
    desc: "Troca de bateria com as ferramentas certas e ajuste de pulseira na hora.",
  },
] as const;

const MARQUEE_ITEMS = [
  "Relógios de pulso",
  "Relógios de bolso",
  "Relógios de parede",
  "Cucos",
  "Relógios de mesa",
  "Peças antigas",
  "Restauração",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
} as const;

function Index() {
  const fetchReviews = useServerFn(getReviews);
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews({ data: undefined }),
  });

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      `Olá! Meu nome é ${form.get("name")}.`,
      String(form.get("message") ?? ""),
    ].filter(Boolean);
    openWhatsApp(lines.join("\n\n"));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1917] antialiased selection:bg-[#C5A059] selection:text-[#14110D]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section
          id="início"
          className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-6 md:px-8 md:pt-40 md:pb-28"
        >
          <div className="absolute inset-0" aria-hidden>
            <motion.img
              src={HERO_IMAGE_URL}
              alt=""
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover object-[72%_center]"
            />
            {/* Clareia o lado do texto sem cobrir o relógio */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/55 lg:bg-gradient-to-r lg:from-white/90 lg:via-white/70 lg:to-transparent xl:via-white/50" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <OpenStatus />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 font-serif text-[clamp(2.4rem,min(calc(8vw+1rem),15svh),5.5rem)] leading-[0.95] tracking-tight sm:mt-8"
              >
                Cuidamos do tempo <br className="hidden sm:block" />
                que <em className="text-[#8A6624]">passa</em> pelas{" "}
                <br className="hidden sm:block" />
                suas mãos.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-6 max-w-md text-base leading-relaxed text-[#1C1917]/65 sm:mt-8 sm:text-lg"
              >
                Venda, manutenção e restauração de relógios clássicos, antigos e contemporâneos no
                Água Verde, em Curitiba.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href="#serviços"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C5A059] px-7 py-3.5 font-medium text-[#14110D] shadow-[0_10px_30px_-10px_rgba(197,160,89,0.7)] transition-colors hover:bg-[#D4B473]"
                >
                  Solicitar orçamento
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="/restauracoes"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1C1917]/15 bg-white/60 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-[#1C1917]/40"
                >
                  Ver restaurações
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex items-center gap-3 text-sm text-[#1C1917]/65 sm:mt-14 sm:gap-4"
              >
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span>
                  <strong className="font-medium text-[#1C1917]">4,9</strong> de média em mais de
                  100 avaliações
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        <Marquee items={MARQUEE_ITEMS} />

        {/* Relógios antigos */}
        <section id="antigos" className="px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:gap-14 lg:grid-cols-2">
            <motion.div
              {...fadeUp}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[4/3] lg:aspect-[4/5] border border-[#1C1917]/10 bg-[#14110D]"
            >
              <WatchVideo clips={WATCH_CLIPS} />
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionEyebrow>Relógios antigos</SectionEyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
                Peças que carregam <em className="text-[#8A6624]">histórias</em>.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg text-[#1C1917]/60">
                Restauramos relógios antigos com respeito à sua origem, mantendo o mecanismo
                original sempre que possível.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:mt-10">
                <a
                  href="/relogios-antigos"
                  className="group inline-flex items-center gap-2 py-2 font-medium underline decoration-[#1C1917] decoration-1 underline-offset-[6px]"
                >
                  Ver a coleção
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <button
                  onClick={() =>
                    openWhatsApp("Olá! Gostaria de um orçamento para restaurar meu relógio antigo.")
                  }
                  className="group inline-flex items-center gap-2 py-2 text-[#1C1917]/70 underline decoration-[#1C1917]/25 decoration-1 underline-offset-[6px] transition-colors hover:text-[#1C1917] hover:decoration-[#1C1917]"
                >
                  Restaurar meu relógio
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Serviços */}
        <section id="serviços" className="bg-[#FAF7F0] px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <motion.div {...fadeUp} className="lg:sticky lg:top-32 lg:self-start">
                <SectionEyebrow>Serviços</SectionEyebrow>
                <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
                  Da troca de bateria à restauração completa.
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[#1C1917]/60">
                  Todo serviço sai da bancada com garantia. Mande uma foto pelo WhatsApp e receba
                  uma estimativa.
                </p>
              </motion.div>

              <ul className="border-t border-[#1C1917]/10">
                {SERVICES.map((service, i) => (
                  <motion.li
                    key={service.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  >
                    <button
                      onClick={() =>
                        openWhatsApp(
                          `Olá! Gostaria de um orçamento de ${service.title.toLowerCase()} para o meu relógio.`,
                        )
                      }
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-[#1C1917]/10 py-7 text-left transition-colors sm:gap-6 md:gap-10"
                    >
                      <span className="pt-2 font-mono text-xs text-[#1C1917]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-serif text-[1.75rem] leading-tight transition-all duration-300 group-hover:text-[#8A6624] sm:text-3xl md:text-4xl [@media(hover:hover)]:group-hover:translate-x-2">
                          {service.title}
                        </span>
                        <span className="mt-2 block max-w-md text-[#1C1917]/60">
                          {service.desc}
                        </span>
                      </span>
                      <span className="mt-1 flex h-10 w-10 shrink-0 items-center sm:h-11 sm:w-11 justify-center rounded-full border border-[#1C1917]/15 transition-all duration-300 group-hover:border-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#14110D]">
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:rotate-45"
                        />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="border-b border-[#1C1917]/10 px-5 py-14 sm:px-6 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#1C1917]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: <CountUp to={25} suffix="+" />, label: "anos de experiência na bancada" },
              { value: <CountUp to={4.9} decimals={1} />, label: "nota média dos clientes" },
              { value: <CountUp to={100} prefix="+" />, label: "avaliações de clientes" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                className="px-1 py-7 sm:px-6 sm:py-2 lg:px-10"
              >
                <p className="font-serif text-[3.25rem] leading-none tracking-tight md:text-7xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#1C1917]/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <Testimonials reviews={reviews} />

        {/* Sobre */}
        <section id="sobre" className="bg-[#FAF7F0] px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 md:gap-16 lg:grid-cols-2">
            <motion.div {...fadeUp} className="relative">
              <img
                src={STOREFRONT_URL}
                alt="Fachada da RG Relógios no Água Verde, Curitiba"
                className="h-[360px] w-full rounded-2xl object-cover sm:h-[480px] md:h-[560px]"
              />
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-[#1C1917]/10 bg-white px-6 py-5 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.3)] md:-right-6 md:left-auto">
                <p className="font-serif text-5xl leading-none">25+</p>
                <p className="mt-1 text-xs text-[#1C1917]/60">anos de experiência</p>
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionEyebrow>Sobre a RG</SectionEyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
                Uma relojoaria de bairro, com <em className="text-[#8A6624]">ofício</em> de alta
                relojoaria.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#1C1917]/60 sm:text-lg">
                No Água Verde, em Curitiba, a RG Relógios atende quem valoriza o próprio relógio, do
                modelo do dia a dia à peça de família.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#1C1917]/10 pt-8">
                {[
                  ["Atendimento", "Personalizado, direto com o relojoeiro"],
                  ["Peças", "Originais e selecionadas"],
                  ["Garantia", "Em todos os serviços"],
                  ["Especialidade", "Relógios antigos e de luxo"],
                ].map(([title, text]) => (
                  <div key={title}>
                    <dt className="text-sm font-medium">{title}</dt>
                    <dd className="mt-1 text-sm text-[#1C1917]/60">{text}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="px-5 py-20 sm:px-6 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 md:gap-16 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <SectionEyebrow>Contato</SectionEyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight">
                Traga seu relógio.
              </h2>

              <div className="mt-10 divide-y md:mt-12 divide-[#1C1917]/10 border-y border-[#1C1917]/10">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 py-5 sm:gap-5 sm:py-6"
                >
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[#8A6624]" />
                  <span className="flex-1">
                    <span className="block font-medium">R. João Antônio Xavier, 420</span>
                    <span className="text-[#1C1917]/60">Água Verde, Curitiba – PR, 80620-360</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#1C1917]/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1C1917]"
                  />
                </a>
                <div className="flex items-start gap-4 py-5 sm:gap-5 sm:py-6">
                  <Clock size={20} className="mt-0.5 shrink-0 text-[#8A6624]" />
                  <span>
                    <span className="block font-medium">Seg a Sex, 09h às 18h</span>
                    <span className="text-[#1C1917]/60">Sábado, 09h às 13h</span>
                  </span>
                </div>
                <a
                  href="https://wa.me/5541992399650"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 py-5 sm:gap-5 sm:py-6"
                >
                  <Phone size={20} className="mt-0.5 shrink-0 text-[#8A6624]" />
                  <span className="flex-1">
                    <span className="block font-medium">+55 41 99239-9650</span>
                    <span className="text-[#1C1917]/60">WhatsApp e telefone</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#1C1917]/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1C1917]"
                  />
                </a>
              </div>
            </motion.div>

            <motion.form
              {...fadeUp}
              onSubmit={handleContact}
              className="rounded-2xl border border-[#1C1917]/10 bg-[#FAF7F0] p-6 sm:p-8 md:p-10"
            >
              <h3 className="font-serif text-3xl">Envie uma mensagem</h3>
              <p className="mt-2 text-sm text-[#1C1917]/60">
                A mensagem abre direto no nosso WhatsApp.
              </p>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium">Nome</span>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-[#1C1917]/10 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-[#1C1917]/30 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/15"
                    placeholder="Seu nome"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Mensagem</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-[#1C1917]/10 bg-white px-4 py-3.5 outline-none transition-colors placeholder:text-[#1C1917]/30 focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/15"
                    placeholder="Qual é o relógio e o que ele precisa?"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1C1917] py-4 font-medium text-white transition-colors hover:bg-[#C5A059] hover:text-[#14110D]"
              >
                Enviar pelo WhatsApp
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
