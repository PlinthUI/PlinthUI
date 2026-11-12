"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GitCompareArrows, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { compareApi, useCompareList } from "@/lib/compare"
import { useEntries } from "./entries-provider"

/** Floating tray listing items chosen for comparison. Hidden on /compare. */
export function CompareTray() {
  const list = useCompareList()
  const entries = useEntries()
  const pathname = usePathname()
  if (list.length === 0 || pathname.startsWith("/compare")) return null
  const titles = list.map((s) => entries.find((e) => e.slug === s)?.title ?? s)
  return (
    <div role="region" aria-label="Compare tray" className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-xl items-center gap-2 rounded-xl border bg-popover p-2 pl-4 shadow-lg animate-in slide-in-from-bottom-4 fade-in">
      <GitCompareArrows className="size-4 shrink-0 text-primary" aria-hidden />
      <p className="min-w-0 flex-1 truncate text-sm">
        <span className="font-medium tnum">{list.length} of 3</span> <span className="text-muted-foreground">{titles.join(", ")}</span>
      </p>
      <Button variant="ghost" size="icon" aria-label="Clear compare list" onClick={() => compareApi.clear()}>
        <X aria-hidden />
      </Button>
      <Link href={`/compare?items=${list.join(",")}`} className={cn(buttonVariants({ size: "default" }))}>
        Compare
      </Link>
    </div>
  )
}
