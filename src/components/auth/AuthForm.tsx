"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/client";
import { PASSWORD_MIN_LENGTH } from "@/lib/security/options";

type Mode = "login" | "signup";

interface AuthFormProps {
  mode: Mode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { data: sessionData, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAuthed = Boolean(sessionData?.user);
  const isSignup = mode === "signup";
  const title = isSignup ? "CREATE YOUR ACCOUNT" : "SIGN IN TO RELIQ";
  const subtitle = isSignup
    ? "START MANAGING ONE-TIME SECRET LINKS FROM YOUR DASHBOARD."
    : "ACCESS YOUR SECRET INVENTORY, REVOKE LINKS, AND CREATE NEW SHARES.";
  const buttonLabel = isSignup ? "INITIALIZE ACCOUNT" : "AUTHENTICATE";
  const alternateHref = isSignup ? "/login" : "/signup";
  const alternateLabel = isSignup ? "ALREADY HAVE AN ACCOUNT?" : "NEED AN ACCOUNT?";

  useEffect(() => {
    if (isAuthed) {
      router.replace("/dashboard");
    }
  }, [isAuthed, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("EMAIL AND PASSWORD ARE REQUIRED");
      return;
    }

    if (isSignup && !name.trim()) {
      toast.error("NAME IS REQUIRED");
      return;
    }

    if (isSignup && password.length < PASSWORD_MIN_LENGTH) {
      toast.error(`PASSWORD MUST BE AT LEAST ${PASSWORD_MIN_LENGTH} CHARACTERS`);
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "SIGN UP FAILED");
          return;
        }

        toast.success("ACCOUNT CREATED");
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "SIGN IN FAILED");
          return;
        }

        toast.success("SIGNED IN");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      toast.error("AUTHENTICATION FAILED");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || isAuthed) {
    return (
      <div className="flex items-center gap-4 rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-4 text-xs font-mono uppercase tracking-widest text-[var(--color-muted)]">
        <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent)]" />
        {isPending ? "CHECKING SESSION..." : "REDIRECTING TO DASHBOARD..."}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 flex flex-col h-full justify-between">
      <div>
        <header className="mb-10">
          <h2 className="text-2xl font-sans font-black tracking-tighter text-[var(--color-ink)] mb-2">{title}</h2>
          <p className="text-[10px] font-mono tracking-widest text-[var(--color-muted)]">{subtitle}</p>
        </header>

        <div className="space-y-6">
          {isSignup && (
            <label className="block space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-ink)]">
                /// NAME
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="OPERATOR ALIAS"
                className="w-full rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-4 font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
              />
            </label>
          )}

          <label className="block space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-ink)]">
              /// EMAIL
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="SECURE@NODE.COM"
              className="w-full rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-4 font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--color-ink)]">
              /// PASSWORD
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isSignup ? "CREATE ENCRYPTION KEY" : "ENTER ENCRYPTION KEY"}
              className="w-full rounded-none border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-4 font-mono text-xs tracking-widest text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </label>

          {isSignup && (
            <p className="bg-[var(--color-paper)] border border-[var(--color-line)] px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
              MINIMUM ENTROPY REQUIRED: {PASSWORD_MIN_LENGTH} CHARS.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-6 border-t border-[var(--color-line)] pt-8">
        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-between border border-[var(--color-accent)] bg-[var(--color-accent)] p-5 font-sans text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex items-center gap-3">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "PROCESSING..." : buttonLabel}
          </span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
          <span>{alternateLabel}</span>
          <Link href={alternateHref} className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors border-b border-[var(--color-line)] hover:border-[var(--color-accent)] pb-1">
            {isSignup ? "SIGN IN" : "CREATE ONE"}
          </Link>
        </div>
      </div>
    </form>
  );
}
