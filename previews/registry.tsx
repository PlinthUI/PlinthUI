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
  "typewriter-text": dynamic(() => import("./typewriter-text"), { ssr: false, loading: Loading }),
  "spotlight-card": dynamic(() => import("./spotlight-card"), { ssr: false, loading: Loading }),
  "tilt-card": dynamic(() => import("./tilt-card"), { ssr: false, loading: Loading }),
  "magnetic-button": dynamic(() => import("./magnetic-button"), { ssr: false, loading: Loading }),
  "ripple-button": dynamic(() => import("./ripple-button"), { ssr: false, loading: Loading }),
  "flip-card": dynamic(() => import("./flip-card"), { ssr: false, loading: Loading }),
  "orbit-edge-card": dynamic(() => import("./orbit-edge-card"), { ssr: false, loading: Loading }),
  "word-reveal": dynamic(() => import("./word-reveal"), { ssr: false, loading: Loading }),
  "animated-tabs": dynamic(() => import("./animated-tabs"), { ssr: false, loading: Loading }),
  "accordion-group": dynamic(() => import("./accordion-group"), { ssr: false, loading: Loading }),
  "file-dropzone": dynamic(() => import("./file-dropzone"), { ssr: false, loading: Loading }),
  "pricing-switch": dynamic(() => import("./pricing-switch"), { ssr: false, loading: Loading }),
  "theme-switch": dynamic(() => import("./theme-switch"), { ssr: false, loading: Loading }),
  "notification-bell": dynamic(() => import("./notification-bell"), { ssr: false, loading: Loading }),
  "step-progress": dynamic(() => import("./step-progress"), { ssr: false, loading: Loading }),
  "code-input": dynamic(() => import("./code-input"), { ssr: false, loading: Loading }),
  "sidebar-nav": dynamic(() => import("./sidebar-nav"), { ssr: false, loading: Loading }),
  "mega-menu-navbar": dynamic(() => import("./mega-menu-navbar"), { ssr: false, loading: Loading }),
  "data-table": dynamic(() => import("./data-table"), { ssr: false, loading: Loading }),
  "bar-chart-range": dynamic(() => import("./bar-chart-range"), { ssr: false, loading: Loading }),
  "confirm-dialog": dynamic(() => import("./confirm-dialog"), { ssr: false, loading: Loading }),
  "empty-state-actions": dynamic(() => import("./empty-state-actions"), { ssr: false, loading: Loading }),
  "skeleton-loader": dynamic(() => import("./skeleton-loader"), { ssr: false, loading: Loading }),
  "drag-cube": dynamic(() => import("./drag-cube"), { ssr: false, loading: Loading }),
  "testimonial-slider": dynamic(() => import("./testimonial-slider"), { ssr: false, loading: Loading }),
  "hero-email-capture": dynamic(() => import("./hero-email-capture"), { ssr: false, loading: Loading }),
  "onboarding-checklist": dynamic(() => import("./onboarding-checklist"), { ssr: false, loading: Loading }),
  "landing-devtool": dynamic(() => import("./landing-devtool"), { ssr: false, loading: Loading }),
  "landing-studio": dynamic(() => import("./landing-studio"), { ssr: false, loading: Loading }),
  "landing-launch": dynamic(() => import("./landing-launch"), { ssr: false, loading: Loading }),
  "landing-event": dynamic(() => import("./landing-event"), { ssr: false, loading: Loading }),
  "horizontal-gallery": dynamic(() => import("./horizontal-gallery"), { ssr: false, loading: Loading }),
  "mask-reveal-image": dynamic(() => import("./mask-reveal-image"), { ssr: false, loading: Loading }),
  "scroll-type-line": dynamic(() => import("./scroll-type-line"), { ssr: false, loading: Loading }),
  "cursor-reactive-hero": dynamic(() => import("./cursor-reactive-hero"), { ssr: false, loading: Loading }),
  "stacked-cards-scroll": dynamic(() => import("./stacked-cards-scroll"), { ssr: false, loading: Loading }),
  "parallax-divider": dynamic(() => import("./parallax-divider"), { ssr: false, loading: Loading }),
  "combobox-search": dynamic(() => import("./combobox-search"), { ssr: false, loading: Loading }),
  "dual-range-slider": dynamic(() => import("./dual-range-slider"), { ssr: false, loading: Loading }),
  "date-picker": dynamic(() => import("./date-picker"), { ssr: false, loading: Loading }),
  "tag-input": dynamic(() => import("./tag-input"), { ssr: false, loading: Loading }),
  "password-strength": dynamic(() => import("./password-strength"), { ssr: false, loading: Loading }),
  "breadcrumb-collapse": dynamic(() => import("./breadcrumb-collapse"), { ssr: false, loading: Loading }),
  "pagination-bar": dynamic(() => import("./pagination-bar"), { ssr: false, loading: Loading }),
  "bottom-tab-bar": dynamic(() => import("./bottom-tab-bar"), { ssr: false, loading: Loading }),
  "avatar-stack": dynamic(() => import("./avatar-stack"), { ssr: false, loading: Loading }),
  "segmented-control": dynamic(() => import("./segmented-control"), { ssr: false, loading: Loading }),
  "toast-stack": dynamic(() => import("./toast-stack"), { ssr: false, loading: Loading }),
  "interactive-globe": dynamic(() => import("./interactive-globe"), { ssr: false, loading: Loading }),
  "marquee-footer": dynamic(() => import("./marquee-footer"), { ssr: false, loading: Loading }),
  "portfolio-hero": dynamic(() => import("./portfolio-hero"), { ssr: false, loading: Loading }),
  "proof-stats": dynamic(() => import("./proof-stats"), { ssr: false, loading: Loading }),
  "project-grid": dynamic(() => import("./project-grid"), { ssr: false, loading: Loading }),
}
