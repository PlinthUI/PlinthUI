"use client"

import { useRef } from "react"
import { ScrollProgress } from "@/components/motion/scroll-progress"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <ScrollProgress containerRef={ref} className="absolute top-0 h-1 bg-foreground" />
      <div ref={ref} tabIndex={0} aria-label="Article, scroll to read" className="h-60 overflow-y-auto p-4 pt-5 text-sm text-muted-foreground">
        {Array.from({ length: 8 }, (_, i) => <p key={i} className="mb-3">Paragraph {i + 1}. The bar above fills as you move through this text, and smooths with a spring.</p>)}
      </div>
    </div>
  )
}
