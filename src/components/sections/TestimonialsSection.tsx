const testimonials = [
  {
    id: "1",
    quote:
      "חוויית עבודה מקצועית ויחס אישי. ממליצים בחום לכל מי שמחפש שירות איכותי.",
    author: "שם מלא",
    role: "תפקיד / חברה",
  },
  {
    id: "2",
    quote:
      "חוויית עבודה מקצועית ויחס אישי. ממליצים בחום לכל מי שמחפש שירות איכותי.",
    author: "שם מלא",
    role: "תפקיד / חברה",
  },
  {
    id: "3",
    quote:
      "חוויית עבודה מקצועית ויחס אישי. ממליצים בחום לכל מי שמחפש שירות איכותי.",
    author: "שם מלא",
    role: "תפקיד / חברה",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="border-t border-zinc-200/60 bg-white px-6 py-20 dark:border-zinc-800/60 dark:bg-zinc-900"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          מה אומרים עלינו
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {testimonials.map(({ id, quote, author, role }) => (
            <div
              key={id}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-6 dark:border-zinc-800/60 dark:bg-zinc-950/50"
            >
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {quote}
              </p>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {author}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
