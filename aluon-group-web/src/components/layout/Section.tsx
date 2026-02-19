import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-[var(--section-gap)] ${className}`}>
      <Container>
        {title != null && title !== "" && (
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] md:text-3xl">
            {title}
          </h2>
        )}
        {subtitle != null && subtitle !== "" && (
          <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
