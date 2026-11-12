"use client"

import { useState } from "react"
import { SlidingNumber } from "@/components/motion/sliding-number"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [n, setN] = useState(4821)
  return (
    <div className="mx-auto grid w-fit justify-items-center gap-3">
      <div className="text-5xl font-semibold tnum"><SlidingNumber value={n} /></div>
      <div className="flex gap-2"><button type="button" onClick={() => setN(Math.max(0, n - 137))} className="h-11 rounded-lg border px-4 text-sm">Down</button><button type="button" onClick={() => setN(n + 291)} className="h-11 rounded-lg bg-primary px-4 text-sm text-primary-foreground">Up</button></div>
    </div>
  )
}
