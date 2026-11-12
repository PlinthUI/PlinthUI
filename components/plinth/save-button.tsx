"use client"

import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { collectionsApi, useIsSaved } from "@/lib/collections"
import { cn } from "@/lib/utils"

export function SaveButton({ slug, title, variant = "icon", className }: { slug: string; title: string; variant?: "icon" | "full"; className?: string }) {
  const saved = useIsSaved(slug)

  function toggle() {
    collectionsApi.toggleSaved(slug)
    if (!saved) {
      toast(`Saved ${title}`, { action: { label: "Undo", onClick: () => collectionsApi.toggleSaved(slug) } })
    } else {
      toast(`Removed ${title} from Saved`, { action: { label: "Undo", onClick: () => collectionsApi.toggleSaved(slug) } })
    }
  }

  return variant === "icon" ? (
    <Button variant="ghost" size="icon" className={className} aria-pressed={saved} aria-label={saved ? `Remove ${title} from Saved` : `Save ${title}`} onClick={toggle}>
      <Bookmark aria-hidden className={cn(saved && "fill-primary text-primary")} />
    </Button>
  ) : (
    <Button variant="outline" className={className} aria-pressed={saved} onClick={toggle}>
      <Bookmark aria-hidden className={cn(saved && "fill-primary text-primary")} /> {saved ? "Saved" : "Save"}
    </Button>
  )
}
