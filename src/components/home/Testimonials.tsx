import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { CountUp } from "@/components/home/CountUp";
import { openWhatsApp } from "@/components/SiteChrome";

export interface Testimonial {
  readonly id: string;
  readonly customer_name: string;
  readonly comment: string | null;
  readonly rating: number;
  readonly is_verified: boolean | null;
}

const AUTOPLAY_MS = 7000;

/** Faixa escura de depoimentos: nota em destaque + carrossel com autoplay, swipe e teclado. */
export function Testimonials({ reviews }: { reviews: readonly Testimonial[] }) {
  const items = reviews.filter((r) => r.comment?.trim()).slice(0, 8);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // reinicia a barra de progresso a cada troca
  const cardRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setActive(((next % items.length) + items.length) % items.length);
      setCycle((c) => c + 1);
    },
    [items.length],
  );
  const next = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  const autoplay = !paused && !reduceMotion && items.length > 1;
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, next, cycle]);

  if (items.length === 0) return null;
  const review = items[active];
  if (!review) return null;

  return (
    <section
      id="avaliações"
      className="relative overflow-hidden bg-[#14110D] px-5 py-20 text-white sm:px-6 md:px-8 md:py-32"
    >
      {/* Brilho dourado de fundo, bem sutil */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#C5A059]/[0.08] blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        {/* Resumo da nota */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
            Depoimentos
          </span>
          <h2 className="mt-6 font-serif text-[clamp(2.1rem,min(8vw,13svh),3.75rem)] leading-[1.02] tracking-tight text-balance">
            Quem já confiou o relógio à <em className="text-[#D4B473]">RG</em>.
          </h2>

          <div className="mt-10 flex items-end gap-5 border-t border-white/10 pt-8">
            <p className="font-serif text-[5.5rem] leading-[0.8] tracking-tight text-[#D4B473] md:text-[7rem]">
              <CountUp to={4.9} decimals={1} />
            </p>
            <div className="pb-1">
              <div className="flex gap-0.5 text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    <Star size={20} fill="currentColor" strokeWidth={0} />
                  </motion.span>
                ))}
              </div>
              <p className="mt-2 text-sm text-white/60">
                de média em mais de{" "}
                <strong className="font-medium text-white">100 avaliações</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              openWhatsApp("Olá! Vi as avaliações no site e gostaria de levar meu relógio à RG.")
            }
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-7 py-3.5 font-medium text-[#14110D] shadow-[0_10px_40px_-10px_rgba(197,160,89,0.6)] transition-colors hover:bg-[#D4B473]"
          >
            Seja o próximo cliente
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Carrossel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={cardRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") next();
              if (e.key === "ArrowLeft") prev();
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onMouseMove={(e) => {
              // Holofote dourado que acompanha o cursor.
              const el = cardRef.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--x", `${e.clientX - r.left}px`);
              el.style.setProperty("--y", `${e.clientY - r.top}px`);
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] sm:p-10 md:p-12"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(197,160,89,0.14), transparent 60%)",
              }}
              aria-hidden
            />

            <Quote
              className="relative h-12 w-12 text-[#C5A059] md:h-14 md:w-14"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden
            />

            <div
              className="relative mt-6 min-h-[11rem] sm:min-h-[10rem] md:min-h-[12rem]"
              // Não anuncia a cada troca automática; só quando a pessoa navega.
              aria-live={autoplay ? "off" : "polite"}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={review.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: reduceMotion ? 0 : d * 40 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: reduceMotion ? 0 : d * -40 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  drag={items.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) next();
                    else if (info.offset.x > 60) prev();
                  }}
                  className="cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <blockquote className="font-serif text-[clamp(1.6rem,5vw,2.6rem)] leading-[1.15] tracking-tight text-white">
                    {review.comment}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4B473] to-[#A67C2E] font-serif text-xl text-[#14110D]">
                      {review.customer_name[0]}
                    </span>
                    <span>
                      <span className="block font-medium">{review.customer_name}</span>
                      <span className="mt-0.5 flex items-center gap-2 text-sm text-white/50">
                        <span className="flex text-[#C5A059]">
                          {[...Array(Math.round(review.rating))].map((_, j) => (
                            <Star key={j} size={12} fill="currentColor" strokeWidth={0} />
                          ))}
                        </span>
                        {review.is_verified && "Cliente verificado"}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {items.length > 1 && (
              <div className="relative mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
                {/* Indicadores com barra de progresso do autoplay */}
                <div className="flex flex-1 gap-2">
                  {items.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(i, i > active ? 1 : -1)}
                      aria-label={`Ver depoimento de ${item.customer_name}`}
                      aria-current={i === active}
                      className="group/dot flex h-11 min-w-8 flex-1 items-center"
                    >
                      <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-white/15 transition-colors group-hover/dot:bg-white/30">
                        {i < active && <span className="absolute inset-0 bg-[#C5A059]/60" />}
                        {i === active && (
                          <span
                            key={cycle}
                            className="absolute inset-y-0 left-0 bg-[#C5A059]"
                            style={
                              autoplay
                                ? {
                                    animation: `testimonial-progress ${AUTOPLAY_MS}ms linear forwards`,
                                  }
                                : { width: "100%" }
                            }
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    aria-label="Depoimento anterior"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#14110D]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Próximo depoimento"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#14110D]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-xs text-white/40 sm:text-left">
            {active + 1} de {items.length}
            <span className="hidden [@media(pointer:coarse)]:inline"> · arraste para o lado</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
