"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const ROLES = ["AI engineer", "Full-system builder"]

export default function PortfolioHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  // Each layer moves at its own speed as the hero crosses the viewport.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.05])
  const frontY = useTransform(scrollYProgress, [0, 1], [70, -90])
  const backY = useTransform(scrollYProgress, [0, 1], [30, -40])
  const textY = useTransform(scrollYProgress, [0, 1], [24, -36])
  const still = reduce ? { y: 0, scale: 1 } : undefined

  return (
    <section ref={ref} className="relative mx-auto isolate w-full max-w-3xl overflow-hidden rounded-xl bg-neutral-950 text-neutral-50">
      <motion.div aria-hidden style={still ?? { y: bgY, scale: bgScale }} className="absolute inset-0 -z-20">
        <Image src="/portfolio/me-hills.jpg" alt="" fill sizes="768px" className="object-cover" priority />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/65" />

      <div className="grid min-h-[30rem] gap-8 p-6 @2xl:grid-cols-[1.3fr_1fr] @2xl:p-10">
        <motion.div style={still ?? { y: textY }} className="grid content-center gap-5">
          <h3 className="text-4xl font-semibold leading-[1.05] tracking-tight @xl:text-5xl">Shreekumar B</h3>
          <p className="flex flex-wrap gap-2" aria-label="Roles">
            {ROLES.map((r) => (
              <span key={r} className="rounded-md border border-neutral-50/30 px-2.5 py-1 text-sm">
                {r}
              </span>
            ))}
          </p>
          <p className="max-w-md text-neutral-200">Models, backends and interfaces, shipped as one system. The LLM stays out of the decisions that have to be right.</p>
          <div className="flex flex-wrap gap-2">
            <a href="#resume" onClick={(e) => e.preventDefault()} className="group inline-flex h-11 items-center gap-2 rounded-lg bg-neutral-50 px-5 text-sm font-medium text-neutral-950 transition-transform active:scale-[0.98]">
              View résumé <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a href="#contact" onClick={(e) => e.preventDefault()} className="group inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-50/40 px-5 text-sm font-medium transition-transform hover:bg-neutral-50/10 active:scale-[0.98]">
              Email me <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </motion.div>

        <div className="relative hidden min-h-64 @2xl:block" aria-hidden>
          <motion.div style={still ?? { y: backY }} className="absolute right-2 top-0 w-36 rotate-3 overflow-hidden rounded-xl border border-neutral-50/20 shadow-2xl">
            <Image src="/portfolio/me-silhouette.jpg" alt="" width={288} height={384} className="aspect-[3/4] object-cover" />
          </motion.div>
          <motion.div style={still ?? { y: frontY }} className="absolute bottom-0 left-2 w-44 -rotate-2 overflow-hidden rounded-xl border border-neutral-50/20 shadow-2xl">
            <Image src="/portfolio/me-palace.jpg" alt="" width={352} height={470} className="aspect-[3/4] object-cover" />
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-neutral-50/15 bg-neutral-950/60 px-6 py-3 backdrop-blur-sm @2xl:px-10">
        <button type="button" aria-expanded={open} aria-controls="now-detail" onClick={() => setOpen(!open)} className="flex min-h-11 w-full items-center justify-between text-left">
          <span className="text-sm">
            <span className="text-neutral-300">Now building </span>
            <span className="font-semibold">PRYSM</span>
          </span>
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        <p id="now-detail" hidden={!open} className="pb-2 text-sm text-neutral-300">
          A continuous compliance operating system with a deterministic core and an LLM language layer.
        </p>
      </div>
    </section>
  )
}
