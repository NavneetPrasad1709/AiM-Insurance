export default function BlogLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading articles"
      className="bg-background"
    >
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-gradient-blob opacity-50 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Pulse className="mx-auto h-7 w-44 rounded-full" />
          <Pulse className="mx-auto mt-6 h-14 w-3/4 rounded-2xl" />
          <Pulse className="mx-auto mt-3 h-14 w-1/2 rounded-2xl" />
          <Pulse className="mx-auto mt-7 h-6 w-3/4 rounded-lg" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-background pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Pulse className="mx-auto mb-8 h-12 w-full max-w-md rounded-full" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Pulse className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-6">
                  <Pulse className="h-5 w-4/5 rounded-md" />
                  <Pulse className="h-4 w-full rounded-md" />
                  <Pulse className="h-4 w-2/3 rounded-md" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <span className="sr-only">Loading blog posts…</span>
    </div>
  );
}

function Pulse({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block animate-pulse bg-surface-2 ${className ?? ""}`}
    />
  );
}
