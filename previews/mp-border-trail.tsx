"use client"

import { BorderTrail } from "@/components/motion/border-trail"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto w-full max-w-xs rounded-xl border bg-card p-6">
      <BorderTrail className="bg-foreground" size={70} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} />
      <h3 className="font-semibold">Build 214 passed</h3>
      <p className="mt-1 text-sm text-muted-foreground">A short light runs around the card edge.</p>
    </div>
  )
}
