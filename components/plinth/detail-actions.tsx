"use client"

import { Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CompareButton } from "./compare-button"
import { copyText } from "./copy-button"
import { SaveButton } from "./save-button"
import { collectionsApi, useCollections } from "@/lib/collections"

export function DetailActions({ slug, title, prompt }: { slug: string; title: string; prompt: string }) {
  const { collections } = useCollections()
  const others = collections.filter((c) => c.id !== "saved")
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SaveButton slug={slug} title={title} variant="full" />
      <CompareButton slug={slug} title={title} variant="full" />
      <Button
        variant="outline"
        onClick={async () => {
          const ok = await copyText(prompt)
          if (ok) toast.success("Agent prompt copied. Paste it into your coding agent.")
          else toast.error("Copy was blocked by the browser. Open the prompt in the Install tab and copy it manually.")
        }}
      >
        <Sparkles aria-hidden /> Copy as agent prompt
      </Button>
      {others.length > 0 && (
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Add to collection</span>
          <select
            value=""
            onChange={(e) => {
              const c = collections.find((x) => x.id === e.target.value)
              if (!c) return
              collectionsApi.toggleIn(c.id, slug)
              toast(c.items.includes(slug) ? `Removed from ${c.name}` : `Added to ${c.name}`)
            }}
            className="h-11 rounded-lg border border-input bg-card px-2 text-sm"
          >
            <option value="">Add to collection</option>
            {others.map((c) => (
              <option key={c.id} value={c.id}>
                {c.items.includes(slug) ? "Remove from " : "Add to "}
                {c.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  )
}
