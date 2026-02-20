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
  if (seconds <= 0) return "Expired";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return date.toLocaleString();
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
        toast.error(payload.error || "Failed to load secrets");
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
        toast.error(errorPayload.error || "Failed to revoke secret");
        return;
      }

      toast.success("Secret revoked");
      setSecrets((current) => current.filter((item) => item.slug !== slug));
    } catch {
      toast.error("Failed to revoke secret");
    }
  };

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/s/${slug}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  if (sessionPending) {
    return (
      <main className="px-6 py-14 sm:px-8">
        <p className="text-center text-sm text-[var(--color-muted)]">Loading session...</p>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Dashboard locked</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Sign in to view and manage account-owned secrets.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
            >
              Create account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(180,91,33,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(180,91,33,0.05),transparent_35%)]" />

      <main className="relative mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="space-y-6">
          <header className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[0_20px_60px_rgba(120,70,30,0.10)]">
            <div className="pointer-events-none absolute -mt-14 h-40 w-40 rounded-full bg-[var(--color-accent)]/10 blur-2xl" />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                  Dashboard
                </p>
                <h1 className="mt-1 font-dancing-script text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
                  Secret Operations
                </h1>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{sessionData?.user?.email}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={loadSecrets}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
                >
                  <RefreshCw className={`h-4 w-4 ${loadingSecrets ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <Link
                  href="/create"
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
                >
                  Create secret
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Active</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--color-ink)]">{activeSecrets.length}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">Currently retrievable links</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Password Protected</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--color-ink)]">{protectedCount}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">Secrets with extra gate</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Lockout Pressure</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--color-ink)]">{pressureCount}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">Active links with failed attempts</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">Total Views</p>
              <p className="mt-1 text-3xl font-semibold text-[var(--color-ink)]">{totalViews}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">Successful retrieval events</p>
            </article>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
              Near view limit: <span className="font-semibold text-[var(--color-ink)]">{nearViewLimitCount}</span>
            </article>
            <article className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
              Expired or consumed: <span className="font-semibold text-[var(--color-ink)]">{expiredCount}</span>
            </article>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_20px_60px_rgba(120,70,30,0.08)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-paper)]/55 px-4 py-3">
              <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <Activity className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                Active secret links
              </p>
              {loadingSecrets && <p className="text-xs text-[var(--color-muted)]">Refreshing...</p>}
            </div>

            <div className="grid grid-cols-12 gap-2 border-b border-[var(--color-line)]/80 bg-white/40 px-4 py-3 text-xs uppercase tracking-[0.08em] text-[var(--color-muted)] sm:grid-cols-[repeat(13,minmax(0,1fr))]">
              <span className="col-span-12 sm:col-span-3">Slug</span>
              <span className="col-span-6 sm:col-span-1">TTL</span>
              <span className="col-span-6 sm:col-span-2">Security</span>
              <span className="col-span-6 sm:col-span-2">Views</span>
              <span className="col-span-6 sm:col-span-2">Failed attempts</span>
              <span className="col-span-6 sm:col-span-1">Last view</span>
              <span className="col-span-12 sm:col-span-2 text-left sm:text-right">Actions</span>
            </div>

            {loadingSecrets ? (
              <div className="px-4 py-8 text-sm text-[var(--color-muted)]">Loading secrets...</div>
            ) : sortedActiveSecrets.length === 0 ? (
              <div className="px-4 py-8 text-sm text-[var(--color-muted)]">
                No active secrets. Create one to start tracking.
              </div>
            ) : (
              sortedActiveSecrets.map((secret) => {
                const pressure = lockoutPressure(secret.failedAttempts, secret.maxFailedAttempts);

                return (
                  <div key={secret.slug} className="grid grid-cols-12 gap-2 border-b border-[var(--color-line)]/60 px-4 py-3 text-sm last:border-b-0 hover:bg-white/40 sm:grid-cols-[repeat(13,minmax(0,1fr))]">
                    <span className="col-span-12 truncate rounded-md bg-white/75 px-2 py-1 font-mono text-[var(--color-ink)] sm:col-span-3">
                      {secret.slug}
                    </span>
                    <span className="col-span-6 inline-flex items-center gap-1 text-[var(--color-muted)] sm:col-span-1">
                      <Clock4 className="h-3.5 w-3.5" />
                      {formatTtl(secret.ttlSeconds)}
                    </span>
                    <span className="col-span-6 sm:col-span-2">
                      {secret.passwordRequired ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-paper)] px-2 py-0.5 text-xs text-[var(--color-ink)]">
                          <LockKeyhole className="h-3 w-3 text-[var(--color-accent)]" />
                          Password
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-[var(--color-line)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                          Open
                        </span>
                      )}
                    </span>
                    <span className="col-span-6 sm:col-span-2">
                      <span className="inline-flex rounded-full border border-[var(--color-line)] bg-white/70 px-2 py-0.5 text-xs text-[var(--color-ink)]">
                        {secret.viewCount}/{secret.maxViews}
                      </span>
                    </span>
                    <span className="col-span-6 space-y-1 sm:col-span-2">
                      <span className="block text-xs text-[var(--color-muted)]">
                        {secret.failedAttempts}/{secret.maxFailedAttempts}
                      </span>
                      <span className="block h-1.5 overflow-hidden rounded-full bg-[var(--color-paper)]">
                        <span
                          className={`block h-full rounded-full ${
                            pressure >= 70
                              ? "bg-amber-700/80"
                              : pressure > 0
                                ? "bg-amber-500/75"
                                : "bg-emerald-600/60"
                          }`}
                          style={{ width: `${pressure}%` }}
                        />
                      </span>
                    </span>
                    <span className="col-span-6 text-[var(--color-muted)] sm:col-span-1">
                      {secret.lastViewedAt ? formatDate(secret.lastViewedAt) : "Never"}
                    </span>
                    <span className="col-span-12 flex gap-2 sm:col-span-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => copyLink(secret.slug)}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-[var(--color-line)] bg-white px-2.5 py-1 text-xs text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRevoke(secret.slug)}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-amber-700/45 px-2.5 py-1 text-xs text-amber-800 hover:bg-amber-100/60"
                      >
                        <Trash2 className="h-3 w-3" />
                        Revoke
                      </button>
                    </span>
                  </div>
                );
              })
            )}
          </section>

          <p className="inline-flex items-center gap-1 text-xs text-[var(--color-muted)]">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            Account-owned links can be revoked instantly from this dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}
