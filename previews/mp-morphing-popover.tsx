"use client"

import { MorphingPopover, MorphingPopoverContent, MorphingPopoverTrigger } from "@/components/motion/morphing-popover"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto h-56 w-full max-w-sm">
      <MorphingPopover>
        <MorphingPopoverTrigger className="h-11 rounded-lg border bg-card px-4 text-sm font-medium">Add a note</MorphingPopoverTrigger>
        <MorphingPopoverContent className="w-64 rounded-xl border bg-popover p-3 shadow-lg">
          <label htmlFor="mp-note" className="mb-1 block text-sm font-medium">Note</label>
          <textarea id="mp-note" rows={3} className="w-full resize-none rounded-lg border border-input bg-background p-2 text-sm" />
        </MorphingPopoverContent>
      </MorphingPopover>
    </div>
  )
}
