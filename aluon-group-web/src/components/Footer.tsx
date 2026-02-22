import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";

/* === מינימלי: רק 3 קישורים + זכויות. ערכים ישנים (עמודות/ניווט) מוסתרים להחזרה === */
const footerLegalLinks = [
  { label: "מדיניות פרטיות", href: "/privacy-policy" },
  { label: "הצהרת נגישות", href: "/accessibility" },
  { label: "שינוי העדפות למדיניות הפרטיות", href: "/privacy-policy#העדפות" },
];

// --- קוד ישן (עמודות/ניווט) – להחזרה ---
// const mainLinks = [ { label: "בית", href: "/" }, { label: "אודות", href: "/about" }, { label: "פרויקטים", href: "/projects" } ];
// const contentLinks = [ { label: "מאמרים", href: "/articles" }, { label: "צור קשר", href: "/contact" } ];
// const solutionLinks = [ { label: "אלומיניום", href: "/claddings/aluminum" }, { label: "אלוקובונד", href: "/claddings/alucobond" }, { label: "HPL", href: "/claddings/hpl" }, { label: "קירות מסך", href: "/claddings/curtain-walls" } ];

const HUB_URL = "https://hub.co.il/";

export function Footer() {
  return (
    <footer
      className="w-full border-t border-[var(--border-subtle)] bg-[var(--background-card)]"
      dir="rtl"
    >
      <Container className="py-4 md:py-5">
        {/* קישורים: שורה אחת בדסקטופ, יכולים לרדת לשתי שורות במובייל */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-between md:gap-x-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-center" aria-label="קישורים משפטיים">
            {footerLegalLinks.map(({ label, href }, i) => (
              <Fragment key={href}>
                {i > 0 && <span className="text-zinc-400 dark:text-zinc-500" aria-hidden>|</span>}
                <Link
                  href={href}
                  className="text-xs text-zinc-600 underline-offset-2 transition-colors hover:underline dark:text-zinc-400 dark:hover:text-zinc-300"
                >
                  {label}
                </Link>
              </Fragment>
            ))}
            <span className="text-zinc-400 dark:text-zinc-500" aria-hidden>|</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">התמונות באתר להמחשה בלבד.</span>
          </nav>
          {/* זכויות: "האב מערכות" קישור ל־hub.co.il בלשונית חדשה */}
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 md:text-left">
            כל הזכויות שמורות לחברת{" "}
            <a
              href={HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] underline-offset-2 transition-colors hover:underline"
            >
              האב מערכות
            </a>{" "}
            בע&quot;מ.
          </p>
        </div>
      </Container>

      {/* פוטר ישן: py-12 md:py-16, grid 3 עמודות, © year Alu-on – להחזרה */}
    </footer>
  );
}
