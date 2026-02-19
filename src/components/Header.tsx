import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80"
      dir="rtl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          CLIENT
        </Link>

        <nav
          className="hidden items-center gap-8 sm:flex"
          aria-label="Main navigation"
        >
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          צור קשר
        </Link>
      </div>
    </header>
  );
}
