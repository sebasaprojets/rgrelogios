import { motion, useScroll, useSpring } from "framer-motion";

/** Linha dourada fina no topo que acompanha quanto da página já foi lido. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[#A67C2E] via-[#C5A059] to-[#D4B473]"
    />
  );
}
