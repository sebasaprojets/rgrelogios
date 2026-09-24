import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MaskRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Revela o conteúdo como uma cortina de cinema: a máscara abre de baixo para
 * cima enquanto a imagem assenta de um leve zoom.
 */
export function MaskReveal({ children, className }: MaskRevealProps) {
  const reduceMotion = useReducedMotion();
  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease }}
      className={className}
    >
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
