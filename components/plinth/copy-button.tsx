"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function CopyButton({ text, label = "Copy", className, variant = "ghost" }: { text: string; label?: string; className?: string; variant?: "ghost" | "outline" }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!done) return
    const t = window.setTimeout(() => setDone(false), 1600)
    return () => window.clearTimeout(t)
  }, [done])

  return (
    <Button
      variant={variant}
      size="sm"
      className={className}
      onClick={async () => {
        const ok = await copyText(text)
        if (ok) setDone(true)
        else toast.error("Copy was blocked by the browser. Select the text and copy it manually.")
      }}
    >
      {done ? <Check aria-hidden /> : <Copy aria-hidden />}
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </Button>
  )
}
