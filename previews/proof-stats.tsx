"use client"

import { useEffect, useRef, useState } from "react"

const ITEMS = [
  { value: 51, prefix: "#", title: "HackerRank Orchestrate", body: "Global rank with an AI financial-affordability agent." },
  { value: 1, label: "Winner", title: "Crowdera UI/UX Hackathon", body: "For a donation and crisis-response platform." },
  { value: 1, label: "Finalist", title: "HackXelerate 26'", body: "National-level hackathon, as team lead." },
  { value: 91, suffix: " tests", title: "DriftCheck on npm", body: "A published CLI that checks a live deployment actually works." },
]

function useCount(target: number, run: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / 900, 1)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return n
}

function Stat({ item, run }: { item: (typeof ITEMS)[number]; run: boolean }) {
  const n = useCount(item.value, run)
  return (
    <li className="grid content-start gap-1">
      <p className="text-4xl font-semibold tracking-tight tnum">
        {item.label ? item.label : `${item.prefix ?? ""}${n}${item.suffix ?? ""}`}
      </p>
      <h4 className="text-sm font-medium">{item.title}</h4>
      <p className="text-sm text-muted-foreground">{item.body}</p>
    </li>
  )
}

export default function ProofStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setRun(true), io.disconnect()), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl rounded-xl border bg-card p-6 @xl:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Proof, not promises</h3>
      <ul className="mt-6 grid gap-x-8 gap-y-7 @lg:grid-cols-2">
        {ITEMS.map((i) => (
          <Stat key={i.title} item={i} run={run} />
        ))}
      </ul>
    </div>
  )
}
