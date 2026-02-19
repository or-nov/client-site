import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
  dir?: "rtl" | "ltr";
};

export function Card({
  children,
  className = "",
  as: Tag = "div",
  dir,
}: CardProps) {
  return (
    <Tag
      className={`rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--background-card)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:border-[var(--border)] ${className}`}
      {...(dir && { dir })}
    >
      {children}
    </Tag>
  );
}
