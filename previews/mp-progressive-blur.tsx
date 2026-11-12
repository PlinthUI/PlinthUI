"use client"

import { ProgressiveBlur } from "@/components/motion/progressive-blur"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto h-60 w-full max-w-sm overflow-hidden rounded-xl border">
      <img src="https://picsum.photos/seed/blur-forest-path/800/600" alt="A forest path" className="size-full object-cover" />
      <ProgressiveBlur className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full" direction="bottom" blurIntensity={0.7} />
      <p className="absolute bottom-3 left-4 text-sm font-medium text-neutral-50">The blur builds toward the bottom edge</p>
    </div>
  )
}
