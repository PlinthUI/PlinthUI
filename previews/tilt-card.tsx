"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"

export default function TiltCard() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 180, damping: 18 })
  const sy = useSpring(py, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  function reset() {
    px.set(0)
    py.set(0)
  }

  return (
    <div className="mx-auto w-full max-w-xs [perspective:900px]">
      <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="overflow-hidden rounded-xl border bg-card shadow-lg">
        <Image src="https://picsum.photos/seed/coastal-trail-map/480/300" alt="A coastal trail seen from above" width={480} height={300} unoptimized className="aspect-[8/5] w-full object-cover" />
        <div className="p-4">
          <h3 className="font-medium">Cliff path loop</h3>
          <p className="mt-1 text-sm text-muted-foreground">11.4 km, 3 h 20 min. Sample trail, mock data.</p>
        </div>
      </motion.div>
    </div>
  )
}
