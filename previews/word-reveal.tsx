"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const TEXT = "Models, backends and interfaces shipped as one system, with a hard line around the decisions that must be right."

export default function WordReveal() {
  const ref = useRef<HTMLParagraphElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShown(e.isIntersecting), { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="mx-auto w-full max-w-md">
      <p ref={ref} className="text-2xl font-semibold leading-snug tracking-tight" aria-label={TEXT}>
        {TEXT.split(" ").map((w, i) => (
          <span key={i} aria-hidden className={cn("inline-block pr-[0.28em] transition-[opacity,transform] duration-500 motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")} style={{ transitionDelay: shown ? `${i * 35}ms` : "0ms" }}>
            {w}
          </span>
        ))}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">Scroll this out of view and back to replay.</p>
    </div>
  )
}
