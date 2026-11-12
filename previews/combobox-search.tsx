"use client"

import { useId, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const OPTIONS = ["Astro", "Eleventy", "Gatsby", "Next.js", "Nuxt", "Qwik", "Remix", "SolidStart", "SvelteKit", "Vite"]

export default function ComboboxSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string | null>(null)
  const [active, setActive] = useState(0)
  const id = useId()
  const list = OPTIONS.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  function choose(o: string) {
    setSelected(o)
    setQuery("")
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
      setActive((a) => Math.min(a + 1, list.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter" && open && list[active]) {
      e.preventDefault()
      choose(list[active])
    } else if (e.key === "Escape") setOpen(false)
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        Framework
      </label>
      <div className="relative">
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={open && list[active] ? `${id}-${active}` : undefined}
          value={open ? query : (selected ?? query)}
          placeholder="Search frameworks"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
          className="h-11 w-full rounded-lg border border-input bg-card pl-3 pr-10 text-sm focus-visible:border-primary"
        />
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-3.5 size-4 text-muted-foreground" aria-hidden />
      </div>
      {open && (
        <ul id={`${id}-list`} role="listbox" className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border bg-popover p-1 shadow-lg">
          {list.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">No match for “{query}”</li>}
          {list.map((o, i) => (
            <li
              key={o}
              id={`${id}-${i}`}
              role="option"
              aria-selected={selected === o}
              onMouseDown={(e) => {
                e.preventDefault()
                choose(o)
              }}
              onMouseEnter={() => setActive(i)}
              className={cn("flex min-h-10 cursor-pointer items-center justify-between rounded-md px-3 text-sm", i === active && "bg-accent")}
            >
              {o}
              {selected === o && <Check className="size-4" aria-hidden />}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
        {selected ? `Selected ${selected}` : "Type to filter, arrows to move, Enter to choose"}
      </p>
    </div>
  )
}
