import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div
      className={`prose-content text-start space-y-4 text-zinc-600 dark:text-zinc-400 [&_p]:leading-relaxed [&_p]:mb-0 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:leading-relaxed [&_a]:font-medium [&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-[color,text-decoration-color] hover:[&_a]:text-zinc-700 dark:[&_a]:text-zinc-50 dark:hover:[&_a]:text-zinc-200 ${className}`}
    >
      {children}
    </div>
  );
}
