import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { PrecisionCard, Reveal, TextReveal } from "@/components/MotionBits";
import { WatchPhotoStage } from "@/components/WatchPhotoStage";
import bolsoTissot from "@/assets/bolso-tissot.png.asset.json";
import bolsoEsmaltado from "@/assets/bolso-esmaltado.png.asset.json";
import bolsoSantBara from "@/assets/bolso-santbara.png.asset.json";
import bolsoAguia from "@/assets/bolso-aguia.png.asset.json";
import paredeCuco from "@/assets/parede-img_4432.jpeg.asset.json";
import paredeEska from "@/assets/parede-img_4428.jpeg.asset.json";
import paredeColunas from "@/assets/parede-img_4431.jpeg.asset.json";

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
    id: "p1",
    src: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Mostrador clássico em aço",
    era: "Década de 1960",
    group: "Pulso",
  },
  {
    id: "p2",
    src: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Detalhe de ponteiros e índices",
    era: "Década de 1950",
    group: "Pulso",
  },
  {
    id: "p3",
    src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Caixa com pátina natural",
    era: "Década de 1950",
    group: "Pulso",
  },
  {
    id: "p4",
    src: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Coroa e lateral polidas à mão",
    era: "Década de 1940",
    group: "Pulso",
  },
  {
    id: "p5",
    src: "https://images.pexels.com/photos/364822/rolex-watch-time-luxury-364822.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Peça de corda manual em ouro plaqué",
    era: "Década de 1940",
    group: "Pulso",
  },
  {
    id: "b1",
    src: bolsoTissot.url,
    caption: "Tissot Antimagnétique — caixa em ouro plaqué com corrente",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "b2",
    src: bolsoEsmaltado.url,
    caption: "Bolso esmaltado com numerais romanos e pintura floral",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "b3",
    src: bolsoSantBara.url,
    extra: [bolsoAguia.url],
    caption: "Sant. Bara dourado — tampa com águia em alto-relevo e brasão no mostrador",
    era: "Relógio de bolso",
    group: "Bolso",
  },
  {
    id: "p8",
    src: "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Engrenagens de um calibre antigo",
    era: "Mecanismos",
    group: "Mecanismos",
  },
  {
    id: "p9",
    src: "https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Cronógrafo clássico em detalhe",
    era: "Década de 1960",
    group: "Pulso",
  },
  {
    id: "w1",
    src: paredeCuco.url,
    caption: "Cuco entalhado em madeira com pássaro e folhagens",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
  {
    id: "w2",
    src: paredeEska.url,
    caption: "Eska em madeira clara — mostrador dourado e pêndulo",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
  {
    id: "w4",
    src: paredeColunas.url,
    caption: "Caixa em madeira escura com colunas torneadas e pêndulo",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
];

function VintageGalleryPage() {
  const [group, setGroup] = useState(ALL);
  const [index, setIndex] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const reduceMotion = useReducedMotion();

  const groups = useMemo(
    () => Array.from(new Set([ALL, ...PHOTOS.map((p) => p.group)])),
    [],
  );
  const photos = useMemo(() => {
    if (group === ALL) return PHOTOS;
    return PHOTOS.filter((p) => p.group === group);
  }, [group]);


  const current = index === null ? null : photos[index] ?? null;
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
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, photos.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 lg:pt-44">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Relógio antigo em detalhe"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/90 to-background" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <SectionEyebrow>Galeria histórica</SectionEyebrow>
            <h1 className="font-serif text-5xl text-foreground md:text-7xl">
              <TextReveal>Relógios que atravessaram gerações</TextReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground"
            >
              Uma galeria de fotografias das peças antigas que passaram pela nossa bancada — mostradores,
              caixas e mecanismos preservados com respeito à sua origem.
            </motion.p>
          </div>
        </section>

        {/* Filtro de grupos */}
        <section className="px-5 pb-10 sm:px-8">
          <Reveal className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
            {groups.map((item) => (
              <Button
                key={item}
                onClick={() => {
                  setGroup(item);
                  setIndex(null);
                }}
                variant={group === item ? "default" : "outline"}
                size="sm"
              >
                {item}
              </Button>
            ))}
          </Reveal>
        </section>

        {/* Grade de fotos */}
        <section className="px-5 pb-32 sm:px-8">
          <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
            {photos.map((photo) => (
              <PrecisionCard
                key={photo.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
                animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, scale: 0.97 }}
                className="overflow-hidden rounded-md border border-border bg-card text-left editorial-shadow"
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShot(0);
                    setIndex(photos.findIndex((item) => item.id === photo.id));
                  }}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="h-auto w-full rounded-none p-0"
                >
                  <WatchPhotoStage
                    src={photo.src}
                    alt={photo.caption}
                    className="aspect-[4/5] w-full p-6 sm:p-8"
                  />
                </Button>

                <div className="space-y-4 border-t border-border bg-card p-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-primary">{photo.era}</p>
                    <p className="min-h-10 text-sm leading-5 text-foreground">{photo.caption}</p>
                  </div>
                  <Button
                    onClick={() =>
                      openWhatsApp(
                        `Olá! Gostaria de saber mais sobre este relógio: ${photo.caption} (${photo.era}).`,
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    <MessageCircle size={14} />
                    Perguntar no WhatsApp
                  </Button>
                </div>
              </PrecisionCard>
            ))}
            </AnimatePresence>
          </motion.div>

          <div className="max-w-3xl mx-auto text-center mt-24 space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              Procura uma peça específica? Fale com a gente e consultamos a disponibilidade.
            </p>
            <Button
              onClick={() => openWhatsApp("Olá! Gostaria de saber quais relógios estão disponíveis.")}
            >
              Consultar disponibilidade
            </Button>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {current && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/70 backdrop-blur-md"
              onClick={() => setIndex(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl rounded-md border border-border bg-card p-4 editorial-shadow sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={`Foto ampliada: ${current.caption}`}
            >
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIndex(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 z-10"
              >
                <X size={26} />
              </Button>

              <WatchPhotoStage
                src={shots[shot] ?? current.src}
                alt={current.caption}
                className="mx-auto aspect-[4/3] max-h-[65vh] w-full rounded-sm p-5 sm:p-8"
              />

              {shots.length > 1 && (
                <div className="mt-4 flex justify-center gap-3">
                  {shots.map((src, i) => (
                    <Button
                      key={src}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShot(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`w-20 h-20 rounded overflow-hidden border transition-all ${
                        shot === i
                          ? "border-primary"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-contain bg-studio" />
                    </Button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                     <p className="text-xs font-bold uppercase text-primary">
                    {current.era}
                  </p>
                  <p className="text-muted-foreground">{current.caption}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => go(-1)}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => go(1)}
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={18} />
                  </Button>
                  <Button
                    onClick={() => openWhatsApp(`Vi esta peça na galeria de relógios antigos: ${current.caption} (${current.era}).`)}
                  >
                    <MessageCircle size={15} />
                    Falar sobre esta peça
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
