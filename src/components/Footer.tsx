import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-950"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Alu-on group
          </span>
          <nav
            className="flex flex-wrap items-center justify-center gap-6"
            aria-label="Footer navigation"
          >
            {footerLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-zinc-200/60 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400">
          © {year} Alu-on group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
