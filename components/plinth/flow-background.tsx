"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  /** How many lines are drawn. Scales with the canvas size. */
  density?: number
  /** Lines stay faint until the pointer comes near, then light up. */
  reveal?: boolean
  /** Strength of the pointer magnet. 0 turns it off. */
  magnetStrength?: number
  /** Reach of the magnet as a fraction of the canvas height. */
  magnetRadius?: number
  /** A press stirs the lines into a short swirl. */
  clickSwirl?: boolean
  /** Fade the lines in on mount. */
  intro?: boolean
}

/**
 * Flow field background. Many short-lived particles ride an angle field made
 * from layered waves that drift over time, leaving thin glowing trails.
 * The pointer is a magnet: lines near it bend around it and, with `reveal`,
 * light up. Pressing stirs a swirl. Color follows the element's text color, so
 * it works in light and dark themes. Reduced motion draws one still frame.
 */
export function FlowBackground({ className, density = 520, reveal = false, magnetStrength = 1, magnetRadius = 0.35, clickSwirl = true, intro = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const still = mq.matches
    let w = 0, h = 0, raf = 0, visible = true, t = Math.random() * 100
    const born = performance.now()
    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false }
    let swirl: { x: number; y: number; at: number } | null = null
    const TRAIL = 80
    const BASE = reveal ? 0.1 : 1 // visibility of lines far from the pointer
    type P = { x: number; y: number; life: number; max: number; w: number; trail: number[] }
    let ps: P[] = []

    const spawn = (): P => {
      const x = Math.random() * w, y = Math.random() * h
      return { x, y, life: 0, max: 220 + Math.random() * 380, w: 0.7 + Math.random() * 1.5, trail: [x, y] }
    }

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
      return (Math.sin(x * s * 1.3 + t * 0.6) * 1.9 + Math.cos(y * s * 1.7 - t * 0.45) * 1.7 + Math.sin((x + y) * s * 0.8 + t * 0.3) * 1.2) * Math.PI * 0.5
    }

    /** 0 far from the pointer, 1 at it, with a smooth edge. */
    const near = (x: number, y: number) => {
      if (!pointer.active) return 0
      const R = magnetRadius * h
      const d = Math.hypot(x - pointer.sx, y - pointer.sy)
      const k = Math.max(0, 1 - d / R)
      return k * k * (3 - 2 * k)
    }

    const advance = (now: number) => {
      // The magnet follows the pointer with a little lag.
      if (pointer.active) {
        if (pointer.sx < -9000) { pointer.sx = pointer.x; pointer.sy = pointer.y }
        pointer.sx += (pointer.x - pointer.sx) * 0.22
        pointer.sy += (pointer.y - pointer.sy) * 0.22
      }
      const swirlAge = swirl ? (now - swirl.at) / 1100 : 2
      if (swirlAge >= 1) swirl = null
      for (const p of ps) {
        let a = angle(p.x, p.y)
        const k = magnetStrength > 0 ? near(p.x, p.y) : 0
        if (k > 0) {
          // Curl around the pointer, and drift slightly toward it.
          const dx = p.x - pointer.sx, dy = p.y - pointer.sy
          a += (Math.PI / 2) * k * 2.4 * magnetStrength
          const d = Math.hypot(dx, dy) || 1
          p.x -= (dx / d) * k * 0.9 * magnetStrength
          p.y -= (dy / d) * k * 0.9 * magnetStrength
        }
        if (swirl) {
          const dx = p.x - swirl.x, dy = p.y - swirl.y
          const d = Math.hypot(dx, dy)
          const reach = h * 0.5
          if (d < reach) a += (1 - d / reach) * (1 - swirlAge) * Math.PI * 1.6
        }
        p.x += Math.cos(a) * 3.4; p.y += Math.sin(a) * 3.4; p.life++
        p.trail.push(p.x, p.y)
        if (p.trail.length > TRAIL * 2) p.trail.splice(0, 2)
        if (p.life > p.max || p.x < -30 || p.y < -30 || p.x > w + 30 || p.y > h + 30) Object.assign(p, spawn())
      }
    }

    const draw = (color: string, now: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.lineCap = "round"; ctx.lineJoin = "round"
      const fadeIn = intro && !still ? Math.min(1, (now - born) / 1400) : 1
      for (const p of ps) {
        const n = p.trail.length / 2
        if (n < 3) continue
        const life = Math.min(1, p.life / 16) * Math.min(1, (p.max - p.life) / 24)
        const vis = life * fadeIn * (BASE + (1 - BASE) * near(p.x, p.y) * (reveal ? 1.15 : 1))
        if (vis < 0.01) continue
        const path = (from: number) => {
          ctx.beginPath(); ctx.moveTo(p.trail[from * 2], p.trail[from * 2 + 1])
          for (let i = from + 1; i < n; i++) ctx.lineTo(p.trail[i * 2], p.trail[i * 2 + 1])
          ctx.stroke()
        }
        ctx.globalAlpha = Math.min(1, 0.4 * vis); ctx.lineWidth = p.w * 3.4; path(0)
        ctx.globalAlpha = Math.min(1, 0.7 * vis); ctx.lineWidth = p.w * 1.1; path(Math.floor(n * 0.35))
        ctx.globalAlpha = Math.min(1, 0.95 * vis); ctx.lineWidth = p.w * 0.9; path(Math.floor(n * 0.7))
      }
      ctx.globalAlpha = 1
    }

    const color = () => getComputedStyle(el).color

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.004
      advance(now)
      draw(color(), now)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    const inside = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top, ok: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom }
    }
    const onMove = (e: PointerEvent) => {
      const p = inside(e)
      pointer.active = p.ok
      if (p.ok) { pointer.x = p.x; pointer.y = p.y }
    }
    const onDown = (e: PointerEvent) => {
      if (!clickSwirl || still) return
      const p = inside(e)
      if (p.ok) swirl = { x: p.x, y: p.y, at: performance.now() }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })

    if (still) {
      for (let i = 0; i < TRAIL + 40; i++) { t += 0.004; advance(0) }
      draw(color(), 0)
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [density, reveal, magnetStrength, magnetRadius, clickSwirl, intro])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full text-foreground", className)} />
}
