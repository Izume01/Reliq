"use client";

import { usePathname } from "next/navigation";

export default function AppFooter() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <footer className="w-full border-t border-[var(--color-line)] bg-[var(--color-surface)] py-6 px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>&copy; {new Date().getFullYear()} RELIQ // SYS_ONLINE</span>
        <span>ENGINEERED BY IZUME01 WITH TOO MUCH CAFFEINE.</span>
      </div>
    </footer>
  );
}
