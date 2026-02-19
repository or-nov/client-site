import type { ReactNode } from "react";

const styles = {
  h1: "text-start text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl",
  h2: "text-start text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl",
  h3: "text-start text-lg font-semibold text-[var(--foreground)] md:text-xl",
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
