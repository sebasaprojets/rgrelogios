import { motion, useReducedMotion, type Variants } from "framer-motion";

type HeadingTag = "h1" | "h2" | "h3" | "p";

interface RevealTextProps {
  /** Texto do título; palavras entre asteriscos (`*histórias*`) ficam em dourado itálico. */
  readonly text: string;
  readonly as?: HeadingTag;
  readonly className?: string;
  /** "view": anima ao entrar na tela; "mount": anima ao carregar a página. */
  readonly trigger?: "view" | "mount";
  readonly delay?: number;
}

/** Título revelado palavra por palavra, saindo de um leve desfoque. */
export function RevealText({
  text,
  as = "h2",
  className,
  trigger = "view",
  delay = 0,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ").map((raw) => {
    const accent = raw.startsWith("*");
    return { word: raw.replace(/\*/g, ""), accent };
  });
  const plain = words.map((w) => w.word).join(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: delay } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: "0.3em", filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const triggerProps =
    trigger === "view"
      ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
      : { animate: "visible" };

  return (
    <Tag
      aria-label={plain}
      initial="hidden"
      variants={container}
      {...triggerProps}
      className={className}
    >
      {words.map(({ word, accent }, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden
          variants={item}
          className={`inline-block ${index < words.length - 1 ? "mr-[0.22em]" : ""} ${
            accent ? "italic text-[#8A6624]" : ""
          }`}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
