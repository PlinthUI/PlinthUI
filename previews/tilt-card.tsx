"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"

export default function TiltCard() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 170, damping: 17 })
  const sy = useSpring(py, { stiffness: 170, damping: 17 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9])

  return (
    <div className="mx-auto w-full max-w-xs [perspective:900px]">
      <motion.div
        onPointerMove={(e) => {
          if (reduce) return
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width - 0.5)
          py.set((e.clientY - r.top) / r.height - 0.5)
        }}
        onPointerLeave={() => {
          px.set(0)
          py.set(0)
        }}
        style={{ rotateX, rotateY }}
        className="overflow-hidden rounded-xl border bg-card shadow-lg"
      >
        <Image src="/portfolio/me-hills.jpg" alt="Green hillside" width={480} height={640} className="aspect-[4/3] w-full object-cover" />
        <div className="p-4">
          <h3 className="font-medium">Higher ground</h3>
          <p className="mt-1 text-sm text-muted-foreground">Move the pointer over the card.</p>
        </div>
      </motion.div>
    </div>
  )
}
