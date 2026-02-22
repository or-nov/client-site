import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "הצהרת נגישות | Alu-on group",
  description:
    'הצהרת נגישות לאתר Alu-on group בהתאם לתקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט.',
};

const LAST_UPDATED = "פברואר 2025";

export default function AccessibilityPage() {
  return (
    <div dir="rtl" className="min-h-screen">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
            הצהרת נגישות
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            תאריך עדכון אחרון: {LAST_UPDATED}
          </p>

          <Prose className="mt-10 space-y-8">
            <section aria-labelledby="level-heading">
              <h2
                id="level-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                רמת נגישות האתר
              </h2>
              <p>
                Alu-on group מחויבת להנגשת האתר לכלל הגולשים. האתר נבנה במטרה לעמוד בדרישות תקן
                ישראלי 5568 לנגישות תכנים באינטרנט, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות,
                התשנ&quot;ח–1998. אנו שואפים לעמוד ב־WCAG 2.0 ברמת AA כבסיס לתקן ת&quot;י 5568.
              </p>
            </section>

            <section aria-labelledby="means-heading">
              <h2
                id="means-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                אמצעי נגישות באתר
              </h2>
              <ul className="list-inside list-disc space-y-2 text-[var(--foreground)]">
                <li>ניווט מלא באמצעות מקלדת (Tab, Shift+Tab, Enter, Esc)</li>
                <li>תצוגת פוקוס נראית (מסגרת ברורה סביב אלמנטים במעבר מקלדת)</li>
                <li>
                  כפתור נגישות צף: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים (קו תחתון), הפחתת
                  תנועה, מצב אפור, קישור להצהרת נגישות
                </li>
                <li>מבנה כותרות ותוכן סמנטי (h1, h2, רשימות) תומך קוראי מסך</li>
                <li>ניגודיות צבעים וטקסט ברור</li>
                <li>קישורים ורכיבי ניווט עם תיאור ברור</li>
              </ul>
            </section>

            <section aria-labelledby="keyboard-heading">
              <h2
                id="keyboard-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                תפעול באמצעות מקלדת
              </h2>
              <ul className="list-inside list-disc space-y-2 text-[var(--foreground)]">
                <li>
                  <strong>Tab</strong> — מעבר לרכיב הבא (קישור, כפתור, שדה)
                </li>
                <li>
                  <strong>Shift+Tab</strong> — מעבר לרכיב הקודם
                </li>
                <li>
                  <strong>Enter</strong> — הפעלת קישור או כפתור
                </li>
                <li>
                  <strong>Esc</strong> — סגירת תפריט/חלון קופץ (במידה וקיים)
                </li>
              </ul>
            </section>

            <section aria-labelledby="browsers-heading">
              <h2
                id="browsers-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                תאימות דפדפנים ומכשירים
              </h2>
              <p>
                האתר משתמש בטכנולוגיות תואמות נגישות (HTML5, CSS3, JavaScript). מומלץ לגלוש
                בדפדפנים מעודכנים: Chrome, Firefox, Edge, Safari ובמכשירים ניידים תומכי נגישות.
                האתר תומך בניווט מקלדת, בקוראי מסך ובהגדלת טקסט דרך כפתור הנגישות.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <h2
                id="limitations-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                סייגים / רכיבים לא נגישים
              </h2>
              <p>
                ייתכן שבחלק מהדפים או בתוכן חיצוני (סרטונים, מסמכים ישנים) עדיין קיימות חריגות
                מהתקן. אנו ממשיכים לשפר את הנגישות ולעדכן תכנים. אם נתקלת בבעיה — נשמח לדעת.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                דרכי פנייה לתיקון ופרטי רכז/ת נגישות
              </h2>
              <p>
                אם יש לך קושי בגלישה או צורך בהתאמה (מסמך נגיש, מידע חלופי), ניתן לפנות אלינו
                באמצעות{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--foreground)] underline underline-offset-4 hover:opacity-90"
                >
                  צור קשר
                </Link>
                . נשתדל לטפל בפנייה בהקדם ולספק פתרון סביר בהתאם לחוק.
              </p>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                רכז/ת נגישות: [שם ומשרה — להשלים במידה וקיים]. ניתן לפנות גם דרך טופס צור קשר
                בדף{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-4 hover:opacity-90"
                >
                  צור קשר
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="standards-heading">
              <h2
                id="standards-heading"
                className="font-heading text-xl font-semibold text-[var(--foreground)]"
              >
                מקורות וסטנדרטים
              </h2>
              <p>
                הצהרה זו נכתבה בהתאם לתקן ישראלי 5568 לנגישות תכנים באינטרנט (המבוסס על WCAG
                2.0/2.1) ולנהלי נגישות השירות של משרד המשפטים. עדכונים להצהרה יפורסמו בדף זה.
              </p>
            </section>

            <p className="border-t border-[var(--border-subtle)] pt-6 text-sm text-zinc-500 dark:text-zinc-400">
              תאריך עדכון אחרון: {LAST_UPDATED}
            </p>
          </Prose>
        </Container>
      </Section>
    </div>
  );
}
