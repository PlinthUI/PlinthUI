"use client"

import { useRef, useState } from "react"

const N = 6

export default function CodeInput() {
  const [d, setD] = useState<string[]>(Array(N).fill(""))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const set = (i: number, v: string) => setD((x) => x.map((y, k) => (k === i ? v : y)))

  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <p id="ci-l" className="mb-3 text-sm font-medium">Enter the 6 digit code</p>
      <div role="group" aria-labelledby="ci-l" className="flex justify-center gap-2" onPaste={(e) => {
        const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, N)
        if (!t) return
        e.preventDefault()
        setD(Array.from({ length: N }, (_, i) => t[i] ?? ""))
        refs.current[Math.min(t.length, N - 1)]?.focus()
      }}>
        {d.map((v, i) => (
          <input key={i} ref={(el) => { refs.current[i] = el }} value={v} inputMode="numeric" autoComplete={i ? "off" : "one-time-code"} aria-label={`Digit ${i + 1}`} onFocus={(e) => e.target.select()}
            onChange={(e) => { const c = e.target.value.replace(/\D/g, "").slice(-1); set(i, c); if (c && i < N - 1) refs.current[i + 1]?.focus() }}
            onKeyDown={(e) => { if (e.key === "Backspace" && !d[i] && i) { refs.current[i - 1]?.focus(); set(i - 1, "") } }}
            className="size-11 rounded-lg border border-input bg-card text-center text-lg font-medium tnum focus-visible:border-primary" />
        ))}
      </div>
      <p className="mt-4 min-h-5 text-sm text-muted-foreground" aria-live="polite">{d.every(Boolean) ? `Code ${d.join("")} entered` : "Paste a code to fill every box"}</p>
    </div>
  )
}
