"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

export default function ParallaxDivider() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const far = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  const near = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"])
  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="mb-4 text-muted-foreground">Above the divider, the page continues as normal text.</p>
      <section ref={ref} className="relative isolate grid h-72 place-items-center overflow-hidden rounded-xl">
        <motion.div aria-hidden style={reduce ? undefined : { y: far, scale: 1.25 }} className="absolute inset-0 -z-10">
          <Image src="https://picsum.photos/seed/dune-ridge-wide/1200/700" alt="" fill unoptimized sizes="700px" className="object-cover" />
        </motion.div>
        <motion.div aria-hidden style={reduce ? undefined : { y: near }} className="absolute -bottom-16 left-8 w-40 rotate-3 overflow-hidden rounded-xl border border-neutral-50/30 shadow-2xl">
          <Image src="https://picsum.photos/seed/cactus-closeup-light/400/500" alt="" width={400} height={500} unoptimized className="aspect-[4/5] object-cover" />
        </motion.div>
        <h3 className="rounded-lg bg-neutral-950/60 px-4 py-2 text-3xl font-semibold tracking-tight text-neutral-50 backdrop-blur">Two layers, two speeds</h3>
      </section>
      <p className="mt-4 text-muted-foreground">Below it, the story picks up again.</p>
    </div>
  )
}
