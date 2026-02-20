import React from "react";
import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

interface AuthAsideProps {
  title: string;
  subtitle: string;
}

export default function AuthAside({ title, subtitle }: AuthAsideProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[linear-gradient(155deg,#fffbf5_4%,#f2e2c7_98%)] p-8 shadow-[0_24px_70px_rgba(120,70,30,0.13)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[var(--color-accent)]/8 blur-2xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
          Reliq Auth
        </span>

        <h1 className="mt-5 font-dancing-script text-5xl leading-tight text-[var(--color-ink)] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-muted)]">
          {subtitle}
        </p>

        <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Logic Grid
          </p>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className={`h-6 rounded-md border border-[var(--color-line)] ${
                  index % 5 === 0
                    ? "bg-[var(--color-accent)]/20"
                    : index % 3 === 0
                      ? "bg-[var(--color-paper)]"
                      : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-[var(--color-line)] bg-white/70 p-3">
            <p className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ink)]">
              <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
              Account ownership
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              Secrets remain tied to creator identity.
            </p>
          </article>
          <article className="rounded-xl border border-[var(--color-line)] bg-white/70 p-3">
            <p className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ink)]">
              <LockKeyhole className="h-4 w-4 text-[var(--color-accent)]" />
              Strong protection
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              Password gates and lockout controls.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
