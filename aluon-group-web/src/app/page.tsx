import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/ui/Prose";
import { Media } from "@/components/ui/Media";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeroQuoteCTA } from "@/components/HeroQuoteCTA";
import { RevealMotion } from "@/components/RevealMotion";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HomeIntroSplit } from "@/components/sections/HomeIntroSplit";
import { HomeValuesSection } from "@/components/sections/HomeValuesSection";
import { HomeQuoteForm } from "@/components/sections/HomeQuoteForm";

const { home } = siteContent;
const { hero, solutions } = home;

/** Split title so last word can get accent underline (RTL: last word = leftmost) */
function HeroTitle({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) {
    return <span className="hero-headline-accent">{title}</span>;
  }
  const last = parts.pop()!;
  return (
    <span className="hero-headline">
      {parts.join(" ")} <span className="hero-headline-accent">{last}</span>
    </span>
  );
}

type ServiceIconType = "download" | "layout" | "wrench" | "cpu";

const iconWrapperClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--background-card)] shadow-[var(--shadow-sm)]";
const iconSvgClass = "h-5 w-5 text-[var(--foreground)]";

/** Per-category icon for Solutions cards (same size/stroke as original). */
function SolutionIconFor({ href }: { href: string }) {
  const isCurtainWalls = href.includes("curtain-walls");
  const isHpl = href.includes("hpl");
  const isAlucobond = href.includes("alucobond");
  const isAluminum = href.includes("aluminum");

  const defaultBuildingPath =
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4";

  return (
    <div className={iconWrapperClass} aria-hidden>
      <svg className={iconSvgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        {isCurtainWalls && <path strokeLinecap="round" strokeLinejoin="round" d={defaultBuildingPath} />}
        {isHpl && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v3H4V6zm0 5h16v3H4v-3zm0 5h16v3H4v-3z" />
        )}
        {isAlucobond && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6zm2 2v8h12V8H6z" />
        )}
        {isAluminum && <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        {!isCurtainWalls && !isHpl && !isAlucobond && !isAluminum && (
          <path strokeLinecap="round" strokeLinejoin="round" d={defaultBuildingPath} />
        )}
      </svg>
    </div>
  );
}

/** Icons for Services cards: Wrench, Cpu, Layout, Download (Heroicons-style). */
function ServiceIcon({ type }: { type: ServiceIconType }) {
  const svgProps = {
    className: iconSvgClass,
    fill: "none" as const,
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 2,
  };
  return (
    <div className={iconWrapperClass} aria-hidden>
      <svg {...svgProps}>
        {type === "wrench" && (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l2.496-3.03c.527-.534.527-1.397 0-1.93l-4.869-4.869a1.25 1.25 0 00-1.768 0L6.5 10.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </>
        )}
        {type === "cpu" && (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </>
        )}
        {type === "layout" && (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15A2.25 2.25 0 016 12.75h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018 20.25H6A2.25 2.25 0 013.75 18v-3zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-3z" />
          </>
        )}
        {type === "download" && (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9l4.5 4.5m0 0l4.5-4.5m-4.5 4.5V3" />
          </>
        )}
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen relative">
      {/* 1) Hero with background image (full-width section, no Section Container) */}
      <section
        id="hero"
        className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden py-[var(--section-gap)]"
      >
        {hero.backgroundImage && (
          <div className="hero-media">
            <div className="hero-media-inner">
              <Image
                src={hero.backgroundImage}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}
        {hero.backgroundImage && <div className="hero-overlay" aria-hidden />}
        <div className="hero-grain absolute inset-0 z-[1] opacity-[0.04]" aria-hidden />
        <Container className="relative z-10 flex max-w-3xl flex-col items-center justify-center gap-6 text-center">
          <h1 className="font-heading hero-headline text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            <HeroTitle title={hero.title} />
          </h1>
          {hero.subtitle && (
            <Prose className="max-w-[55ch] text-center text-lg text-white/90 drop-shadow-sm [&_p]:!text-white/90">
              <p>{hero.subtitle}</p>
            </Prose>
          )}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
            <HeroQuoteCTA label={hero.ctas[0].label} />
            <Button
              href={hero.ctas[1].href}
              variant="secondary"
              className="min-h-[44px] rounded-full border-2 border-white bg-transparent px-6 py-3 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 hover:border-white"
            >
              {hero.ctas[1].label}
            </Button>
          </div>
          {hero.trustChips.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {hero.trustChips.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 transition-colors hover:bg-white/15"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      <SectionDivider />

      {/* 2) Intro: text right, image left (RTL) */}
      <RevealMotion>
        <HomeIntroSplit />
      </RevealMotion>

      <SectionDivider />

      {/* 3) Solutions — same structure/card styling as HomeValuesSection */}
      <Section id="solutions" className="bg-[var(--background)]">
        <Container>
          <RevealMotion>
            <div className="text-center">
              <h2 className="section-title">
                הפתרונות שלנו
              </h2>
              <p className="section-subtitle">
                מגוון חומרים וטכנולוגיות מתקדמות למעטפת בניין מושלמת.
              </p>
            </div>
          </RevealMotion>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item, i) => (
              <RevealMotion key={item.href} delay={i * 0.1}>
                <Link href={item.href} className="group block h-full">
                  <AnimatedCard className="h-full">
                    <Card className="values-card flex h-full flex-col items-center p-8 text-center transition-colors duration-200 hover:border-[var(--border)]">
                      {item.image ? (
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                          <Media src={item.image} ratio="4/3" sizes="(max-width: 1024px) 50vw, 33vw" />
                        </div>
                      ) : (
                        <SolutionIconFor href={item.href} />
                      )}
                      <h3 className="card-title mt-5">{item.title}</h3>
                    {item.description && (
                      <Prose className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <p>{item.description}</p>
                      </Prose>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)] underline-offset-4 transition-all group-hover:gap-2 group-hover:underline">
                      לפרטים
                      <span aria-hidden>←</span>
                    </span>
                  </Card>
                  </AnimatedCard>
                </Link>
              </RevealMotion>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values: דיוק, עמידות, עיצוב */}
      <HomeValuesSection id="values" />

      <SectionDivider />

      {/* 4) Our Services — same layout and card style as Solutions */}
      <Section id="services" className="bg-[var(--background)]">
        <Container>
          <RevealMotion>
            <div className="text-center">
              <h2 className="section-title">
                השירותים שלנו
              </h2>
              <p className="section-subtitle">
                ממעטפת מלאה של שירותים המבטיחה איכות ודיוק בכל שלב בפרויקט.
              </p>
            </div>
          </RevealMotion>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(
              [
                {
                  title: "ייבוא חומרים",
                  description:
                    "אנו מייבאים את חומרי הגלם האיכותיים ביותר, כולל פאנלי HPL וקומפוזיט מהיצרנים המובילים בעולם.",
                  icon: "wrench",
                },
                {
                  title: "תכנון והדמיה",
                  description:
                    "צוות התכנון שלנו מספק שירותי הדמיה ושרטוטים טכניים (Shop Drawings) להמחשת הפתרון המושלם.",
                  icon: "cpu",
                },
                {
                  title: "ייצור ועיבוד",
                  description:
                    "במפעל המתקדם שלנו, אנו מעבדים HPL ואלומיניום בטכנולוגיית CNC מדויקת לפי דרישות הפרויקט.",
                  icon: "layout",
                },
                {
                  title: "אביזרים והתקנה",
                  description:
                    "אנו מספקים את כל האביזרים הנלווים ומבצעים התקנה מקצועית העומדת בתקנים המחמירים ביותר.",
                  icon: "download",
                },
              ] as const
            ).map((item, i) => (
              <RevealMotion key={item.title} delay={i * 0.1}>
                <Link href="/contact" className="group block h-full">
                  <AnimatedCard className="h-full">
                    <Card className="values-card flex h-full flex-col items-center rounded-2xl p-8 text-center transition-colors duration-200 hover:border-[var(--border)]">
                      <ServiceIcon type={item.icon} />
                    <h3 className="card-title mt-5">
                      {item.title}
                    </h3>
                      <Prose className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <p>{item.description}</p>
                      </Prose>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)] underline-offset-4 transition-all group-hover:gap-2 group-hover:underline">
                        לפרטים
                        <span aria-hidden>←</span>
                      </span>
                    </Card>
                  </AnimatedCard>
                </Link>
              </RevealMotion>
            ))}
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* 5) Contact / Quote form */}
      <RevealMotion>
        <Section id="contact-cta" className="py-16 md:py-20">
          <Container>
            <HomeQuoteForm />
          </Container>
        </Section>
      </RevealMotion>
    </div>
  );
}
