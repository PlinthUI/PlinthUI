"use client"

import { Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CompareButton } from "./compare-button"
import { copyText } from "./copy-button"
import { SaveButton } from "./save-button"

export function DetailActions({ slug, title, prompt }: { slug: string; title: string; prompt: string }) {
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
    </div>
  )
}
