"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Bookmark, Compass, Folder, GitCompareArrows, Library, Moon, Search, Sun } from "lucide-react"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { CATEGORIES } from "@/lib/categories"
import { searchEntries } from "@/lib/search"
import { useEntries } from "./entries-provider"

const OPEN_EVENT = "plinth:open-palette"
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT))

export function CommandPalette() {
  const router = useRouter()
  const entries = useEntries()
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  const results = useMemo(() => (query.trim() ? searchEntries(entries, query, 8) : entries.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 6)), [entries, query])
  const categories = useMemo(() => CATEGORIES.filter((c) => !query.trim() || c.id.toLowerCase().includes(query.trim().toLowerCase())), [query])

  function go(href: string) {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Search PlinthUI" description="Search components, jump to a category or change theme.">
      <Command shouldFilter={false} loop>
      <CommandInput value={query} onValueChange={setQuery} placeholder="Search components, categories, actions…" />
      <CommandList>
        <CommandEmpty>Nothing matches “{query}”. Try “pricing cards” or “login form”.</CommandEmpty>
        <CommandGroup heading={query.trim() ? "Components" : "Popular components"}>
          {results.map((e) => (
            <CommandItem key={e.slug} value={`entry-${e.slug}`} onSelect={() => go(`/c/${e.slug}`)}>
              <Library aria-hidden />
              <span className="flex-1">{e.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {categories.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Categories">
              {categories.slice(0, 6).map((c) => (
                <CommandItem key={c.id} value={`cat-${c.id}`} onSelect={() => go(`/explore?category=${encodeURIComponent(c.id)}`)}>
                  <Folder aria-hidden /> {c.id}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        <CommandSeparator />
        <CommandGroup heading="Go to">
          <CommandItem value="go-explore" onSelect={() => go("/explore")}>
            <Compass aria-hidden /> Explore
          </CommandItem>
          <CommandItem value="go-compare" onSelect={() => go("/compare")}>
            <GitCompareArrows aria-hidden /> Compare
          </CommandItem>
          <CommandItem value="go-collections" onSelect={() => go("/collections")}>
            <Bookmark aria-hidden /> Collections
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle-theme"
            onSelect={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
              setOpen(false)
            }}
          >
            {resolvedTheme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />} Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
      </Command>
    </CommandDialog>
  )
}

export function SearchTrigger({ compact = false }: { compact?: boolean }) {
  return compact ? (
    <Button variant="ghost" size="icon" aria-label="Search" onClick={openPalette}>
      <Search aria-hidden />
    </Button>
  ) : (
    <Button variant="outline" className="w-56 justify-between font-normal text-muted-foreground" onClick={openPalette} aria-label="Search components, shortcut Control K">
      <span className="inline-flex items-center gap-2">
        <Search aria-hidden /> Search
      </span>
      <kbd className="rounded-md border bg-muted px-1.5 font-mono text-xs">Ctrl&nbsp;K</kbd>
    </Button>
  )
}
