"use client"

import type { ComponentType } from "react"
import type { PreviewProps } from "./types"

/**
 * Single seam for previews. Add one line per component:
 *   "my-slug": dynamic(() => import("./my-slug"), { loading: Loading }),
 * (import dynamic from "next/dynamic"). Phase 2 swaps this lookup for
 * sandboxed iframes without touching any page or card.
 */
export const previewRegistry: Record<string, ComponentType<PreviewProps>> = {}
