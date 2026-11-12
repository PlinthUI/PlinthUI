"use client"

import { useId, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

const SUGGESTIONS = ["design tokens", "accessibility", "forms", "animation", "charts", "tables", "dark mode", "i18n"]

export default function TagInput({ max = 6 }: PreviewProps & { max?: number }) {
  const [tags, setTags] = useState<string[]>(["forms"])
  const [value, setValue] = useState("")
  const [active, setActive] = useState(0)
  const id = useId()

  const options = SUGGESTIONS.filter((s) => !tags.includes(s) && s.includes(value.trim().toLowerCase()))
  const open = value.length > 0 && options.length > 0 && tags.length < max

  function add(t: string) {
    const clean = t.trim().toLowerCase()
    if (!clean || tags.includes(clean) || tags.length >= max) return
    setTags([...tags, clean])
    setValue("")
    setActive(0)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      add(open ? options[active] : value)
    } else if (e.key === "Backspace" && !value) {
      setTags(tags.slice(0, -1))
    } else if (e.key === "ArrowDown" && open) {
      e.preventDefault()
      setActive((active + 1) % options.length)
    } else if (e.key === "ArrowUp" && open) {
      e.preventDefault()
      setActive((active - 1 + options.length) % options.length)
    } else if (e.key === "Escape") setValue("")
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        Topics
      </label>
      <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card p-1.5 focus-within:border-primary">
        {tags.map((t) => (
          <span key={t} className="inline-flex h-8 items-center gap-1 rounded-md bg-secondary pl-2.5 pr-1 text-sm">
            {t}
            <button
              type="button"
              onClick={() => setTags(tags.filter((x) => x !== t))}
              aria-label={`Remove ${t}`}
              className="grid size-6 place-items-center rounded-sm hover:bg-accent"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          disabled={tags.length >= max}
          placeholder={tags.length >= max ? "Limit reached" : "Add a topic"}
          className="h-8 min-w-24 flex-1 bg-transparent px-1.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {open && (
        <ul id={`${id}-list`} role="listbox" className="absolute z-10 mt-1 w-full rounded-lg border bg-popover p-1 shadow-lg">
          {options.map((o, i) => (
            <li
              key={o}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault()
                add(o)
              }}
              className={cn("cursor-pointer rounded-md px-2.5 py-2 text-sm", i === active && "bg-accent")}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-muted-foreground tnum">
        {tags.length} of {max} tags. Enter or comma adds one.
      </p>
    </div>
  )
}
