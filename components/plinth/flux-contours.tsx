"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  /** Contour levels. More levels draw more lines. */
  levels?: number
  /** Zoom of the pattern. Higher values give bigger, fewer shapes. */
  scale?: number
  /** How fast the field churns. */
  speed?: number
  /** Brightness of the lines. */
  glow?: number
  /** Lines stay faint until the pointer comes near. */
  reveal?: boolean
  /** Strength of the pointer magnet. 0 turns it off. */
  magnetStrength?: number
  /** Reach of the magnet as a fraction of the height. */
  magnetRadius?: number
  /** A press stirs the field into a swirl. */
  clickSwirl?: boolean
  /** Fade in on mount. */
  intro?: boolean
}

/* Smooth value noise on an integer lattice, with a hash written for this file. */
const hash = (x: number, y: number, z: number) => {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
const fade = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
function vnoise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi)
  const l = (dz: number) =>
    lerp(lerp(hash(xi, yi, zi + dz), hash(xi + 1, yi, zi + dz), xf), lerp(hash(xi, yi + 1, zi + dz), hash(xi + 1, yi + 1, zi + dz), xf), yf)
  return lerp(l(0), l(1), zf)
}

/**
 * Glowing contour lines of a churning, warped noise field. The field is sampled
 * at low resolution on the CPU, lines are drawn where its value crosses evenly
 * spaced levels, and the result is scaled up smoothly. The pointer bends the
 * field around itself and lights up lines near it. Color follows the element's
 * text color. Reduced motion draws one still frame.
 */
export function FluxContours({ className, levels = 7, scale = 1.6, speed = 0.5, glow = 1.4, reveal = false, magnetStrength = 1, magnetRadius = 0.35, clickSwirl = true, intro = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const low = document.createElement("canvas")
    const lg = low.getContext("2d")!
    let w = 0, h = 0, lw = 0, lh = 0, img: ImageData | null = null
    let raf = 0, visible = true, t = Math.random() * 50
    const born = performance.now()
    const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false, k: 0 }
    let swirl: { x: number; y: number; at: number } | null = null
    const BASE = reveal ? 0.12 : 1
    let rgb: [number, number, number] = [255, 255, 255]

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width; h = r.height
      el.width = Math.max(1, Math.round(w * dpr)); el.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const f = 0.3
      lw = Math.max(40, Math.round(w * f)); lh = Math.max(24, Math.round(h * f))
      low.width = lw; low.height = lh
      img = lg.createImageData(lw, lh)
    }

    const readColor = () => {
      const m = getComputedStyle(el).color.match(/[\d.]+/g)
      if (m && m.length >= 3) rgb = [Number(m[0]), Number(m[1]), Number(m[2])]
    }

    const frame = (now: number) => {
      if (!img) return
      const d = img.data
      const ar = lw / lh
      // smooth the pointer toward its target
      if (pointer.active) { pointer.sx += (pointer.x - pointer.sx) * 0.2; pointer.sy += (pointer.y - pointer.sy) * 0.2 }
      pointer.k += ((pointer.active ? 1 : 0) - pointer.k) * 0.12
      const swirlAge = swirl ? (now - swirl.at) / 1300 : 2
      if (swirlAge >= 1) swirl = null
      const px = pointer.sx / w, py = pointer.sy / h
      const R = magnetRadius
      const intro01 = intro && !still ? Math.min(1, (now - born) / 1500) : 1
      for (let j = 0; j < lh; j++) {
        const v = j / lh
        for (let i = 0; i < lw; i++) {
          const u = i / lw
          let x = u * ar, y = v
          let k = 0
          if (magnetStrength > 0 && pointer.k > 0.01) {
            const dx = u - px, dy = v - py
            const dist = Math.hypot(dx * ar, dy)
            const q = Math.max(0, 1 - dist / R)
            k = q * q * (3 - 2 * q) * pointer.k
            if (k > 0) {
              // rotate the sample point around the pointer: the field curls there
              const a = k * 2.6 * magnetStrength
              const cx = px * ar, cy = py
              const rx = x - cx, ry = y - cy
              x = cx + rx * Math.cos(a) - ry * Math.sin(a)
              y = cy + rx * Math.sin(a) + ry * Math.cos(a)
            }
          }
          if (swirl) {
            const cx = (swirl.x / w) * ar, cy = swirl.y / h
            const rx = x - cx, ry = y - cy
            const dist = Math.hypot(rx, ry)
            const a = Math.max(0, 1 - dist / 0.5) * (1 - swirlAge) * 5
            x = cx + rx * Math.cos(a) - ry * Math.sin(a)
            y = cy + rx * Math.sin(a) + ry * Math.cos(a)
          }
          const sx = x * scale * 2.2, sy = y * scale * 2.2
          // domain warp makes the loops churn and merge
          const wx = vnoise(sx * 0.9 + 3.1, sy * 0.9, t * 0.35)
          const wy = vnoise(sx * 0.9, sy * 0.9 + 7.7, t * 0.35 + 9)
          const qx = sx + 1.7 * (wx - 0.5) * 2, qy = sy + 1.7 * (wy - 0.5) * 2
          const n = vnoise(qx, qy - t * 0.25, t * 0.2) * 0.65 + vnoise(qx * 2.1 + 4, qy * 2.1, t * 0.3) * 0.35
          const s = n * levels
          const dist = Math.abs(s - Math.round(s)) // 0 on a contour
          const line = Math.max(0, 1 - dist / 0.085)
          const core = line * line * (3 - 2 * line)
          // shimmer: break lines into separate strokes
          const br = vnoise(qx * 1.4 + 11, qy * 1.4, t * 0.5)
          const strokes = Math.min(1, Math.max(0, (br - 0.3) / 0.3))
          const vis = intro01 * (BASE + (1 - BASE) * Math.min(1, k * 1.4))
          const a = Math.min(1, core * strokes * glow * vis)
          const o = (j * lw + i) * 4
          d[o] = rgb[0]; d[o + 1] = rgb[1]; d[o + 2] = rgb[2]; d[o + 3] = a * 255
        }
      }
      lg.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(low, 0, 0, w, h)
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.012 * speed
      frame(now)
    }

    resize(); readColor()
    const ro = new ResizeObserver(() => { resize(); readColor() })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    const rel = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top, ok: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom }
    }
    const onMove = (e: PointerEvent) => {
      const p = rel(e)
      if (p.ok && !pointer.active) { pointer.sx = p.x; pointer.sy = p.y }
      pointer.active = p.ok
      if (p.ok) { pointer.x = p.x; pointer.y = p.y }
    }
    const onDown = (e: PointerEvent) => {
      if (!clickSwirl || still) return
      const p = rel(e)
      if (p.ok) swirl = { x: p.x, y: p.y, at: performance.now() }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })

    if (still) frame(0)
    else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [levels, scale, speed, glow, reveal, magnetStrength, magnetRadius, clickSwirl, intro])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full text-foreground", className)} />
}
