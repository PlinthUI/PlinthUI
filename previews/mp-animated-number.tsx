"use client"

import { useState } from "react"
import { AnimatedNumber } from "@/components/motion/animated-number"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [n, setN] = useState(1240)
  return (
    <div className="mx-auto grid w-fit justify-items-center gap-3">
      <AnimatedNumber className="text-5xl font-semibold tnum" value={n} />
      <div className="flex gap-2"><button type="button" onClick={() => setN(Math.max(0, n - 317))} className="h-11 rounded-lg border px-4 text-sm">Decrease</button><button type="button" onClick={() => setN(n + 521)} className="h-11 rounded-lg bg-primary px-4 text-sm text-primary-foreground">Increase</button></div>
    </div>
  )
}
