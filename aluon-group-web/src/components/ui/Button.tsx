import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)]";
const primary =
  "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 focus:ring-[var(--foreground)]";
const secondary =
  "border-2 border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--border-subtle)] focus:ring-[var(--foreground)]";
const ghost =
  "border-transparent bg-transparent text-[var(--foreground)] hover:bg-[var(--border-subtle)] focus:ring-[var(--foreground)]";

export function Button({
  children,
  href,
  type = "button",
  className = "",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const variantClass = variant === "ghost" ? ghost : variant === "secondary" ? secondary : primary;
  const classes = `${base} ${variantClass} ${className}`;
  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
