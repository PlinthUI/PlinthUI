"use client"

import { useState } from "react"
import { RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="mx-auto w-full max-w-xs [perspective:1000px]">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? "Show the front of the card" : "Show the back of the card"}
        onClick={() => setFlipped(!flipped)}
        className={cn("relative block h-48 w-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none", flipped && "[transform:rotateY(180deg)]")}
      >
        <span className="absolute inset-0 grid content-center gap-1 rounded-xl border bg-card p-5 text-left [backface-visibility:hidden]">
          <span className="text-xl font-semibold">Deterministic core</span>
          <span className="text-sm text-muted-foreground">Decisions that have to be right.</span>
          <RotateCw className="mt-3 size-4 text-muted-foreground" aria-hidden />
        </span>
        <span className="absolute inset-0 grid content-center gap-1 rounded-xl bg-primary p-5 text-left text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xl font-semibold">LLM language layer</span>
          <span className="text-sm opacity-80">Words on top, never the verdict.</span>
        </span>
      </button>
    </div>
  )
}
