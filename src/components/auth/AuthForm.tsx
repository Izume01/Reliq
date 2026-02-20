"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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
  const title = isSignup ? "Create your account" : "Sign in to Reliq";
  const subtitle = isSignup
    ? "Start managing one-time secret links from your dashboard."
    : "Access your secret inventory, revoke links, and create new shares.";
  const buttonLabel = isSignup ? "Create account" : "Sign in";
  const alternateHref = isSignup ? "/login" : "/signup";
  const alternateLabel = isSignup ? "Already have an account?" : "Need an account?";

  useEffect(() => {
    if (isAuthed) {
      router.replace("/dashboard");
    }
  }, [isAuthed, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    if (isSignup && !name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (isSignup && password.length < PASSWORD_MIN_LENGTH) {
      toast.error(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
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
          toast.error(result.error.message || "Sign up failed");
          return;
        }

        toast.success("Account created");
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "Sign in failed");
          return;
        }

        toast.success("Signed in");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      toast.error("Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || isAuthed) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white/70 px-3.5 py-3 text-sm text-[var(--color-muted)]">
        <Loader2 className="h-4 w-4 animate-spin" />
        {isPending ? "Checking session..." : "Redirecting to dashboard..."}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{title}</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{subtitle}</p>
      </header>

      {isSignup && (
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
          />
        </label>
      )}

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          className="w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={isSignup ? "Create a strong password" : "Enter your password"}
          className="w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </label>

      {isSignup && (
        <p className="rounded-lg bg-[var(--color-paper)] px-3 py-2 text-xs text-[var(--color-muted)]">
          Minimum password length: {PASSWORD_MIN_LENGTH} characters.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitting ? "Processing..." : buttonLabel}
      </button>

      <p className="text-sm text-[var(--color-muted)]">
        {alternateLabel}{" "}
        <Link href={alternateHref} className="text-[var(--color-accent-strong)] underline">
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
