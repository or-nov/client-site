const features = [
  {
    title: "תכונה ראשונה",
    description: "תיאור קצר של היתרון או השירות. מסר ברור ותמציתי.",
  },
  {
    title: "תכונה שנייה",
    description: "תיאור קצר של היתרון או השירות. מסר ברור ותמציתי.",
  },
  {
    title: "תכונה שלישית",
    description: "תיאור קצר של היתרון או השירות. מסר ברור ותמציתי.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="border-t border-zinc-200/60 bg-white px-6 py-20 dark:border-zinc-800/60 dark:bg-zinc-900"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-3">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/50"
            >
              <div
                className="h-10 w-10 shrink-0 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80"
                aria-hidden
              />
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
