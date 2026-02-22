"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const API_SEND_FORM = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/send-form";

const MATERIAL_OPTIONS = [
  { value: "", label: "בחירת חומר" },
  { value: "aluminum", label: "אלומיניום" },
  { value: "alucobond", label: "אלוקובונד (ACP)" },
  { value: "hpl", label: "HPL" },
  { value: "curtain-walls", label: "קירות מסך" },
  { value: "other", label: "אחר" },
];

type QuoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setSubmitError(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fields: Record<string, string> = {};
    fd.forEach((value, key) => {
      fields[key] = String(value);
    });
    try {
      const res = await fetch(API_SEND_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "quote-modal",
          source: typeof window !== "undefined" ? window.location.href : "",
          fields,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "שליחה נכשלה. נסו שוב.");
        return;
      }
      onOpenChange(false);
    } catch {
      setSubmitError("שליחה נכשלה. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      dir="rtl"
      onClick={handleOverlayClick}
    >
      {/* Overlay: dark + blur */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
      {/* Modal card: stopPropagation so click doesn't close */}
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl rounded-2xl bg-[var(--background-card)] p-8 shadow-xl"
        style={{ width: "min(92vw, 960px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute end-4 top-4 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="סגור"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="quote-modal-title" className="pe-10 text-2xl font-bold tracking-tight text-[var(--foreground)]">
          ייעוץ מקצועי והצעת מחיר
        </h2>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          מלאו את הפרטים ונציג מומחה יחזור אליכם בהקדם.
        </p>

        {submitError && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-name" className="text-sm font-medium text-[var(--foreground)]">
                שם מלא
              </label>
              <input
                id="quote-name"
                type="text"
                name="name"
                autoComplete="name"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-phone" className="text-sm font-medium text-[var(--foreground)]">
                מספר טלפון
              </label>
              <input
                id="quote-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-area" className="text-sm font-medium text-[var(--foreground)]">
                איזור הפרויקט
              </label>
              <input
                id="quote-area"
                type="text"
                name="area"
                placeholder="לדוגמה: תל אביב"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-zinc-400 transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-material" className="text-sm font-medium text-[var(--foreground)]">
                סוג חומר לפרויקט
              </label>
              <select
                id="quote-material"
                name="material"
                defaultValue=""
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              >
                {MATERIAL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-sqm" className="text-sm font-medium text-[var(--foreground)]">
                היקף פרויקט במ"ר
              </label>
              <input
                id="quote-sqm"
                type="number"
                name="sqm"
                min={0}
                placeholder="לדוגמה: 500"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-zinc-400 transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="quote-date" className="text-sm font-medium text-[var(--foreground)]">
                תאריך תחילת עבודה משוער
              </label>
              <input
                id="quote-date"
                type="date"
                name="startDate"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] transition-colors focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={submitting}>
              {submitting ? "שולח..." : "שליחת בקשה להצעת מחיר"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              ביטול
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
