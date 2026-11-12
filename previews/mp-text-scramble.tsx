"use client"

import { useState } from "react"
import { TextScramble } from "@/components/motion/text-scramble"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [run, setRun] = useState(true)
  return (
    <div className="mx-auto grid w-fit justify-items-center gap-4">
      <TextScramble className="font-mono text-2xl font-semibold" duration={1.2} speed={0.03} trigger={run} onScrambleComplete={() => setRun(false)}>Decoding the message</TextScramble>
      <button type="button" onClick={() => setRun(true)} className="h-11 rounded-lg border px-4 text-sm">Scramble again</button>
    </div>
  )
}
