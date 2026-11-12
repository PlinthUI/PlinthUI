"use client"

import { useId, useState } from "react"
import { ArrowRight, Check, GitPullRequest, Plus, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const FEATURES = [
  { id: "review", label: "Review", icon: GitPullRequest, title: "Reviews that stay on the line", body: "Comments follow the code they were written on, even after a rebase. Resolve a thread and it stays resolved." },
  { id: "ship", label: "Ship", icon: Zap, title: "Deploy previews for every branch", body: "Each pull request gets its own URL within a minute, so design and product can check the real thing." },
  { id: "guard", label: "Guard", icon: ShieldCheck, title: "Checks that block bad releases", body: "Required checks, secret scanning and an audit log keep the main branch boring in the best way." },
]
const PLANS = [
  { name: "Solo", price: 0, perks: ["3 projects", "Community help"] },
  { name: "Team", price: 24, perks: ["Unlimited projects", "Required checks", "Priority help"], pick: true },
  { name: "Scale", price: 79, perks: ["Single sign on", "Audit log", "Uptime SLA"] },
]
const FAQ = [
  ["Does it replace my Git host?", "No. It sits on top of the host you already use and reads pull requests from it."],
  ["Can I self host?", "The Scale plan includes a container image you can run in your own cloud."],
  ["How is usage counted?", "By active contributor per month. Read-only viewers are free."],
]

export default function LandingDevtool() {
  const [tab, setTab] = useState("review")
  const [yearly, setYearly] = useState(true)
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  const f = FEATURES.find((x) => x.id === tab)!

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background text-foreground">
      <header className="flex h-14 items-center gap-4 border-b px-5">
        <span className="font-semibold">Ledgerline</span>
        <nav aria-label="Landing" className="ml-4 hidden gap-1 @lg:flex">
          {["Product", "Pricing", "Docs"].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="inline-flex h-10 items-center rounded-md px-3 text-sm text-muted-foreground hover:text-foreground">{l}</a>)}
        </nav>
        <button type="button" className="ml-auto h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">Start free</button>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center @xl:py-24">
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight @xl:text-6xl">Code review that finishes before lunch</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Ledgerline keeps reviews, previews and release checks in one place, so a pull request is never waiting on a person to remember it.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground">Start free <ArrowRight className="size-4" aria-hidden /></button>
          <button type="button" className="h-12 rounded-lg border px-6 font-medium hover:bg-accent">Book a walkthrough</button>
        </div>
      </section>

      <section className="border-y bg-secondary/40 px-5 py-14">
        <div className="mx-auto grid max-w-4xl gap-8 @2xl:grid-cols-[14rem_1fr]">
          <div role="tablist" aria-orientation="vertical" className="grid content-start gap-1">
            {FEATURES.map(({ id, label, icon: Icon }) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={cn("flex h-12 items-center gap-2 rounded-lg px-3 text-left text-sm font-medium", tab === id ? "bg-primary text-primary-foreground" : "hover:bg-accent")}>
                <Icon className="size-4" aria-hidden />{label}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="rounded-xl border bg-card p-6">
            <h3 className="text-2xl font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-muted-foreground">{f.body}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-3xl font-semibold tracking-tight">Pricing that follows the team</h3>
          <div role="radiogroup" aria-label="Billing" className="flex rounded-lg bg-secondary p-1 text-sm">
            {[["Monthly", false], ["Yearly", true]].map(([l, v]) => <button key={String(l)} role="radio" aria-checked={yearly === v} onClick={() => setYearly(v as boolean)} className={cn("h-9 rounded-md px-3 font-medium", yearly === v ? "bg-card shadow-sm" : "text-muted-foreground")}>{l as string}</button>)}
          </div>
        </div>
        <ul className="mt-6 grid gap-3 @xl:grid-cols-3">
          {PLANS.map((p) => (
            <li key={p.name} className={cn("flex flex-col rounded-xl border bg-card p-5", p.pick && "border-foreground ring-1 ring-foreground")}>
              <h4 className="text-sm font-semibold">{p.name}</h4>
              <p className="mt-2 text-3xl font-semibold tnum">${yearly ? Math.round(p.price * 0.8) : p.price}<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">{p.perks.map((k) => <li key={k} className="flex items-center gap-2"><Check className="size-4" aria-hidden />{k}</li>)}</ul>
              <button type="button" className={cn("mt-5 h-11 rounded-lg text-sm font-medium", p.pick ? "bg-primary text-primary-foreground" : "border hover:bg-accent")}>Choose {p.name}</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-16">
        <h3 className="text-2xl font-semibold tracking-tight">Questions</h3>
        <div className="mt-4 divide-y rounded-lg border">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <h4><button type="button" aria-expanded={open === i} aria-controls={`${uid}-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-12 w-full items-center justify-between px-4 text-left text-sm font-medium">{q}<Plus className={cn("size-4 transition-transform", open === i && "rotate-45")} aria-hidden /></button></h4>
              <p id={`${uid}-${i}`} hidden={open !== i} className="px-4 pb-4 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t px-5 py-6 text-sm text-muted-foreground">© 2026 Ledgerline. Sample landing page.</footer>
    </div>
  )
}
