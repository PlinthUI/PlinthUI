"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const CARDS = [
  ["01", "Research", "Interviews and audits to find the real problem."],
  ["02", "Concept", "Three directions, one chosen together."],
  ["03", "Build", "Design and code in the same sprint."],
  ["04", "Launch", "Rollout, monitoring and a month of support."],
]

function Card({ i, n, scroller, title, body, num }: { i: number; n: number; scroller: React.RefObject<HTMLDivElement | null>; title: string; body: string; num: string }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ container: scroller })
  const scale = useTransform(scrollYProgress, [i / n, 1], [1, 1 - (n - i) * 0.04])
  return (
    <div className="sticky top-4 mb-6" style={{ top: 16 + i * 14 }}>
      <motion.article style={reduce ? undefined : { scale, transformOrigin: "top center" }} className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="font-mono text-sm text-muted-foreground tnum">{num}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-muted-foreground">{body}</p>
      </motion.article>
    </div>
  )
}

export default function StackedCardsScroll() {
  const scroller = useRef<HTMLDivElement>(null)
  return (
    <div className="mx-auto w-full max-w-md">
      <div ref={scroller} tabIndex={0} aria-label="Process steps, scroll down" className="h-96 overflow-y-auto rounded-xl border bg-secondary/40 p-4">
        {CARDS.map(([num, t, b], i) => <Card key={t} i={i} n={CARDS.length} scroller={scroller} title={t} body={b} num={num} />)}
        <div className="h-40" aria-hidden />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Scroll inside the panel. Each card sticks and the ones beneath recede.</p>
    </div>
  )
}
