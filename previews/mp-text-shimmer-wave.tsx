"use client"

import { TextShimmerWave } from "@/components/motion/text-shimmer-wave"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return <p className="mx-auto w-fit"><TextShimmerWave className="text-2xl font-semibold" duration={1.2} spread={1}>Thinking it through…</TextShimmerWave></p>
}
