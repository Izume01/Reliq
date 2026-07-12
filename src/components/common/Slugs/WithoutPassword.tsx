"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Copy, TerminalSquare, RefreshCw, AlertTriangle } from "lucide-react";
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
          throw new Error(errorPayload.error || "FAILED TO FETCH SECRET");
        }

        const result = (await response.json()) as SecretPayload;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "AN UNKNOWN ERROR OCCURRED");
      } finally {
        setLoading(false);
      }
    };

    fetchSlugData();
  }, [slug]);

  const copyContent = async () => {
    if (!data?.content) return;
    await navigator.clipboard.writeText(data.content);
    toast.success("SECRET COPIED");
  };

  return (
    <main className="relative min-h-[80vh] flex flex-col items-center px-6 py-12 sm:px-8 pt-24 font-mono uppercase text-xs">
      <div className="w-full max-w-5xl space-y-8">
        
        <header className="border-b border-[var(--color-line)] pb-8">
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-[var(--color-accent)] mb-4">
            <TerminalSquare className="h-4 w-4" />
            [ SECURE RETRIEVAL ]
          </div>
          <h1 className="font-sans font-black tracking-tighter text-4xl sm:text-6xl text-[var(--color-ink)] leading-tight mb-2">
            SECURE<br/>
            <span className="text-[var(--color-muted)]">DELIVERY.</span>
          </h1>
          <p className="tracking-widest text-[var(--color-muted)]">
            /// SLUG: <span className="text-[var(--color-ink)] font-bold">{slug}</span>
          </p>
        </header>

        <section className="bg-[var(--color-surface)] border border-[var(--color-line)] p-[1px]">
          {loading ? (
            <div className="flex items-center gap-3 p-8 text-[var(--color-muted)] tracking-widest">
              <RefreshCw className="h-4 w-4 animate-spin" />
              /// DECRYPTING SECRET...
            </div>
          ) : error ? (
            <div className="bg-amber-500/10 border-l-2 border-amber-500 p-8 space-y-6">
              <div className="flex items-start gap-3 text-amber-500">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p className="tracking-widest leading-relaxed">
                  /// ERROR ENCOUNTERED: {error}
                </p>
              </div>
              <Link
                href="/create"
                className="inline-flex border border-amber-500 bg-amber-500/20 px-6 py-3 font-sans text-xs font-black uppercase tracking-widest text-amber-500 transition-colors hover:bg-amber-500 hover:text-white"
              >
                CREATE NEW SECRET
              </Link>
            </div>
          ) : (
            <div className="bg-[var(--color-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-ink)] px-6 py-3 text-[10px] tracking-widest text-[var(--color-surface)]">
                <span>/// DECRYPTED_SECRET_CONTENT</span>
                <span className="text-[var(--color-accent)]">
                  {data?.meta?.viewsRemaining ?? 0} VIEW(S) REMAINING
                </span>
              </div>
              
              <div className="p-6">
                <pre className="w-full max-h-[500px] overflow-auto bg-[var(--color-paper)] p-6 text-sm text-[var(--color-ink)] scrollbar-hide border border-[var(--color-line)]">
                  {data?.content}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch border-t border-[var(--color-line)] bg-[var(--color-paper)]">
                <button
                  type="button"
                  onClick={copyContent}
                  className="group flex-1 flex items-center justify-center gap-2 px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-white border-b sm:border-b-0 sm:border-r border-[var(--color-line)]"
                >
                  <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  COPY TO CLIPBOARD
                </button>
                <Link
                  href="/create"
                  className="flex-1 flex items-center justify-center bg-[var(--color-accent)] px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[var(--color-accent-strong)]"
                >
                  CREATE ANOTHER
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
