"use client"

import { AnimatedBackground } from "@/components/motion/animated-background"

const TABS = ["Overview", "Activity", "Billing", "Team"]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto flex w-fit rounded-xl bg-secondary p-1">
      <AnimatedBackground defaultValue="Overview" className="rounded-lg bg-card shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} enableHover>
        {TABS.map((t) => <button key={t} data-id={t} type="button" className="h-10 px-4 text-sm font-medium text-muted-foreground transition-colors data-[checked=true]:text-foreground">{t}</button>)}
      </AnimatedBackground>
    </div>
  )
}
