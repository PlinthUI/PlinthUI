"use client"

import { useState } from "react"
import { ChevronRight, Ellipsis } from "lucide-react"

const TRAIL = ["Home", "Projects", "Plinth", "Components", "Navigation", "Breadcrumb"]

export default function BreadcrumbCollapse() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? TRAIL.map((label, i) => ({ label, i })) : [{ label: TRAIL[0], i: 0 }, null, ...TRAIL.slice(-2).map((label, k) => ({ label, i: TRAIL.length - 2 + k }))]

  return (
    <div className="mx-auto w-full max-w-md">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {shown.map((item, k) => (
            <li key={item ? item.i : "more"} className="flex items-center gap-1">
              {k > 0 && <ChevronRight className="size-4 text-muted-foreground" aria-hidden />}
              {item === null ? (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  aria-label={`Show ${TRAIL.length - 3} hidden levels`}
                  className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <Ellipsis className="size-4" aria-hidden />
                </button>
              ) : item.i === TRAIL.length - 1 ? (
                <span aria-current="page" className="px-1 font-medium">
                  {item.label}
                </span>
              ) : (
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-9 items-center rounded-md px-1.5 text-muted-foreground hover:text-foreground">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {expanded && (
        <button type="button" onClick={() => setExpanded(false)} className="mt-4 inline-flex min-h-9 items-center text-sm text-primary underline-offset-4 hover:underline">
          Collapse path
        </button>
      )}
    </div>
  )
}
