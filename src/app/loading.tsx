export default function Loading() {
  return (
    <div className="min-h-[70vh]">
      {/* Hero skeleton */}
      <div className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 h-7 w-64 animate-pulse rounded-full bg-[var(--color-line)]/50" />
          <div className="mx-auto mb-3 h-12 w-full max-w-xl animate-pulse rounded-xl bg-[var(--color-line)]/40 sm:h-16" />
          <div className="mx-auto mb-6 h-12 w-3/4 max-w-md animate-pulse rounded-xl bg-[var(--color-line)]/40 sm:h-16" />
          <div className="mx-auto mb-2 h-4 w-full max-w-lg animate-pulse rounded bg-[var(--color-line)]/30" />
          <div className="mx-auto mb-8 h-4 w-2/3 max-w-sm animate-pulse rounded bg-[var(--color-line)]/30" />
          <div className="flex justify-center gap-3">
            <div className="h-11 w-36 animate-pulse rounded-xl bg-[var(--color-accent)]/15" />
            <div className="h-11 w-36 animate-pulse rounded-xl bg-[var(--color-line)]/40" />
          </div>
        </div>

        {/* Mock UI card skeleton */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
            <div className="flex items-center gap-2 border-b border-[var(--color-line)]/60 bg-[var(--color-paper)]/60 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[var(--color-line)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--color-line)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--color-line)]" />
              <div className="ml-3 h-3 w-28 animate-pulse rounded bg-[var(--color-line)]/40" />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-[var(--color-line)]/40" />
                <div className="space-y-1.5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-line)]/50" />
                  <div className="h-3 w-40 animate-pulse rounded bg-[var(--color-line)]/30" />
                </div>
              </div>
              <div className="h-20 animate-pulse rounded-xl bg-[var(--color-line)]/20" />
              <div className="flex gap-3">
                <div className="h-8 w-28 animate-pulse rounded-lg bg-[var(--color-line)]/30" />
                <div className="h-8 w-32 animate-pulse rounded-lg bg-[var(--color-line)]/30" />
                <div className="h-8 w-28 animate-pulse rounded-lg bg-[var(--color-line)]/30" />
              </div>
              <div className="h-10 animate-pulse rounded-lg bg-[var(--color-accent)]/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="border-y border-[var(--color-line)]/60 bg-[var(--color-surface)]/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-2 h-8 w-20 animate-pulse rounded-lg bg-[var(--color-line)]/40" />
              <div className="mx-auto h-3 w-28 animate-pulse rounded bg-[var(--color-line)]/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Features skeleton */}
      <div className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mx-auto mb-3 h-4 w-20 animate-pulse rounded bg-[var(--color-accent)]/20" />
            <div className="mx-auto mb-3 h-10 w-full max-w-md animate-pulse rounded-xl bg-[var(--color-line)]/40" />
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-[var(--color-line)]/30" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
                <div className="mb-4 h-11 w-11 animate-pulse rounded-xl bg-[var(--color-line)]/40" />
                <div className="mb-2 h-5 w-32 animate-pulse rounded bg-[var(--color-line)]/50" />
                <div className="mb-1 h-3 w-full animate-pulse rounded bg-[var(--color-line)]/25" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-[var(--color-line)]/25" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
