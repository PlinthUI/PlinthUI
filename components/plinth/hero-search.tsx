"use client"

import { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSearch() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const id = useId()
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        router.push(q.trim() ? `/explore?q=${encodeURIComponent(q.trim())}` : "/explore")
      }}
      className="w-full max-w-xl"
    >
      <label htmlFor={id} className="sr-only">
        Search components
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-4 size-5 text-muted-foreground" aria-hidden />
        <input
          id={id}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “modern SaaS pricing cards”"
          className="h-13 w-full rounded-xl border border-input bg-card pl-12 pr-28 text-base shadow-sm placeholder:text-muted-foreground focus-visible:border-primary"
        />
        <Button type="submit" className="absolute right-1.5 top-1.5 h-10">
          Search
        </Button>
      </div>
    </form>
  )
}
