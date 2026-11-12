"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const OPTIONS = ["Day", "Week", "Month", "Year"]

export default function SegmentedControl() {
  const [i, setI] = useState(1)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  return (
    <div className="mx-auto w-full max-w-sm">
      <div role="radiogroup" aria-label="Report range" className="relative grid grid-cols-4 rounded-lg bg-secondary p-1 text-sm"
        onKeyDown={(e) => { const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0; if (!d) return; e.preventDefault(); const n = (i + d + 4) % 4; setI(n); refs.current[n]?.focus() }}>
        <span aria-hidden className="absolute inset-y-1 left-1 rounded-md bg-card shadow-sm transition-transform duration-200 motion-reduce:transition-none" style={{ width: "calc((100% - 0.5rem) / 4)", transform: `translateX(${i * 100}%)` }} />
        {OPTIONS.map((o, k) => <button key={o} ref={(el) => { refs.current[k] = el }} type="button" role="radio" aria-checked={i === k} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)} className={cn("relative z-10 h-11 rounded-md font-medium", i === k ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>{o}</button>)}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">Showing the last {OPTIONS[i].toLowerCase()}</p>
    </div>
  )
}
