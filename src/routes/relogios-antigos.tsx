import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Watch } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/relogios-antigos")({
  head: () => ({
    meta: [
      { title: "Galeria de Relógios Antigos | RG Relógios" },
      {
        name: "description",
        content:
          "Galeria de fotografias de relógios antigos, peças clássicas e mecanismos históricos preservados pela RG Relógios.",
      },
      { property: "og:title", content: "Galeria de Relógios Antigos | RG Relógios" },
      {
        property: "og:description",
        content: "Fotografias de relógios antigos e peças clássicas preservadas pela RG Relógios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VintageGalleryPage,
});

interface GalleryPhoto {
  readonly id: string;
  readonly src: string;
  /** Fotos adicionais da mesma peça, exibidas como miniaturas na ampliação. */
  readonly extra?: readonly string[];
  readonly caption: string;
  readonly era: string;
  readonly group: string;
}

const ALL = "Todas";
const ANTIQUE = "Antigos";

const PHOTOS: readonly GalleryPhoto[] = [
  {
    id: "casio-edifice",
    src: "/images/galeria/casio-edifice-pedestal.jpg",
    caption: "Casio Edifice — mostrador azul e pulseira de aço",
    era: "Relógio de pulso",
    group: "Pulso",
  },
  {
    id: "orient-chronograph",
    src: "/images/galeria/orient-chronograph-pedestal.jpg",
    caption: "Orient Chronograph — mostrador azul e pulseira de couro",
    era: "Relógio de pulso",
    group: "Pulso",
  },
  {
    id: "p4",
    src: "/images/galeria/cronografo-vintage-pedestal.jpg",
    caption: "Coroa e lateral polidas à mão",
    era: "Década de 1940",
    group: "Pulso",
  },
  {
    id: "p5",
    src: "/images/galeria/rolex-deepsea-pedra2.jpg",
    caption: "Peça de corda manual em ouro plaqué",
    era: "Década de 1940",
    group: "Pulso",
  },
  {
    id: "b1",
    src: "/images/galeria/bolso-tissot.jpg",
    caption: "Tissot Antimagnétique — caixa em ouro plaqué com corrente",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "b2",
    src: "/images/galeria/bolso-esmaltado.jpg",
    caption: "Bolso esmaltado com numerais romanos e pintura floral",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "b3",
    src: "/images/galeria/bolso-dourado.jpg",
    caption: "Sant. Bara dourado — tampa com águia em alto-relevo e brasão no mostrador",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "p9",
    src: "/images/galeria/relogio-azul-sapphire-pedra2.jpg",
    caption: "Cronógrafo clássico em detalhe",
    era: "Década de 1960",
    group: "Pulso",
  },
  {
    id: "mesa-madeira",
    src: "/images/galeria/relogio-mesa-loja.jpg",
    caption: "Relógio de mesa em madeira — caixa ondulada e mostrador com numerais arábicos",
    era: "Relógio de mesa",
    group: ANTIQUE,
  },
  {
    id: "w1",
    src: "/images/galeria/cuco-entalhado.jpg",
    caption: "Cuco entalhado em madeira com pássaro e folhagens",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
  {
    id: "w2",
    src: "/images/galeria/parede-eska.jpg",
    caption: "Eska em madeira clara — mostrador dourado e pêndulo",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
  {
    id: "w4",
    src: "/images/galeria/parede-colunas.jpg",
    caption: "Caixa em madeira escura com colunas torneadas e pêndulo",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
];

function VintageGalleryPage() {
  const [group, setGroup] = useState(ALL);
  const [index, setIndex] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  // Fotos que falharam ao carregar mostram um quadro "Foto em breve" em vez do ícone quebrado.
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const touchStartX = useRef<number | null>(null);

  const groups = useMemo(() => Array.from(new Set([ALL, ...PHOTOS.map((p) => p.group)])), []);
  const photos = useMemo(() => {
    if (group === ALL) return PHOTOS;
    return PHOTOS.filter((p) => p.group === group);
  }, [group]);

  const markFailed = (id: string) =>
    setFailed((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  const current = index === null ? null : (photos[index] ?? null);
  const shots = current ? [current.src, ...(current.extra ?? [])] : [];

  const go = (step: number) => {
    setShot(0);
    setIndex((prev) => {
      if (prev === null) return prev;
      return (prev + step + photos.length) % photos.length;
    });
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // Trava a rolagem da página enquanto a foto está ampliada.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, photos.length]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1C1917] antialiased selection:bg-[#C5A059] selection:text-[#14110D]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="px-5 pt-32 pb-12 sm:px-6 md:px-8 md:pt-44 md:pb-16">
          <div className="mx-auto grid max-w-7xl items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div>
              <SectionEyebrow>Galeria histórica</SectionEyebrow>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 font-serif text-[clamp(2.4rem,min(calc(8vw+1rem),15svh),5.5rem)] leading-[0.95] tracking-tight md:mt-8"
              >
                Relógios que atravessaram <em className="text-[#8A6624]">gerações</em>.
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-md text-base leading-relaxed text-[#1C1917]/60 md:text-lg"
            >
              Peças antigas que passaram pela nossa bancada — mostradores, caixas e mecanismos
              preservados com respeito à sua origem.
            </motion.p>
          </div>
        </section>

        {/* Filtro: rola na horizontal no celular, quebra linha em telas maiores */}
        <section className="sticky top-[68px] z-30 border-y border-[#1C1917]/10 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-6 md:flex-wrap md:px-8 [&::-webkit-scrollbar]:hidden">
            {groups.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setGroup(item);
                  setIndex(null);
                }}
                aria-pressed={group === item}
                className={`h-10 shrink-0 rounded-full border px-4 text-sm transition-colors ${
                  group === item
                    ? "border-[#1C1917] bg-[#1C1917] text-white"
                    : "border-[#1C1917]/15 text-[#1C1917]/70 hover:border-[#1C1917]/40 hover:text-[#1C1917]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Grade de fotos */}
        <section className="px-5 pt-10 pb-24 sm:px-6 md:px-8 md:pt-14 md:pb-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, i) => (
              <motion.article
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShot(0);
                    setIndex(i);
                  }}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#FAF7F0] focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:outline-none"
                >
                  {failed.has(photo.id) ? (
                    <PhotoPlaceholder />
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      decoding="async"
                      onError={() => markFailed(photo.id)}
                      // Se a foto falhou antes da hidratação, o onError não dispara: confere aqui.
                      ref={(el) => {
                        if (el?.complete && el.naturalWidth === 0) markFailed(photo.id);
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </button>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#8A6624]">{photo.era}</p>
                    <p className="mt-1 leading-snug text-[#1C1917]/85">{photo.caption}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        `Olá! Gostaria de saber mais sobre este relógio: ${photo.caption} (${photo.era}).`,
                      )
                    }
                    aria-label={`Perguntar no WhatsApp sobre: ${photo.caption}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1C1917]/15 transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#14110D]"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mx-auto mt-20 flex max-w-7xl flex-col items-start justify-between gap-6 border-y border-[#1C1917]/10 py-12 md:mt-28 md:flex-row md:items-center">
            <p className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">
              Procura uma peça específica? Consultamos a disponibilidade para você.
            </p>
            <button
              onClick={() =>
                openWhatsApp("Olá! Gostaria de saber quais relógios estão disponíveis.")
              }
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C5A059] px-7 py-3.5 font-medium text-[#14110D] shadow-[0_10px_30px_-10px_rgba(197,160,89,0.7)] transition-colors hover:bg-[#D4B473]"
            >
              Consultar disponibilidade
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0C0A09]/95 text-white backdrop-blur-sm"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
              <span className="font-mono text-xs text-white/50">
                {(index ?? 0) + 1} / {photos.length}
              </span>
              <button
                onClick={() => setIndex(null)}
                aria-label="Fechar"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIndex(null);
              }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0]?.clientX;
                if (touchStartX.current === null || endX === undefined) return;
                const dx = endX - touchStartX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touchStartX.current = null;
              }}
            >
              {shot === 0 && failed.has(current.id) ? (
                <div className="aspect-[4/5] h-full max-h-full max-w-full overflow-hidden rounded-xl">
                  <PhotoPlaceholder dark />
                </div>
              ) : (
                <img
                  key={shots[shot]}
                  src={shots[shot] ?? current.src}
                  alt={current.caption}
                  onError={() => {
                    if (shot === 0) markFailed(current.id);
                  }}
                  className="max-h-full max-w-full rounded-xl object-contain"
                />
              )}

              <button
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="absolute left-4 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:flex"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Próxima foto"
                className="absolute right-4 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:flex"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {shots.length > 1 && (
              <div className="flex justify-center gap-3 pt-4">
                {shots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-opacity ${
                      shot === i
                        ? "border-[#C5A059]"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-6">
              <div>
                <p className="text-xs text-[#D4B473]">{current.era}</p>
                <p className="mt-1 text-white/90">{current.caption}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Foto anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:hidden"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Próxima foto"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:hidden"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() =>
                    openWhatsApp(
                      `Vi esta peça na galeria de relógios antigos: ${current.caption} (${current.era}).`,
                    )
                  }
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#C5A059] px-5 text-sm font-medium text-[#14110D] transition-colors hover:bg-[#D4B473] sm:flex-none"
                >
                  Falar sobre esta peça
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}

/** Quadro exibido quando a foto da peça não carrega. */
function PhotoPlaceholder({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
        dark ? "bg-white/5 text-white/60" : "bg-[#FAF7F0] text-[#1C1917]/45"
      }`}
    >
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border ${
          dark ? "border-white/15 text-[#D4B473]" : "border-[#C5A059]/40 text-[#8A6624]"
        }`}
      >
        <Watch size={24} strokeWidth={1.5} />
      </span>
      <span className="text-sm">Foto em breve</span>
    </span>
  );
}
