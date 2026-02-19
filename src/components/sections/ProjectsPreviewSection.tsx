const projects = [
  { id: "1", title: "פרויקט א" },
  { id: "2", title: "פרויקט ב" },
  { id: "3", title: "פרויקט ג" },
  { id: "4", title: "פרויקט ד" },
  { id: "5", title: "פרויקט ה" },
  { id: "6", title: "פרויקט ו" },
];

export function ProjectsPreviewSection() {
  return (
    <section
      className="border-t border-zinc-200/60 bg-zinc-50/50 px-6 py-20 dark:border-zinc-800/60 dark:bg-zinc-950"
      dir="rtl"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          פרויקטים נבחרים
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ id, title }) => (
            <div
              key={id}
              className="flex aspect-[4/3] items-center justify-center rounded-xl border border-zinc-200/60 bg-white dark:border-zinc-800/60 dark:bg-zinc-900"
            >
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
