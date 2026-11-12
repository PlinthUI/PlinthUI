"use client"

import { GitCompareArrows } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { compareApi, MAX_COMPARE, useCompareList } from "@/lib/compare"
import { cn } from "@/lib/utils"

export function CompareButton({ slug, title, variant = "icon", className }: { slug: string; title: string; variant?: "icon" | "full"; className?: string }) {
  const list = useCompareList()
  const on = list.includes(slug)

  function toggle() {
    const result = compareApi.toggle(slug)
    if (result === "full") toast.error(`You can compare ${MAX_COMPARE} items at a time. Remove one first.`)
  }

  return variant === "icon" ? (
    <Button variant="ghost" size="icon" className={className} aria-pressed={on} aria-label={on ? `Remove ${title} from compare` : `Add ${title} to compare`} onClick={toggle}>
      <GitCompareArrows aria-hidden className={cn(on && "text-primary")} />
    </Button>
  ) : (
    <Button variant="outline" className={className} aria-pressed={on} onClick={toggle}>
      <GitCompareArrows aria-hidden className={cn(on && "text-primary")} /> {on ? "In compare" : "Compare"}
    </Button>
  )
}
