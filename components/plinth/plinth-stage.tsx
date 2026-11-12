"use client"

import { useEffect, useRef, useState } from "react"
import { previewRegistry } from "@/previews/registry"
import { cn } from "@/lib/utils"
import { useInView } from "./use-in-view"

export type StageWidth = "mobile" | "tablet" | "full"
export const STAGE_WIDTHS: Record<StageWidth, { label: string; px: number | null }> = {
  mobile: { label: "375", px: 375 },
  tablet: { label: "768", px: 768 },
  full: { label: "Full", px: null },
}

type Props = {
  previewId: string
  variant?: string
  /** card: scaled, lazy, non interactive. detail: live and interactive. */
  mode?: "card" | "detail"
  width?: StageWidth
  kind?: "component" | "section"
  plaque?: React.ReactNode
  className?: string
}

function Missing({ id }: { id: string }) {
  return <p className="text-sm text-muted-foreground">No preview registered for {id}.</p>
}

/**
 * The single place previews render. Phase 2 replaces the registry lookup with a
 * sandboxed iframe while keeping this exact interface.
 */
export function PlinthStage({ previewId, variant, mode = "detail", width = "full", kind = "component", plaque, className }: Props) {
  const Preview = previewRegistry[previewId]
  return (
    <figure className={cn("plinth", className)}>
      <div className="plinth-stage">
        {mode === "card" ? (
          <CardStage kind={kind}>{Preview ? <Preview variant={variant} /> : <Missing id={previewId} />}</CardStage>
        ) : (
          <DetailStage width={width}>{Preview ? <Preview variant={variant} /> : <Missing id={previewId} />}</DetailStage>
        )}
      </div>
      <div className="plinth-base" aria-hidden />
      {plaque}
    </figure>
  )
}

function DetailStage({ width, children }: { width: StageWidth; children: React.ReactNode }) {
  const px = STAGE_WIDTHS[width].px
  return (
    <div className="flex min-h-[22rem] items-center justify-center overflow-x-auto p-4 sm:p-8">
      <div key={width} className="@container w-full animate-in fade-in duration-200" style={{ maxWidth: px ?? "100%" }}>
        {children}
      </div>
    </div>
  )
}

function CardStage({ kind, children }: { kind: "component" | "section"; children: React.ReactNode }) {
  const [viewRef, seen] = useInView<HTMLDivElement>()
  const box = useRef<HTMLDivElement | null>(null)
  const inner = useRef<HTMLDivElement | null>(null)
  const [box2, setBox2] = useState({ w: 0, h: 0 })
  const [innerH, setInnerH] = useState(0)
  const virtualWidth = kind === "section" ? 880 : 560

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setBox2({ w: entry.contentRect.width, h: entry.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = inner.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setInnerH(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [seen])

  // Fit the whole preview inside the card: never larger than the width fit, shrink more if it is tall.
  const fitW = box2.w ? box2.w / virtualWidth : 0.5
  const fitH = innerH && box2.h ? box2.h / innerH : fitW
  const scale = Math.min(fitW, fitH, 1)

  return (
    <div
      ref={(el) => {
        box.current = el
        viewRef.current = el
      }}
      className="relative aspect-[16/10] w-full overflow-hidden"
    >
      {seen && box2.w > 0 ? (
        <div
          ref={inner}
          inert
          aria-hidden
          className="@container pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center p-4"
          style={{ width: virtualWidth, transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          {children}
        </div>
      ) : (
        <div className="absolute inset-6 animate-pulse rounded-lg bg-muted/70" aria-hidden />
      )}
    </div>
  )
}
