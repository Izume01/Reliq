import React from "react";

export default function Loading() {
  return (
    <main className="relative min-h-[80vh] flex flex-col items-center px-6 py-12 sm:px-8 pt-32 sm:pt-40 font-mono uppercase text-xs">
      <div className="w-full max-w-5xl space-y-8 animate-pulse">
        
        {/* Header Skeleton */}
        <header className="border-b border-[var(--color-line)] pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 bg-[var(--color-line)]" />
            <div className="h-3 w-32 bg-[var(--color-line)]" />
          </div>
          <div className="space-y-3 mb-2 mt-4">
            <div className="h-10 sm:h-14 w-3/4 max-w-md bg-[var(--color-line)]" />
            <div className="h-10 sm:h-14 w-1/2 max-w-sm bg-[var(--color-line)]/50" />
          </div>
          <div className="mt-6 h-3 w-full max-w-xl bg-[var(--color-line)]/40" />
        </header>

        {/* Content Box Skeleton */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-line)] p-[1px]">
          <div className="bg-[var(--color-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-paper)] px-6 py-4">
              <div className="h-3 w-40 bg-[var(--color-line)]/60" />
              <div className="h-3 w-24 bg-[var(--color-line)]/40" />
            </div>
            
            <div className="p-8 sm:p-12 space-y-6">
              <div className="h-24 w-full bg-[var(--color-line)]/20" />
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-[var(--color-line)]/40" />
                <div className="h-12 w-40 bg-[var(--color-line)]/30" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch border-t border-[var(--color-line)] bg-[var(--color-paper)] h-14">
               <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[var(--color-line)] bg-[var(--color-line)]/10" />
               <div className="flex-1 bg-[var(--color-line)]/20" />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
