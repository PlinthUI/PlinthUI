"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Check } from "lucide-react"

const LAUNCH = Date.UTC(2027, 0, 20, 9, 0, 0)
const units = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return [["days", Math.floor(s / 86400)], ["hours", Math.floor(s / 3600) % 24], ["minutes", Math.floor(s / 60) % 60], ["seconds", s % 60]] as const }

export default function LandingLaunch() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const [now, setNow] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    setNow(Date.now())
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div ref={ref} className="w-full overflow-hidden rounded-xl border bg-neutral-950 text-neutral-50">
      <section className="relative isolate">
        <motion.div aria-hidden style={reduce ? undefined : { y: imgY }} className="absolute inset-x-0 -top-10 -bottom-10 -z-10">
          <Image src="https://picsum.photos/seed/glass-desk-lamp-night/1400/900" alt="" fill unoptimized sizes="1000px" className="object-cover opacity-60" />
        </motion.div>
        <div className="grid min-h-[34rem] content-center gap-6 px-6 py-16 @xl:px-14">
          <p className="text-sm text-neutral-300">Launching 20 January</p>
          <h2 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-tight @xl:text-7xl">Halo, a desk lamp that follows the light in your room</h2>
          <p className="max-w-lg text-lg text-neutral-200">Warm in the evening, bright at noon, and quiet all day. Pre-order now and ship in March.</p>
          <div role="timer" aria-label="Time until launch" className="flex gap-3">
            {(now === null ? [["days", 0], ["hours", 0], ["minutes", 0], ["seconds", 0]] as const : units(LAUNCH - now)).map(([l, v]) => (
              <div key={l} className="min-w-16 rounded-lg border border-neutral-50/20 bg-neutral-950/60 p-3 text-center backdrop-blur"><p className="text-2xl font-semibold tnum">{String(v).padStart(2, "0")}</p><p className="text-xs text-neutral-300">{l}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-px bg-neutral-50/10 @xl:grid-cols-3">
        {[["3000 K to 6500 K", "Tunable white light"], ["14 months", "Battery life in eco mode"], ["Recycled aluminium", "Body and base"]].map(([a, b]) => (
          <div key={a} className="bg-neutral-950 p-6"><p className="text-xl font-semibold">{a}</p><p className="mt-1 text-sm text-neutral-300">{b}</p></div>
        ))}
      </section>
      <section className="px-6 py-14 @xl:px-14">
        <h3 className="text-3xl font-semibold tracking-tight">Reserve yours</h3>
        {done ? <p role="status" className="mt-4 inline-flex items-center gap-2"><Check className="size-4" aria-hidden />Reserved for {email}. Nothing was sent.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) setDone(true) }} className="mt-4 flex max-w-md flex-col gap-2 @md:flex-row">
            <label htmlFor="ll-e" className="sr-only">Email</label>
            <input id="ll-e" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@home.com" className="h-12 min-w-0 flex-1 rounded-lg border border-neutral-50/30 bg-neutral-950 px-3 text-neutral-50" />
            <button type="submit" className="h-12 rounded-lg bg-neutral-50 px-6 font-medium text-neutral-950">Pre-order</button>
          </form>
        )}
      </section>
    </div>
  )
}
