"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";

const mainNav = [
  { label: "בית", href: "/" },
  { label: "פרויקטים", href: "/projects" },
  { label: "איזור אדריכלים", href: "/architects" },
  { label: "מאמרים", href: "/articles" },
  { label: "אודות", href: "/about" },
];

const contactHref = "/contact";
/* TODO: להחליף למספר הטלפון האמיתי של העסק בפורמט בינלאומי */
const phoneHref = "tel:+972000000000";

/** Fallback when solutions not passed from layout (title only, no placeholder) */
const solutionsNavFallback = [
  { title: "אלומיניום", description: "", href: "/claddings/aluminum" },
  { title: "אלוקובונד (ACP)", description: "", href: "/claddings/alucobond" },
  { title: "HPL", description: "", href: "/claddings/hpl" },
  { title: "קירות מסך", description: "", href: "/claddings/curtain-walls" },
];

type SolutionItem = { title: string; description: string; href: string };

export function Header({ solutions }: { solutions?: SolutionItem[] }) {
  const solutionsNav = solutions?.length ? solutions : solutionsNavFallback;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // רקע מעט יותר שקוף רק בזמן גלילה
  useEffect(() => {
    const onScroll = () => setIsScrolled(typeof window !== "undefined" && window.scrollY > 10);
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on click outside (desktop)
  useEffect(() => {
    if (!dropdownOpen) return;
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [dropdownOpen]);

  const navLinkClass =
    "font-heading relative rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white/90 transition-all duration-200 hover:text-white hover:opacity-100 after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-current after:transition-all after:duration-200 hover:after:w-3/4";

  return (
    <header
      className={`sticky top-0 z-50 w-full rounded-b-2xl border border-white/10 shadow-lg shadow-black/20 ${isScrolled ? "bg-[#2a2a2a]/95" : "bg-[#1f1f1f]"}`}
      dir="rtl"
    >
      {/* בראש: bg-[#1f1f1f]. בגלילה: היה bg-[#1f1f1f]/95 → עכשיו bg-[#2a2a2a]/95 (בהיר-מעט) */}
      {/* min-h was min-h-[100px]; py was py-3 */}
      <Container className="relative flex min-h-[80px] flex-wrap items-center justify-between gap-4 px-4 py-2 md:px-6">
        {/* Logo – 2x size (90px max height); aspect ratio preserved */}
        <Link
          href="/"
          className="header-logo relative z-10 flex shrink-0 items-center"
          style={{ backgroundColor: "transparent" }}
          aria-label="Alu-on group – דף הבית"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="Alu-on group"
            className="header-logo-img max-h-[90px] h-auto w-auto object-contain object-right drop-shadow-sm"
            style={{ backgroundColor: "transparent" }}
            width={320}
            height={90}
            fetchPriority="high"
          />
        </Link>

        {/* Desktop: pill nav vertically centered with logo */}
        <div className="absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 items-center justify-center pointer-events-none">
          <nav
            className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-[0 2px 8px rgba(0,0,0,0.15)] md:flex"
            aria-label="ניווט ראשי"
          >
            <Link href="/" className={navLinkClass}>
              בית
            </Link>

            {/* פתרונות + dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`${navLinkClass} flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f]`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="header-solutions-menu"
              >
                פתרונות
                <svg className="ms-1 h-4 w-4 shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  id="header-solutions-menu"
                  className="absolute top-full right-0 mt-1 min-w-[18rem] rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-card)] p-3 shadow-[var(--shadow-lg)]"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {solutionsNav.map(({ title, description, href }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="rounded-xl px-3 py-2.5 text-right transition-colors hover:bg-[var(--border-subtle)]"
                      >
                        <span className="block text-sm font-medium text-[var(--foreground)]">{title}</span>
                        {description ? (
                          <span className="block text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainNav.filter((n) => n.href !== "/").map(({ label, href }) => (
              <Link key={href} href={href} className={navLinkClass}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact CTA + Phone – light buttons on dark header */}
        <div className="relative z-10 hidden shrink-0 items-center gap-2 md:flex">
          <Link
            href={phoneHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/95 px-6 py-2.5 text-sm font-medium tracking-tight text-zinc-900 transition-all duration-200 hover:bg-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="חייגו אלינו"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden />
            חייגו אלינו
          </Link>
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center rounded-full bg-white/95 px-6 py-2.5 text-sm font-medium tracking-tight text-zinc-900 transition-all duration-200 hover:bg-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            צור קשר
          </Link>
        </div>

        {/* Mobile: menu button */}
        <div className="relative z-10 flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg border border-[var(--border)] bg-[var(--background-card)] p-2 text-[var(--foreground)] transition-colors hover:bg-[var(--border-subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2"
            aria-expanded={mobileOpen}
            aria-label="תפריט"
            aria-controls="mobile-nav-menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu (below header) – same nav order, font-heading, CTA consistent */}
      {mobileOpen && (
        <div id="mobile-nav-menu" className="border-t border-[var(--border-subtle)] bg-[var(--background-card)]/95 shadow-[var(--shadow-md)] backdrop-blur-sm md:hidden">
          <Container className="flex flex-col gap-0 py-3">
            <Link href="/" onClick={() => setMobileOpen(false)} className="font-heading rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]">
              בית
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setSolutionsOpen((o) => !o)}
                className="font-heading flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]"
                aria-expanded={solutionsOpen}
              >
                פתרונות
                <svg className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="grid grid-cols-1 gap-0.5 pr-4 pb-2">
                  {solutionsNav.map(({ title, description, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        setSolutionsOpen(false);
                        setMobileOpen(false);
                      }}
                      className="font-heading rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--border-subtle)]"
                    >
                      <span className="block font-medium">{title}</span>
                      {description ? (
                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {mainNav.filter((n) => n.href !== "/").map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="font-heading rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]">
                {label}
              </Link>
            ))}
            <div className="mx-2 mt-1 flex flex-wrap items-center gap-2">
              <Link
                href={phoneHref}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-all hover:opacity-90"
                aria-label="חייגו אלינו"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden />
                חייגו אלינו
              </Link>
              <Link
                href={contactHref}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-all hover:opacity-90"
              >
                צור קשר
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function PhoneIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
