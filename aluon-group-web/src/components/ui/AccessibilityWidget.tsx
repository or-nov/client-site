"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* מפתחות localStorage – תואמים לסקריפט הטעינה ב־layout */
const STORAGE_TEXT = "accessibility-text-size";
const STORAGE_GRAYSCALE = "accessibility-grayscale";
const STORAGE_HIGH_CONTRAST = "accessibility-high-contrast";
const STORAGE_UNDERLINE_LINKS = "accessibility-underline-links";
const STORAGE_REDUCE_MOTION = "accessibility-reduce-motion";

function applyToDocument(flags: {
  textLarge: boolean;
  grayscale: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
}) {
  const el = typeof document !== "undefined" ? document.documentElement : null;
  if (!el) return;
  /* class על html – משפיע על globals.css */
  if (flags.textLarge) el.classList.add("a11y-font-plus");
  else el.classList.remove("a11y-font-plus");
  if (flags.highContrast) el.classList.add("a11y-high-contrast");
  else el.classList.remove("a11y-high-contrast");
  if (flags.underlineLinks) el.classList.add("a11y-underline-links");
  else el.classList.remove("a11y-underline-links");
  if (flags.reduceMotion) el.classList.add("a11y-reduce-motion");
  else el.classList.remove("a11y-reduce-motion");
  /* data attributes – תאימות ל־CSS קיים (גדילת טקסט, גרייסקייל) */
  el.dataset.accessibilityText = flags.textLarge ? "large" : "";
  el.dataset.accessibilityGrayscale = flags.grayscale ? "true" : "";
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [textLarge, setTextLarge] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* טעינת העדפות מהאחסון והחלה על html (מיד עם mount) */
  useEffect(() => {
    if (typeof document === "undefined" || typeof localStorage === "undefined") return;
    const storedText = localStorage.getItem(STORAGE_TEXT) === "large";
    const storedGray = localStorage.getItem(STORAGE_GRAYSCALE) === "true";
    const storedHigh = localStorage.getItem(STORAGE_HIGH_CONTRAST) === "true";
    const storedUnder = localStorage.getItem(STORAGE_UNDERLINE_LINKS) === "true";
    const storedMotion = localStorage.getItem(STORAGE_REDUCE_MOTION) === "true";
    setTextLarge(storedText);
    setGrayscale(storedGray);
    setHighContrast(storedHigh);
    setUnderlineLinks(storedUnder);
    setReduceMotion(storedMotion);
    applyToDocument({
      textLarge: storedText,
      grayscale: storedGray,
      highContrast: storedHigh,
      underlineLinks: storedUnder,
      reduceMotion: storedMotion,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const toggleTextSize = () => {
    const next = !textLarge;
    setTextLarge(next);
    localStorage.setItem(STORAGE_TEXT, next ? "large" : "default");
    applyToDocument({
      textLarge: next,
      grayscale,
      highContrast,
      underlineLinks,
      reduceMotion,
    });
  };

  const toggleGrayscale = () => {
    const next = !grayscale;
    setGrayscale(next);
    localStorage.setItem(STORAGE_GRAYSCALE, next ? "true" : "false");
    applyToDocument({
      textLarge,
      grayscale: next,
      highContrast,
      underlineLinks,
      reduceMotion,
    });
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem(STORAGE_HIGH_CONTRAST, next ? "true" : "false");
    applyToDocument({
      textLarge,
      grayscale,
      highContrast: next,
      underlineLinks,
      reduceMotion,
    });
  };

  const toggleUnderlineLinks = () => {
    const next = !underlineLinks;
    setUnderlineLinks(next);
    localStorage.setItem(STORAGE_UNDERLINE_LINKS, next ? "true" : "false");
    applyToDocument({
      textLarge,
      grayscale,
      highContrast,
      underlineLinks: next,
      reduceMotion,
    });
  };

  const toggleReduceMotion = () => {
    const next = !reduceMotion;
    setReduceMotion(next);
    localStorage.setItem(STORAGE_REDUCE_MOTION, next ? "true" : "false");
    applyToDocument({
      textLarge,
      grayscale,
      highContrast,
      underlineLinks,
      reduceMotion: next,
    });
  };

  const activeClass = "mr-auto text-xs text-emerald-400";

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 flex flex-col items-end" dir="rtl">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-52 rounded-xl border border-white/20 bg-[rgba(30,30,30,0.95)] py-2 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            role="dialog"
            aria-label="הגדרות נגישות"
          >
            <button
              type="button"
              onClick={toggleTextSize}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={textLarge ? "הגדלת טקסט – פעיל" : "הגדלת טקסט"}
            >
              <span className="text-lg" aria-hidden>א</span>
              <span>הגדלת טקסט</span>
              {textLarge && <span className={activeClass}>פעיל</span>}
            </button>
            <button
              type="button"
              onClick={toggleHighContrast}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={highContrast ? "ניגודיות גבוהה – פעיל" : "ניגודיות גבוהה"}
            >
              <span className="text-lg opacity-80" aria-hidden>◐</span>
              <span>ניגודיות גבוהה</span>
              {highContrast && <span className={activeClass}>פעיל</span>}
            </button>
            <button
              type="button"
              onClick={toggleUnderlineLinks}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={underlineLinks ? "הדגשת קישורים – פעיל" : "הדגשת קישורים"}
            >
              <span className="text-lg underline" aria-hidden>u</span>
              <span>הדגשת קישורים</span>
              {underlineLinks && <span className={activeClass}>פעיל</span>}
            </button>
            <button
              type="button"
              onClick={toggleReduceMotion}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={reduceMotion ? "הפחתת תנועה – פעיל" : "הפחתת תנועה"}
            >
              <span className="text-lg opacity-80" aria-hidden>◎</span>
              <span>הפחתת תנועה</span>
              {reduceMotion && <span className={activeClass}>פעיל</span>}
            </button>
            <button
              type="button"
              onClick={toggleGrayscale}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={grayscale ? "מצב אפור – פעיל" : "מצב אפור"}
            >
              <span className="text-lg opacity-80" aria-hidden>◐</span>
              <span>מצב אפור</span>
              {grayscale && <span className={activeClass}>פעיל</span>}
            </button>
            <Link
              href="/accessibility"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-right text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="הצהרת נגישות"
            >
              <span className="text-lg" aria-hidden>ℹ</span>
              <span>הצהרת נגישות</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[rgba(30,30,30,0.9)] text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={open}
        aria-label="הגדרות נגישות"
        aria-haspopup="dialog"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>
    </div>
  );
}
