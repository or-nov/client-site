import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-white px-6 py-24 dark:from-zinc-950 dark:to-zinc-900"
      dir="rtl"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
          הכותרת הראשית שלכם נכנסת לכאן
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
          תת-כותרת קצרה שמסבירה את הערך או את המסר המרכזי של העמוד.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/contact"
            className="w-full shrink-0 rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
          >
            התחל עכשיו
          </Link>
          <Link
            href="/about"
            className="w-full shrink-0 rounded-full border border-zinc-300 bg-transparent px-8 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 sm:w-auto"
          >
            למידע נוסף
          </Link>
        </div>
      </div>
    </section>
  );
}
