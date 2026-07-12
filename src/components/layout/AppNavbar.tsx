"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerminalSquare, LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

const linkBaseClass = "px-4 py-2 text-xs font-mono font-bold uppercase tracking-[0.1em] transition-colors";

const getLinkClassName = (active: boolean) =>
  active
    ? `${linkBaseClass} bg-[var(--color-ink)] text-[var(--color-surface)]`
    : `${linkBaseClass} text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]`;

const mobileLinkBaseClass = "w-full text-left px-4 py-4 text-xs font-mono font-bold uppercase tracking-[0.1em] transition-colors border-b border-[var(--color-line)]";

const getMobileLinkClassName = (active: boolean) =>
  active
    ? `${mobileLinkBaseClass} bg-[var(--color-ink)] text-[var(--color-surface)]`
    : `${mobileLinkBaseClass} text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper)]`;

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: sessionData } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = async () => {
    await authClient.signOut();
    setMobileMenuOpen(false);
    router.push("/login");
  };
  
  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-[var(--color-line)] bg-[var(--color-surface)] flex justify-center px-4 py-4 sm:px-5">
      <nav className="flex flex-col w-full max-w-5xl bg-[var(--color-surface)] gap-4">
        <div className="flex items-stretch justify-between w-full gap-4">
          <div className="flex items-stretch gap-6 bg-[var(--color-surface)]">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 bg-[var(--color-ink)] px-4 py-2 text-[var(--color-surface)] transition-colors hover:bg-[var(--color-accent)] hover:text-white">
              <TerminalSquare className="h-5 w-5" />
              <span className="font-sans font-black tracking-widest uppercase hidden sm:block text-sm mt-[2px]">Reliq</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <Link href="/create" className={getLinkClassName(pathname === "/create")}>
                Create
              </Link>
              <Link href="/dashboard" className={getLinkClassName(pathname === "/dashboard")}>
                Dashboard
              </Link>
              <Link href="/#faq" className={getLinkClassName(pathname === "/#faq")}>
                FAQ
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-stretch bg-[var(--color-surface)] gap-1 p-1">
            {!sessionData?.user ? (
              <>
                <Link href="/login" className="flex items-center px-4 text-xs font-mono font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper)]">
                  Log in
                </Link>
                <Link href="/signup" className="flex items-center bg-[var(--color-accent)] px-5 text-xs font-mono font-bold uppercase tracking-[0.1em] text-white hover:bg-[var(--color-accent-strong)]">
                  Initialize
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-paper)] border border-transparent hover:border-[var(--color-line)] transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log Out
              </button>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center px-4 border border-[var(--color-line)] bg-[var(--color-surface)] hover:bg-[var(--color-paper)] transition-colors text-[var(--color-ink)]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col border-t border-[var(--color-line)] pt-2 bg-[var(--color-surface)]">
            <Link href="/create" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClassName(pathname === "/create")}>
              Create
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClassName(pathname === "/dashboard")}>
              Dashboard
            </Link>
            <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClassName(pathname === "/#faq")}>
              FAQ
            </Link>
            
            <div className="mt-4 pt-4 border-t border-[var(--color-line)] flex flex-col gap-2">
              {!sessionData?.user ? (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-4 text-xs font-mono font-bold uppercase tracking-[0.1em] text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-[var(--color-paper)]">
                    Log in
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-4 text-xs font-mono font-bold uppercase tracking-[0.1em] bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]">
                    Initialize
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-4 text-xs font-mono font-bold uppercase tracking-[0.1em] text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
