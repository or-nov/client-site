"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "cookie_consent_v1";

type ConsentState = {
  required: true;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  required: true,
  analytics: false,
  marketing: false,
};

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed?.required !== "boolean" || typeof parsed?.analytics !== "boolean" || typeof parsed?.marketing !== "boolean")
      return null;
    return { ...DEFAULT_CONSENT, ...parsed };
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = loadConsent();
    if (stored !== null) {
      setVisible(false);
      return;
    }
    setVisible(true);
    setAnalytics(DEFAULT_CONSENT.analytics);
    setMarketing(DEFAULT_CONSENT.marketing);
  }, [mounted]);

  const acceptAll = () => {
    const state: ConsentState = { required: true, analytics: true, marketing: true };
    saveConsent(state);
    setVisible(false);
  };

  const rejectAll = () => {
    const state: ConsentState = { required: true, analytics: false, marketing: false };
    saveConsent(state);
    setVisible(false);
  };

  const savePreferences = () => {
    const state: ConsentState = { required: true, analytics, marketing };
    saveConsent(state);
    setShowSettings(false);
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  /* סרגל דק בתחתית: רוחב מוגבל, אפור כהה + שקיפות + blur (תואם הדר בגלילה) */
  const barClass =
    "fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 pb-3 pt-2 md:px-4 md:pb-4 md:pt-3";
  const innerClass =
    "mx-auto w-full max-w-3xl rounded-xl border border-white/10 bg-[#1f1f1f]/95 shadow-lg shadow-black/20 backdrop-blur-xl";
  /* קודם: full-width bar, light/dark bg, py-5/6. עכשיו: max-w-3xl, dark bar, py-2/3 */

  return (
    <div className={barClass} role="dialog" aria-label="הסכמה לעוגיות" dir="rtl">
      <div className={`${innerClass} px-4 py-2.5 md:px-5 md:py-3`}>
        {!showSettings ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
              <p className="font-heading min-w-0 flex-1 text-xs font-medium leading-snug text-white/95 md:text-sm md:leading-relaxed">
                אנו משתמשים בעוגיות לשיפור הגלישה והתאמת תוכן.{" "}
                <Link
                  href="/privacy-policy"
                  className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-white"
                >
                  מדיניות פרטיות
                </Link>
              </p>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Button
                  onClick={acceptAll}
                  variant="primary"
                  className="!min-h-[38px] !rounded-lg !bg-white !px-4 !py-2 !text-sm !font-medium !text-zinc-900 !opacity-100 transition-colors hover:!bg-zinc-100 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!ring-offset-2 focus-visible:!ring-offset-[#1f1f1f]"
                >
                  אישור הכל
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="secondary"
                  className="!min-h-[38px] !rounded-lg !border-2 !border-white !bg-transparent !px-4 !py-2 !text-sm !font-medium !text-white !opacity-100 transition-colors hover:!bg-white/15 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!ring-offset-2 focus-visible:!ring-offset-[#1f1f1f]"
                >
                  דחיית הכל
                </Button>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="!min-h-[38px] min-w-0 shrink-0 rounded-lg border-2 border-white/70 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f]"
                >
                  הגדרות
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="font-heading mb-3 text-sm font-semibold text-white">העדפות עוגיות</p>
            <div className="space-y-3">
              <label className="flex cursor-not-allowed items-center justify-between gap-4 opacity-70">
                <span className="font-heading text-sm font-medium text-white/90">הכרחיות</span>
                <input type="checkbox" checked disabled className="h-4 w-4 rounded border-white/30" />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-heading text-sm font-medium text-white/90">אנליטיות</span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 focus:ring-2 focus:ring-white/40"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-heading text-sm font-medium text-white/90">שיווקיות</span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30 focus:ring-2 focus:ring-white/40"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                onClick={savePreferences}
                variant="primary"
                className="!min-h-[38px] !rounded-lg !bg-white !px-4 !py-2 !text-sm !font-medium !text-zinc-900 !opacity-100 transition-colors hover:!bg-zinc-100 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!ring-offset-2 focus-visible:!ring-offset-[#1f1f1f]"
              >
                שמור העדפות
              </Button>
              <Button
                onClick={() => setShowSettings(false)}
                variant="ghost"
                className="!min-h-[38px] !rounded-lg !border-2 !border-white/70 !bg-transparent !px-4 !py-2 !text-sm !font-medium !text-white !opacity-100 transition-colors hover:!bg-white/15 focus-visible:!ring-2 focus-visible:!ring-white focus-visible:!ring-offset-2 focus-visible:!ring-offset-[#1f1f1f]"
              >
                חזרה
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
