"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import type { PreviewProps } from "./types"

function Loading() {
  return <div className="h-40 w-full max-w-sm animate-pulse rounded-lg bg-muted" aria-hidden />
}

/**
 * Single seam for previews. Phase 2 swaps this lookup for sandboxed iframes
 * without touching any page or card. Add one line per component.
 */
export const previewRegistry: Record<string, ComponentType<PreviewProps>> = {
  "typewriter-text": dynamic(() => import("./typewriter-text"), { loading: Loading }),
  "spotlight-card": dynamic(() => import("./spotlight-card"), { loading: Loading }),
  "tilt-card": dynamic(() => import("./tilt-card"), { loading: Loading }),
  "magnetic-button": dynamic(() => import("./magnetic-button"), { loading: Loading }),
  "ripple-button": dynamic(() => import("./ripple-button"), { loading: Loading }),
  "flip-card": dynamic(() => import("./flip-card"), { loading: Loading }),
  "orbit-edge-card": dynamic(() => import("./orbit-edge-card"), { loading: Loading }),
  "word-reveal": dynamic(() => import("./word-reveal"), { loading: Loading }),
  "marquee-footer": dynamic(() => import("./marquee-footer"), { loading: Loading }),
  "portfolio-hero": dynamic(() => import("./portfolio-hero"), { loading: Loading }),
  "proof-stats": dynamic(() => import("./proof-stats"), { loading: Loading }),
  "project-grid": dynamic(() => import("./project-grid"), { loading: Loading }),
}
