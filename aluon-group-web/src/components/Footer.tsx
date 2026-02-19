import Link from "next/link";
import { Container } from "@/components/layout/Container";

const mainLinks = [
  { label: "בית", href: "/" },
  { label: "אודות", href: "/about" },
  { label: "פרויקטים", href: "/projects" },
];

const contentLinks = [
  { label: "מאמרים", href: "/articles" },
  { label: "צור קשר", href: "/contact" },
];

const solutionLinks = [
  { label: "אלומיניום", href: "/claddings/aluminum" },
  { label: "אלוקובונד", href: "/claddings/alucobond" },
  { label: "HPL", href: "/claddings/hpl" },
  { label: "קירות מסך", href: "/claddings/curtain-walls" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-[var(--border-subtle)] bg-[var(--background-card)]"
      dir="rtl"
    >
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <p className="text-sm font-bold tracking-tight text-[var(--foreground)]">
              Alu-on group
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              מעטפת הבניין
            </p>
          </div>

          {/* Column 2: Main + Content */}
          <div className="flex flex-col gap-6 sm:flex-row md:flex-col">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                ניווט
              </p>
              <ul className="mt-2 space-y-2">
                {mainLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--foreground)] underline-offset-4 transition-colors hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                {contentLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--foreground)] underline-offset-4 transition-colors hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              פתרונות
            </p>
            <ul className="mt-2 space-y-2">
              {solutionLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--foreground)] underline-offset-4 transition-colors hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-8">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            © {year} Alu-on group. כל הזכויות שמורות.
          </p>
        </div>
      </Container>
    </footer>
  );
}
