"use client"

import { useEffect, useState } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"

const TOTAL = 90

export default function SessionCountdown() {
  const [left, setLeft] = useState(TOTAL)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => setLeft((l) => { if (l <= 1) { setRunning(false); return 0 } return l - 1 }), 1000)
    return () => window.clearInterval(t)
  }, [running])
  const C = 2 * Math.PI * 52
  const mm = String(Math.floor(left / 60)).padStart(2, "0"), ss = String(left % 60).padStart(2, "0")
  return (
    <div className="mx-auto grid w-full max-w-xs justify-items-center gap-3">
      <div className="relative grid size-40 place-items-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="8" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - left / TOTAL)} className="transition-[stroke-dashoffset] duration-1000 ease-linear motion-reduce:transition-none" />
        </svg>
        <p role="timer" aria-live="off" aria-label={`${mm} minutes ${ss} seconds left`} className="text-4xl font-semibold tnum">{mm}:{ss}</p>
      </div>
      <p className="sr-only" aria-live="polite">{left === 0 ? "Time is up" : ""}</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => (left === 0 ? (setLeft(TOTAL), setRunning(true)) : setRunning(!running))} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground">{running ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}{running ? "Pause" : left === 0 ? "Again" : left === TOTAL ? "Start" : "Resume"}</button>
        <button type="button" aria-label="Reset" onClick={() => { setRunning(false); setLeft(TOTAL) }} className="grid size-11 place-items-center rounded-lg border hover:bg-accent"><RotateCcw className="size-4" aria-hidden /></button>
      </div>
    </div>
  )
}
