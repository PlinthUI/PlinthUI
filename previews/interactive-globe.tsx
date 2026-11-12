"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

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
const DOTS = 1500
const rad = Math.PI / 180

/** Unit vector for lat/lon, before view rotation. */
const toVec = (lat: number, lon: number) => {
  const la = lat * rad, lo = lon * rad
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)] as const
}

/** Rotate by yaw (around Y) then pitch (around X). */
function rot(v: readonly [number, number, number], yaw: number, pitch: number) {
  const [x, y, z] = v
  const x1 = x * Math.cos(yaw) - z * Math.sin(yaw)
  const z1 = x * Math.sin(yaw) + z * Math.cos(yaw)
  const y2 = y * Math.cos(pitch) - z1 * Math.sin(pitch)
  const z2 = y * Math.sin(pitch) + z1 * Math.cos(pitch)
  return [x1, y2, z2] as const
}

const fib = Array.from({ length: DOTS }, (_, i) => {
  const y = 1 - (i / (DOTS - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const t = Math.PI * (3 - Math.sqrt(5)) * i
  return [Math.cos(t) * r, y, Math.sin(t) * r] as const
})

function slerp(a: readonly number[], b: readonly number[], t: number, lift: number) {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const w = Math.acos(dot)
  const s = Math.sin(w) || 1
  const k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s
  const h = 1 + lift * Math.sin(Math.PI * t)
  return [(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h] as const
}

export default function InteractiveGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const view = useRef({ yaw: -0.3, pitch: 0.35, targetYaw: null as number | null, targetPitch: null as number | null, drag: null as { x: number; y: number } | null })
  const sel = useRef(0)
  const [selected, setSelected] = useState(0)

  useEffect(() => { sel.current = selected }, [selected])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let w = 0, h = 0, raf = 0, last = performance.now()

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      el.width = Math.round(w * dpr); el.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    resize()

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50); last = now
      const v = view.current
      if (v.targetYaw !== null && v.targetPitch !== null) {
        let dy = v.targetYaw - v.yaw
        dy = Math.atan2(Math.sin(dy), Math.cos(dy))
        v.yaw += dy * 0.08; v.pitch += (v.targetPitch - v.pitch) * 0.08
        if (Math.abs(dy) < 0.003) { v.targetYaw = null; v.targetPitch = null }
      } else if (!v.drag && !mq.matches) v.yaw += dt * 0.00012

      const color = getComputedStyle(el).color
      const R = Math.min(w, h) * 0.42, cx = w / 2, cy = h / 2
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      ctx.strokeStyle = color; ctx.globalAlpha = 0.18
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()

      ctx.fillStyle = color
      for (const p of fib) {
        const [x, y, z] = rot(p, v.yaw, v.pitch)
        if (z <= 0) continue
        ctx.globalAlpha = 0.12 + z * 0.5
        ctx.fillRect(cx + x * R - 0.7, cy - y * R - 0.7, 1.4, 1.4)
      }

      const from = toVec(CITIES[sel.current].lat, CITIES[sel.current].lon)
      ctx.strokeStyle = color; ctx.lineWidth = 1.4
      CITIES.forEach((c, i) => {
        if (i === sel.current || (i + sel.current) % 3 !== 0) return
        const to = toVec(c.lat, c.lon)
        ctx.beginPath()
        let pen = false
        for (let s = 0; s <= 40; s++) {
          const [x, y, z] = rot(slerp(from, to, s / 40, 0.25), v.yaw, v.pitch)
          if (z <= 0) { pen = false; continue }
          ctx.globalAlpha = 0.75
          const px = cx + x * R, py = cy - y * R
          if (pen) ctx.lineTo(px, py); else ctx.moveTo(px, py)
          pen = true
        }
        ctx.stroke()
      })

      CITIES.forEach((c, i) => {
        const [x, y, z] = rot(toVec(c.lat, c.lon), v.yaw, v.pitch)
        if (z <= 0.02) return
        const px = cx + x * R, py = cy - y * R
        ctx.globalAlpha = 1; ctx.fillStyle = color
        ctx.beginPath(); ctx.arc(px, py, i === sel.current ? 4 : 2.6, 0, Math.PI * 2); ctx.fill()
        if (i === sel.current) {
          const pulse = (now / 1200) % 1
          ctx.globalAlpha = (1 - pulse) * 0.6; ctx.strokeStyle = color
          ctx.beginPath(); ctx.arc(px, py, 5 + pulse * 14, 0, Math.PI * 2); ctx.stroke()
          ctx.globalAlpha = 1; ctx.font = "600 12px system-ui, sans-serif"; ctx.fillText(c.name, px + 10, py - 8)
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  function focusCity(i: number) {
    setSelected(i)
    const c = CITIES[i]
    view.current.targetYaw = -c.lon * rad
    view.current.targetPitch = c.lat * rad * 0.8
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <canvas
        ref={canvas}
        role="img"
        aria-label={`Interactive globe. Drag to rotate. Selected city: ${CITIES[selected].name}.`}
        className="aspect-square w-full cursor-grab touch-none text-foreground active:cursor-grabbing"
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
      <p className="mt-2 text-center text-xs text-muted-foreground">Drag the globe, or pick a city to turn to it.</p>
    </div>
  )
}
