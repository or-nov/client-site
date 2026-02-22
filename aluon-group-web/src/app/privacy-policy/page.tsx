import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/ui/Prose";

const TITLE = "מדיניות פרטיות ותנאי שימוש";
const LAST_UPDATED = "פברואר 2025";

export default function PrivacyPolicyPage() {
  return (
    <div dir="rtl">
      <Section className="pb-16 pt-10 md:pb-24 md:pt-16">
        <Container className="max-w-3xl">
          <header className="mb-12 text-center md:mb-16">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
              {TITLE}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              תאריך עדכון אחרון: {LAST_UPDATED}
            </p>
          </header>

          <div className="space-y-10">
            <section aria-labelledby="who-heading">
              <h2
                id="who-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                1. מי אנחנו ופרטי בעל האתר / המפעיל
              </h2>
              <Prose className="mt-4">
                <p>
                  האתר מנוהל על ידי [שם החברה / בעל האתר — להשלמה]. פרטי יצירת קשר: [כתובת — להשלמה],
                  [טלפון — להשלמה], [דוא&quot;ל — להשלמה]. מטרת האתר היא הצגת שירותים ומוצרים (מעטפת
                  הבניין, חיפויים) וקבלת פניות מלקוחות פוטנציאליים (לידים) באמצעות טפסי צור קשר.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="collect-heading">
              <h2
                id="collect-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                2. איזה מידע נאסף
              </h2>
              <Prose className="mt-4">
                <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
                <ul>
                  <li>
                    <strong>פרטי קשר:</strong> שם מלא, מספר טלפון, כתובת דוא&quot;ל, אזור פרויקט, פרטים
                    נוספים שהמשתמש מזין בטפסי האתר (צור קשר, מכירות, מחלקה טכנית).
                  </li>
                  <li>
                    <strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, לוגים של גישה לאתר
                    (תאריך, שעה, דף).
                  </li>
                  <li>
                    <strong>עוגיות (Cookies) ומזהים דומים:</strong> קבצי Cookie להפעלת האתר, לזכירת
                    העדפות (כולל העדפות נגישות והסכמה לעוגיות), ולצורכי סטטיסטיקה ואנליטיקס במידה
                    והמשתמש אישר זאת.
                  </li>
                </ul>
              </Prose>
            </section>

            <section aria-labelledby="purposes-heading">
              <h2
                id="purposes-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                3. מטרות השימוש במידע
              </h2>
              <Prose className="mt-4">
                <ul>
                  <li>מתן מענה לפניות ולבקשות שהתקבלו דרך הטופס והחזרת קשר ללקוחות פוטנציאליים.</li>
                  <li>שיפור האתר, חוויית הגלישה והשירות.</li>
                  <li>ניתוח שימוש באתר (בהתאם להעדפות העוגיות) לצורכי סטטיסטיקה.</li>
                  <li>עמידה בחובות חוקיים ורגולטוריים.</li>
                </ul>
              </Prose>
            </section>

            <section aria-labelledby="sharing-heading">
              <h2
                id="sharing-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                4. שיתוף מידע עם צדדים שלישיים
              </h2>
              <Prose className="mt-4">
                <p>
                  מידע עשוי להיות מועבר או נגיש לצדדים שלישיים רק במידה הנדרשת למטרות המפורטות
                  במדיניות זו, ובכפוף להתחייבויות סודיות והגנת מידע, לרבות:
                </p>
                <ul>
                  <li>
                    <strong>אחסון וספקי ענן:</strong> אחסון המידע על שרתים (כולל שרתים בחו&quot;ל) אצל
                    ספקי תשתית [להשלמה – שם ספק אם רלוונטי].
                  </li>
                  <li>
                    <strong>אנליטיקס:</strong> שירותי ניתוח שימוש באתר (למשל Google Analytics או
                    דומים), רק אם המשתמש אישר עוגיות אנליטיות בהגדרות.
                  </li>
                  <li>
                    <strong>שירותי דוא&quot;ל / תקשורת:</strong> שליחת הודעות וטיפול בפניות דרך
                    מערכות דוא&quot;ל או CRM [להשלמה – אם קיים].
                  </li>
                </ul>
                <p>
                  איננו מוכרים או מעבירים מידע אישי לצד שלישי למטרות שיווק של צד שלישי, מלבד כפי
                  שמפורט לעיל או כנדרש על פי דין.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="security-heading">
              <h2
                id="security-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                5. אבטחת מידע
              </h2>
              <Prose className="mt-4">
                <p>
                  החברה מיישמת אמצעי אבטחה סבירים (כולל הצפנה, גישה מוגבלת, אבטחת תקשורת) כדי להגן
                  על המידע מפני גישה לא מורשית, שינוי, חשיפה או מחיקה. התקשורת לאתר מוצפנת (SSL/TLS) במידת האפשר. אין אחריות מוחלטת מפני פריצות; אנו מתחייבים לפעול בהתאם לסטנדרט
                  המקובל בענף.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="retention-heading">
              <h2
                id="retention-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                6. שמירת מידע ומשך שמירה
              </h2>
              <Prose className="mt-4">
                <p>
                  מידע נשמר כל עוד נדרש לצורך המטרות שפורטו (טיפול בפניות, שיפור שירות, עמידה
                  בחובות חוקיים). לוגים טכניים נשמרים לתקופה מוגבלת [להשלמה – למשל 12–24 חודשים].
                  לאחר מכן מידע עשוי להיות מושמד או anonymized, בכפוף לדין.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="rights-heading">
              <h2
                id="rights-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                7. זכויות המשתמש
              </h2>
              <Prose className="mt-4">
                <p>
                  בהתאם לחוק הגנת הפרטיות, התשמ&quot;א–1981, ולכל דין ישים, אתה זכאי:
                </p>
                <ul>
                  <li>
                    <strong>עיון:</strong> לעיין במידע המוחזק עליך אצלנו.
                  </li>
                  <li>
                    <strong>תיקון:</strong> לבקש תיקון מידע לא מדויק או לא מעודכן.
                  </li>
                  <li>
                    <strong>מחיקה:</strong> לבקש מחיקת מידע, בכפוף למגבלות החוק (למשל שמירה לצורך
                    הוכחה או חובה חוקית).
                  </li>
                  <li>
                    <strong>פניה:</strong> להגיש תלונה או פניה לרשות להגנת הפרטיות או לגורם הפנימי
                    במפעיל האתר.
                  </li>
                </ul>
                <p>
                  למימוש הזכויות ניתן לפנות אלינו באמצעות{" "}
                  <Link href="/contact">צור קשר</Link> או לפרטי ההתקשרות שמופיעים בסעיף 1 [כשמושלמים].
                </p>
              </Prose>
            </section>

            <section aria-labelledby="cookies-heading">
              <h2
                id="cookies-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                8. עוגיות (Cookies) והעדפות
              </h2>
              <Prose className="mt-4">
                <p>
                  האתר משתמש בעוגיות: עוגיות הכרחיות לתפעול האתר, ועוגיות אופציונליות (אנליטיקס,
                  שיווק) — רק בהתאם להעדפתך. ניתן לנהל את העדפות העוגיות דרך סרגל ההסכמה לעוגיות
                  שמופיע בתחתית הדף, או דרך הגדרות הדפדפן.
                </p>
                <p>
                  לשינוי העדפות עוגיות: לחץ על &quot;הגדרות&quot; בסרגל העוגיות, או נצל את הקישור
                  &quot;שינוי העדפות למדיניות הפרטיות&quot; בתחתית האתר.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="links-heading">
              <h2
                id="links-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                9. קישורים לאתרים חיצוניים
              </h2>
              <Prose className="mt-4">
                <p>
                  האתר עשוי לכלול קישורים לאתרים חיצוניים. אין לנו שליטה על תוכן או מדיניות
                  הפרטיות של אתרים אלה. השימוש באתרים חיצוניים כפוף למדיניות הפרטיות ולתנאי השימוש
                  של האתר החיצוני.
                </p>
              </Prose>
            </section>

            <section aria-labelledby="changes-heading">
              <h2
                id="changes-heading"
                className="font-heading mb-3 text-xl font-bold tracking-tight text-[var(--foreground)]"
              >
                10. שינויים במדיניות ותאריך עדכון
              </h2>
              <Prose className="mt-4">
                <p>
                  אנו רשאים לעדכן מדיניות פרטיות זו מעת לעת. עדכונים משמעותיים יפורסמו בדף זה
                  ויצוין תאריך העדכון. המשך שימוש באתר לאחר פרסום שינוי מהווה הסכמה לעדכון, בכפוף
                  לדין. תאריך עדכון אחרון: {LAST_UPDATED}.
                </p>
              </Prose>
            </section>
          </div>

          <p className="mt-12 text-center">
            <Link
              href="/contact"
              className="font-heading text-sm font-medium text-[var(--foreground)] underline underline-offset-4 transition-colors hover:opacity-90"
            >
              צור קשר
            </Link>
          </p>
        </Container>
      </Section>
    </div>
  );
}
