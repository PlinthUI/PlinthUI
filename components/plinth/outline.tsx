"use client"

import { TAB_EVENT, TABS } from "./workbench"

/** Right rail "On this page". Tab links switch the workbench, Related scrolls. */
export function Outline({ hasRelated }: { hasRelated: boolean }) {
  return (
    <nav aria-label="On this page" className="sticky top-24 text-sm">
      <p className="mb-2 font-mono text-[13px] text-muted-foreground">On this page</p>
      <ul className="grid border-l">
        {TABS.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              onClick={(e) => {
                e.preventDefault()
                window.dispatchEvent(new CustomEvent(TAB_EVENT, { detail: t.id }))
              }}
              className="-ml-px inline-flex min-h-10 w-full items-center border-l-2 border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground"
            >
              {t.label}
            </a>
          </li>
        ))}
        {hasRelated && (
          <li>
            <a href="#related" className="-ml-px inline-flex min-h-10 w-full items-center border-l-2 border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground">
              Related components
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}
