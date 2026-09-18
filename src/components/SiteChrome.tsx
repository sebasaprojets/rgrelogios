import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo-official.png.asset.json";

export interface NavItem {
  readonly label: string;
  readonly to: "/" | "/relogios-antigos" | "/restauracoes" | "/servicos";
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Relógios", to: "/relogios-antigos" },
  { label: "Restaurações", to: "/restauracoes" },
  { label: "Serviços", to: "/servicos" },
];

const WHATSAPP_URL = "https://wa.me/5541992399650";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="RG Relógios — início">
          <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full object-contain" />
          <span className="font-serif text-xl text-foreground sm:text-2xl">RG Relógios</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-full border-b border-border bg-background p-5 editorial-shadow lg:hidden"
            aria-label="Navegação móvel"
          >
            <div className="mx-auto flex max-w-7xl flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between border-b border-border/60 py-4 font-serif text-2xl text-foreground"
                >
                  {item.label}<ArrowUpRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
              <Button asChild className="mt-5 h-12">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-md">
          <div className="mb-5 flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-11 w-11 rounded-full object-contain" />
            <span className="font-serif text-2xl">RG Relógios</span>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">Relógios selecionados e serviços especializados, com tradição e cuidado em cada detalhe.</p>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-bold uppercase text-primary">Navegação</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => <li key={item.to}><Link to={item.to} className="hover:text-foreground">{item.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-5 text-xs font-bold uppercase text-primary">Contato</h2>
          <p className="text-sm leading-7 text-muted-foreground">R. João Antônio Xavier, 420<br />Água Verde, Curitiba — PR<br />+55 41 99239-9650</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>© 2026 RG Relógios. Todos os direitos reservados.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-primary hover:text-foreground">Atendimento pelo WhatsApp</a>
      </div>
    </footer>
  );
}

export function openWhatsApp(message: string): void {
  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-bold uppercase text-primary">{children}</p>;
}