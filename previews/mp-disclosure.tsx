"use client"

import { ChevronDown } from "lucide-react"
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/motion/disclosure"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <Disclosure className="mx-auto w-full max-w-sm rounded-xl border bg-card px-4">
      <DisclosureTrigger>
        <button type="button" className="flex min-h-12 w-full items-center justify-between text-sm font-medium">Release notes <ChevronDown className="size-4" aria-hidden /></button>
      </DisclosureTrigger>
      <DisclosureContent><p className="pb-4 text-sm text-muted-foreground">Faster previews, a calmer sidebar and fixes for keyboard focus in dialogs.</p></DisclosureContent>
    </Disclosure>
  )
}
