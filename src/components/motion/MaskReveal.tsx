import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface MaskRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Revela o conteúdo como uma cortina de cinema: a máscara abre de baixo para
 * cima enquanto a imagem assenta de um leve zoom.
 *
 * A visibilidade é medida num contêiner sem recorte: alguns navegadores móveis
 * consideram invisível um elemento 100% recortado e nunca disparariam a abertura.
 */
export function MaskReveal({ children, className }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const open = inView || reduceMotion;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="h-full w-full"
      >
        <motion.div
          initial={false}
          animate={{ scale: open ? 1 : 1.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
