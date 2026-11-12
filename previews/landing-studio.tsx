"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const WORK = [
  { name: "Harbor Coffee", tag: "Brand", seed: "harbor-coffee-roastery" },
  { name: "Kite Bank", tag: "Product", seed: "kite-bank-app-screens" },
  { name: "Orchard Fest", tag: "Web", seed: "orchard-festival-poster" },
  { name: "Lumen Clinic", tag: "Brand", seed: "lumen-clinic-interior" },
  { name: "Field Notes Co", tag: "Product", seed: "field-notes-paper-goods" },
  { name: "Tidal Records", tag: "Web", seed: "tidal-records-vinyl" },
]
const STEPS = [["Listen", "A week of interviews and audits before any pixels."], ["Sketch", "Rough directions in a few days, then we pick one together."], ["Build", "Design and code in the same sprint, reviewed weekly."], ["Hand over", "Docs, tokens and a month of support after launch."]]

export default function LandingStudio() {
  const [filter, setFilter] = useState("All")
  const shown = WORK.filter((w) => filter === "All" || w.tag === filter)
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background">
      <header className="flex h-14 items-center justify-between px-5">
        <span className="font-semibold tracking-tight">Fieldwork Studio</span>
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex h-10 items-center gap-1 rounded-lg border px-4 text-sm font-medium hover:bg-accent">Start a project <ArrowUpRight className="size-4" aria-hidden /></a>
      </header>
      <section className="px-5 py-14 @xl:py-24">
        <h2 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight @xl:text-8xl">We design and build products people keep.</h2>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">A six person studio in Lisbon working with founders and small teams on brand, product and web.</p>
      </section>
      <section className="px-5 pb-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold tracking-tight">Selected work</h3>
          <div role="radiogroup" aria-label="Filter work" className="flex rounded-lg bg-secondary p-1 text-sm">
            {["All", "Brand", "Product", "Web"].map((f) => <button key={f} role="radio" aria-checked={filter === f} onClick={() => setFilter(f)} className={cn("h-9 rounded-md px-3 font-medium", filter === f ? "bg-card shadow-sm" : "text-muted-foreground")}>{f}</button>)}
          </div>
        </div>
        <ul className="grid gap-3 @lg:grid-cols-2 @3xl:grid-cols-3" aria-live="polite">
          {shown.map((w, i) => (
            <li key={w.name} className={cn(i === 0 && filter === "All" && "@3xl:col-span-2")}>
              <a href="#" onClick={(e) => e.preventDefault()} className="group relative block overflow-hidden rounded-xl">
                <Image src={`https://picsum.photos/seed/${w.seed}/900/600`} alt={`${w.name} project`} width={900} height={600} unoptimized className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-neutral-50"><span className="font-medium">{w.name}</span><span>{w.tag}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t px-5 py-14">
        <h3 className="text-2xl font-semibold tracking-tight">How a project runs</h3>
        <ol className="mt-6 grid gap-6 @xl:grid-cols-4">
          {STEPS.map(([t, b], i) => <li key={t}><p className="font-mono text-sm text-muted-foreground tnum">0{i + 1}</p><h4 className="mt-1 font-semibold">{t}</h4><p className="mt-1 text-sm text-muted-foreground">{b}</p></li>)}
        </ol>
      </section>
      <section className="bg-primary px-5 py-14 text-primary-foreground">
        <h3 className="max-w-xl text-3xl font-semibold tracking-tight @xl:text-5xl">Have something worth building?</h3>
        <a href="#" onClick={(e) => e.preventDefault()} className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-background px-6 font-medium text-foreground">hello@fieldwork.example <ArrowUpRight className="size-4" aria-hidden /></a>
      </section>
    </div>
  )
}
