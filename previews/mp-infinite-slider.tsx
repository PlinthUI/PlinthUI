"use client"

import { InfiniteSlider } from "@/components/motion/infinite-slider"

const WORDS = ["Design", "Build", "Ship", "Measure", "Learn", "Repeat"]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border bg-card py-4">
      <InfiniteSlider gap={24} speed={40} speedOnHover={14}>
        {WORDS.map((w) => <span key={w} className="rounded-lg border px-4 py-2 text-sm font-medium">{w}</span>)}
      </InfiniteSlider>
    </div>
  )
}
