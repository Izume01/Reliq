import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import AuthAside from "@/components/auth/AuthAside";
import { auth } from "@/lib/auth/auth";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="px-6 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex text-xs uppercase tracking-[0.12em] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            ← Back to landing
          </Link>
          <AuthAside
            title="Create your account."
            subtitle="Start account-bound secret sharing with a secure-by-default flow and immediate dashboard access."
          />
        </div>

        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[0_18px_60px_rgba(120,70,30,0.12)] sm:p-7">
          <AuthForm mode="signup" />
        </div>
      </div>
    </main>
  );
}
