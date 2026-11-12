"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PLANS = [
  { name: "Solo", price: 12, perks: ["5 projects", "Community help"] },
  { name: "Team", price: 39, perks: ["Unlimited projects", "Review flows", "Priority help"], pick: true },
  { name: "Studio", price: 99, perks: ["Client workspaces", "Audit log"] },
]

export default function PricingSwitch() {
  const [yearly, setYearly] = useState(false)
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div role="radiogroup" aria-label="Billing period" className="mx-auto mb-5 grid w-56 grid-cols-2 rounded-lg bg-secondary p-1 text-sm">
        {[["Monthly", false], ["Yearly, 20% off", true]].map(([l, v]) => (
          <button key={String(l)} role="radio" aria-checked={yearly === v} onClick={() => setYearly(v as boolean)} className={cn("h-10 rounded-md px-2 font-medium", yearly === v ? "bg-card shadow-sm" : "text-muted-foreground")}>{l as string}</button>
        ))}
      </div>
      <ul className="grid gap-3 @lg:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.name} className={cn("flex flex-col rounded-xl border bg-card p-5", p.pick && "border-foreground ring-1 ring-foreground")}>
            <h3 className="text-sm font-semibold">{p.name}</h3>
            <p className="mt-2 text-3xl font-semibold tnum">${yearly ? Math.round(p.price * 0.8) : p.price}<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {p.perks.map((k) => <li key={k} className="flex items-center gap-2"><Check className="size-4" aria-hidden />{k}</li>)}
            </ul>
            <button type="button" className={cn("mt-5 h-11 rounded-lg text-sm font-medium", p.pick ? "bg-primary text-primary-foreground" : "border hover:bg-accent")}>Choose {p.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
