"use client";

import { useState } from "react";
import { QuoteModal } from "@/components/QuoteModal";

type HeroQuoteCTAProps = {
  label: string;
};

const heroCtaClasses =
  "inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40";

export function HeroQuoteCTA({ label }: HeroQuoteCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={heroCtaClasses}>
        {label}
      </button>
      <QuoteModal open={open} onOpenChange={setOpen} />
    </>
  );
}
