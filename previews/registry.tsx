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
  "animated-tabs": dynamic(() => import("./animated-tabs"), { loading: Loading }),
  "accordion-group": dynamic(() => import("./accordion-group"), { loading: Loading }),
  "file-dropzone": dynamic(() => import("./file-dropzone"), { loading: Loading }),
  "pricing-switch": dynamic(() => import("./pricing-switch"), { loading: Loading }),
  "theme-switch": dynamic(() => import("./theme-switch"), { loading: Loading }),
  "notification-bell": dynamic(() => import("./notification-bell"), { loading: Loading }),
  "step-progress": dynamic(() => import("./step-progress"), { loading: Loading }),
  "code-input": dynamic(() => import("./code-input"), { loading: Loading }),
  "sidebar-nav": dynamic(() => import("./sidebar-nav"), { loading: Loading }),
  "mega-menu-navbar": dynamic(() => import("./mega-menu-navbar"), { loading: Loading }),
  "data-table": dynamic(() => import("./data-table"), { loading: Loading }),
  "bar-chart-range": dynamic(() => import("./bar-chart-range"), { loading: Loading }),
  "confirm-dialog": dynamic(() => import("./confirm-dialog"), { loading: Loading }),
  "empty-state-actions": dynamic(() => import("./empty-state-actions"), { loading: Loading }),
  "skeleton-loader": dynamic(() => import("./skeleton-loader"), { loading: Loading }),
  "drag-cube": dynamic(() => import("./drag-cube"), { loading: Loading }),
  "testimonial-slider": dynamic(() => import("./testimonial-slider"), { loading: Loading }),
  "hero-email-capture": dynamic(() => import("./hero-email-capture"), { loading: Loading }),
  "onboarding-checklist": dynamic(() => import("./onboarding-checklist"), { loading: Loading }),
  "landing-devtool": dynamic(() => import("./landing-devtool"), { loading: Loading }),
  "landing-studio": dynamic(() => import("./landing-studio"), { loading: Loading }),
  "landing-launch": dynamic(() => import("./landing-launch"), { loading: Loading }),
  "landing-event": dynamic(() => import("./landing-event"), { loading: Loading }),
  "horizontal-gallery": dynamic(() => import("./horizontal-gallery"), { loading: Loading }),
  "mask-reveal-image": dynamic(() => import("./mask-reveal-image"), { loading: Loading }),
  "scroll-type-line": dynamic(() => import("./scroll-type-line"), { loading: Loading }),
  "cursor-reactive-hero": dynamic(() => import("./cursor-reactive-hero"), { loading: Loading }),
  "stacked-cards-scroll": dynamic(() => import("./stacked-cards-scroll"), { loading: Loading }),
  "parallax-divider": dynamic(() => import("./parallax-divider"), { loading: Loading }),
  "marquee-footer": dynamic(() => import("./marquee-footer"), { loading: Loading }),
  "portfolio-hero": dynamic(() => import("./portfolio-hero"), { loading: Loading }),
  "proof-stats": dynamic(() => import("./proof-stats"), { loading: Loading }),
  "project-grid": dynamic(() => import("./project-grid"), { loading: Loading }),
}
