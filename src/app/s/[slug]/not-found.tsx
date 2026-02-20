import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-6 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Secret unavailable
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">
          This link no longer exists
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          It may have expired, been viewed already, or been revoked by the owner.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
          >
            Go to landing
          </Link>
          <Link
            href="/create"
            className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
          >
            Create secret
          </Link>
        </div>
      </div>
    </main>
  );
}
