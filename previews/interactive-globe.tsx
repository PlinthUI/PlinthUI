"use client"

import { useEffect, useRef, useState } from "react"
import { feature } from "topojson-client"
import type { Topology } from "topojson-specification"
import land from "world-atlas/land-110m.json"
import { cn } from "@/lib/utils"

/**
 * Earth rendered per pixel: each pixel on the disc is mapped back to a
 * latitude and longitude, then shaded using a land mask built from public
 * domain Natural Earth data (via the world-atlas package), a procedural cloud
 * layer, a light direction and an atmosphere rim.
 */

const CITIES = [
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74 },
  { name: "Sao Paulo", lat: -23.5, lon: -46.6 },
  { name: "Cape Town", lat: -33.9, lon: 18.4 },
  { name: "Mumbai", lat: 19.1, lon: 72.9 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
  { name: "Vancouver", lat: 49.3, lon: -123.1 },
]
const rad = Math.PI / 180
const MW = 2048, MH = 1024
const CW = 512, CH = 256

const toVec = (lat: number, lon: number) => {
  const la = lat * rad, lo = lon * rad
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)] as const
}

function rot(v: readonly number[], yaw: number, pitch: number) {
  const x1 = v[0] * Math.cos(yaw) - v[2] * Math.sin(yaw)
  const z1 = v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw)
  return [x1, v[1] * Math.cos(pitch) - z1 * Math.sin(pitch), v[1] * Math.sin(pitch) + z1 * Math.cos(pitch)] as const
}

function slerp(a: readonly number[], b: readonly number[], t: number, lift: number) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const w = Math.acos(dot), s = Math.sin(w) || 1
  const k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s
  const h = 1 + lift * Math.sin(Math.PI * t)
  return [(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h] as const
}

/** Equirectangular land mask, 0 to 255, from the Natural Earth polygons. */
function buildLandMask() {
  const c = document.createElement("canvas")
  c.width = MW; c.height = MH
  const g = c.getContext("2d", { willReadFrequently: true })!
  g.fillStyle = "#000"; g.fillRect(0, 0, MW, MH)
  g.fillStyle = "#fff"
  const topo = land as unknown as Topology
  const geo = feature(topo, topo.objects.land) as unknown as { type: string; features?: { geometry: { type: string; coordinates: number[][][][] | number[][][] } }[]; geometry?: { type: string; coordinates: number[][][][] | number[][][] } }
  const geoms = geo.features ? geo.features.map((f) => f.geometry) : [geo.geometry!]
  g.beginPath()
  for (const gm of geoms) {
    const polys = (gm.type === "MultiPolygon" ? gm.coordinates : [gm.coordinates]) as number[][][][]
    for (const poly of polys) for (const ring of poly) {
      ring.forEach(([lon, lat], i) => {
        const x = ((lon + 180) / 360) * MW, y = ((90 - lat) / 180) * MH
        if (i) g.lineTo(x, y); else g.moveTo(x, y)
      })
      g.closePath()
    }
  }
  g.fill("evenodd")
  const px = g.getImageData(0, 0, MW, MH).data
  const out = new Uint8Array(MW * MH)
  for (let i = 0; i < out.length; i++) out[i] = px[i * 4]
  return out
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

export default function InteractiveGlobe() {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const view = useRef({ yaw: 0.35, pitch: 0.4, targetYaw: null as number | null, targetPitch: null as number | null, drag: null as { x: number; y: number } | null, clouds: 0 })
  const sel = useRef(0)
  const [selected, setSelected] = useState(0)
  useEffect(() => { sel.current = selected }, [selected])

  useEffect(() => {
    const el = canvas.current
    const box = wrap.current
    if (!el || !box) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mask = buildLandMask()
    const clouds = buildClouds()
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
      if (!visible || !img) return
      const v = view.current
      if (v.targetYaw !== null && v.targetPitch !== null) {
        let dy = v.targetYaw - v.yaw
        dy = Math.atan2(Math.sin(dy), Math.cos(dy))
        v.yaw += dy * 0.08; v.pitch += (v.targetPitch - v.pitch) * 0.08
        if (Math.abs(dy) < 0.003) { v.targetYaw = null; v.targetPitch = null }
      } else if (!v.drag && !mq.matches) v.yaw += dt * 0.00009
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
          const lat = Math.asin(y), lon = Math.atan2(x, z)
          const u = (lon + Math.PI) / (2 * Math.PI), vv = 0.5 - lat / Math.PI
          const land = sample(mask, MW, MH, u, vv) / 255
          const alat = Math.abs(lat) / rad

          let r: number, g: number, b: number
          if (land > 0.5) {
            const desert = Math.max(0, 1 - Math.abs(alat - 24) / 12)
            const ice = Math.max(0, Math.min(1, (alat - 62) / 8))
            r = 66 + desert * 122; g = 108 + desert * 62; b = 58 + desert * 12
            r += (240 - r) * ice; g += (244 - g) * ice; b += (248 - b) * ice
          } else {
            const shallow = Math.max(0, 1 - Math.abs(land - 0.5) * 6)
            r = 14 + shallow * 20; g = 52 + shallow * 40; b = 112 + shallow * 34
            const ice = Math.max(0, Math.min(1, (alat - 70) / 6))
            r += (230 - r) * ice; g += (238 - g) * ice; b += (246 - b) * ice
          }

          let diff = nx * L[0] + ny * L[1] + nz * L[2]
          diff = Math.max(0, diff)
          const light = 0.18 + 0.95 * diff
          const c = sample(clouds, CW, CH, u + v.clouds, vv) / 255
          const cloud = Math.min(1, c * 0.85) * 0.78
          r = r * (1 - cloud) + 250 * cloud; g = g * (1 - cloud) + 252 * cloud; b = b * (1 - cloud) + 255 * cloud
          if (land <= 0.5) { const spec = Math.pow(Math.max(0, nx * 0.35 + ny * 0.3 + nz * 0.89), 24) * 0.5 * (1 - cloud); r += 255 * spec; g += 255 * spec; b += 255 * spec }
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

      const from = toVec(CITIES[sel.current].lat, CITIES[sel.current].lon)
      ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(255,226,140,0.95)"
      CITIES.forEach((c, i) => {
        if (i === sel.current || (i + sel.current) % 3 !== 0) return
        const to = toVec(c.lat, c.lon)
        ctx.beginPath()
        let pen = false
        for (let s = 0; s <= 48; s++) {
          const [ax, ay, az] = rot(slerp(from, to, s / 48, 0.22), v.yaw, v.pitch)
          if (az <= 0.02) { pen = false; continue }
          const ppx = cx + ax * R, ppy = cy - ay * R
          if (pen) ctx.lineTo(ppx, ppy); else ctx.moveTo(ppx, ppy)
          pen = true
        }
        ctx.stroke()
      })
      CITIES.forEach((c, i) => {
        const [ax, ay, az] = rot(toVec(c.lat, c.lon), v.yaw, v.pitch)
        if (az <= 0.04) return
        const ppx = cx + ax * R, ppy = cy - ay * R
        ctx.fillStyle = "#ffe28c"; ctx.strokeStyle = "rgba(0,0,0,0.55)"; ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(ppx, ppy, i === sel.current ? 4.5 : 3, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        if (i === sel.current) {
          const pulse = (now / 1300) % 1
          ctx.strokeStyle = `rgba(255,226,140,${(1 - pulse) * 0.8})`; ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.arc(ppx, ppy, 6 + pulse * 16, 0, Math.PI * 2); ctx.stroke()
          ctx.font = "600 12px system-ui, sans-serif"; ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,0.7)"
          ctx.strokeText(c.name, ppx + 10, ppy - 9); ctx.fillStyle = "#fff"; ctx.fillText(c.name, ppx + 10, ppy - 9)
        }
      })
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [])

  function focusCity(i: number) {
    setSelected(i)
    const c = CITIES[i]
    view.current.targetYaw = -c.lon * rad
    view.current.targetPitch = c.lat * rad * 0.8
  }

  return (
    <div ref={wrap} className="mx-auto w-full max-w-md">
      <canvas
        ref={canvas}
        role="img"
        aria-label={`Interactive Earth globe. Drag to rotate. Selected city: ${CITIES[selected].name}.`}
        className="aspect-square w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); view.current.drag = { x: e.clientX, y: e.clientY }; view.current.targetYaw = null }}
        onPointerMove={(e) => {
          const v = view.current
          if (!v.drag) return
          v.yaw += (e.clientX - v.drag.x) * 0.008
          v.pitch = Math.max(-1.2, Math.min(1.2, v.pitch + (e.clientY - v.drag.y) * 0.008))
          v.drag = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={() => (view.current.drag = null)}
        onPointerCancel={() => (view.current.drag = null)}
      />
      <ul className="mt-2 flex flex-wrap justify-center gap-1.5" aria-label="Cities">
        {CITIES.map((c, i) => (
          <li key={c.name}>
            <button type="button" aria-pressed={selected === i} onClick={() => focusCity(i)} className={cn("h-10 rounded-lg border px-3 text-sm", selected === i ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent")}>{c.name}</button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center text-xs text-muted-foreground">Drag the globe, or pick a city to turn to it. Land shapes: Natural Earth, public domain.</p>
    </div>
  )
}
