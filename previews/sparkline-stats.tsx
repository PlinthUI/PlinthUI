"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Signups", value: "1,284", delta: 12.4, series: [12, 14, 13, 18, 17, 22, 21, 26] },
  { label: "Churned", value: "37", delta: -8.1, series: [9, 8, 9, 7, 8, 6, 6, 5] },
  { label: "Trial to paid", value: "23.6%", delta: 2.2, series: [20, 21, 20, 22, 23, 22, 24, 24] },
  { label: "Support load", value: "142", delta: 5.7, series: [10, 12, 11, 13, 12, 14, 15, 14] },
]

function Spark({ data, good }: { data: number[]; good: boolean }) {
  const w = 96
  const h = 28
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((v - min) / (max - min || 1)) * (h - 4)}`).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-24" role="img" aria-label={`Trend from ${data[0]} to ${data[data.length - 1]}`}>
      <polyline points={pts} fill="none" stroke={good ? "var(--success)" : "var(--destructive)"} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default function SparklineStats() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <ul className="grid grid-cols-1 gap-3 @sm:grid-cols-2">
        {STATS.map((s) => {
          const up = s.delta >= 0
          const good = s.label === "Churned" || s.label === "Support load" ? !up : up
          const Arrow = up ? ArrowUpRight : ArrowDownRight
          return (
            <li key={s.label} className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-2xl font-semibold tnum">{s.value}</p>
                <Spark data={s.series} good={good} />
              </div>
              <p className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium tnum", good ? "text-success" : "text-destructive")}>
                <Arrow className="size-3.5" aria-hidden />
                {up ? "Up" : "Down"} {Math.abs(s.delta)}% vs last week
              </p>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">Sample figures, mock data.</p>
    </div>
  )
}
