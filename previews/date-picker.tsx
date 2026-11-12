"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

export default function DatePicker() {
  const [view, setView] = useState(new Date(2026, 10, 1))
  const [picked, setPicked] = useState<Date | null>(null)
  const y = view.getFullYear(), m = view.getMonth()
  const lead = (new Date(y, m, 1).getDay() + 6) % 7
  const count = new Date(y, m + 1, 0).getDate()
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)]
  const shift = (n: number) => setView(new Date(y, m + n, 1))

  return (
    <div className="mx-auto w-full max-w-xs rounded-xl border bg-card p-3">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="grid size-11 place-items-center rounded-lg hover:bg-accent"><ChevronLeft className="size-4" aria-hidden /></button>
        <p className="text-sm font-semibold" aria-live="polite">{view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="grid size-11 place-items-center rounded-lg hover:bg-accent"><ChevronRight className="size-4" aria-hidden /></button>
      </div>
      <div role="grid" aria-label="Calendar" className="mt-1 grid grid-cols-7 text-center text-sm">
        {DAYS.map((d) => <span key={d} role="columnheader" className="py-1 text-xs text-muted-foreground">{d}</span>)}
        {cells.map((c, i) => {
          if (c === null) return <span key={`e${i}`} />
          const date = new Date(y, m, c)
          const on = picked?.getTime() === date.getTime()
          return <button key={c} type="button" role="gridcell" aria-selected={on} aria-label={fmt(date)} onClick={() => setPicked(date)} className={cn("mx-auto grid size-10 place-items-center rounded-lg tnum hover:bg-accent", on && "bg-primary text-primary-foreground hover:bg-primary")}>{c}</button>
        })}
      </div>
      <p className="mt-2 min-h-5 text-center text-xs text-muted-foreground" aria-live="polite">{picked ? fmt(picked) : "Pick a day"}</p>
    </div>
  )
}
