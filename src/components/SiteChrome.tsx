import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const LOGO_URL = "/images/logo-rg.webp";

export interface NavItem {
  readonly label: string;
  /** Âncora na home (ex.: "/#serviços") ou rota interna (ex.: "/relogios-antigos"). */
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", href: "/#início" },
  { label: "Relógios", href: "/relogios-antigos" },
  { label: "Restaurações", href: "/restauracoes" },
  { label: "Serviços", href: "/#serviços" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const WHATSAPP_URL = "https://wa.me/5541992399650";

/** Cabeçalho fixo compartilhado: transparente no topo, sólido ao rolar. */
export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "border-b border-[#1C1917]/10 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-6 md:px-8 ${scrolled ? "py-3" : "py-5"}`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RG Relógios" className="h-11 w-auto rounded-md object-contain" />
          <span className="hidden font-serif text-2xl text-[#1C1917] sm:inline">RG Relógios</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#1C1917]/70 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative py-1 transition-colors hover:text-[#1C1917]"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#C5A059] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-1.5 rounded-full bg-[#1C1917] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C5A059] hover:text-[#14110D] sm:inline-flex"
          >
            Fale conosco
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <button
            className="-mr-2 flex h-11 w-11 items-center justify-center text-[#1C1917] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-[#1C1917]/10 bg-white lg:hidden"
          >
            <div className="flex flex-col px-5 py-4 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b border-[#1C1917]/5 py-3.5 font-serif text-2xl text-[#1C1917] last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1917] py-3.5 font-medium text-white"
              >
                Fale conosco no WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Rodapé institucional compartilhado. */
export function SiteFooter() {
  return (
    <footer
      className="border-t border-[#1C1917]/10 bg-white px-5 pt-16 sm:px-6 md:px-8 md:pt-20"
      style={{ paddingBottom: "max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 md:col-span-6">
            <img
              src={LOGO_URL}
              alt="RG Relógios"
              className="mb-6 h-16 w-auto rounded-lg object-contain"
            />
            <p className="max-w-sm leading-relaxed text-[#1C1917]/60">
              Relojoaria em Curitiba. Venda, manutenção e restauração de relógios clássicos, antigos
              e contemporâneos.
            </p>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h5 className="mb-5 text-xs text-[#1C1917]/40">Navegação</h5>
            <ul className="space-y-1 text-sm text-[#1C1917]/70">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 transition-colors hover:text-[#A67C2E]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h5 className="mb-5 text-xs text-[#1C1917]/40">Loja</h5>
            <ul className="space-y-3 text-sm text-[#1C1917]/70">
              <li>R. João Antônio Xavier, 420</li>
              <li>Água Verde, Curitiba – PR</li>
              <li>Seg–Sex 09h–18h · Sáb 09h–13h</li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="-my-1.5 inline-block py-1.5 transition-colors hover:text-[#A67C2E]"
                >
                  +55 41 99239-9650
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          className="mt-14 select-none font-serif text-[18vw] whitespace-nowrap md:mt-20 leading-[0.8] tracking-tight text-[#1C1917]/[0.04] md:text-[12rem]"
          aria-hidden
        >
          RG Relógios
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1C1917]/10 pt-6 text-center text-xs text-[#1C1917]/50 md:flex-row md:pt-8 md:text-left">
          <p>© {new Date().getFullYear()} RG Relógios. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block py-2 hover:text-[#A67C2E]"
            >
              WhatsApp
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=RG+Relógios+R.+João+Antônio+Xavier+420+Água+Verde+Curitiba+PR"
              target="_blank"
              rel="noreferrer"
              className="inline-block py-2 hover:text-[#A67C2E]"
            >
              Google Maps
            </a>
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

/** Rótulo discreto usado acima dos títulos de seção. */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border border-[#1C1917]/10 bg-white px-3 py-1 text-xs text-[#1C1917]/60"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
      {children}
    </motion.span>
  );
}
