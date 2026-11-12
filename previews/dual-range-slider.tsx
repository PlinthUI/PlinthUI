"use client"

import { useState } from "react"

const thumb = "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-card [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-card"

export default function DualRangeSlider() {
  const min = 0, max = 500
  const [lo, setLo] = useState(80)
  const [hi, setHi] = useState(320)
  const pct = (v: number) => ((v - min) / (max - min)) * 100
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-4 flex items-baseline justify-between text-sm"><span className="font-medium">Price range</span><span className="tnum text-muted-foreground">${lo} to ${hi}</span></div>
      <div className="relative h-11">
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" style={{ background: `linear-gradient(to right, var(--border) ${pct(lo)}%, var(--primary) ${pct(lo)}%, var(--primary) ${pct(hi)}%, var(--border) ${pct(hi)}%)` }} />
        <input type="range" min={min} max={max} value={lo} aria-label="Minimum price" onChange={(e) => setLo(Math.min(Number(e.target.value), hi - 10))} className={`pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent ${thumb}`} />
        <input type="range" min={min} max={max} value={hi} aria-label="Maximum price" onChange={(e) => setHi(Math.max(Number(e.target.value), lo + 10))} className={`pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent ${thumb}`} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground tnum"><span>${min}</span><span>${max}</span></div>
    </div>
  )
}
