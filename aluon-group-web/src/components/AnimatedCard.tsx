"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

/** Wraps card content with lift + scale on hover and enhanced shadow. */
export function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, scale: 1.02, boxShadow: "var(--card-hover-shadow)" }
      }
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
