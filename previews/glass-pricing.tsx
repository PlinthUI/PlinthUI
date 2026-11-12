"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PLANS = [
  { name: "Starter", price: 9, perks: ["3 projects", "Basic exports"] },
  { name: "Pro", price: 24, perks: ["Unlimited projects", "Priority exports", "Shared libraries"], pick: true },
  { name: "Studio", price: 59, perks: ["Client portals", "Audit log"] },
]

export default function GlassPricing() {
  const [yearly, setYearly] = useState(true)
  return (
    <div className="relative isolate mx-auto w-full max-w-3xl overflow-hidden rounded-2xl p-5 text-neutral-50 @xl:p-8">
      <Image src="https://picsum.photos/seed/blue-dunes-evening/1400/900" alt="" fill unoptimized sizes="800px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/35" />
      <div role="radiogroup" aria-label="Billing" className="mx-auto mb-5 grid w-56 grid-cols-2 rounded-xl border border-white/25 bg-white/10 p-1 text-sm backdrop-blur-md">
        {[["Monthly", false], ["Yearly", true]].map(([l, v]) => <button key={String(l)} role="radio" aria-checked={yearly === v} onClick={() => setYearly(v as boolean)} className={cn("h-10 rounded-lg font-medium", yearly === v ? "bg-white/25" : "hover:bg-white/10")}>{l as string}</button>)}
      </div>
      <ul className="grid gap-3 @lg:grid-cols-3">
        {PLANS.map((p) => (
          <li key={p.name} className={cn("flex flex-col rounded-2xl border bg-white/12 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl", p.pick ? "border-white/60 bg-white/20" : "border-white/25")}>
            <h3 className="text-sm font-semibold">{p.name}</h3>
            <p className="mt-2 text-3xl font-semibold tnum">${yearly ? Math.round(p.price * 0.8) : p.price}<span className="text-sm font-normal text-neutral-200"> / month</span></p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">{p.perks.map((k) => <li key={k} className="flex items-center gap-2"><Check className="size-4" aria-hidden />{k}</li>)}</ul>
            <button type="button" className={cn("mt-5 h-11 rounded-xl text-sm font-medium", p.pick ? "bg-neutral-50 text-neutral-950" : "border border-white/30 hover:bg-white/15")}>Choose {p.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
