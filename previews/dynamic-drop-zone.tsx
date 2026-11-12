"use client"

import { useTheme } from "next-themes"
import DynamicDropZone from "@/components/interactive/DynamicDropZone"
import type { PreviewProps } from "./types"

/** Thin preview wrapper. The component itself lives in components/interactive/. */
export default function Preview({ variant }: PreviewProps) {
  const { resolvedTheme } = useTheme()
  const theme = variant === "dark" || variant === "light" ? variant : resolvedTheme === "dark" ? "dark" : "light"
  return (
    <div className="mx-auto w-full max-w-3xl">
      <DynamicDropZone theme={theme} />
    </div>
  )
}
