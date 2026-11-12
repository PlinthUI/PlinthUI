"use client"

import { useState } from "react"
import { AnimatedGroup } from "@/components/motion/animated-group"

const PRESETS = ["fade", "slide", "blur-slide", "scale", "zoom", "bounce"] as const
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>("blur-slide")
  const [run, setRun] = useState(0)
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex flex-wrap gap-1.5">{PRESETS.map((p) => <button key={p} type="button" aria-pressed={preset === p} onClick={() => { setPreset(p); setRun(run + 1) }} className="h-9 rounded-lg border px-3 text-sm aria-pressed:bg-primary aria-pressed:text-primary-foreground">{p}</button>)}</div>
      <AnimatedGroup key={run} preset={preset} className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="grid h-20 place-items-center rounded-lg border bg-card text-sm tnum">{i + 1}</div>)}
      </AnimatedGroup>
    </div>
  )
}
