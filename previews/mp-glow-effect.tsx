"use client"

import { GlowEffect } from "@/components/motion/glow-effect"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto h-28 w-64">
      <GlowEffect colors={["#38bdf8", "#34d399", "#facc15", "#fb7185"]} mode="rotate" blur="medium" duration={6} scale={0.95} />
      <div className="relative grid h-full place-items-center rounded-xl border bg-card text-sm font-medium">Soft moving glow</div>
    </div>
  )
}
