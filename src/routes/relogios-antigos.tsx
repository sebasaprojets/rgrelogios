import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import bolsoTissot from "@/assets/bolso-tissot.png.asset.json";
import bolsoEsmaltado from "@/assets/bolso-esmaltado.png.asset.json";
import bolsoSantBara from "@/assets/bolso-santbara.png.asset.json";
import bolsoAguia from "@/assets/bolso-aguia.png.asset.json";
import paredeCuco from "@/assets/parede-img_4432.jpeg.asset.json";
import paredeEska from "@/assets/parede-img_4428.jpeg.asset.json";
import paredeHerwegOrnamentado from "@/assets/parede-img_4439.jpeg.asset.json";
import paredeColunas from "@/assets/parede-img_4431.jpeg.asset.json";
import paredeCucoHerweg from "@/assets/parede-img_4438.jpeg.asset.json";

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
    id: "p7",
    src: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Mecanismo aberto sobre bancada",
    era: "Mecanismos",
    group: "Mecanismos",
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
    id: "p10",
    src: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1400",
    caption: "Mostrador de linhas sóbrias",
    era: "Década de 1970",
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
    id: "w3",
    src: paredeHerwegOrnamentado.url,
    caption: "Herweg ornamentado em preto e ouro velho",
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
  {
    id: "w5",
    src: paredeCucoHerweg.url,
    caption: "Cuco Herweg com folhas entalhadas, pinhas e correntes",
    era: "Relógio de parede",
    group: ANTIQUE,
  },
];

function VintageGalleryPage() {
  const [group, setGroup] = useState(ALL);
  const [index, setIndex] = useState<number | null>(null);
  const [shot, setShot] = useState(0);

  const groups = useMemo(
    () => [ALL, ANTIQUE, ...Array.from(new Set(PHOTOS.map((p) => p.group)))],
    [],
  );
  const photos = useMemo(() => {
    if (group === ALL) return PHOTOS;
    if (group === ANTIQUE) return PHOTOS.filter((p) => ANTIQUE_GROUPS.includes(p.group));
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
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative pt-44 pb-24 px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Relógio antigo em detalhe"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00050A]/95 via-[#00050A]/85 to-[#00050A]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <SectionEyebrow>Galeria histórica</SectionEyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-[#C5A059]"
            >
              Relógios que atravessaram gerações
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#E5D3B3]/70 text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              Uma galeria de fotografias das peças antigas que passaram pela nossa bancada — mostradores,
              caixas e mecanismos preservados com respeito à sua origem.
            </motion.p>
          </div>
        </section>

        {/* Filtro de grupos */}
        <section className="px-8 pb-10">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
            {groups.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setGroup(item);
                  setIndex(null);
                }}
                className={`px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  group === item
                    ? "bg-[#C5A059] text-[#00050A] border-[#C5A059]"
                    : "border-[#C5A059]/25 text-[#E5D3B3]/60 hover:border-[#C5A059]/60 hover:text-[#C5A059]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Grade de fotos */}
        <section className="px-8 pb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-[#C5A059]/15 hover:border-[#C5A059]/50 transition-all duration-500 text-left"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShot(0);
                    setIndex(i);
                  }}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00050A] via-[#00050A]/10 to-transparent" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 pointer-events-none">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">{photo.era}</p>
                    <p className="text-sm text-[#E5D3B3]/85 font-light">{photo.caption}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        `Olá! Gostaria de saber mais sobre este relógio: ${photo.caption} (${photo.era}).`,
                      )
                    }
                    className="pointer-events-auto inline-flex items-center gap-2 bg-[#C5A059] text-[#00050A] px-4 py-2.5 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4B473] transition-all"
                  >
                    <MessageCircle size={14} />
                    Perguntar no WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mt-24 space-y-6">
            <p className="text-[#E5D3B3]/60 font-light leading-relaxed">
              Procura uma peça específica? Fale com a gente e consultamos a disponibilidade.
            </p>
            <button
              onClick={() => openWhatsApp("Olá! Gostaria de saber quais relógios estão disponíveis.")}
              className="inline-block bg-[#C5A059] text-[#00050A] px-8 py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#D4B473] transition-all"
            >
              Consultar disponibilidade
            </button>
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
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIndex(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => setIndex(null)}
                aria-label="Fechar"
                className="absolute -top-12 right-0 text-[#E5D3B3]/60 hover:text-[#C5A059]"
              >
                <X size={26} />
              </button>

              <img
                src={shots[shot] ?? current.src}
                alt={current.caption}
                className="w-full max-h-[70vh] object-contain rounded-lg border border-[#C5A059]/20 bg-[#00050A]"
              />

              {shots.length > 1 && (
                <div className="mt-4 flex justify-center gap-3">
                  {shots.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`w-20 h-20 rounded overflow-hidden border transition-all ${
                        shot === i
                          ? "border-[#C5A059]"
                          : "border-[#C5A059]/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                    {current.era}
                  </p>
                  <p className="text-[#E5D3B3]/80 font-light">{current.caption}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Foto anterior"
                    className="p-3 rounded border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#00050A] transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Próxima foto"
                    className="p-3 rounded border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#00050A] transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => openWhatsApp(`Vi esta peça na galeria de relógios antigos: ${current.caption} (${current.era}).`)}
                    className="flex items-center gap-2 bg-[#C5A059] text-[#00050A] px-5 py-3 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4B473] transition-all"
                  >
                    <MessageCircle size={15} />
                    Falar sobre esta peça
                  </button>
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
