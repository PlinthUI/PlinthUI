"use client"

import { FluxContours } from "@/components/plinth/flux-contours"

/** Thin preview wrapper. The effect itself lives in components/plinth/. */
export default function Preview() {
  return (
    <div className="relative mx-auto h-80 w-full max-w-3xl overflow-hidden rounded-xl border bg-background">
      <FluxContours className="absolute inset-0" reveal />
      <p className="absolute bottom-3 left-4 rounded-md bg-background/70 px-2 py-1 text-sm backdrop-blur-sm">Move the pointer to light up and curl the lines. Press to stir.</p>
    </div>
  )
}
