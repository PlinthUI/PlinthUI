"use client"

import { Cursor } from "@/components/motion/cursor"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto grid h-56 w-full max-w-md cursor-none place-items-center overflow-hidden rounded-xl border bg-card">
      <Cursor attachToParent variants={{ initial: { scale: 0.3, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.3, opacity: 0 } }} springConfig={{ bounce: 0.001 }} transition={{ ease: "easeInOut", duration: 0.15 }}>
        <div className="size-5 rounded-full bg-foreground" />
      </Cursor>
      <p className="text-sm text-muted-foreground">Move the pointer in here</p>
    </div>
  )
}
