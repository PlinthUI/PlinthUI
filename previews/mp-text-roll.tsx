"use client"

import { TextRoll } from "@/components/motion/text-roll"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-fit cursor-default">
      <TextRoll className="text-4xl font-semibold tracking-tight">Hover to roll</TextRoll>
    </div>
  )
}
