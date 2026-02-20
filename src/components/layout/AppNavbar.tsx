"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, MessageSquareLock, Plus, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/client";

const linkBaseClass =
  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors";

const getLinkClassName = (active: boolean) =>
  active
    ? `${linkBaseClass} bg-[var(--color-paper)] text-[var(--color-ink)]`
    : `${linkBaseClass} text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-ink)]`;

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: sessionData, isPending } = authClient.useSession();

  const isAuthed = Boolean(sessionData?.user);
  const onHome = pathname === "/";
  const onCreate = pathname.startsWith("/create");
  const onDashboard = pathname.startsWith("/dashboard");

  const signOut = async () => {
    const result = await authClient.signOut();
    if (result.error) {
      toast.error(result.error.message || "Unable to sign out");
      return;
    }

    if (onCreate || onDashboard) {
      router.push("/login");
    } else {
      router.refresh();
    }
    toast.success("Signed out");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)]/60 bg-[var(--color-surface)]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white shadow-[0_8px_20px_rgba(141,63,15,0.25)]">
            <MessageSquareLock className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
            Reliq
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={getLinkClassName(onHome)}>
            Home
          </Link>
          <Link href="/create" className={getLinkClassName(onCreate)}>
            Create
          </Link>
          <Link href="/dashboard" className={getLinkClassName(onDashboard)}>
            Dashboard
          </Link>
          <Link
            href="/#faq"
            className={`${linkBaseClass} text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-ink)]`}
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-[var(--color-line)]/40" />
          ) : isAuthed ? (
            <>
              <Link
                href="/create"
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
              >
                <Plus className="h-4 w-4" />
                New secret
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-line)] bg-white px-3 py-1.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[var(--color-accent-strong)]"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
