import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TechnicalDownloadsSection } from "@/components/sections/TechnicalDownloadsSection";

const INTRO_TEXT =
  "Alu-on group מעמידה לרשותכם מחלקה טכנית מקצועית לליווי אדריכלי צמוד משלב התכנון ועד לפרט האחרון. כאן תוכלו למצוא את כל המידע הטכני, מפרטי ביצוע וקבצי CAD הדרושים לעבודה מדויקת ואיכותית.";

export default function ArchitectsPage() {
  return (
    <div dir="rtl">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="font-heading text-center text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
            איזור אדריכלים
          </h1>
          <div className="mt-8 text-center">
            <p className="font-heading max-w-2xl mx-auto text-lg leading-[1.85] font-medium text-[var(--foreground)]/90">
              {INTRO_TEXT}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3.5 text-sm font-semibold text-[var(--background)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
            >
              <HeadsetIcon className="h-5 w-5 shrink-0" aria-hidden />
              ייעוץ מחלקה טכנית
            </Link>
          </div>
        </Container>
      </Section>

      <TechnicalDownloadsSection />
    </div>
  );
}

function HeadsetIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V9a3 3 0 116 0v3.75a3 3 0 01-3 3z" />
    </svg>
  );
}
