import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container-max)] px-4 md:px-6 ${className}`}
      style={{ maxWidth: "var(--container-max)" }}
    >
      {children}
    </div>
  );
}
