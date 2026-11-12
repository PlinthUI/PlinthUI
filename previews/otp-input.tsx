"use client"

import { useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import type { PreviewProps } from "./types"

export default function OtpInput({ length = 6 }: PreviewProps & { length?: number }) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const complete = digits.every(Boolean)

  function setAt(i: number, v: string) {
    setDigits((d) => d.map((x, j) => (j === i ? v : x)))
  }

  function onChange(i: number, raw: string) {
    const v = raw.replace(/\D/g, "").slice(-1)
    setAt(i, v)
    if (v && i < length - 1) refs.current[i + 1]?.focus()
  }

  function onKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
      setAt(i - 1, "")
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus()
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus()
  }

  function onPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    if (!text) return
    e.preventDefault()
    setDigits(Array.from({ length }, (_, i) => text[i] ?? ""))
    refs.current[Math.min(text.length, length - 1)]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <label id="otp-label" className="mb-3 block text-sm font-medium">
        Enter the {length} digit code
      </label>
      <div role="group" aria-labelledby="otp-label" className="flex justify-center gap-2" onPaste={onPaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            value={d}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className="size-11 rounded-lg border border-input bg-card text-center text-lg font-medium tnum transition-colors focus-visible:border-primary"
          />
        ))}
      </div>
      <p className="mt-4 flex min-h-6 items-center justify-center gap-1.5 text-sm text-muted-foreground" aria-live="polite">
        {complete ? (
          <>
            <CheckCircle2 className="size-4 text-success" aria-hidden /> Code {digits.join("")} entered
          </>
        ) : (
          "Paste a code to fill every box"
        )}
      </p>
    </div>
  )
}
