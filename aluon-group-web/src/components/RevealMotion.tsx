"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealMotionProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds (e.g. index * 0.1). */
  delay?: number;
};

const defaultTransition = { duration: 0.6, ease: "easeOut" as const };

/** Fade in + slide up on scroll. viewport once, optional stagger delay. */
export function RevealMotion({ children, className = "", delay = 0 }: RevealMotionProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
