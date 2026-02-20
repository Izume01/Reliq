"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Copy, LockKeyhole, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

interface WithPasswordProps {
  slug: string;
}

interface SecretPayload {
  content: string;
  meta?: {
    viewCount: number;
    maxViews: number;
    viewsRemaining: number;
    exhausted: boolean;
  };
}

interface ErrorPayload {
  error?: string;
}

const WithPassword: React.FC<WithPasswordProps> = ({ slug }) => {
  const [data, setData] = useState<SecretPayload | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/getslug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });

      if (!response.ok) {
        const errorPayload = (await response
          .json()
          .catch(() => ({}))) as ErrorPayload;
        throw new Error(errorPayload.error || "Invalid password");
      }

      const result = (await response.json()) as SecretPayload;
      setData(result);
      setPassword("");
      toast.success("Secret decrypted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unlock secret");
    } finally {
      setIsLoading(false);
    }
  };

  const copyContent = async () => {
    if (!data?.content) return;
    await navigator.clipboard.writeText(data.content);
    toast.success("Secret copied");
  };

  return (
    <main className="px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-3xl space-y-5">
        <header className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Password protected secret
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">
            Unlock secure content
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Slug: <span className="font-mono">{slug}</span>
          </p>
        </header>

        {!data ? (
          <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <LockKeyhole className="h-4 w-4" />
                {isLoading ? "Verifying..." : "Decrypt secret"}
              </button>
            </form>

            {error && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-700/35 bg-amber-100/50 p-3 text-sm text-amber-900">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </section>
        ) : (
          <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
            <p className="mb-3 text-sm text-[var(--color-muted)]">
              Secret decrypted. {data.meta?.viewsRemaining ?? 0} view(s) remaining.
            </p>
            <pre className="max-h-[420px] overflow-auto rounded-xl border border-[var(--color-line)] bg-white p-4 text-sm leading-relaxed text-[var(--color-ink)]">
              {data.content}
            </pre>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyContent}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-line)] px-3.5 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
              >
                <Copy className="h-4 w-4" />
                Copy content
              </button>
              <Link
                href="/"
                className="rounded-lg bg-[var(--color-accent)] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
              >
                Create another secret
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default WithPassword;
