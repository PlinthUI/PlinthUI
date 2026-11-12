"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

const RANGES = [{ id: "7d", label: "7 days", n: 7 }, { id: "30d", label: "30 days", n: 30 }, { id: "90d", label: "90 days", n: 90 }]
const series = (n: number) => Array.from({ length: n }, (_, i) => Math.round(220 + 90 * Math.sin(i / 3.2) + 40 * Math.cos(i / 1.7) + i * 1.2))

export default function BarChartRange() {
  const [range, setRange] = useState(RANGES[0])
  const [hover, setHover] = useState<number | null>(null)
  const data = useMemo(() => series(range.n), [range])
  const peak = Math.max(...data)
  const total = data.reduce((a, b) => a + b, 0)
  const W = 600, H = 150, bw = W / data.length
  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="text-base font-semibold">Orders</h3><p className="text-sm text-muted-foreground tnum">{total.toLocaleString("en-US")} in {range.label} (sample data)</p></div>
        <div role="radiogroup" aria-label="Date range" className="flex rounded-lg bg-secondary p-1">
          {RANGES.map((r) => <button key={r.id} role="radio" aria-checked={range.id === r.id} onClick={() => setRange(r)} className={cn("h-9 rounded-md px-3 text-sm font-medium", range.id === r.id ? "bg-card shadow-sm" : "text-muted-foreground")}>{r.label}</button>)}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 4}`} className="mt-4 h-40 w-full" role="img" aria-label={`Daily orders over ${range.label}, peak ${peak}`}>
        {data.map((v, i) => { const h = (v / peak) * H; return <rect key={i} x={i * bw + 1} y={H - h} width={Math.max(bw - 2, 1)} height={h} rx={2} fill={hover === i ? "var(--foreground)" : "color-mix(in oklab, var(--foreground) 45%, var(--border))"} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} /> })}
      </svg>
      <p className="mt-1 text-xs text-muted-foreground tnum" aria-live="polite">{hover !== null ? `Day ${hover + 1}: ${data[hover]} orders` : "Hover a bar for its day."}</p>
    </section>
  )
}
