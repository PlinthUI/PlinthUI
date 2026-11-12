"use client"

import { Tilt } from "@/components/motion/tilt"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Tilt rotationFactor={8} isRevese style={{ transformOrigin: "center center" }} springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}>
        <div className="overflow-hidden rounded-xl border bg-card"><img src="https://picsum.photos/seed/tilt-card-shore/600/400" alt="A rocky shore" className="aspect-[3/2] w-full object-cover" /><div className="p-4"><h3 className="font-semibold">Rocky shore</h3><p className="text-sm text-muted-foreground">Move the pointer over the card.</p></div></div>
      </Tilt>
    </div>
  )
}
