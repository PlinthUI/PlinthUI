"use client"

import { useRef } from "react"

const CARDS = [
  { title: "Faster reviews", body: "Comments stay attached to the line they were written on." },
  { title: "Shared snippets", body: "Pin the patterns your team reaches for most." },
]

export default function SpotlightCard() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  function move(i: number, e: React.PointerEvent) {
    const el = refs.current[i]
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - r.left}px`)
    el.style.setProperty("--y", `${e.clientY - r.top}px`)
  }

  return (
    <ul className="mx-auto grid w-full max-w-xl gap-3 @md:grid-cols-2">
      {CARDS.map((c, i) => (
        <li key={c.title}>
          <div
            ref={(el) => {
              refs.current[i] = el
            }}
            onPointerMove={(e) => move(i, e)}
            className="group relative overflow-hidden rounded-xl border bg-card p-5"
            style={{ "--x": "50%", "--y": "0%" } as React.CSSProperties}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(220px circle at var(--x) var(--y), color-mix(in oklab, var(--foreground) 12%, transparent), transparent 70%)" }}
            />
            <h3 className="relative font-medium">{c.title}</h3>
            <p className="relative mt-1 text-sm text-muted-foreground">{c.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
