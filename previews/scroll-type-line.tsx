"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const LINES = ["Design", "Build", "Ship", "Repeat"]

export default function ScrollTypeLine() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const a = useTransform(scrollYProgress, [0, 1], ["10%", "-35%"])
  const b = useTransform(scrollYProgress, [0, 1], ["-35%", "10%"])
  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border bg-card py-8" role="img" aria-label={LINES.join(", ")}>
      {LINES.map((l, i) => (
        <motion.p key={l} aria-hidden style={reduce ? undefined : { x: i % 2 ? b : a }} className="whitespace-nowrap text-6xl font-semibold leading-none tracking-tight @xl:text-8xl" >
          <span className={i % 2 ? "text-muted-foreground" : ""}>{`${l} ${l} ${l}`}</span>
        </motion.p>
      ))}
    </div>
  )
}
