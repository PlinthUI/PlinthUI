"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = {
  "Day 1": [["09:30", "Opening keynote", "Mara Linden"], ["11:00", "Design systems that survive growth", "Tobias Reyes"], ["14:00", "Accessibility without the audit panic", "Ruth Abara"]],
  "Day 2": [["09:30", "Shipping with agents, safely", "Kenji Arai"], ["11:00", "Motion that earns its place", "Priya Nair"], ["15:30", "Closing panel", "All speakers"]],
}
const SPEAKERS = [["Mara Linden", "Principal designer", "mara-linden-speaker"], ["Tobias Reyes", "Staff engineer", "tobias-reyes-speaker"], ["Ruth Abara", "Accessibility lead", "ruth-abara-speaker"], ["Kenji Arai", "Founder", "kenji-arai-speaker"]]
const TICKETS = [{ name: "Standard", price: 249 }, { name: "Student", price: 79 }]

export default function LandingEvent() {
  const [day, setDay] = useState<keyof typeof DAYS>("Day 1")
  const [qty, setQty] = useState<Record<string, number>>({ Standard: 1, Student: 0 })
  const total = TICKETS.reduce((s, t) => s + t.price * (qty[t.name] ?? 0), 0)
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background">
      <section className="relative isolate overflow-hidden">
        <Image src="https://picsum.photos/seed/conference-hall-stage-lights/1400/700" alt="" fill unoptimized sizes="1000px" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/70" />
        <div className="px-6 py-20 text-neutral-50 @xl:px-14 @xl:py-28">
          <p className="text-sm text-neutral-300">12 and 13 June, Porto</p>
          <h2 className="mt-2 max-w-2xl text-5xl font-semibold leading-[1.02] tracking-tight @xl:text-7xl">Interface Summit</h2>
          <p className="mt-4 max-w-md text-lg text-neutral-200">Two days on design systems, accessibility and building with AI, for people who ship interfaces.</p>
          <a href="#tickets" onClick={(e) => e.preventDefault()} className="mt-6 inline-flex h-12 items-center rounded-lg bg-neutral-50 px-6 font-medium text-neutral-950">Get tickets</a>
        </div>
      </section>
      <section className="px-6 py-12 @xl:px-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold tracking-tight">Schedule</h3>
          <div role="tablist" aria-label="Days" className="flex rounded-lg bg-secondary p-1 text-sm">
            {(Object.keys(DAYS) as (keyof typeof DAYS)[]).map((d) => <button key={d} role="tab" aria-selected={day === d} onClick={() => setDay(d)} className={cn("h-9 rounded-md px-3 font-medium", day === d ? "bg-card shadow-sm" : "text-muted-foreground")}>{d}</button>)}
          </div>
        </div>
        <ol role="tabpanel" className="mt-4 divide-y rounded-lg border">
          {DAYS[day].map(([t, title, who]) => <li key={t} className="grid grid-cols-[4rem_1fr] gap-3 p-4 text-sm @lg:grid-cols-[4rem_1fr_10rem]"><span className="font-mono text-muted-foreground tnum">{t}</span><span className="font-medium">{title}</span><span className="text-muted-foreground">{who}</span></li>)}
        </ol>
      </section>
      <section className="border-t px-6 py-12 @xl:px-14">
        <h3 className="text-2xl font-semibold tracking-tight">Speakers</h3>
        <ul className="mt-5 grid grid-cols-2 gap-4 @2xl:grid-cols-4">
          {SPEAKERS.map(([n, r, seed]) => <li key={n}><Image src={`https://picsum.photos/seed/${seed}/400/500`} alt={`Portrait of ${n}`} width={400} height={500} unoptimized className="aspect-[4/5] w-full rounded-lg object-cover" /><p className="mt-2 text-sm font-medium">{n}</p><p className="text-sm text-muted-foreground">{r}</p></li>)}
        </ul>
      </section>
      <section id="tickets" className="border-t bg-secondary/40 px-6 py-12 @xl:px-14">
        <h3 className="text-2xl font-semibold tracking-tight">Tickets</h3>
        <ul className="mt-5 grid max-w-md gap-2">
          {TICKETS.map((t) => (
            <li key={t.name} className="flex items-center justify-between rounded-lg border bg-card p-3">
              <span><span className="block font-medium">{t.name}</span><span className="text-sm text-muted-foreground tnum">${t.price}</span></span>
              <span className="flex items-center gap-1">
                <button type="button" aria-label={`Fewer ${t.name} tickets`} disabled={!qty[t.name]} onClick={() => setQty({ ...qty, [t.name]: qty[t.name] - 1 })} className="grid size-11 place-items-center rounded-lg border hover:bg-accent disabled:opacity-40"><Minus className="size-4" aria-hidden /></button>
                <span className="w-8 text-center tnum" aria-live="polite">{qty[t.name]}</span>
                <button type="button" aria-label={`More ${t.name} tickets`} onClick={() => setQty({ ...qty, [t.name]: qty[t.name] + 1 })} className="grid size-11 place-items-center rounded-lg border hover:bg-accent"><Plus className="size-4" aria-hidden /></button>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold tnum" aria-live="polite">Total ${total}</p>
        <button type="button" disabled={total === 0} className="mt-3 h-12 rounded-lg bg-primary px-6 font-medium text-primary-foreground disabled:opacity-40">Checkout</button>
      </section>
    </div>
  )
}
