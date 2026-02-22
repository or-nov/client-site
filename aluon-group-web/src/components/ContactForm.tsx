"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/* --- רק 2 בחירות מחלקה: מכירות | מחלקה טכנית (הוסר "רגיל" אם היה) --- */
type Department = "sales" | "technical";

const MATERIAL_OPTIONS = [
  { value: "", label: "בחר סוג חומר" },
  { value: "alucobond", label: "אלוקובונד" },
  { value: "hpl", label: "HPL" },
  { value: "aluminum", label: "אלומיניום" },
  { value: "curtain-walls", label: "קירות מסך" },
  { value: "other", label: "אחר" },
];

const ISSUE_TYPE_OPTIONS = [
  { value: "", label: "בחר סוג נושא" },
  { value: "technical-question", label: "שאלה טכנית" },
  { value: "material-spec", label: "מפרט חומר" },
  { value: "maintenance", label: "תחזוקה/תקלה" },
  { value: "installation", label: "תיאום התקנה" },
];

const URGENCY_OPTIONS = [
  { value: "low", label: "נמוכה" },
  { value: "medium", label: "בינונית" },
  { value: "high", label: "גבוהה" },
];

/* שדות משותפים – נשמרים במעבר בין מחלקות */
type SharedFields = {
  fullName: string;
  phone: string;
  email: string;
};

type SalesFields = {
  projectArea: string;
  startDate: string;
  materialType: string;
  scopeSqm: string;
  message: string;
};

type TechnicalFields = {
  issueType: string;
  urgency: string;
  issueDescription: string;
};

function isValidEmail(s: string): boolean {
  if (!s.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const baseInput =
  "w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-1 focus:border-[var(--foreground)] disabled:opacity-60 disabled:cursor-not-allowed";
const inputError = "border-red-500 focus:ring-red-500 focus:border-red-500";
const labelClass = "mb-1 block text-sm font-medium text-[var(--foreground)]";

const API_SEND_FORM = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/send-form";

export function ContactForm() {
  const [department, setDepartment] = useState<Department>("sales");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [shared, setShared] = useState<SharedFields>({
    fullName: "",
    phone: "",
    email: "",
  });
  const [sales, setSales] = useState<SalesFields>({
    projectArea: "",
    startDate: "",
    materialType: "",
    scopeSqm: "",
    message: "",
  });
  const [technical, setTechnical] = useState<TechnicalFields>({
    issueType: "",
    urgency: "medium",
    issueDescription: "",
  });

  const updateShared = (key: keyof SharedFields, value: string) => {
    setShared((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };
  const updateSales = (key: keyof SalesFields, value: string) => {
    setSales((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };
  const updateTechnical = (key: keyof TechnicalFields, value: string) => {
    setTechnical((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!shared.fullName.trim()) next.fullName = "שדה חובה";
    if (!shared.phone.trim()) next.phone = "שדה חובה";
    if (shared.email.trim() && !isValidEmail(shared.email)) next.email = "אימייל לא תקין";
    if (department === "sales") {
      // אופציונליים למכירות – רק אם רוצים חובה אפשר להוסיף
    }
    if (department === "technical") {
      // אופציונליים לטכני
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setSubmitting(true);
    const formType = department === "sales" ? "contact-sales" : "contact-technical";
    const fields: Record<string, string> = {
      ...shared,
      ...(department === "sales" ? sales : technical),
    };
    try {
      const res = await fetch(API_SEND_FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          source: typeof window !== "undefined" ? window.location.href : "",
          fields,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "שליחה נכשלה. נסו שוב או צרו קשר ישירות.");
        return;
      }
      setSent(true);
    } catch {
      setSubmitError("שליחה נכשלה. נסו שוב או צרו קשר ישירות.");
    } finally {
      setSubmitting(false);
    }
  }

  /* הודעת הצלחה – inline, ללא ניווט */
  if (sent) {
    return (
      <Card className="p-8 text-center" dir="rtl">
        <div className="mx-auto max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
            תודה. הפרטים נשלחו.
          </p>
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
            נחזור אליכם בהקדם.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card as="section" className="p-6 md:p-8" dir="rtl">
      {submitError && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
          {submitError}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* בחירת מחלקה – segmented control (רק מכירות | מחלקה טכנית) */}
        <div>
          <span className={labelClass}>מחלקה</span>
          <div
            className="mt-2 flex rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--border-subtle)] p-1"
            role="radiogroup"
            aria-label="בחירת מחלקה"
          >
            <button
              type="button"
              role="radio"
              aria-checked={department === "sales"}
              onClick={() => setDepartment("sales")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                department === "sales"
                  ? "bg-[var(--background-card)] text-[var(--foreground)] shadow-sm"
                  : "text-zinc-600 hover:text-[var(--foreground)] dark:text-zinc-400"
              }`}
            >
              מכירות
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={department === "technical"}
              onClick={() => setDepartment("technical")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                department === "technical"
                  ? "bg-[var(--background-card)] text-[var(--foreground)] shadow-sm"
                  : "text-zinc-600 hover:text-[var(--foreground)] dark:text-zinc-400"
              }`}
            >
              מחלקה טכנית
            </button>
          </div>
        </div>

        {/* Grid: 2 עמודות בדסקטופ, 1 במובייל */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              שם מלא <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={shared.fullName}
              onChange={(e) => updateShared("fullName", e.target.value)}
              className={`${baseInput} ${errors.fullName ? inputError : ""}`}
              placeholder="שם מלא"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              מספר טלפון <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={shared.phone}
              onChange={(e) => updateShared("phone", e.target.value)}
              className={`${baseInput} ${errors.phone ? inputError : ""}`}
              placeholder="טלפון"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className={labelClass}>
              אימייל (אופציונלי)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={shared.email}
              onChange={(e) => updateShared("email", e.target.value)}
              className={`${baseInput} ${errors.email ? inputError : ""}`}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* --- שדות דינמיים לפי מחלקה --- */}
        {department === "sales" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="projectArea" className={labelClass}>
                אזור הפרויקט
              </label>
              <input
                id="projectArea"
                name="projectArea"
                type="text"
                value={sales.projectArea}
                onChange={(e) => updateSales("projectArea", e.target.value)}
                className={baseInput}
                placeholder="אזור גיאוגרפי או עיר"
              />
            </div>
            <div>
              <label htmlFor="startDate" className={labelClass}>
                תאריך תחילת עבודה משוער
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={sales.startDate}
                onChange={(e) => updateSales("startDate", e.target.value)}
                className={baseInput}
              />
            </div>
            <div>
              <label htmlFor="materialType" className={labelClass}>
                סוג חומר מבוקש
              </label>
              <select
                id="materialType"
                name="materialType"
                value={sales.materialType}
                onChange={(e) => updateSales("materialType", e.target.value)}
                className={baseInput}
              >
                {MATERIAL_OPTIONS.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="scopeSqm" className={labelClass}>
                היקף פרויקט במ&quot;ר
              </label>
              <input
                id="scopeSqm"
                name="scopeSqm"
                type="number"
                min={0}
                step={1}
                value={sales.scopeSqm}
                onChange={(e) => updateSales("scopeSqm", e.target.value)}
                className={baseInput}
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className={labelClass}>
                הודעה / פרטים נוספים
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={sales.message}
                onChange={(e) => updateSales("message", e.target.value)}
                className={baseInput}
                placeholder="פרטים נוספים"
              />
            </div>
          </div>
        )}

        {department === "technical" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="issueType" className={labelClass}>
                נושא / סוג תקלה
              </label>
              <select
                id="issueType"
                name="issueType"
                value={technical.issueType}
                onChange={(e) => updateTechnical("issueType", e.target.value)}
                className={baseInput}
              >
                {ISSUE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value || "empty"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="urgency" className={labelClass}>
                דחיפות
              </label>
              <select
                id="urgency"
                name="urgency"
                value={technical.urgency}
                onChange={(e) => updateTechnical("urgency", e.target.value)}
                className={baseInput}
              >
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="issueDescription" className={labelClass}>
                תיאור התקלה
              </label>
              <textarea
                id="issueDescription"
                name="issueDescription"
                rows={4}
                value={technical.issueDescription}
                onChange={(e) => updateTechnical("issueDescription", e.target.value)}
                className={baseInput}
                placeholder="תאר את התקלה או השאלה"
              />
            </div>
          </div>
        )}

        <div className="mt-2">
          <Button type="submit" onClick={() => setSubmitError(null)} disabled={submitting}>
            {submitting ? "שולח..." : "שליחה"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

/* --- קוד ישן (נושא select יחיד, שדות אחידים) – להחזרה ---
const SUBJECTS_BY_DEPARTMENT = { sales: [...], technical: [...] };
subject, setSubject, single subject select, name/phone/email/message only.
--- */
