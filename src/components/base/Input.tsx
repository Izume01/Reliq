import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const baseClasses =
  "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20";

export const Input = ({ className, ...props }: InputProps) => {
  const mergedClassName = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return <input className={mergedClassName} {...props} />;
};
