"use client"

import { TextShimmer } from "@/components/motion/text-shimmer"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return <p className="mx-auto w-fit"><TextShimmer className="text-xl font-medium" duration={2}>Generating your report…</TextShimmer></p>
}
