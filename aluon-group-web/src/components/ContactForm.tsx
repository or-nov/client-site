"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <Card className="p-8 text-center" dir="rtl">
        <Prose>
          <p className="text-zinc-700 dark:text-zinc-300">
            תודה. הפרטים נשלחו. נחזור אליכם בהקדם.
          </p>
        </Prose>
      </Card>
    );
  }

  const inputClass =
    "w-full rounded-[var(--radius-lg)] border border-white/10 bg-white/5 px-4 py-2.5 text-zinc-900 dark:text-zinc-100";
  const labelClass = "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

  return (
    <Card as="section" className="p-6" dir="rtl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            שם
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            טלפון
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            אימייל
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            הודעה
          </label>
          <textarea id="message" name="message" rows={4} className={inputClass} />
        </div>
        <Button type="submit">שליחה</Button>
      </form>
    </Card>
  );
}
