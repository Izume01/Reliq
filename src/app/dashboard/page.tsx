"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  Clock4,
  Copy,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Trash2,
  ArrowRight,
  Terminal,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/client";

interface SecretListItem {
  slug: string;
  lastViewedAt: string | null;
  passwordRequired: boolean;
  maxFailedAttempts: number;
  failedAttempts: number;
  maxViews: number;
  viewCount: number;
  ttlSeconds: number;
  expired: boolean;
}

interface SecretsApiResponse {
  secrets: SecretListItem[];
}

interface ErrorPayload {
  error?: string;
}

const formatTtl = (seconds: number): string => {
  if (seconds <= 0) return "EXPIRED";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "UNKNOWN";
  }
  return date.toLocaleString().toUpperCase();
};

const lockoutPressure = (failed: number, max: number): number => {
  if (max <= 0) return 0;
  return Math.min(100, Math.round((failed / max) * 100));
};

export default function DashboardPage() {
  const { data: sessionData, isPending: sessionPending } = authClient.useSession();
  const [secrets, setSecrets] = useState<SecretListItem[]>([]);
  const [loadingSecrets, setLoadingSecrets] = useState(false);

  const isAuthed = Boolean(sessionData?.user);

  const loadSecrets = useCallback(async () => {
    if (!isAuthed) return;

    setLoadingSecrets(true);
    try {
      const response = await fetch("/api/secrets", { method: "GET" });
      const payload = (await response
        .json()
        .catch(() => ({ secrets: [] }))) as Partial<SecretsApiResponse> & ErrorPayload;

      if (!response.ok) {
        if (response.status === 404) {
          setSecrets([]);
          return;
        }
        toast.error(payload.error || "FAILED TO FETCH SECRETS");
        return;
      }

      setSecrets(Array.isArray(payload.secrets) ? payload.secrets : []);
    } catch {
      setSecrets([]);
    } finally {
      setLoadingSecrets(false);
    }
  }, [isAuthed]);

  useEffect(() => {
    loadSecrets();
  }, [loadSecrets]);

  const activeSecrets = useMemo(
    () => secrets.filter((secret) => !secret.expired),
    [secrets]
  );

  const sortedActiveSecrets = useMemo(
    () => [...activeSecrets].sort((a, b) => a.ttlSeconds - b.ttlSeconds),
    [activeSecrets]
  );

  const protectedCount = useMemo(
    () => activeSecrets.filter((secret) => secret.passwordRequired).length,
    [activeSecrets]
  );

  const pressureCount = useMemo(
    () =>
      activeSecrets.filter(
        (secret) =>
          secret.passwordRequired &&
          secret.failedAttempts > 0 &&
          secret.failedAttempts < secret.maxFailedAttempts
      ).length,
    [activeSecrets]
  );

  const expiredCount = secrets.length - activeSecrets.length;

  const totalViews = useMemo(
    () => secrets.reduce((total, secret) => total + secret.viewCount, 0),
    [secrets]
  );

  const nearViewLimitCount = useMemo(
    () =>
      activeSecrets.filter(
        (secret) => secret.maxViews - secret.viewCount <= 1
      ).length,
    [activeSecrets]
  );

  const handleRevoke = async (slug: string) => {
    try {
      const response = await fetch(`/api/secrets/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorPayload = (await response
          .json()
          .catch(() => ({}))) as ErrorPayload;
        toast.error(errorPayload.error || "FAILED TO REVOKE");
        return;
      }

      toast.success("SECRET REVOKED");
      setSecrets((current) => current.filter((item) => item.slug !== slug));
    } catch {
      toast.error("REVOCATION FAILED");
    }
  };

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/s/${slug}`;
    await navigator.clipboard.writeText(url);
    toast.success("LINK COPIED TO CLIPBOARD");
  };

  if (sessionPending) {
    return (
      <main className="px-6 py-14 sm:px-8 pt-32 sm:pt-40 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] text-center">
        /// LOADING...
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <div className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white font-mono uppercase">
        <main className="relative mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-6 sm:pt-40">
          <header className="mb-12 border-b border-[var(--color-line)] pb-8">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs text-[var(--color-muted)] tracking-widest">[ DASHBOARD ]</span>
            </div>
            <h1 className="font-sans font-black tracking-tighter text-5xl leading-tight text-[var(--color-ink)] sm:text-7xl uppercase">
              YOUR<br/>
              <span className="text-[var(--color-muted)]">SECRETS.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest leading-relaxed text-[var(--color-muted)]">
              VIEW AND MANAGE YOUR ACTIVE SECRETS AND RETRIEVAL METRICS.
            </p>
          </header>

          <div className="border border-[var(--color-accent)] bg-[var(--color-accent)]/5 p-[1px] w-full mx-auto max-w-3xl">
            <div className="bg-[var(--color-surface)] p-8 sm:p-12 border border-[var(--color-accent)]/20">
              <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[var(--color-accent)] text-white">
                <LockKeyhole className="h-8 w-8" />
              </div>
              <h2 className="font-sans font-black tracking-tight text-3xl uppercase text-[var(--color-ink)] mb-4">DASHBOARD LOCKED</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-10 max-w-xl">
                SIGN IN TO VIEW AND MANAGE YOUR SECRETS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="group flex items-center justify-center gap-3 border border-[var(--color-accent)] bg-[var(--color-accent)] px-8 py-4 font-sans text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-accent-strong)]"
                >
                  AUTHENTICATE
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center border border-[var(--color-line)] bg-[var(--color-surface)] px-8 py-4 font-sans text-sm font-black uppercase tracking-widest text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white font-mono uppercase">
      <main className="relative mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-6 sm:pt-40">
        
        {/* HEADER */}
        <header className="mb-8 border-b border-[var(--color-line)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-6 text-[10px] tracking-widest text-[var(--color-muted)]">
              <BadgeCheck className="h-4 w-4" />
              [ DASHBOARD ]
            </div>
            <h1 className="font-sans font-black tracking-tighter text-4xl leading-tight text-[var(--color-ink)] sm:text-6xl uppercase">
              YOUR<br/>
              <span className="text-[var(--color-muted)]">SECRETS.</span>
            </h1>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
              /// ACCOUNT: <span className="text-[var(--color-ink)]">{sessionData?.user?.email}</span>
            </p>
          </div>

          <div className="flex items-stretch gap-3">
            <button
              type="button"
              onClick={loadSecrets}
              className="flex items-center justify-center gap-2 border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-3 font-sans text-xs font-black uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <RefreshCw className={`h-4 w-4 ${loadingSecrets ? "animate-spin" : ""}`} />
              REFRESH
            </button>
            <Link
              href="/create"
              className="group flex items-center justify-center gap-2 border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 py-3 font-sans text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-accent-strong)]"
            >
              <Terminal className="h-4 w-4" />
              NEW SECRET
            </Link>
          </div>
        </header>

        {/* METRICS GRID */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] mb-8">
          <article className="bg-[var(--color-surface)] p-6">
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-muted)] mb-4">/// ACTIVE SECRETS</p>
            <p className="font-sans text-5xl font-black text-[var(--color-ink)]">{activeSecrets.length}</p>
          </article>
          <article className="bg-[var(--color-surface)] p-6">
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-muted)] mb-4">/// PROTECTED SECRETS</p>
            <p className="font-sans text-5xl font-black text-[var(--color-ink)]">{protectedCount}</p>
          </article>
          <article className="bg-[var(--color-surface)] p-6">
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-muted)] mb-4">/// FAILED ATTEMPTS</p>
            <p className="font-sans text-5xl font-black text-[var(--color-accent)]">{pressureCount}</p>
          </article>
          <article className="bg-[var(--color-surface)] p-6">
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-muted)] mb-4">/// TOTAL VIEWS</p>
            <p className="font-sans text-5xl font-black text-[var(--color-ink)]">{totalViews}</p>
          </article>
        </section>

        {/* ALERTS */}
        {(nearViewLimitCount > 0 || expiredCount > 0) && (
          <section className="grid sm:grid-cols-2 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] mb-8">
            {nearViewLimitCount > 0 && (
              <article className="bg-[var(--color-surface)] px-6 py-4 flex items-center gap-4 text-xs tracking-widest text-amber-500">
                <span className="flex-1">/// WARNING: {nearViewLimitCount} SECRETS NEAR VIEW LIMIT</span>
              </article>
            )}
            {expiredCount > 0 && (
              <article className="bg-[var(--color-surface)] px-6 py-4 flex items-center gap-4 text-xs tracking-widest text-[var(--color-muted)]">
                <span className="flex-1">/// {expiredCount} INACTIVE OR EXPIRED SECRETS</span>
              </article>
            )}
          </section>
        )}

        {/* SECRETS TABLE */}
        <section className="border border-[var(--color-line)] bg-[var(--color-line)] p-[1px]">
          <div className="bg-[var(--color-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-4 bg-[var(--color-paper)]">
              <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--color-ink)]">
                <Activity className="h-4 w-4 text-[var(--color-muted)]" />
                ACTIVE_SECRETS
              </p>
              {loadingSecrets && <p className="text-[10px] tracking-widest text-[var(--color-accent)] animate-pulse">SYNCING...</p>}
            </div>

            <div className="hidden lg:grid grid-cols-12 gap-4 border-b border-[var(--color-line)] px-6 py-3 text-[10px] tracking-[0.2em] text-[var(--color-muted)] bg-[var(--color-surface)]">
              <span className="col-span-3">SLUG IDENTIFIER</span>
              <span className="col-span-1 text-center">TTL</span>
              <span className="col-span-1 text-center">SECURITY</span>
              <span className="col-span-1 text-center">VIEWS</span>
              <span className="col-span-2 text-center">FAILURES</span>
              <span className="col-span-2 text-right">LAST RETRIEVAL</span>
              <span className="col-span-2 text-right">ACTION</span>
            </div>

            <div className="flex flex-col">
              {loadingSecrets && secrets.length === 0 ? (
                <div className="px-6 py-12 text-[10px] tracking-widest text-[var(--color-muted)] text-center">
                  /// LOADING...
                </div>
              ) : sortedActiveSecrets.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-[10px] tracking-widest text-[var(--color-muted)] mb-4">/// NO ACTIVE SECRETS DETECTED</p>
                  <Link href="/create" className="inline-block border border-[var(--color-accent)] text-[var(--color-accent)] px-4 py-2 text-[10px] tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-colors">
                    CREATE NEW SECRET
                  </Link>
                </div>
              ) : (
                sortedActiveSecrets.map((secret) => {
                  const pressure = lockoutPressure(secret.failedAttempts, secret.maxFailedAttempts);

                  return (
                    <div key={secret.slug} className="group flex flex-col lg:grid lg:grid-cols-12 gap-4 border-b border-[var(--color-line)] px-6 py-5 lg:py-4 lg:items-center last:border-b-0 hover:bg-[var(--color-paper)] transition-colors">
                      <div className="col-span-3 flex flex-col gap-1 lg:block">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// SLUG IDENTIFIER</span>
                        <span className="font-mono text-sm font-bold text-[var(--color-ink)] truncate">{secret.slug}</span>
                      </div>
                      
                      <div className="col-span-1 flex flex-col gap-1 lg:items-center lg:block">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// TTL</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                          <Clock4 className="h-3.5 w-3.5" />
                          {formatTtl(secret.ttlSeconds)}
                        </span>
                      </div>
                      
                      <div className="col-span-1 flex flex-col gap-1 lg:items-center lg:block">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// SECURITY</span>
                        {secret.passwordRequired ? (
                          <span className="inline-flex items-center gap-1.5 border border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-1 text-[10px] tracking-widest text-[var(--color-accent)]">
                            <LockKeyhole className="h-3 w-3" />
                            GATED
                          </span>
                        ) : (
                          <span className="inline-flex items-center border border-[var(--color-line)] px-2 py-1 text-[10px] tracking-widest text-[var(--color-muted)]">
                            OPEN
                          </span>
                        )}
                      </div>
                      
                      <div className="col-span-1 flex flex-col gap-1 lg:items-center lg:block">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// VIEWS</span>
                        <span className="text-xs text-[var(--color-ink)]">
                          {secret.viewCount} / {secret.maxViews}
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex flex-col gap-2 lg:block">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// FAILURES</span>
                        <div className="flex flex-col gap-1.5 w-full lg:w-32 lg:mx-auto">
                          <span className="text-[10px] tracking-widest text-[var(--color-muted)] lg:text-center">
                            {secret.failedAttempts} / {secret.maxFailedAttempts} ATTEMPTS
                          </span>
                          <div className="h-1 bg-[var(--color-line)] w-full">
                            <div
                              className={`h-full ${
                                pressure >= 70 ? "bg-[var(--color-accent)]" : pressure > 0 ? "bg-amber-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${pressure}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex flex-col gap-1 lg:items-end lg:block lg:text-right">
                        <span className="lg:hidden text-[10px] tracking-widest text-[var(--color-muted)]">/// LAST RETRIEVAL</span>
                        <span className="text-[10px] tracking-widest text-[var(--color-muted)]">
                          {secret.lastViewedAt ? formatDate(secret.lastViewedAt) : "NEVER"}
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex items-center gap-2 mt-4 lg:mt-0 lg:justify-end">
                        <button
                          type="button"
                          onClick={() => copyLink(secret.slug)}
                          className="flex-1 lg:flex-none inline-flex items-center justify-center border border-[var(--color-line)] px-3 py-2 text-[10px] tracking-widest hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
                          title="COPY LINK"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRevoke(secret.slug)}
                          className="flex-1 lg:flex-none inline-flex items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-2 text-[10px] tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                          title="REVOKE SECRET"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
