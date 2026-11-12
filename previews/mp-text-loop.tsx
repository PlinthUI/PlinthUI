"use client"

import { TextLoop } from "@/components/motion/text-loop"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <p className="mx-auto w-fit text-2xl font-semibold tracking-tight">
      We build <TextLoop className="inline-block" interval={2}><span>faster</span><span>calmer</span><span>clearer</span><span>kinder</span></TextLoop> interfaces
    </p>
  )
}
