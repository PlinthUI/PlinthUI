"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react"

const SERIES = [42, 44, 41, 47, 50, 49, 55, 58]
const MONEY = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export default function BalanceCard() {
  const [hidden, setHidden] = useState(false)
  const [amount, setAmount] = useState(5842.5)
  const [note, setNote] = useState("Sample balance, not real money")
  const min = Math.min(...SERIES), max = Math.max(...SERIES)
  const pts = SERIES.map((v, i) => `${(i / (SERIES.length - 1)) * 120},${34 - ((v - min) / (max - min)) * 30}`).join(" ")
  const move = (d: number, label: string) => { setAmount((a) => Math.max(0, a + d)); setNote(`${label} ${MONEY.format(Math.abs(d))} (demo)`) }
  return (
    <div className="mx-auto w-full max-w-xs rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Available balance</p>
        <button type="button" aria-pressed={hidden} aria-label={hidden ? "Show balance" : "Hide balance"} onClick={() => setHidden(!hidden)} className="grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-accent">{hidden ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}</button></div>
      <p className="mt-1 text-4xl font-semibold tracking-tight tnum" aria-live="polite">{hidden ? "••••••" : MONEY.format(amount)}</p>
      <svg viewBox="0 0 120 38" className="mt-3 h-10 w-full" role="img" aria-label="Balance trend over eight weeks, rising"><polyline points={pts} fill="none" stroke="var(--foreground)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" /></svg>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => move(-250, "Sent")} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium hover:bg-accent"><ArrowUpRight className="size-4" aria-hidden />Send</button>
        <button type="button" onClick={() => move(400, "Received")} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground"><ArrowDownLeft className="size-4" aria-hidden />Receive</button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">{note}</p>
    </div>
  )
}
