"use client";

import { useState, type ReactNode } from "react";

type AccordionItemProps = {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({ question, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border-subtle)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-right text-base font-medium text-[var(--foreground)] transition-colors hover:text-[var(--foreground)]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="flex-1">{question}</span>
        <span
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-out ${open ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="pb-5 pr-8 text-[var(--foreground)]/90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

type FaqAccordionProps = {
  items: { question: string; answer: string }[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.question} defaultOpen={i === 0}>
          <p>{item.answer}</p>
        </AccordionItem>
      ))}
    </div>
  );
}
