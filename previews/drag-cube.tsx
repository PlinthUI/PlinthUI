"use client"

import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"

const FACES = [["front", "rotateY(0deg)"], ["back", "rotateY(180deg)"], ["right", "rotateY(90deg)"], ["left", "rotateY(-90deg)"], ["top", "rotateX(90deg)"], ["bottom", "rotateX(-90deg)"]] as const

export default function DragCube() {
  const reduce = useReducedMotion()
  const ry = useMotionValue(-25)
  const rx = useMotionValue(-20)
  const last = useRef<{ x: number; y: number } | null>(null)
  const transform = useTransform([rx, ry], ([x, y]) => `translateZ(-60px) rotateX(${x}deg) rotateY(${y}deg)`)
  return (
    <div className="mx-auto grid w-full max-w-xs place-items-center gap-3">
      <div
        role="img" aria-label="A cube you can rotate by dragging" tabIndex={0}
        onPointerDown={(e) => { if (reduce) return; e.currentTarget.setPointerCapture(e.pointerId); last.current = { x: e.clientX, y: e.clientY } }}
        onPointerMove={(e) => { if (!last.current) return; ry.set(ry.get() + (e.clientX - last.current.x) * 0.6); rx.set(rx.get() - (e.clientY - last.current.y) * 0.6); last.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={() => (last.current = null)}
        onKeyDown={(e) => { const d = { ArrowLeft: [0, -15], ArrowRight: [0, 15], ArrowUp: [15, 0], ArrowDown: [-15, 0] }[e.key]; if (d) { e.preventDefault(); rx.set(rx.get() + d[0]); ry.set(ry.get() + d[1]) } }}
        className="grid size-44 cursor-grab touch-none place-items-center [perspective:700px] active:cursor-grabbing"
      >
        <motion.div style={{ transform, transformStyle: "preserve-3d" }} className="relative size-28">
          {FACES.map(([n, t]) => (
            <span key={n} className="absolute inset-0 grid place-items-center border border-foreground/40 bg-card/80 text-xs backdrop-blur-sm [backface-visibility:visible]" style={{ transform: `${t} translateZ(56px)` }}>{n}</span>
          ))}
        </motion.div>
      </div>
      <p className="text-sm text-muted-foreground">Drag, or use the arrow keys.</p>
    </div>
  )
}
