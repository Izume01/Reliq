"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, LockKeyhole, Shield } from "lucide-react";
import NoteInput from "@/components/common/NoteInput";
import OptionSecret from "@/components/common/OptionSecret";
import { authClient } from "@/lib/auth/client";

export default function CreatePage() {
  const { data: sessionData, isPending } = authClient.useSession();

  return (
    <div className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(180,91,33,0.10),transparent_38%),radial-gradient(circle_at_95%_0%,rgba(180,91,33,0.08),transparent_30%)]" />

      <main className="relative mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-6 sm:pt-10">
        <header className="mb-8 space-y-4">
          <h1 className="text-balance font-dancing-script text-5xl leading-tight text-[var(--color-ink)] sm:text-6xl">
            Create a one-time <span className="text-[var(--color-accent)]">secure link</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)]">
            Draft your secret, configure expiration and protection rules, then generate a link that burns after retrieval.
          </p>
        </header>

        {isPending ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-line)] border-t-[var(--color-accent)]" />
          </div>
        ) : !sessionData?.user ? (
          <div className="mx-auto max-w-md rounded-3xl border border-[var(--color-line)] bg-white/70 p-8 text-center shadow-[0_24px_70px_rgba(120,70,30,0.08)]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">Authentication required</h2>
            <p className="mt-2 text-base text-[var(--color-muted)]">
              To ensure ownership and revocation capability, you must be signed in to create secrets.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                Create account
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <section className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_24px_70px_rgba(120,70,30,0.10)] sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Signed in as</p>
                    <p className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                      {sessionData.user.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs text-[var(--color-muted)]">
                    <LockKeyhole className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    End-to-end encrypted
                  </div>
                </div>
                <NoteInput />
              </section>

              <section className="rounded-2xl border border-[var(--color-line)] bg-white/65 px-4 py-3 text-sm text-[var(--color-muted)]">
                Links self-destruct by TTL, max views, or password lockout.
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_24px_70px_rgba(120,70,30,0.10)] sm:p-6">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">Delivery controls</p>
                </div>
                <OptionSecret />
              </section>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
