"use client"

import { useState } from "react"
import { TextMorph } from "@/components/motion/text-morph"

const WORDS = ["Morph", "Motion", "Memory", "Measure"]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [i, setI] = useState(0)
  return (
    <div className="mx-auto grid w-fit justify-items-center gap-4">
      <TextMorph as="h3" className="text-5xl font-semibold tracking-tight">{WORDS[i]}</TextMorph>
      <button type="button" onClick={() => setI((i + 1) % WORDS.length)} className="h-11 rounded-lg border px-4 text-sm">Next word</button>
    </div>
  )
}
