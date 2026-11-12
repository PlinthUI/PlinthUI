import { ItemCardSkeleton } from "./item-card"

export function ExploreSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[16rem_1fr]" role="status" aria-label="Loading components">
      <div className="hidden space-y-3 lg:block" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-8 animate-pulse rounded-md bg-muted/70" />
        ))}
      </div>
      <div>
        <div className="h-11 w-full animate-pulse rounded-lg bg-muted" aria-hidden />
        <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <ItemCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">Loading components</span>
    </div>
  )
}
