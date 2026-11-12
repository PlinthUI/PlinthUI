"use client"

import { useId, useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { searchEntries } from "@/lib/search"
import { SOURCE_BY_ID } from "@/data/sources"
import { useEntries } from "./entries-provider"

/** Search box that lists matching entries with an add button. Shared by compare and collections. */
export function EntryPicker({ onPick, exclude = [], label = "Add a component", actionLabel = "Add" }: { onPick: (slug: string) => void; exclude?: string[]; label?: string; actionLabel?: string }) {
  const entries = useEntries()
  const [q, setQ] = useState("")
  const id = useId()
  const results = useMemo(() => {
    const pool = entries.filter((e) => !exclude.includes(e.slug))
    return (q.trim() ? searchEntries(pool, q, 6) : pool.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 5))
  }, [entries, q, exclude])

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" aria-hidden />
        <input id={id} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “pricing” or “login”" className="h-11 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm focus-visible:border-primary" />
      </div>
      <ul className="mt-2 grid grid-cols-1 gap-1">
        {results.map((e) => (
          <li key={e.slug} className="flex min-h-12 items-center justify-between gap-3 rounded-lg border bg-card pl-3 pr-1.5">
            <span className="min-w-0 text-sm">
              <span className="block truncate font-medium">{e.title}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {e.category} on {SOURCE_BY_ID[e.sourceId]?.name}
              </span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => onPick(e.slug)} aria-label={`${actionLabel} ${e.title}`}>
              <Plus aria-hidden /> {actionLabel}
            </Button>
          </li>
        ))}
        {results.length === 0 && <li className="px-1 py-2 text-sm text-muted-foreground">No match for “{q}”.</li>}
      </ul>
    </div>
  )
}
