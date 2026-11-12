"use client"

import { useTheme } from "next-themes"
import LiquidTabs from "@/components/lists/LiquidTabs"
import type { PreviewProps } from "./types"

/** Thin preview wrapper. The component itself lives in components/lists/. */
export default function Preview({ variant }: PreviewProps) {
  const { resolvedTheme } = useTheme()
  const theme = variant === "dark" || variant === "light" ? variant : resolvedTheme === "dark" ? "dark" : "light"
  return (
    <div className="mx-auto w-full max-w-3xl">
      <LiquidTabs theme={theme} />
    </div>
  )
}
