import type { ReactNode } from "react";

/* מקור טיפוגרפיה: אזור אדריכלים – כותרת ראשית text-3xl md:text-4xl, font-bold, tracking-tight */
const styles = {
  h1: "font-heading text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] md:text-4xl",
  h2: "font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl",
  h3: "font-heading text-lg font-semibold text-[var(--foreground)] md:text-xl",
} as const;

type HeadingProps = {
  as: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
};

export function Heading({ as: Tag, children, className = "" }: HeadingProps) {
  return (
    <Tag className={`${styles[Tag]} ${className}`}>{children}</Tag>
  );
}
