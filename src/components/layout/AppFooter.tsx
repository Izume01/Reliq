import Link from "next/link";
import { ArrowRight, MessageSquareLock, ShieldCheck } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="border-t border-[var(--color-line)]/60 bg-[var(--color-surface)]/55">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[linear-gradient(145deg,#fffaf2_0%,#f4e4cf_100%)] p-6 shadow-[0_22px_60px_rgba(120,70,30,0.08)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[var(--color-accent)]/8 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white">
                  <MessageSquareLock className="h-4 w-4" />
                </span>
                <span className="text-lg font-semibold text-[var(--color-ink)]">Reliq</span>
              </Link>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
                Encrypted self-destructing links for credentials, keys, and sensitive notes.
                Create once, share safely, and revoke instantly.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
                >
                  Create secret
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-[var(--color-line)] bg-white px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Product
                </p>
                <div className="mt-3 space-y-2">
                  <Link href="/" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    Home
                  </Link>
                  <Link href="/create" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    Create
                  </Link>
                  <Link href="/dashboard" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    Dashboard
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Access
                </p>
                <div className="mt-3 space-y-2">
                  <Link href="/login" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    Log in
                  </Link>
                  <Link href="/signup" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    Sign up
                  </Link>
                  <Link href="/#faq" className="block text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)]/70 pt-5 text-xs text-[var(--color-muted)]">
            <p>&copy; {new Date().getFullYear()} Reliq. Secure links, zero plaintext storage.</p>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              End-to-end encrypted workflow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
