import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOGO_URL = "/images/logo-rg.webp";
const HOLD_MS = 1100;

/** Só toca na primeira vez que a home monta nesta aba (não em navegações internas). */
let introPlayed = false;

/** Atraso (s) para as animações do hero começarem depois da cortina. */
export function heroIntroDelay(): number {
  return introPlayed ? 0 : 1;
}

/**
 * Abertura cinematográfica: tela escura com o logo e uma linha dourada que se
 * desenha; depois a cortina sobe revelando o site. Sem JS, uma animação CSS
 * de segurança a esconde sozinha; com "reduzir movimento" some na hora.
 */
export function IntroCurtain() {
  const [visible, setVisible] = useState(!introPlayed);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      introPlayed = true;
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      introPlayed = true;
      setVisible(false);
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="intro-curtain fixed inset-0 z-[100] flex items-center justify-center bg-[#14110D]"
        >
          <div className="flex flex-col items-center">
            <motion.img
              src={LOGO_URL}
              alt=""
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-20 w-auto rounded-xl md:h-24"
            />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="mt-8 block h-px w-40 origin-left bg-gradient-to-r from-transparent via-[#D4B473] to-transparent md:w-56"
            />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[11px] uppercase text-white/60"
            >
              Alta relojoaria · Curitiba
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
