"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const MATERIAL_OPTIONS = [
  { value: "", label: "בחירת סוג חומר" },
  { value: "aluminum", label: "אלומיניום" },
  { value: "alucobond", label: "אלוקובונד (ACP)" },
  { value: "hpl", label: "HPL" },
  { value: "curtain-walls", label: "קירות מסך" },
  { value: "other", label: "אחר" },
];

const inputBaseClass =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-4 py-3 text-[var(--foreground)] transition-colors placeholder:text-zinc-400 focus:border-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20";

const API_SEND_FORM = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/send-form";

export function HomeQuoteForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [material, setMaterial] = useState("");
  const [startDate, setStartDate] = useState("");
  const [sqm, setSqm] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    const fields = {
      fullName,
      phone,
      email,
      projectArea,
      material,
      startDate,
      sqm,
      message,
    };
    try {
      const res = await fetch(API_SEND_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "home-quote",
          source: typeof window !== "undefined" ? window.location.href : "",
          fields,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "שליחה נכשלה. נסו שוב.");
        return;
      }
      setSent(true);
    } catch {
      setSubmitError("שליחה נכשלה. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h2 className="section-title">
          מעוניינים לשמוע עוד?
        </h2>
        <p className="section-subtitle">
          השאירו פרטים ונחזור אליכם בהקדם עם כל המידע והפתרונות לפרויקט הבא שלכם.
        </p>
      </div>

      {sent ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          תודה. הפרטים נשלחו. נחזור אליכם בהקדם.
        </p>
      ) : (
        <>
          {submitError && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
              {submitError}
            </p>
          )}
          <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-fullname" className="text-sm font-medium text-[var(--foreground)]">
              שם מלא
            </label>
            <input
              id="quote-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="ישראל ישראלי"
              autoComplete="name"
              className={inputBaseClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-phone" className="text-sm font-medium text-[var(--foreground)]">
              מספר טלפון
            </label>
            <input
              id="quote-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="050-1234567"
              autoComplete="tel"
              className={inputBaseClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-email" className="text-sm font-medium text-[var(--foreground)]">
              אימייל
            </label>
            <input
              id="quote-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              className={inputBaseClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-region" className="text-sm font-medium text-[var(--foreground)]">
              איזור הפרויקט
            </label>
            <input
              id="quote-region"
              type="text"
              value={projectArea}
              onChange={(e) => setProjectArea(e.target.value)}
              placeholder="לדוגמה: תל אביב"
              autoComplete="off"
              className={inputBaseClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-material" className="text-sm font-medium text-[var(--foreground)]">
              סוג חומר מבוקש
            </label>
            <select
              id="quote-material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className={inputBaseClass}
            >
              {MATERIAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-date" className="text-sm font-medium text-[var(--foreground)]">
              תאריך תחילת עבודה משוער
            </label>
            <div className="relative">
              <input
                id="quote-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`${inputBaseClass} pe-10`}
              />
              <span
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-zinc-400"
                aria-hidden
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote-sqm" className="text-sm font-medium text-[var(--foreground)]">
              היקף פרויקט במ&quot;ר
            </label>
            <input
              id="quote-sqm"
              type="text"
              inputMode="numeric"
              value={sqm}
              onChange={(e) => setSqm(e.target.value)}
              placeholder="לדוגמה: 500"
              className={inputBaseClass}
            />
          </div>
          <div className="hidden md:block" aria-hidden />
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="quote-message" className="text-sm font-medium text-[var(--foreground)]">
              הודעה / פרטים נוספים
            </label>
            <textarea
              id="quote-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ספרו לנו על פרטים נוספים אם יש..."
              rows={4}
              className={`${inputBaseClass} min-h-[120px] resize-y`}
            />
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-base md:w-auto md:min-w-[320px]"
            disabled={submitting}
          >
            {submitting ? "שולח..." : "שליחת בקשה להצעת מחיר"}
          </Button>
        </div>
      </form>
        </>
      )}
    </div>
  );
}
