import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-official.png.asset.json";

export interface NavItem {
  readonly label: string;
  /** Âncora na home (ex.: "/#serviços") ou rota interna (ex.: "/relogios-antigos"). */
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", href: "/#início" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Relógios Antigos", href: "/relogios-antigos" },
  { label: "Restaurações", href: "/restauracoes" },
  { label: "Serviços", href: "/#serviços" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

const WHATSAPP_URL = "https://wa.me/5541992399650";

/** Cabeçalho fixo usado nas páginas internas, idêntico ao da home. */
export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-[#00050A]/95 backdrop-blur-md border-b border-[#C5A059]/20">
      <Link to="/" className="flex items-center gap-4">
        <img
          src={logoAsset.url}
          alt="RG Relógios"
          className="w-10 h-10 object-contain rounded-full border border-[#C5A059]/30"
        />
        <span className="text-2xl font-serif font-bold text-[#C5A059] tracking-wider">RG RELÓGIOS</span>
      </Link>

      <nav className="hidden lg:flex gap-8 text-sm font-medium tracking-wide text-[#E5D3B3]/90 uppercase">
        {NAV_ITEMS.map((item) => (
          <a key={item.label} href={item.href} className="hover:text-[#C5A059] transition-colors">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex bg-[#C5A059] text-[#00050A] px-6 py-2.5 rounded font-bold text-sm tracking-wide hover:bg-[#D4B473] transition-all items-center gap-2"
          onClick={() => window.open(WHATSAPP_URL, "_blank")}
        >
          <MessageCircle size={18} />
          Falar no WhatsApp
        </motion.button>

        <button
          className="lg:hidden text-[#C5A059]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#00050A] border-b border-[#C5A059]/20 p-8 flex flex-col gap-6 lg:hidden shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-serif text-[#C5A059] hover:text-[#D4B473]"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Rodapé institucional reutilizado nas páginas internas. */
export function SiteFooter() {
  return (
    <footer className="py-20 px-8 bg-[#00050A] border-t border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logoAsset.url}
                alt="RG Relógios Logo"
                className="w-12 h-12 object-contain rounded-full border border-[#C5A059]/20"
              />
              <h4 className="text-2xl font-serif text-[#C5A059]">RG RELÓGIOS</h4>
            </div>
            <p className="text-[#E5D3B3]/60 max-w-md leading-relaxed">
              Especialistas em relógios, relojoaria, peças antigas e serviços especializados.
              Tradição e excelência no cuidado com o seu tempo.
            </p>
          </div>
          <div>
            <h5 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-6">Navegação</h5>
            <ul className="space-y-4 text-sm text-[#E5D3B3]/60">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-[#C5A059]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest mb-6">Legal</h5>
            <ul className="space-y-4 text-sm text-[#E5D3B3]/60">
              <li><a href="#" className="hover:text-[#C5A059]">Privacidade</a></li>
              <li><a href="#" className="hover:text-[#C5A059]">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#C5A059]">Garantia</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#C5A059]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#E5D3B3]/40">
          <p>© 2026 RG Relógios. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#C5A059]">Instagram</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-[#C5A059]">WhatsApp</a>
            <a href="#" className="hover:text-[#C5A059]">Maps</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Abre o WhatsApp com uma mensagem pré-preenchida. */
export function openWhatsApp(message: string): void {
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank");
}

/** Etiqueta decorativa dourada usada nos cabeçalhos de seção. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059] uppercase block text-center"
      >
        {children}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        className="w-12 h-[1px] bg-[#C5A059]/50 relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#C5A059] rotate-45" />
      </motion.div>
    </div>
  );
}
