import { Lock } from "lucide-react"
import { SOURCE_BY_ID } from "@/data/sources"
import type { EntryCard } from "@/lib/schema"

type PlaqueData = Pick<EntryCard, "sourceId" | "license" | "frameworks" | "redistributable">

/** The plaque strip under every plinth: source, license, framework. */
export function Plaque({ entry }: { entry: PlaqueData }) {
  const source = SOURCE_BY_ID[entry.sourceId]
  return (
    <div className="plinth-plaque flex items-center gap-2 overflow-hidden whitespace-nowrap text-muted-foreground">
      <span className="truncate font-medium text-foreground">{source?.name ?? entry.sourceId}</span>
      <span aria-hidden className="h-3 w-px shrink-0 bg-border" />
      <span className="inline-flex shrink-0 items-center gap-1">
        {!entry.redistributable && <Lock className="size-3" aria-hidden />}
        {entry.license}
      </span>
      <span aria-hidden className="h-3 w-px shrink-0 bg-border" />
      <span className="truncate">{entry.frameworks.join(" ")}</span>
    </div>
  )
}
