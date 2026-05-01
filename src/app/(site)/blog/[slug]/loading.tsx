export default function BlogPostLoading() {
  return (
    <article
      role="status"
      aria-busy="true"
      aria-label="Loading article"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
        <Pulse className="h-4 w-40 rounded" />
      </div>
      <header className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <Pulse className="h-6 w-32 rounded-full" />
        <Pulse className="mt-5 h-12 w-full rounded-2xl" />
        <Pulse className="mt-2 h-12 w-3/4 rounded-2xl" />
        <Pulse className="mt-5 h-6 w-full rounded-lg" />
        <div className="mt-7 flex gap-3">
          <Pulse className="h-4 w-24 rounded" />
          <Pulse className="h-4 w-20 rounded" />
          <Pulse className="h-4 w-20 rounded" />
        </div>
      </header>
      <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-8">
        <Pulse className="aspect-[16/8] w-full rounded-2xl" />
      </div>
      <div className="mx-auto mt-12 max-w-3xl px-5 pb-24 sm:px-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Pulse
            key={i}
            className={`mt-4 h-5 rounded ${i % 4 === 3 ? "w-3/4" : "w-full"}`}
          />
        ))}
      </div>
      <span className="sr-only">Loading article…</span>
    </article>
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
