"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Flow field background. Many short-lived particles ride an angle field made
 * from layered waves that drift over time, leaving thin glowing trails that
 * slowly fade. The pointer adds a swirl around itself. Color follows the
 * element's current text color, so it works in light and dark themes.
 * Reduced motion draws one still frame. Drawing pauses while off screen.
 */
export function FlowBackground({ className, density = 520 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let w = 0, h = 0, raf = 0, visible = true, t = Math.random() * 100
    const pointer = { x: -9999, y: -9999, active: false }
    type P = { x: number; y: number; life: number; max: number; w: number; trail: number[] }
    let ps: P[] = []

    const TRAIL = 80 // points kept per line
    const spawn = (): P => { const x = Math.random() * w, y = Math.random() * h; return { x, y, life: 0, max: 220 + Math.random() * 380, w: 0.7 + Math.random() * 1.5, trail: [x, y] } }

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width; h = r.height
      el.width = Math.max(1, Math.round(w * dpr)); el.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(density * Math.min(1.4, (w * h) / (1200 * 700)))
      ps = Array.from({ length: Math.max(80, n) }, spawn)
    }

    /** Angle of the flow at a point, from layered drifting waves. */
    const angle = (x: number, y: number) => {
      const s = 0.0042
      return (
        Math.sin(x * s * 1.3 + t * 0.6) * 1.9 +
        Math.cos(y * s * 1.7 - t * 0.45) * 1.7 +
        Math.sin((x + y) * s * 0.8 + t * 0.3) * 1.2
      ) * Math.PI * 0.5
    }

    /** Moves every particle one step along the field and records its trail. */
    const advance = () => {
      for (const p of ps) {
        let a = angle(p.x, p.y)
        if (pointer.active) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 220 * 220) a += (Math.PI / 2) * (1 - Math.sqrt(d2) / 220) * 2.2
        }
        p.x += Math.cos(a) * 3.4; p.y += Math.sin(a) * 3.4; p.life++
        p.trail.push(p.x, p.y)
        if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2)
        if (p.life > p.max || p.x < -30 || p.y < -30 || p.x > w + 30 || p.y > h + 30) Object.assign(p, spawn())
      }
    }

    const draw = (color: string) => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.lineCap = "round"; ctx.lineJoin = "round"
      for (const p of ps) {
        const n = p.trail.length / 2
        if (n < 3) continue
        const vis = Math.min(1, p.life / 16) * Math.min(1, (p.max - p.life) / 24)
        const path = (from: number) => {
          ctx.beginPath(); ctx.moveTo(p.trail[from * 2], p.trail[from * 2 + 1])
          for (let i = from + 1; i < n; i++) ctx.lineTo(p.trail[i * 2], p.trail[i * 2 + 1])
          ctx.stroke()
        }
        ctx.globalAlpha = 0.4 * vis; ctx.lineWidth = p.w * 3.4; path(0)
        ctx.globalAlpha = 0.7 * vis; ctx.lineWidth = p.w * 1.1; path(Math.floor(n * 0.35))
        ctx.globalAlpha = 0.95 * vis; ctx.lineWidth = p.w * 0.9; path(Math.floor(n * 0.7))
      }
      ctx.globalAlpha = 1
    }

    const color = () => getComputedStyle(el).color

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.004
      advance()
      draw(color())
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true
    }
    const onLeave = () => { pointer.active = false }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeave)

    if (mq.matches) {
      for (let i = 0; i < TRAIL + 40; i++) { t += 0.004; advance() }
      draw(color())
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [density])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full text-foreground", className)} />
}
