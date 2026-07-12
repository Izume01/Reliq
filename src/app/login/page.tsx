import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import AuthAside from "@/components/auth/AuthAside";
import { auth } from "@/lib/auth/auth";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-6 py-12 sm:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid w-full gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden lg:block bg-[var(--color-surface)] p-8 sm:p-12">
          <Link
            href="/"
            className="inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-6"
          >
            [ ABORT / BACK TO ROOT ]
          </Link>
          <AuthAside
            title="Welcome back."
            subtitle="Sign in to access your secure dashboard, copy active links, and revoke secrets instantly when needed."
          />
          </div>

          <div className="bg-[var(--color-surface)] p-8 sm:p-12">
            <Link
              href="/"
              className="lg:hidden inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
            >
              [ ABORT / BACK TO ROOT ]
            </Link>
            <AuthForm mode="login" />
          </div>
        </div>
      </div>
    </main>
  );
}
