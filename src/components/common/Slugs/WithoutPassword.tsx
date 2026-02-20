"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface WithoutPasswordProps {
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

const WithoutPassword: React.FC<WithoutPasswordProps> = ({ slug }) => {
  const [data, setData] = useState<SecretPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSlugData = async () => {
      try {
        const response = await fetch("/api/getslug", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          const errorPayload = (await response
            .json()
            .catch(() => ({}))) as ErrorPayload;
          throw new Error(errorPayload.error || "Failed to fetch secret");
        }

        const result = (await response.json()) as SecretPayload;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSlugData();
  }, [slug]);

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
            One-time retrieval
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">
            Secure secret delivery
          </h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Slug: <span className="font-mono">{slug}</span>
          </p>
        </header>

        <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
          {loading ? (
            <p className="text-sm text-[var(--color-muted)]">Decrypting and retrieving...</p>
          ) : error ? (
            <div className="space-y-4">
              <p className="rounded-lg border border-amber-700/35 bg-amber-100/50 p-3 text-sm text-amber-900">
                {error}
              </p>
              <Link
                href="/"
                className="inline-block rounded-lg bg-[var(--color-accent)] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
              >
                Create a new secret
              </Link>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-sm text-[var(--color-muted)]">
                Secret delivered. {data?.meta?.viewsRemaining ?? 0} view(s) remaining.
              </p>
              <pre className="max-h-[420px] overflow-auto rounded-xl border border-[var(--color-line)] bg-white p-4 text-sm leading-relaxed text-[var(--color-ink)]">
                {data?.content}
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
                  Create another
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default WithoutPassword;
