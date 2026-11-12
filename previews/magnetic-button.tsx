"use client"

import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

export default function MagneticButton() {
  const reduce = useReducedMotion()
  const area = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })

  function pull(e: React.PointerEvent) {
    if (reduce || !area.current) return
    const r = area.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }

  return (
    <div
      ref={area}
      onPointerMove={pull}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="mx-auto grid h-48 w-full max-w-sm place-items-center rounded-xl border border-dashed"
    >
      <motion.button type="button" style={{ x, y }} className="h-12 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground active:scale-95">
        Get in touch
      </motion.button>
    </div>
  )
}
