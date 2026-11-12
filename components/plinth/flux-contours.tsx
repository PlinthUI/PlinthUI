"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  /** Contour levels. More levels draw more lines. */
  levels?: number
  /** Zoom of the pattern. Higher values give bigger, fewer shapes. */
  scale?: number
  /** How fast the field churns. 0 freezes it. */
  speed?: number
  /** Brightness of the lines. */
  glow?: number
  /** Thickness of the crisp core of each line, in pixels. */
  lineWidth?: number
  /** A press stirs the field into a short swirl. */
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

const GRID = 0.2 // field samples per CSS pixel (coarse)
const MAX_FINE = 760_000 // cap on drawn pixels, for speed

/**
 * Glowing contour lines of a churning, warped noise field.
 *
 * The field is evaluated on a coarse grid. Each drawn pixel then interpolates
 * the field value and its slope, so a line is placed where the value crosses
 * an evenly spaced level and its width is measured in real pixels. That keeps
 * every line the same thin width with a soft glow, instead of blurring a
 * low-resolution image. Color follows the element's text color, in light and
 * dark themes. Reduced motion draws one still frame.
 */
export function FluxContours({ className, levels = 8, scale = 1.5, speed = 0.45, glow = 1, lineWidth = 1.1, clickSwirl = false, intro = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = document.createElement("canvas")
    const fg = fine.getContext("2d")!
    let w = 0, h = 0, fw = 0, fh = 0, gw = 0, gh = 0, ratio = 1
    let S = new Float32Array(0), M = new Float32Array(0), G = new Float32Array(0)
    let img: ImageData | null = null
    let raf = 0, visible = true, t = Math.random() * 50, frames = 0
    const born = performance.now()
    let swirl: { x: number; y: number; at: number } | null = null
    let rgb: [number, number, number] = [255, 255, 255]

    const readColor = () => {
      const m = getComputedStyle(el).color.match(/[\d.]+/g)
      if (m && m.length >= 3) rgb = [Number(m[0]), Number(m[1]), Number(m[2])]
    }

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width; h = r.height
      el.width = Math.max(1, Math.round(w * dpr)); el.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ratio = Math.min(1, dpr, Math.sqrt(MAX_FINE / Math.max(1, w * h)))
      fw = Math.max(32, Math.round(w * ratio)); fh = Math.max(20, Math.round(h * ratio))
      fine.width = fw; fine.height = fh
      img = fg.createImageData(fw, fh)
      gw = Math.ceil(w * GRID) + 3; gh = Math.ceil(h * GRID) + 3
      S = new Float32Array(gw * gh); M = new Float32Array(gw * gh); G = new Float32Array(gw * gh)
    }

    /** Evaluates the field on the coarse grid: level value, stroke mask and slope. */
    const field = (now: number) => {
      const ar = w / h
      const swirlAge = swirl ? (now - swirl.at) / 1300 : 2
      if (swirlAge >= 1) swirl = null
      for (let j = 0; j < gh; j++) {
        const v = (j - 1) / GRID / h
        for (let i = 0; i < gw; i++) {
          const u = (i - 1) / GRID / w
          let x = u * ar, y = v
          if (swirl) {
            const cx = (swirl.x / w) * ar, cy = swirl.y / h
            const rx = x - cx, ry = y - cy
            const a = Math.max(0, 1 - Math.hypot(rx, ry) / 0.5) * (1 - swirlAge) * 5
            x = cx + rx * Math.cos(a) - ry * Math.sin(a)
            y = cy + rx * Math.sin(a) + ry * Math.cos(a)
          }
          const sx = x * scale * 2.2, sy = y * scale * 2.2
          // domain warp makes the loops churn and merge
          const wx = vnoise(sx * 0.9 + 3.1, sy * 0.9, t * 0.35)
          const wy = vnoise(sx * 0.9, sy * 0.9 + 7.7, t * 0.35 + 9)
          const qx = sx + 3.4 * (wx - 0.5), qy = sy + 3.4 * (wy - 0.5)
          const n = vnoise(qx, qy - t * 0.25, t * 0.2) * 0.65 + vnoise(qx * 2.1 + 4, qy * 2.1, t * 0.3) * 0.35
          const idx = j * gw + i
          S[idx] = n * levels
          // shimmer: lines break into separate strokes
          const br = vnoise(qx * 1.4 + 11, qy * 1.4, t * 0.5)
          M[idx] = Math.min(1, Math.max(0, (br - 0.28) / 0.3))
        }
      }
      for (let j = 1; j < gh - 1; j++) {
        for (let i = 1; i < gw - 1; i++) {
          const idx = j * gw + i
          G[idx] = Math.hypot(S[idx + 1] - S[idx - 1], S[idx + gw] - S[idx - gw]) * 0.5 // level change per grid step
        }
      }
      // replicate edges so interpolation never reads empty slope
      for (let i = 0; i < gw; i++) { G[i] = G[gw + i]; G[(gh - 1) * gw + i] = G[(gh - 2) * gw + i] }
      for (let j = 0; j < gh; j++) { G[j * gw] = G[j * gw + 1]; G[j * gw + gw - 1] = G[j * gw + gw - 2] }
    }

    /** Draws the lines from the grid at near full resolution. */
    const paint = (now: number) => {
      if (!img) return
      const d = img.data
      const intro01 = intro && !still ? Math.min(1, (now - born) / 1400) : 1
      const step = GRID / ratio // grid cells per drawn pixel
      const pxPerCell = 1 / step // drawn pixels per grid cell
      const core = Math.max(0.4, lineWidth) * ratio
      for (let py = 0; py < fh; py++) {
        const gy = py * step + 1 // +1 for the padding ring
        const j0 = Math.min(gh - 2, Math.floor(gy)), fy = gy - j0
        for (let px = 0; px < fw; px++) {
          const gx = px * step + 1
          const i0 = Math.min(gw - 2, Math.floor(gx)), fx = gx - i0
          const a = j0 * gw + i0, b = a + 1, c = a + gw, e = c + 1
          const w00 = (1 - fx) * (1 - fy), w10 = fx * (1 - fy), w01 = (1 - fx) * fy, w11 = fx * fy
          const s = S[a] * w00 + S[b] * w10 + S[c] * w01 + S[e] * w11
          const g = G[a] * w00 + G[b] * w10 + G[c] * w01 + G[e] * w11
          const m = M[a] * w00 + M[b] * w10 + M[c] * w01 + M[e] * w11
          // distance to the nearest level, in drawn pixels
          const slope = g * step // level change per drawn pixel
          const dist = Math.abs(s - Math.round(s)) / Math.max(slope, 1e-4)
          const gate = Math.min(1, slope / 0.015) // fade lines where the field is flat
          const crisp = Math.max(0, 1 - dist / core)
          const halo = Math.exp(-dist / (core * 3.2)) * 0.32
          const alpha = Math.min(1, (crisp * crisp * (3 - 2 * crisp) + halo) * m * gate * glow * intro01)
          const o = (py * fw + px) * 4
          d[o] = rgb[0]; d[o + 1] = rgb[1]; d[o + 2] = rgb[2]; d[o + 3] = alpha * 255
        }
      }
      void pxPerCell
      fg.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(fine, 0, 0, w, h)
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.012 * speed
      if (++frames % 60 === 0) readColor()
      field(now); paint(now)
    }

    resize(); readColor()
    const ro = new ResizeObserver(() => { resize(); readColor(); if (still) { field(0); paint(0) } })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    // repaint when the theme class changes
    const mo = new MutationObserver(() => { readColor(); if (still) paint(0) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })

    const onDown = (e: PointerEvent) => {
      if (!clickSwirl || still) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) swirl = { x: e.clientX - r.left, y: e.clientY - r.top, at: performance.now() }
    }
    window.addEventListener("pointerdown", onDown, { passive: true })

    if (still) { field(0); paint(0) } else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect(); mo.disconnect()
      window.removeEventListener("pointerdown", onDown)
    }
  }, [levels, scale, speed, glow, lineWidth, clickSwirl, intro])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full text-foreground", className)} />
}
