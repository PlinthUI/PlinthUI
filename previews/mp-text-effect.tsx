"use client"

import { useState } from "react"
import { TextEffect } from "@/components/motion/text-effect"

const PRESETS = ["fade-in-blur", "blur", "scale", "slide", "fade"] as const
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>("fade-in-blur")
  const [run, setRun] = useState(0)
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <TextEffect key={run} per="word" preset={preset} as="h3" className="text-3xl font-semibold tracking-tight">Words arrive one after another</TextEffect>
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">{PRESETS.map((p) => <button key={p} type="button" aria-pressed={preset === p} onClick={() => { setPreset(p); setRun(run + 1) }} className="h-9 rounded-lg border px-3 text-sm aria-pressed:bg-primary aria-pressed:text-primary-foreground">{p}</button>)}</div>
    </div>
  )
}
