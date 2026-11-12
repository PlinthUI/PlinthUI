import Link from "next/link"
import type { EntryCard } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { CompareButton } from "./compare-button"
import { PlinthStage } from "./plinth-stage"
import { SaveButton } from "./save-button"

export function ItemCard({ entry, layout = "grid", index = 0 }: { entry: EntryCard; layout?: "grid" | "list"; index?: number }) {
  return (
    <article
      className={cn("rise group relative flex rounded-xl", layout === "grid" ? "flex-col gap-3" : "flex-col gap-3 sm:flex-row sm:items-start sm:gap-5")}
      style={{ "--i": Math.min(index, 12) } as React.CSSProperties}
    >
      <div className={cn("transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none", layout === "list" && "sm:w-72 sm:shrink-0")}>
        <PlinthStage mode="card" previewId={entry.previewId} kind={entry.kind} />
      </div>
      <div className="min-w-0 flex-1 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-snug">
              <Link href={`/c/${entry.slug}`} className="rounded-sm after:absolute after:inset-0 after:z-0 after:rounded-xl hover:text-primary">
                {entry.title}
              </Link>
            </h3>
          </div>
          <div className="relative z-10 -mr-2 -mt-1 flex shrink-0">
            <SaveButton slug={entry.slug} title={entry.title} />
            <CompareButton slug={entry.slug} title={entry.title} />
          </div>
        </div>
        <p className={cn("mt-2 text-sm text-muted-foreground", layout === "grid" ? "line-clamp-2" : "line-clamp-3")}>{entry.summary}</p>
      </div>
    </article>
  )
}

export function ItemCardSkeleton({ layout = "grid" }: { layout?: "grid" | "list" }) {
  return (
    <div className={cn("flex gap-3", layout === "grid" ? "flex-col" : "flex-col sm:flex-row sm:gap-5")} aria-hidden>
      <div className={cn(layout === "list" && "sm:w-72 sm:shrink-0")}>
        <div className="aspect-[16/10] animate-pulse rounded-xl bg-muted" />
        <div className="mx-5 mt-2 h-7 animate-pulse rounded-md bg-muted/70" />
      </div>
      <div className="flex-1 space-y-2 px-1">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted/70" />
        <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
      </div>
    </div>
  )
}
