"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";

const mainNav = [
  { label: "בית", href: "/" },
  { label: "פרויקטים", href: "/projects" },
  { label: "מאמרים", href: "/articles" },
  { label: "אודות", href: "/about" },
];

const contactHref = "/contact";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[var(--border)]/60 bg-[var(--background-card)]/70 shadow-[var(--shadow-sm)] backdrop-blur-xl"
      dir="rtl"
    >
      <Container className="relative flex h-16 items-center justify-between">
        {/* Logo – right side in RTL */}
        <Link href="/" className="relative z-10 flex shrink-0 flex-col items-end">
          <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            Alu-on group
          </span>
          <span className="text-xs tracking-wide text-zinc-500 dark:text-zinc-400">
            מעטפת הבניין
          </span>
        </Link>

        {/* Desktop: pill nav centered (absolute center wrapper) */}
        <div className="absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 items-center justify-center pointer-events-none">
          <nav
            className="pointer-events-auto hidden items-center gap-0.5 rounded-full border border-[var(--border-subtle)] bg-white/70 px-2 py-1.5 shadow-[0 1px 3px rgba(0,0,0,0.04)] dark:bg-[var(--background-card)]/80 dark:shadow-[0 1px 3px rgba(0,0,0,0.15)] md:flex"
            aria-label="ניווט ראשי"
          >
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium tracking-tight text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
            >
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
                className="flex items-center rounded-full px-4 py-2 text-sm font-medium tracking-tight text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                פתרונות
                <svg className="ms-1 h-4 w-4 shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
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
              <Link
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-medium tracking-tight text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact – left side in RTL (spacer so nav stays centered); visible only on desktop */}
        <div className="relative z-10 hidden shrink-0 md:block">
          <Link
            href={contactHref}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium tracking-tight text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            צור קשר
          </Link>
        </div>

        {/* Mobile: menu button */}
        <div className="relative z-10 flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg border border-[var(--border)] bg-[var(--background-card)] p-2 text-[var(--foreground)] transition-colors hover:bg-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
            aria-expanded={mobileOpen}
            aria-label="תפריט"
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

      {/* Mobile menu (below header) */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-[var(--background-card)] shadow-[var(--shadow-md)] md:hidden">
          <Container className="flex flex-col gap-0 py-3">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]">
              בית
            </Link>
            <div>
              <button
                type="button"
                onClick={() => setSolutionsOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]"
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
                      className="rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--border-subtle)]"
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
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border-subtle)]">
                {label}
              </Link>
            ))}
            <Link
              href={contactHref}
              onClick={() => setMobileOpen(false)}
              className="mx-2 mt-1 rounded-lg bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              צור קשר
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
