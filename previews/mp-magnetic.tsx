"use client"

import { Magnetic } from "@/components/motion/magnetic"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto grid h-48 w-full max-w-sm place-items-center rounded-xl border border-dashed">
      <Magnetic intensity={0.4} range={140} actionArea="parent">
        <button type="button" className="h-12 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Get in touch</button>
      </Magnetic>
    </div>
  )
}
