"use client"

import { useState } from "react"
import { CalendarClock, Search, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "find", label: "Find", icon: Search },
  { id: "share", label: "Share", icon: Share2 },
  { id: "schedule", label: "Schedule", icon: CalendarClock },
]
const DOCS = ["Launch checklist", "Onboarding email copy", "Pricing experiment notes", "Incident review 14", "Roadmap draft"]

function Find() {
  const [q, setQ] = useState("")
  const hits = DOCS.filter((d) => d.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <input aria-label="Search documents" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" />
      <ul className="mt-3 grid gap-1 text-sm">
        {hits.map((h) => (
          <li key={h} className="rounded-md px-2 py-2 hover:bg-accent">
            {h}
          </li>
        ))}
        {hits.length === 0 && <li className="px-2 py-2 text-muted-foreground">Nothing matches “{q}”.</li>}
      </ul>
    </div>
  )
}

function Share() {
  const [rules, setRules] = useState({ link: true, edit: false, expire: true })
  const rows: [keyof typeof rules, string][] = [
    ["link", "Anyone with the link can view"],
    ["edit", "Allow editing"],
    ["expire", "Link expires in 7 days"],
  ]
  return (
    <ul className="grid gap-1">
      {rows.map(([k, label]) => (
        <li key={k} className="flex min-h-11 items-center justify-between gap-3 text-sm">
          {label}
          <button type="button" role="switch" aria-checked={rules[k]} aria-label={label} onClick={() => setRules({ ...rules, [k]: !rules[k] })} className="relative h-7 w-12 shrink-0 rounded-full bg-secondary transition-colors aria-checked:bg-primary">
            <span className={cn("absolute left-0.5 top-0.5 size-5 rounded-full bg-card shadow transition-transform", rules[k] && "translate-x-5")} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function Schedule() {
  const slots = ["09:00", "11:30", "14:00", "16:30"]
  const [slot, setSlot] = useState("11:30")
  return (
    <div>
      <p className="text-sm text-muted-foreground">Publish on Thursday at</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {slots.map((s) => (
          <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)} className={cn("h-11 rounded-lg border text-sm font-medium tnum", slot === s ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent")}>
            {s}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        Scheduled for Thursday, {slot}
      </p>
    </div>
  )
}

export default function FeatureTabsSection() {
  const [tab, setTab] = useState("find")
  return (
    <section className="mx-auto grid w-full max-w-3xl gap-5 rounded-xl border bg-card p-5 @xl:grid-cols-[14rem_1fr] @xl:p-8">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">One workspace for the whole release</h3>
        <div role="tablist" aria-orientation="vertical" className="mt-4 grid gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={tab === id} aria-controls={`feat-${id}`} onClick={() => setTab(id)} className={cn("flex h-11 items-center gap-2 rounded-lg px-3 text-left text-sm font-medium transition-colors", tab === id ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>
              <Icon className="size-4" aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>
      <div id={`feat-${tab}`} role="tabpanel" className="rounded-lg border bg-background p-4">
        {tab === "find" && <Find />}
        {tab === "share" && <Share />}
        {tab === "schedule" && <Schedule />}
      </div>
    </section>
  )
}
