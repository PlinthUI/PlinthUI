"use client"

import { useState } from "react"
import { TransitionPanel } from "@/components/motion/transition-panel"

const STEPS = [["Account", "Confirm the email that owns this workspace."], ["Workspace", "Name it and choose where its data is stored."], ["Invite", "Add teammates now or skip and do it later."]]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [i, setI] = useState(0)
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-3 flex gap-1.5">{STEPS.map(([t], k) => <button key={t} type="button" aria-pressed={i === k} onClick={() => setI(k)} className="h-9 flex-1 rounded-lg border text-sm aria-pressed:bg-primary aria-pressed:text-primary-foreground">{t}</button>)}</div>
      <div className="overflow-hidden rounded-xl border bg-card p-4">
        <TransitionPanel activeIndex={i} transition={{ duration: 0.3, ease: "easeInOut" }} variants={{ enter: { opacity: 0, x: 40 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 } }}>
          {STEPS.map(([t, b]) => <div key={t}><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{b}</p></div>)}
        </TransitionPanel>
      </div>
    </div>
  )
}
