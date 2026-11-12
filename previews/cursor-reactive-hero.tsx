"use client"

import Image from "next/image"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"

export default function CursorReactiveHero() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 20 })
  const sy = useSpring(py, { stiffness: 90, damping: 20 })
  const bgX = useTransform(sx, [-0.5, 0.5], [18, -18])
  const bgY = useTransform(sy, [-0.5, 0.5], [18, -18])
  const fgX = useTransform(sx, [-0.5, 0.5], [-26, 26])
  const fgY = useTransform(sy, [-0.5, 0.5], [-16, 16])
  return (
    <section
      onPointerMove={(e) => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); px.set((e.clientX - r.left) / r.width - 0.5); py.set((e.clientY - r.top) / r.height - 0.5) }}
      onPointerLeave={() => { px.set(0); py.set(0) }}
      className="relative mx-auto isolate grid min-h-[26rem] w-full max-w-2xl place-items-center overflow-hidden rounded-xl bg-neutral-950 text-neutral-50"
    >
      <motion.div aria-hidden style={{ x: bgX, y: bgY, scale: 1.12 }} className="absolute inset-0 -z-10">
        <Image src="https://picsum.photos/seed/foggy-pine-valley/1200/800" alt="" fill unoptimized sizes="700px" className="object-cover opacity-70" />
      </motion.div>
      <motion.div style={{ x: fgX, y: fgY }} className="px-6 text-center">
        <h3 className="text-5xl font-semibold leading-[1.02] tracking-tight @xl:text-7xl">Move your cursor</h3>
        <p className="mx-auto mt-3 max-w-xs text-neutral-200">Background and headline drift in opposite directions to add depth.</p>
      </motion.div>
    </section>
  )
}
