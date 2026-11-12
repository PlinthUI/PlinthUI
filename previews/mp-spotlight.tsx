"use client"

import { Spotlight } from "@/components/motion/spotlight"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-xl border bg-card p-6">
      <Spotlight className="from-foreground/20 via-foreground/10 to-transparent blur-xl" size={160} />
      <h3 className="relative font-semibold">Pointer spotlight</h3>
      <p className="relative mt-1 text-sm text-muted-foreground">A soft light follows the pointer inside the card.</p>
    </div>
  )
}
