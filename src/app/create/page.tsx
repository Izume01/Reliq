"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, LockKeyhole, ShieldAlert } from "lucide-react";
import NoteInput from "@/components/common/NoteInput";
import OptionSecret from "@/components/common/OptionSecret";
import { authClient } from "@/lib/auth/client";

export default function CreatePage() {
  const { data: sessionData, isPending } = authClient.useSession();

  return (
    <div className="relative min-h-screen selection:bg-[var(--color-accent)] selection:text-white font-mono uppercase">
      <main className="relative mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-6 sm:pt-40">
        <header className="mb-12 border-b border-[var(--color-line)] pb-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-[var(--color-muted)] tracking-widest">[ SECURE TRANSMISSION ]</span>
          </div>
          <h1 className="font-sans font-black tracking-tighter text-5xl leading-tight text-[var(--color-ink)] sm:text-7xl uppercase">
            CREATE NEW<br/>
            <span className="text-[var(--color-muted)]">SECRET.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest leading-relaxed text-[var(--color-muted)]">
            DRAFT YOUR SECRET, CONFIGURE EXPIRATION AND PROTECTION RULES, THEN GENERATE A SECURE LINK.
          </p>
        </header>

        {isPending ? (
          <div className="flex justify-start py-20">
            <div className="h-8 w-8 animate-spin border-2 border-transparent border-t-[var(--color-accent)]" />
          </div>
        ) : !sessionData?.user ? (
          <div className="border border-[var(--color-accent)] bg-[var(--color-accent)]/5 p-[1px] w-full mx-auto max-w-3xl">
            <div className="bg-[var(--color-surface)] p-8 sm:p-12 border border-[var(--color-accent)]/20">
              <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[var(--color-accent)] text-white">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h2 className="font-sans font-black tracking-tight text-3xl uppercase text-[var(--color-ink)] mb-4">AUTHENTICATION REQUIRED</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-10 max-w-xl">
                YOU MUST BE SIGNED IN TO CREATE A SECURE SECRET.
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
        ) : (
          <div className="grid gap-[1px] lg:grid-cols-[minmax(0,1fr)_360px] bg-[var(--color-line)] border border-[var(--color-line)] p-[1px]">
            <div className="space-y-[1px] bg-[var(--color-line)] flex flex-col h-full">
              <section className="bg-[var(--color-surface)] p-6 sm:p-10 flex-1">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                  <div>
                    <p className="text-[10px] text-[var(--color-muted)] tracking-[0.2em]">/// ACCOUNT</p>
                    <p className="font-mono text-sm font-bold text-[var(--color-accent)] mt-1">
                      {sessionData.user.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                    <LockKeyhole className="h-4 w-4 text-[var(--color-accent)]" />
                    E2E ENCRYPTED
                  </div>
                </div>
                <NoteInput />
              </section>

              <section className="bg-[var(--color-surface)] px-6 py-4 text-[10px] tracking-[0.2em] uppercase text-[var(--color-muted)]">
                LINKS SELF-DESTRUCT BY TTL, MAX VIEWS, OR PASSWORD LOCKOUT.
              </section>
            </div>

            <div className="bg-[var(--color-surface)] relative h-full">
              <aside className="p-6 sm:p-10 lg:sticky lg:top-24 h-full flex flex-col">
                <div className="mb-8 border-b border-[var(--color-line)] pb-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-ink)] uppercase">/// CONFIGURATION</p>
                </div>
                <OptionSecret />
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
