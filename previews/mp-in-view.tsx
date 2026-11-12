"use client"

import { InView } from "@/components/motion/in-view"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto h-64 w-full max-w-sm overflow-y-auto rounded-xl border bg-card p-4" aria-label="Scroll inside this panel" tabIndex={0}>
      <p className="text-sm text-muted-foreground">Scroll down in this panel.</p>
      <div className="h-56" aria-hidden />
      <InView variants={{ hidden: { opacity: 0, y: 24, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} viewOptions={{ margin: "0px 0px -60px 0px" }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <div className="rounded-lg border bg-background p-4 text-sm font-medium">This card fades in when it enters the view.</div>
      </InView>
      <div className="h-24" aria-hidden />
    </div>
  )
}
