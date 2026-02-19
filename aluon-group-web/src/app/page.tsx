import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Prose } from "@/components/ui/Prose";
import { Media } from "@/components/ui/Media";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeroQuoteCTA } from "@/components/HeroQuoteCTA";

const { home } = siteContent;
const { hero, solutions, whyUs, projectsPreview } = home;

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

function SolutionIcon() {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--background-card)] shadow-[var(--shadow-sm)]"
      aria-hidden
    >
      <svg className="h-5 w-5 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen">
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

      {/* 2) Solutions */}
      <Section
        id="solutions"
        title="הפתרונות שלנו"
        className="bg-[var(--background)]"
      >
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block h-full"
              >
                <Card className="flex h-full flex-col gap-4 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--border)]">
                  {item.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Media src={item.image} ratio="4/3" sizes="(max-width: 1024px) 50vw, 25vw" />
                    </div>
                  ) : (
                    <SolutionIcon />
                  )}
                  <Heading as="h3">{item.title}</Heading>
                  {item.description && (
                    <Prose className="text-sm text-zinc-600 dark:text-zinc-400">
                      <p>{item.description}</p>
                    </Prose>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)] underline-offset-4 transition-all group-hover:gap-2 group-hover:underline">
                    לפרטים
                    <span aria-hidden>←</span>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3) Projects preview */}
      <Section id="projects-preview" title="פרויקטים נבחרים">
        <Container>
          {projectsPreview.length > 0 ? (
            <>
              <div className="mb-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {projectsPreview.map((item, i) => (
                  <Link
                    key={i}
                    href="/projects"
                    className="group relative block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--background-card)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  >
                    {item.image ? (
                      <div className="relative aspect-[4/3]">
                        <Media
                          src={item.image}
                          ratio="4/3"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <span className="text-sm font-medium text-white">{item.title}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-[var(--border-subtle)]" aria-hidden />
                    )}
                  </Link>
                ))}
              </div>
              <Button href="/projects" variant="secondary">
                לכל הפרויקטים
              </Button>
            </>
          ) : (
            <Button href="/projects" variant="secondary">
              לכל הפרויקטים
            </Button>
          )}
        </Container>
      </Section>

      {/* 4) Why us */}
      <Section id="why-us" title={whyUs.title} className="bg-[var(--background)]">
        <Container className="max-w-3xl">
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyUs.items.map((item, i) => (
              <Card
                as="li"
                key={i}
                className="px-5 py-4 transition-all duration-200 hover:shadow-[var(--shadow-md)]"
              >
                <span className="text-[var(--foreground)]">{item}</span>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 5) Bottom CTA */}
      <Section id="contact-cta">
        <Container className="max-w-2xl">
          <Card className="flex flex-col items-center gap-6 rounded-[var(--radius-xl)] p-8 text-center md:p-12">
            <Heading as="h2">מעוניינים לשמוע עוד?</Heading>
            {hero.ctaSummary && (
              <Prose className="text-center">
                <p>{hero.ctaSummary}</p>
              </Prose>
            )}
            <Button href="/contact">דברו איתנו</Button>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
