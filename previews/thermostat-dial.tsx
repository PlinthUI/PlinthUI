"use client"

import { useRef, useState } from "react"

const MIN = 16, MAX = 30, SWEEP = 270, START = 135
const CX = 100, CY = 100, R = 76

const pt = (deg: number) => [CX + R * Math.cos((deg * Math.PI) / 180), CY + R * Math.sin((deg * Math.PI) / 180)]

export default function ThermostatDial() {
  const svg = useRef<SVGSVGElement>(null)
  const [t, setT] = useState(21)
  const [drag, setDrag] = useState(false)
  const frac = (t - MIN) / (MAX - MIN)
  const end = START + SWEEP * frac
  const [sx, sy] = pt(START), [ex, ey] = pt(end), [fx, fy] = pt(START + SWEEP)

  const fromPointer = (cx: number, cy: number) => {
    const r = svg.current!.getBoundingClientRect()
    let a = (Math.atan2(cy - (r.top + r.height / 2), cx - (r.left + r.width / 2)) * 180) / Math.PI
    a = (a - START + 360) % 360
    if (a > SWEEP) a = a - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0
    setT(Math.round((MIN + (a / SWEEP) * (MAX - MIN)) * 2) / 2)
  }

  return (
    <div className="mx-auto grid w-full max-w-xs justify-items-center gap-2">
      <svg ref={svg} viewBox="0 0 200 200" role="slider" tabIndex={0} aria-label="Target temperature" aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={t} aria-valuetext={`${t} degrees Celsius`} className="size-56 touch-none"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(true); fromPointer(e.clientX, e.clientY) }}
        onPointerMove={(e) => drag && fromPointer(e.clientX, e.clientY)}
        onPointerUp={() => setDrag(false)}
        onKeyDown={(e) => { if (e.key === "ArrowUp" || e.key === "ArrowRight") { e.preventDefault(); setT((v) => Math.min(MAX, v + 0.5)) } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") { e.preventDefault(); setT((v) => Math.max(MIN, v - 0.5)) } }}>
        <path d={`M ${sx} ${sy} A ${R} ${R} 0 1 1 ${fx} ${fy}`} fill="none" stroke="var(--border)" strokeWidth="14" strokeLinecap="round" />
        <path d={`M ${sx} ${sy} A ${R} ${R} 0 ${SWEEP * frac > 180 ? 1 : 0} 1 ${ex} ${ey}`} fill="none" stroke="var(--primary)" strokeWidth="14" strokeLinecap="round" />
        <circle cx={ex} cy={ey} r="11" fill="var(--card)" stroke="var(--primary)" strokeWidth="3" />
        <text x="100" y="104" textAnchor="middle" fontSize="34" fontWeight="600" fill="var(--foreground)" className="tnum">{t.toFixed(1)}°</text>
        <text x="100" y="126" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">Celsius</text>
      </svg>
      <p className="text-sm text-muted-foreground">Drag around the ring, or use the arrow keys.</p>
    </div>
  )
}
