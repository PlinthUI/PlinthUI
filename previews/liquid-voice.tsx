"use client"

import { useTheme } from "next-themes"
import LiquidVoice from "@/components/audio/LiquidVoice"
import type { PreviewProps } from "./types"

/** Thin preview wrapper. The component itself lives in components/audio/. */
export default function LiquidVoicePreview({ variant }: PreviewProps) {
  const { resolvedTheme } = useTheme()
  const theme = variant === "dark" || variant === "light" ? variant : resolvedTheme === "dark" ? "dark" : "light"
  return (
    <div className="mx-auto w-full max-w-3xl">
      <LiquidVoice theme={theme} />
    </div>
  )
}
