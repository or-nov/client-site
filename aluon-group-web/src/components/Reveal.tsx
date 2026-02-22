"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Optional delay in ms for stagger (e.g. card index * 80). */
  delayMs?: number;
};

/** Lightweight scroll reveal: fade + small translateY when in view (CSS .reveal-motion). */
export function Reveal({ children, className = "", delayMs }: RevealProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`reveal-motion ${className}`}
      data-visible={isInView ? "true" : undefined}
      style={delayMs != null ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
