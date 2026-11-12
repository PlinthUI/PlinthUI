"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import type { PreviewProps } from "./types"

function Loading() {
  return <div className="h-40 w-full max-w-sm animate-pulse rounded-lg bg-muted" aria-hidden />
}

/**
 * Single seam for previews. Phase 2 swaps these in-page components for
 * sandboxed iframes without touching any page or card.
 */
export const previewRegistry: Record<string, ComponentType<PreviewProps>> = {
  "accordion": dynamic(() => import("./accordion"), { loading: Loading }),
  "activity-timeline": dynamic(() => import("./activity-timeline"), { loading: Loading }),
  "avatar-stack": dynamic(() => import("./avatar-stack"), { loading: Loading }),
  "border-beam": dynamic(() => import("./border-beam"), { loading: Loading }),
  "breadcrumb-collapse": dynamic(() => import("./breadcrumb-collapse"), { loading: Loading }),
  "combobox-search": dynamic(() => import("./combobox-search"), { loading: Loading }),
  "context-menu": dynamic(() => import("./context-menu"), { loading: Loading }),
  "drawer-sheet": dynamic(() => import("./drawer-sheet"), { loading: Loading }),
  "dual-range-slider": dynamic(() => import("./dual-range-slider"), { loading: Loading }),
  "faq-section": dynamic(() => import("./faq-section"), { loading: Loading }),
  "feature-tabs-section": dynamic(() => import("./feature-tabs-section"), { loading: Loading }),
  "footer-sitemap": dynamic(() => import("./footer-sitemap"), { loading: Loading }),
  "hero-waitlist": dynamic(() => import("./hero-waitlist"), { loading: Loading }),
  "kanban-board": dynamic(() => import("./kanban-board"), { loading: Loading }),
  "kpi-dashboard": dynamic(() => import("./kpi-dashboard"), { loading: Loading }),
  "login-form": dynamic(() => import("./login-form"), { loading: Loading }),
  "magic-link-flow": dynamic(() => import("./magic-link-flow"), { loading: Loading }),
  "modal-dialog": dynamic(() => import("./modal-dialog"), { loading: Loading }),
  "navbar-mega": dynamic(() => import("./navbar-mega"), { loading: Loading }),
  "otp-input": dynamic(() => import("./otp-input"), { loading: Loading }),
  "password-strength": dynamic(() => import("./password-strength"), { loading: Loading }),
  "pressable-buttons": dynamic(() => import("./pressable-buttons"), { loading: Loading }),
  "pricing-cards-toggle": dynamic(() => import("./pricing-cards-toggle"), { loading: Loading }),
  "pricing-comparison-table": dynamic(() => import("./pricing-comparison-table"), { loading: Loading }),
  "pricing-usage-slider": dynamic(() => import("./pricing-usage-slider"), { loading: Loading }),
  "progress-stepper": dynamic(() => import("./progress-stepper"), { loading: Loading }),
  "segmented-control": dynamic(() => import("./segmented-control"), { loading: Loading }),
  "sidebar-collapsible": dynamic(() => import("./sidebar-collapsible"), { loading: Loading }),
  "signup-validation": dynamic(() => import("./signup-validation"), { loading: Loading }),
  "sortable-table": dynamic(() => import("./sortable-table"), { loading: Loading }),
  "sparkline-stats": dynamic(() => import("./sparkline-stats"), { loading: Loading }),
  "spotlight-card": dynamic(() => import("./spotlight-card"), { loading: Loading }),
  "tabs-underline": dynamic(() => import("./tabs-underline"), { loading: Loading }),
  "tag-input": dynamic(() => import("./tag-input"), { loading: Loading }),
  "testimonial-carousel": dynamic(() => import("./testimonial-carousel"), { loading: Loading }),
  "tilt-card": dynamic(() => import("./tilt-card"), { loading: Loading }),
  "toast-undo": dynamic(() => import("./toast-undo"), { loading: Loading }),
  "two-factor-card": dynamic(() => import("./two-factor-card"), { loading: Loading }),
  "typewriter-text": dynamic(() => import("./typewriter-text"), { loading: Loading }),
}
