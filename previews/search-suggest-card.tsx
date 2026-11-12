"use client"

import { useId, useMemo, useState } from "react"
import { Clock, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const INDEX = ["Invoice template", "Invoice reminders", "Team calendar", "Team onboarding guide", "Release notes", "Roadmap Q1", "Refund policy", "Brand guidelines"]

export default function SearchSuggestCard() {
  const id = useId()
  const [q, setQ] = useState("")
  const [recent, setRecent] = useState(["Roadmap Q1", "Brand guidelines"])
  const [active, setActive] = useState(0)
  const results = useMemo(() => (q.trim() ? INDEX.filter((x) => x.toLowerCase().includes(q.trim().toLowerCase())) : recent), [q, recent])
  const pick = (v: string) => { setRecent((r) => [v, ...r.filter((x) => x !== v)].slice(0, 4)); setQ(v) }

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border bg-card p-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" aria-hidden />
        <label htmlFor={id} className="sr-only">Search documents</label>
        <input id={id} role="combobox" aria-expanded aria-controls={`${id}-l`} aria-activedescendant={results[active] ? `${id}-${active}` : undefined} value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }} placeholder="Search documents"
          onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) } else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) } else if (e.key === "Enter" && results[active]) pick(results[active]) }}
          className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-9 text-sm focus-visible:border-primary" />
        {q && <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="absolute right-1 top-1 grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent"><X className="size-4" aria-hidden /></button>}
      </div>
      <p className="px-1 pb-1 pt-3 text-xs text-muted-foreground">{q.trim() ? `${results.length} results` : "Recent"}</p>
      <ul id={`${id}-l`} role="listbox" className="grid gap-0.5">
        {results.map((r, i) => (
          <li key={r} id={`${id}-${i}`} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onClick={() => pick(r)} className={cn("flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm", i === active && "bg-accent")}>
            {!q.trim() && <Clock className="size-4 text-muted-foreground" aria-hidden />}{r}
          </li>
        ))}
        {results.length === 0 && <li className="px-2 py-3 text-sm text-muted-foreground">No documents match “{q}”.</li>}
      </ul>
    </div>
  )
}
