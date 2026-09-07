import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MessageCircle, History, Shield, Gem } from "lucide-react";
import { SiteHeader, SiteFooter, SectionEyebrow, openWhatsApp } from "@/components/SiteChrome";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/relogios-antigos")({
  head: () => ({
    meta: [
      { title: "Catálogo de Relógios Antigos | RG Relógios" },
      {
        name: "description",
        content:
          "Relógios antigos, peças clássicas e modelos raros restaurados com respeito à sua história. Veja o acervo da RG Relógios em Curitiba.",
      },
      { property: "og:title", content: "Catálogo de Relógios Antigos | RG Relógios" },
      {
        property: "og:description",
        content: "Uma seleção de relógios antigos, vintage e colecionáveis restaurados pela RG Relógios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VintageCatalogPage,
});

interface VintageWatch {
  readonly id: string;
  readonly brand: string;
  readonly model: string;
  readonly decade: string;
  readonly movement: string;
  readonly caseMaterial: string;
  readonly condition: string;
  readonly availability: "Disponível" | "Reservado";
  readonly badge: string;
  readonly type: string;
  readonly history: string;
  readonly details: readonly string[];
  readonly curiosity: string;
  readonly gallery: readonly string[];
}

const WATCHES: readonly VintageWatch[] = [
  {
    id: "omega-seamaster-1960",
    brand: "Omega",
    model: "Seamaster De Ville",
    decade: "Década de 1960",
    movement: "Automático",
    caseMaterial: "Aço inoxidável",
    condition: "Excelente",
    availability: "Disponível",
    badge: "Colecionável",
    type: "Automático",
    history:
      "Produzido no auge da relojoaria suíça, este Seamaster acompanhou uma geração que valorizava discrição e robustez em partes iguais.",
    details: [
      "Calibre automático revisado e lubrificado",
      "Mostrador original preservado",
      "Vidro acrílico substituído por peça equivalente",
    ],
    curiosity: "A linha De Ville nasceu como uma variação elegante do Seamaster e virou coleção independente em 1967.",
    gallery: [
      "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "rolex-oyster-1950",
    brand: "Rolex",
    model: "Oyster Perpetual",
    decade: "Década de 1950",
    movement: "Automático",
    caseMaterial: "Aço e ouro",
    condition: "Muito bom",
    availability: "Reservado",
    badge: "Peça rara",
    type: "Automático",
    history:
      "Um dos ícones que consolidaram a reputação da marca em estanqueidade e precisão, com pátina natural preservada.",
    details: ["Caixa Oyster original", "Coroa rosqueada revisada", "Pátina do mostrador intacta"],
    curiosity: "O nome Perpetual vem do rotor que dá corda automática ao mecanismo com o movimento do pulso.",
    gallery: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "longines-corda-1940",
    brand: "Longines",
    model: "Calatrava Style",
    decade: "Década de 1940",
    movement: "Corda manual",
    caseMaterial: "Ouro plaqué",
    condition: "Restaurado",
    availability: "Disponível",
    badge: "Restaurado",
    type: "Corda manual",
    history:
      "Peça de linhas sóbrias, típica do período pós-guerra, restaurada em nossa oficina com componentes de época.",
    details: ["Mecanismo de corda manual regulado", "Mostrador restaurado artesanalmente", "Pulseira em couro legítimo"],
    curiosity: "Relógios de corda manual pedem uma rotina diária que muitos colecionadores descrevem como ritual.",
    gallery: [
      "https://images.pexels.com/photos/364822/rolex-watch-time-luxury-364822.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "seiko-quartz-1970",
    brand: "Seiko",
    model: "Quartz Astron Line",
    decade: "Década de 1970",
    movement: "Quartzo",
    caseMaterial: "Aço inoxidável",
    condition: "Bom",
    availability: "Disponível",
    badge: "Vintage",
    type: "Quartzo",
    history:
      "Representa a revolução do quartzo, quando a precisão passou a ser medida em segundos por mês, não por dia.",
    details: ["Circuito original testado", "Caixa polida com preservação de arestas", "Bateria nova instalada"],
    curiosity: "O primeiro relógio de pulso a quartzo do mundo foi lançado pela Seiko na véspera de Natal de 1969.",
    gallery: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "tissot-cronografo-1960",
    brand: "Tissot",
    model: "Cronógrafo Clássico",
    decade: "Década de 1960",
    movement: "Cronógrafo manual",
    caseMaterial: "Aço inoxidável",
    condition: "Muito bom",
    availability: "Disponível",
    badge: "Colecionável",
    type: "Cronógrafo",
    history:
      "Cronógrafos desta época eram ferramentas de trabalho e hoje são apreciados pela mecânica visível em cada função.",
    details: ["Funções de cronógrafo testadas", "Subdiais originais", "Revisão completa do calibre"],
    curiosity: "O acionamento do cronógrafo envolve dezenas de peças que se encaixam em frações de milímetro.",
    gallery: [
      "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    id: "bolso-corrente-1920",
    brand: "Relojoaria Suíça",
    model: "Relógio de Bolso",
    decade: "Década de 1920",
    movement: "Corda manual",
    caseMaterial: "Prata",
    condition: "Restaurado",
    availability: "Disponível",
    badge: "Peça rara",
    type: "Bolso",
    history:
      "Antes do pulso, o tempo vivia no bolso do colete. Esta peça preserva o gravado original da tampa.",
    details: ["Tampa com gravação de época", "Mecanismo revisado peça a peça", "Corrente em prata inclusa"],
    curiosity: "Relógios de bolso foram os primeiros objetos pessoais de medição precisa do tempo.",
    gallery: [
      "https://images.pexels.com/photos/47856/pocket-watch-time-of-sand-time-clock-47856.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
];

const ALL = "Todos";

function unique(values: readonly string[]): string[] {
  return [ALL, ...Array.from(new Set(values))];
}

function VintageCatalogPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(ALL);
  const [decade, setDecade] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [condition, setCondition] = useState(ALL);
  const [availability, setAvailability] = useState(ALL);
  const [selected, setSelected] = useState<VintageWatch | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return WATCHES.filter((w) => {
      const matchesTerm =
        term.length === 0 ||
        `${w.brand} ${w.model} ${w.decade} ${w.type}`.toLowerCase().includes(term);
      return (
        matchesTerm &&
        (brand === ALL || w.brand === brand) &&
        (decade === ALL || w.decade === decade) &&
        (type === ALL || w.type === type) &&
        (condition === ALL || w.condition === condition) &&
        (availability === ALL || w.availability === availability)
      );
    });
  }, [search, brand, decade, type, condition, availability]);

  const filters = [
    { label: "Marca", value: brand, set: setBrand, options: unique(WATCHES.map((w) => w.brand)) },
    { label: "Década", value: decade, set: setDecade, options: unique(WATCHES.map((w) => w.decade)) },
    { label: "Tipo", value: type, set: setType, options: unique(WATCHES.map((w) => w.type)) },
    { label: "Conservação", value: condition, set: setCondition, options: unique(WATCHES.map((w) => w.condition)) },
    {
      label: "Disponibilidade",
      value: availability,
      set: setAvailability,
      options: unique(WATCHES.map((w) => w.availability)),
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#00050A] text-[#E5D3B3] font-['Inter'] selection:bg-[#C5A059] selection:text-[#00050A]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative pt-44 pb-28 px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Relógio antigo em detalhe"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00050A]/95 via-[#00050A]/85 to-[#00050A]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <SectionEyebrow>Acervo histórico</SectionEyebrow>
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
              Explore uma seleção de relógios antigos, peças clássicas e modelos que carregam história,
              personalidade e tradição.
            </motion.p>
            <p className="text-[#E5D3B3]/50 text-sm max-w-xl mx-auto italic">
              Cada peça é conservada com respeito à sua origem — preservar a história da relojoaria é parte
              do nosso ofício.
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="px-8 pb-8">
          <div className="max-w-7xl mx-auto bg-[#0A101A] border border-[#C5A059]/15 rounded-lg p-6 space-y-6">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]/60" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar relógio"
                className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filters.map((f) => (
                <div key={f.label} className="space-y-2">
                  <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">
                    {f.label}
                  </label>
                  <select
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full bg-[#00050A] border border-[#C5A059]/20 rounded px-3 py-3 text-sm outline-none focus:border-[#C5A059] transition-colors"
                  >
                    {f.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/40 mb-8">
              {filtered.length} {filtered.length === 1 ? "peça encontrada" : "peças encontradas"}
            </p>

            {filtered.length === 0 ? (
              <div className="border border-[#C5A059]/15 rounded-lg py-24 text-center text-[#E5D3B3]/50">
                Nenhuma peça corresponde aos filtros selecionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((watch, index) => (
                  <motion.article
                    key={watch.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-[#0A101A] border border-[#C5A059]/15 rounded-lg overflow-hidden hover:border-[#C5A059]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={watch.gallery[0]}
                        alt={`${watch.brand} ${watch.model}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A101A] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-[#C5A059] text-[#00050A] px-3 py-1.5 rounded">
                        {watch.badge}
                      </span>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                          {watch.brand}
                        </p>
                        <h2 className="text-xl font-serif text-[#E5D3B3]">{watch.model}</h2>
                        <p className="text-xs text-[#E5D3B3]/50 mt-1">{watch.decade}</p>
                      </div>

                      <dl className="grid grid-cols-2 gap-3 text-xs text-[#E5D3B3]/60">
                        <div>
                          <dt className="text-[#C5A059]/70">Mecanismo</dt>
                          <dd>{watch.movement}</dd>
                        </div>
                        <div>
                          <dt className="text-[#C5A059]/70">Caixa</dt>
                          <dd>{watch.caseMaterial}</dd>
                        </div>
                        <div>
                          <dt className="text-[#C5A059]/70">Conservação</dt>
                          <dd>{watch.condition}</dd>
                        </div>
                        <div>
                          <dt className="text-[#C5A059]/70">Situação</dt>
                          <dd>{watch.availability}</dd>
                        </div>
                      </dl>

                      <p className="text-sm text-[#E5D3B3]/60 leading-relaxed flex-1">{watch.history}</p>

                      <button
                        onClick={() => setSelected(watch)}
                        className="w-full border border-[#C5A059]/50 text-[#C5A059] py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#00050A] transition-all"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selected && <WatchDetailModal watch={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}

function WatchDetailModal({ watch, onClose }: { watch: VintageWatch; onClose: () => void }) {
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
        className="relative w-full max-w-4xl my-12 bg-[#0A101A] border border-[#C5A059]/30 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[#E5D3B3]/50 hover:text-[#C5A059]"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-1 bg-[#00050A]">
            {watch.gallery.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${watch.brand} ${watch.model}`}
                className="w-full h-64 lg:h-full object-cover"
              />
            ))}
          </div>

          <div className="p-8 space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">{watch.brand}</p>
              <h2 className="text-3xl font-serif text-[#E5D3B3]">{watch.model}</h2>
              <p className="text-sm text-[#E5D3B3]/50 mt-1">
                {watch.decade} · {watch.movement}
              </p>
            </div>

            <p className="text-sm text-[#E5D3B3]/70 leading-relaxed">{watch.history}</p>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                Características técnicas
              </h3>
              <ul className="space-y-2 text-sm text-[#E5D3B3]/70">
                {watch.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <Gem size={14} className="text-[#C5A059] shrink-0 mt-1" />
                    {detail}
                  </li>
                ))}
                <li className="flex gap-3">
                  <Shield size={14} className="text-[#C5A059] shrink-0 mt-1" />
                  Estado de conservação: {watch.condition}
                </li>
                <li className="flex gap-3">
                  <History size={14} className="text-[#C5A059] shrink-0 mt-1" />
                  {watch.curiosity}
                </li>
              </ul>
            </div>

            <button
              onClick={() =>
                openWhatsApp(`Tenho interesse neste relógio: ${watch.brand} ${watch.model} (${watch.decade}).`)
              }
              className="w-full bg-[#C5A059] text-[#00050A] py-4 rounded font-bold uppercase text-xs tracking-widest hover:bg-[#D4B473] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Tenho interesse neste relógio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
