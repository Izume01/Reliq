"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Copy, LockKeyhole, ShieldAlert, TerminalSquare } from "lucide-react";
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
      setError("PASSWORD IS REQUIRED");
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
        throw new Error(errorPayload.error || "INVALID PASSWORD / MAX RETRIES REACHED");
      }

      const result = (await response.json()) as SecretPayload;
      setData(result);
      setPassword("");
      toast.success("SECRET DECRYPTED");
    } catch (err) {
      setError(err instanceof Error ? err.message : "FAILED TO UNLOCK SECRET");
    } finally {
      setIsLoading(false);
    }
  };

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
            <LockKeyhole className="h-4 w-4" />
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

        {!data ? (
          <section className="bg-[var(--color-surface)] border border-[var(--color-line)]">
            <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-4">
              <p className="text-[10px] tracking-widest text-[var(--color-ink)]">
                /// THIS SECRET REQUIRES A PASSWORD
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] tracking-widest text-[var(--color-muted)]">
                  /// PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="ENTER PASSWORD"
                  className="w-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors uppercase tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-3 border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LockKeyhole className="h-4 w-4 transition-transform group-hover:scale-110" />
                {isLoading ? "VERIFYING KEY..." : "DECRYPT SECRET"}
              </button>
            </form>

            {error && (
              <div className="border-t border-[var(--color-line)] bg-amber-500/10 p-6 text-amber-500">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <p className="tracking-widest leading-relaxed">
                    /// ACCESS DENIED: {error}
                  </p>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="bg-[var(--color-surface)] border border-[var(--color-line)] p-[1px]">
            <div className="bg-[var(--color-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-ink)] px-6 py-3 text-[10px] tracking-widest text-[var(--color-surface)]">
                <span>/// DECRYPTED_SECRET_CONTENT</span>
                <span className="text-[var(--color-accent)]">
                  {data.meta?.viewsRemaining ?? 0} VIEW(S) REMAINING
                </span>
              </div>
              
              <div className="p-6">
                <pre className="w-full max-h-[500px] overflow-auto bg-[var(--color-paper)] p-6 text-sm text-[var(--color-ink)] scrollbar-hide border border-[var(--color-line)]">
                  {data.content}
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
          </section>
        )}
      </div>
    </main>
  );
};

export default WithPassword;
