"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MaskRevealImage() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="mx-auto w-full max-w-sm">
      <div ref={ref} className="relative overflow-hidden rounded-xl">
        <Image src="https://picsum.photos/seed/glass-greenhouse-morning/800/1000" alt="A glass greenhouse in morning light" width={800} height={1000} unoptimized className={cn("aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transition-none", shown ? "scale-100" : "scale-125")} />
        <div aria-hidden className={cn("absolute inset-0 bg-foreground transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:hidden", shown ? "-translate-y-full" : "translate-y-0")} />
      </div>
      <button type="button" onClick={() => { setShown(false); window.setTimeout(() => setShown(true), 60) }} className="mt-3 inline-flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-accent">
        <RotateCcw className="size-4" aria-hidden /> Replay
      </button>
    </div>
  )
}
