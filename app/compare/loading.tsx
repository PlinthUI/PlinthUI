export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6" role="status" aria-label="Loading comparison">
      <div className="h-9 w-40 animate-pulse rounded-md bg-muted" aria-hidden />
      <div className="mt-8 grid gap-4 lg:grid-cols-3" aria-hidden>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
      <span className="sr-only">Loading comparison</span>
    </div>
  )
}
