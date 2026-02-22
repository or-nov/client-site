"use client";

import { useEffect, useState } from "react";

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
};

/** Minimal hook for scroll reveal: no external lib. */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -24px 0px" } = options;
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setIsInView(true);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return { ref: setRef, isInView };
}
