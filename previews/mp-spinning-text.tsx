"use client"

import { SpinningText } from "@/components/motion/spinning-text"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto grid h-56 w-full max-w-xs place-items-center">
      <SpinningText className="text-sm font-medium" radius={7} duration={14}>
        keep it simple • keep it fast • keep it kind •
      </SpinningText>
    </div>
  )
}
