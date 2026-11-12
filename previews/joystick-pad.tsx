"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const R = 52

export default function JoystickPad() {
  const base = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [held, setHeld] = useState(false)

  const move = (cx: number, cy: number) => {
    const r = base.current!.getBoundingClientRect()
    let dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2)
    const d = Math.hypot(dx, dy)
    if (d > R) { dx = (dx / d) * R; dy = (dy / d) * R }
    setPos({ x: dx, y: dy })
  }
  const out = { x: Math.round((pos.x / R) * 100), y: Math.round((-pos.y / R) * 100) }

  return (
    <div className="mx-auto grid w-full max-w-xs justify-items-center gap-4">
      <div
        ref={base}
        role="slider"
        tabIndex={0}
        aria-label="Joystick"
        aria-valuetext={`x ${out.x}, y ${out.y}`}
        aria-valuenow={out.x}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setHeld(true); move(e.clientX, e.clientY) }}
        onPointerMove={(e) => held && move(e.clientX, e.clientY)}
        onPointerUp={() => { setHeld(false); setPos({ x: 0, y: 0 }) }}
        onPointerCancel={() => { setHeld(false); setPos({ x: 0, y: 0 }) }}
        onKeyDown={(e) => {
          const step = 26
          const d: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }
          if (d[e.key]) { e.preventDefault(); setPos((p) => ({ x: Math.max(-R, Math.min(R, p.x + d[e.key][0])), y: Math.max(-R, Math.min(R, p.y + d[e.key][1])) })) }
          if (e.key === "Escape" || e.key === "Home") setPos({ x: 0, y: 0 })
        }}
        className="relative grid size-44 touch-none place-items-center rounded-full border bg-secondary"
      >
        <span aria-hidden className="absolute h-px w-3/4 bg-border" />
        <span aria-hidden className="absolute h-3/4 w-px bg-border" />
        <span aria-hidden className={cn("size-16 rounded-full border bg-card shadow-md", !held && "transition-transform duration-200 ease-out motion-reduce:transition-none")} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />
      </div>
      <p className="font-mono text-sm tnum" aria-live="off">x {String(out.x).padStart(4, " ")}  y {String(out.y).padStart(4, " ")}</p>
      <p className="text-xs text-muted-foreground">Drag, or use the arrow keys. Release to recentre.</p>
    </div>
  )
}
