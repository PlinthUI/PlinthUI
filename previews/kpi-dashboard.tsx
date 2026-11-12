"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

const RANGES = [
  { id: "7d", label: "7 days", n: 7 },
  { id: "30d", label: "30 days", n: 30 },
  { id: "90d", label: "90 days", n: 90 },
]

/** Deterministic mock series so renders are stable. */
function series(n: number) {
  return Array.from({ length: n }, (_, i) => Math.round(220 + 90 * Math.sin(i / 3.2) + 40 * Math.cos(i / 1.7) + i * 1.4))
}

export default function KpiDashboard({ variant = "7d" }: PreviewProps) {
  const [range, setRange] = useState(RANGES.find((r) => r.id === variant) ?? RANGES[0])
  const data = useMemo(() => series(range.n), [range])
  const sum = data.reduce((a, b) => a + b, 0)
  const peak = Math.max(...data)
  const avg = Math.round(sum / data.length)
  const [hover, setHover] = useState<number | null>(null)
  const W = 600
  const H = 150
  const bw = W / data.length

  return (
    <section className="mx-auto w-full max-w-3xl rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold">Orders overview</h3>
        <div role="radiogroup" aria-label="Date range" className="flex rounded-lg bg-secondary p-1">
          {RANGES.map((r) => (
            <button key={r.id} role="radio" aria-checked={range.id === r.id} onClick={() => setRange(r)} className={cn("h-9 rounded-md px-3 text-sm font-medium", range.id === r.id ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Orders", sum.toLocaleString("en-US")],
          ["Daily average", avg.toLocaleString("en-US")],
          ["Best day", peak.toLocaleString("en-US")],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border bg-background p-3">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="text-xl font-semibold tnum">{v}</dd>
          </div>
        ))}
      </dl>
      <svg viewBox={`0 0 ${W} ${H + 4}`} className="mt-4 h-40 w-full" role="img" aria-label={`Daily orders over ${range.label}. Peak ${peak}.`}>
        {data.map((v, i) => {
          const h = (v / peak) * H
          return <rect key={i} x={i * bw + 1} y={H - h} width={Math.max(bw - 2, 1)} height={h} rx={2} fill={hover === i ? "var(--primary)" : "color-mix(in oklab, var(--primary) 55%, var(--border))"} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
        })}
      </svg>
      <p className="mt-1 text-xs text-muted-foreground tnum" aria-live="polite">
        {hover !== null ? `Day ${hover + 1}: ${data[hover]} orders` : "Hover a bar for its day. All figures are mock."}
      </p>
    </section>
  )
}
