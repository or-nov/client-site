import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { RevealMotion } from "@/components/RevealMotion";
import { AnimatedCard } from "@/components/AnimatedCard";

/** Reusable "דיוק, עמידות, עיצוב" section — 3 cards with icons. Same layout/animations as original. */
export function HomeValuesSection({ id = "values" }: { id?: string }) {
  return (
    <Section id={id} className="bg-[var(--background)]">
      <Container>
        <RevealMotion>
          <div className="text-center">
            <h2 className="section-title">
              דיוק, עמידות, עיצוב.
            </h2>
            <p className="section-subtitle">
              ערכי הליבה שלנו נטועים בכל מוצר שאנו יוצרים, ומבטיחים אורך חיים וביצועים ללא פשרות.
            </p>
          </div>
        </RevealMotion>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <RevealMotion delay={0}>
            <AnimatedCard className="h-full">
              <Card className="values-card flex h-full flex-col items-center p-8 text-center transition-colors duration-200 hover:border-[var(--border)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                  <svg className="h-7 w-7 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c-2 5-3 9-3 13 0 3 1.5 5 3 5s3-2 3-5c0-4-1-8-3-13z" />
                  </svg>
                </div>
                <h3 className="card-title mt-5">יוקרה בת־קיימא</h3>
                <Prose className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>פתרונות חזית עם אסתטיקה נקייה ורכיבים בני־מחזור, בהתאמה לסטנדרטים של בנייה מתקדמת.</p>
                </Prose>
              </Card>
            </AnimatedCard>
          </RevealMotion>
          <RevealMotion delay={0.1}>
            <AnimatedCard className="h-full">
              <Card className="values-card flex h-full flex-col items-center p-8 text-center transition-colors duration-200 hover:border-[var(--border)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                  <svg className="h-7 w-7 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 110 8 4 4 0 010-8zm0 0V4m0 4v12" />
                  </svg>
                </div>
                <h3 className="card-title mt-5">עמידות לסביבה ימית</h3>
                <Prose className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>מערכות חיפוי ותתי־קונסטרוקציה שמותאמות לתנאי חוץ ומליחות, להפחתת קורוזיה ושמירה על ביצועים.</p>
                </Prose>
              </Card>
            </AnimatedCard>
          </RevealMotion>
          <RevealMotion delay={0.2}>
            <AnimatedCard className="h-full">
              <Card className="values-card flex h-full flex-col items-center p-8 text-center transition-colors duration-200 hover:border-[var(--border)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                  <svg className="h-7 w-7 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="card-title mt-5">טכנולוגיית אלומיניום מלא</h3>
                <Prose className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <p>פאנלים מאלומיניום מלא לחיפוי חזיתות, עם קשיחות גבוהה, עמידות לאורך זמן וגימור מדויק.</p>
                </Prose>
              </Card>
            </AnimatedCard>
          </RevealMotion>
        </div>
      </Container>
    </Section>
  );
}
