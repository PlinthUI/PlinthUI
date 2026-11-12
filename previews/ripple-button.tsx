"use client"

import { useState } from "react"

type Ripple = { id: number; x: number; y: number }

export default function RippleButton() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  function press(e: React.PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const id = performance.now()
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    window.setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), 650)
  }

  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <button type="button" onPointerDown={press} className="relative h-12 overflow-hidden rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground">
        <span className="relative">Press anywhere</span>
        {ripples.map((r) => (
          <span key={r.id} aria-hidden className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/30 animate-ping motion-reduce:hidden" style={{ left: r.x, top: r.y, animationIterationCount: 1, animationDuration: "650ms" }} />
        ))}
      </button>
    </div>
  )
}
