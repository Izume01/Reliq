import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[80vh] flex flex-col items-center px-6 py-12 sm:px-8 pt-32 sm:pt-40 font-mono uppercase text-xs">
      <div className="w-full max-w-5xl space-y-8">
        
        <header className="border-b border-[var(--color-line)] pb-8">
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-[var(--color-muted)] mb-4">
            <AlertTriangle className="h-4 w-4" />
            [ 404 // NOT FOUND ]
          </div>
          <h1 className="font-sans font-black tracking-tighter text-4xl sm:text-6xl text-[var(--color-ink)] leading-tight mb-2">
            SECRET<br/>
            <span className="text-[var(--color-muted)]">UNAVAILABLE.</span>
          </h1>
          <p className="tracking-widest text-[var(--color-muted)]">
            /// THIS LINK NO LONGER EXISTS
          </p>
        </header>

        <section className="bg-[var(--color-surface)] border border-[var(--color-line)] p-[1px]">
          <div className="bg-[var(--color-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-3 text-[10px] tracking-widest text-[var(--color-muted)]">
              <span>/// SYSTEM_MESSAGE</span>
            </div>
            
            <div className="p-8 sm:p-12">
              <p className="font-mono text-sm sm:text-base tracking-widest text-[var(--color-ink)] max-w-2xl leading-relaxed">
                THE REQUESTED SECRET CANNOT BE FOUND. IT MAY HAVE EXPIRED, REACHED ITS VIEW LIMIT, OR BEEN REVOKED BY THE OWNER.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch border-t border-[var(--color-line)] bg-[var(--color-paper)]">
              <Link
                href="/"
                className="group flex-1 flex items-center justify-center gap-2 px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] border-b sm:border-b-0 sm:border-r border-[var(--color-line)]"
              >
                RETURN TO LANDING
              </Link>
              <Link
                href="/create"
                className="flex-1 flex items-center justify-center bg-[var(--color-accent)] px-6 py-4 font-sans text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[var(--color-accent-strong)]"
              >
                CREATE NEW SECRET
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
