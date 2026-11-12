"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ThemeSwitch() {
  const [dark, setDark] = useState(false)
  return (
    <div className="mx-auto grid w-full max-w-sm place-items-center gap-3">
      <button type="button" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={() => setDark(!dark)} className="relative h-12 w-24 rounded-full border bg-secondary p-1">
        <span className={cn("grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 motion-reduce:transition-none", dark && "translate-x-12")}>
          {dark ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
        </span>
      </button>
      <p className="text-sm text-muted-foreground" aria-live="polite">{dark ? "Dark" : "Light"} selected (local to this demo)</p>
    </div>
  )
}
