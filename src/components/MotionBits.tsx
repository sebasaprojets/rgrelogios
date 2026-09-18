import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface ImageLiftProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function ImageLift({ children, className, ...props }: ImageLiftProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn("group overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

/** React Bits-inspired word reveal with a quiet editorial cadence. */
export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", className)} aria-label={children}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="mr-[0.24em] inline-block"
          initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(5px)" }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: delay + index * 0.045, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export interface PrecisionCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

/** A restrained hover response modelled after React Bits tilt cards. */
export function PrecisionCard({ children, className, ...props }: PrecisionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? {} : { y: -5, scale: 1.008 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn("group relative", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface SoftFloatProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function SoftFloat({ children, className, ...props }: SoftFloatProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? {} : { y: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}