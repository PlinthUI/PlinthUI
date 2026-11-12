"use client"

import { useEffect, useRef } from "react"

/**
 * Earth rendered per pixel: each pixel on the disc is mapped back to a
 * latitude and longitude and colored from a NASA satellite map (public domain,
 * via Wikimedia Commons), then lit with a sun direction, a procedural cloud
 * layer, an ocean highlight and an atmosphere rim.
 */

const rad = Math.PI / 180
const TW = 2048, TH = 1024
const CW = 512, CH = 256

/** Loads the equirectangular Earth map into raw RGB at TW by TH. */
function loadTexture(): Promise<Uint8ClampedArray> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const c = document.createElement("canvas")
      c.width = TW; c.height = TH
      const g = c.getContext("2d", { willReadFrequently: true })!
      g.drawImage(img, 0, 0, TW, TH)
      resolve(g.getImageData(0, 0, TW, TH).data)
    }
    img.onerror = reject
    img.src = "/earth/earth-texture.jpg"
  })
}

/** Tileable value-noise clouds, 0 to 255. */
function buildClouds() {
  const out = new Float32Array(CW * CH)
  const hash = (x: number, y: number, s: number) => { const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return n - Math.floor(n) }
  const octaves: [number, number, number][] = [[8, 4, 0.5], [16, 8, 0.28], [32, 16, 0.14], [64, 32, 0.08]]
  octaves.forEach(([gx, gy, amp], o) => {
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const fx = (x / CW) * gx, fy = (y / CH) * gy
      const x0 = Math.floor(fx), y0 = Math.floor(fy)
      const tx = fx - x0, ty = fy - y0
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty)
      const h = (xx: number, yy: number) => hash(((xx % gx) + gx) % gx, Math.min(yy, gy), o)
      const a = h(x0, y0), b = h(x0 + 1, y0), c = h(x0, y0 + 1), d = h(x0 + 1, y0 + 1)
      out[y * CW + x] += (a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy) * amp
    }
  })
  const res = new Uint8Array(CW * CH)
  for (let i = 0; i < res.length; i++) res[i] = Math.max(0, Math.min(255, ((out[i] - 0.42) / 0.38) * 255))
  return res
}

function sample(arr: Uint8Array, w: number, h: number, u: number, v: number) {
  const x = ((u % 1) + 1) % 1 * w, y = Math.min(Math.max(v, 0), 0.9999) * (h - 1)
  const x0 = Math.floor(x), y0 = Math.floor(y), tx = x - x0, ty = y - y0
  const x1 = (x0 + 1) % w, y1 = Math.min(y0 + 1, h - 1)
  const a = arr[y0 * w + x0], b = arr[y0 * w + x1], c = arr[y1 * w + x0], d = arr[y1 * w + x1]
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty
}

function sampleRGB(tex: Uint8ClampedArray, u: number, v: number, out: number[]) {
  const x = ((u % 1) + 1) % 1 * TW, y = Math.min(Math.max(v, 0), 0.9999) * (TH - 1)
  const x0 = Math.floor(x), y0 = Math.floor(y), tx = x - x0, ty = y - y0
  const x1 = (x0 + 1) % TW, y1 = Math.min(y0 + 1, TH - 1)
  const i00 = (y0 * TW + x0) * 4, i10 = (y0 * TW + x1) * 4, i01 = (y1 * TW + x0) * 4, i11 = (y1 * TW + x1) * 4
  for (let k = 0; k < 3; k++) {
    const a = tex[i00 + k], b = tex[i10 + k], c = tex[i01 + k], d = tex[i11 + k]
    out[k] = a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty
  }
}

export default function InteractiveGlobe() {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const view = useRef({ yaw: 0.35, pitch: 0.4, drag: null as { x: number; y: number } | null, clouds: 0 })

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    if (!el || !box) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const clouds = buildClouds()
    let tex: Uint8ClampedArray | null = null
    const poleTop = [0, 0, 0], poleBottom = [0, 0, 0]
    let cancelled = false
    loadTexture().then((t) => {
      if (cancelled) return
      const avg = (from: number, to: number, out: number[]) => {
        let n = 0
        out[0] = out[1] = out[2] = 0
        for (let y = from; y < to; y++) for (let x = 0; x < TW; x++) { const o = (y * TW + x) * 4; out[0] += t[o]; out[1] += t[o + 1]; out[2] += t[o + 2]; n++ }
        out[0] /= n; out[1] /= n; out[2] /= n
      }
      avg(40, 80, poleTop); avg(TH - 80, TH - 40, poleBottom)
      tex = t
    }).catch(() => {})
    const rgb = [0, 0, 0]
    const sphere = document.createElement("canvas")
    const sg = sphere.getContext("2d")!
    let w = 0, h = 0, R = 0, S = 0, img: ImageData | null = null
    let raf = 0, last = performance.now(), visible = true

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(w, h) * 0.42
      S = Math.max(64, Math.round(2 * R * Math.min(dpr, 1.5)))
      sphere.width = S; sphere.height = S
      img = sg.createImageData(S, S)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(box)

    const L = (() => { const x = -0.5, y = 0.4, z = 0.78, n = Math.hypot(x, y, z); return [x / n, y / n, z / n] })()

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(now - last, 50); last = now
      if (!visible || !img || !tex) return
      const v = view.current
      if (!v.drag && !mq.matches) v.yaw += dt * 0.00009
      if (!mq.matches) v.clouds += dt * 0.000004

      const cosY = Math.cos(v.yaw), sinY = Math.sin(v.yaw), cosP = Math.cos(v.pitch), sinP = Math.sin(v.pitch)
      const d = img.data, half = S / 2
      for (let py = 0; py < S; py++) {
        const ny = (half - py - 0.5) / half
        for (let px = 0; px < S; px++) {
          const nx = (px + 0.5 - half) / half
          const r2 = nx * nx + ny * ny
          const o = (py * S + px) * 4
          if (r2 >= 1) { d[o + 3] = 0; continue }
          const nz = Math.sqrt(1 - r2)
          const z1 = ny * sinP + nz * cosP
          const y = ny * cosP - nz * sinP
          const x = nx * cosY + z1 * sinY
          const z = -nx * sinY + z1 * cosY
          const u = (Math.atan2(x, z) + Math.PI) / (2 * Math.PI), vv = 0.5 - Math.asin(y) / Math.PI
          sampleRGB(tex, u, vv, rgb)
          let r = rgb[0], g = rgb[1], b = rgb[2]
          const polar = (Math.abs(Math.asin(y)) / rad - 79) / 11
          if (polar > 0) {
            const t = Math.min(1, polar), pc = y > 0 ? poleTop : poleBottom
            r += (pc[0] - r) * t; g += (pc[1] - g) * t; b += (pc[2] - b) * t
          }
          const ocean = b > r * 1.5 && b > g * 1.15 && r + g + b < 230

          let diff = nx * L[0] + ny * L[1] + nz * L[2]
          diff = Math.max(0, diff)
          const light = 0.3 + 0.9 * diff
          const c = sample(clouds, CW, CH, u + v.clouds, vv) / 255
          const cloud = Math.min(1, c * 0.85) * 0.78
          r = r * (1 - cloud) + 250 * cloud; g = g * (1 - cloud) + 252 * cloud; b = b * (1 - cloud) + 255 * cloud
          if (ocean) { const spec = Math.pow(Math.max(0, nx * 0.35 + ny * 0.3 + nz * 0.89), 24) * 0.5 * (1 - cloud); r += 255 * spec; g += 255 * spec; b += 255 * spec }
          const rim = Math.pow(1 - nz, 2.6)
          r = r * light + rim * 70; g = g * light + rim * 130; b = b * light + rim * 230
          d[o] = r > 255 ? 255 : r; d[o + 1] = g > 255 ? 255 : g; d[o + 2] = b > 255 ? 255 : b
          d[o + 3] = Math.min(255, (1 - Math.sqrt(r2)) * half * 1.4 * 255)
        }
      }
      sg.putImageData(img, 0, 0)

      const cx = w / 2, cy = h / 2
      ctx.clearRect(0, 0, w, h)
      const glow = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.22)
      glow.addColorStop(0, "rgba(110,170,255,0.45)"); glow.addColorStop(1, "rgba(110,170,255,0)")
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill()
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(sphere, cx - R, cy - R, R * 2, R * 2)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelled = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <div ref={wrap} className="mx-auto w-full max-w-md">
      <canvas
        ref={canvas}
        role="img"
        aria-label="Interactive Earth globe. Drag to rotate."
        className="aspect-square w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); view.current.drag = { x: e.clientX, y: e.clientY } }}
        onPointerMove={(e) => {
          const v = view.current
          if (!v.drag) return
          v.yaw -= (e.clientX - v.drag.x) * 0.008
          v.pitch = Math.max(-1.2, Math.min(1.2, v.pitch + (e.clientY - v.drag.y) * 0.008))
          v.drag = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={() => (view.current.drag = null)}
        onPointerCancel={() => (view.current.drag = null)}
      />
      <p className="mt-2 text-center text-xs text-muted-foreground">Drag to rotate. Map: NASA satellite imagery, public domain.</p>
    </div>
  )
}
