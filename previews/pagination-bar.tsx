"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TOTAL = 24

function pages(cur: number): (number | "gap")[] {
  const set = new Set([1, TOTAL, cur - 1, cur, cur + 1])
  const list = [...set].filter((p) => p >= 1 && p <= TOTAL).sort((a, b) => a - b)
  const out: (number | "gap")[] = []
  list.forEach((p, i) => { if (i && p - list[i - 1] > 1) out.push("gap"); out.push(p) })
  return out
}

export default function PaginationBar() {
  const [cur, setCur] = useState(7)
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <nav aria-label="Pagination">
        <ul className="flex flex-wrap items-center justify-center gap-1">
          <li><button type="button" disabled={cur === 1} onClick={() => setCur(cur - 1)} aria-label="Previous page" className="grid size-11 place-items-center rounded-lg border hover:bg-accent disabled:opacity-40"><ChevronLeft className="size-4" aria-hidden /></button></li>
          {pages(cur).map((p, i) => p === "gap" ? <li key={`g${i}`} aria-hidden className="px-1 text-muted-foreground">…</li> : (
            <li key={p}><button type="button" aria-current={p === cur ? "page" : undefined} onClick={() => setCur(p)} className={cn("grid size-11 place-items-center rounded-lg text-sm tnum", p === cur ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>{p}</button></li>
          ))}
          <li><button type="button" disabled={cur === TOTAL} onClick={() => setCur(cur + 1)} aria-label="Next page" className="grid size-11 place-items-center rounded-lg border hover:bg-accent disabled:opacity-40"><ChevronRight className="size-4" aria-hidden /></button></li>
        </ul>
      </nav>
      <p className="mt-3 text-sm text-muted-foreground tnum" aria-live="polite">Page {cur} of {TOTAL}</p>
    </div>
  )
}
