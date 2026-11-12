"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchTrigger } from "./command-palette"
import { ThemeToggle } from "./theme-toggle"

const NAV = [
  { href: "/explore", label: "Explore" },
  { href: "/compare", label: "Compare" },
  { href: "/collections", label: "Collections" },
  { href: "/sources", label: "Sources" },
]

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 rounded-md font-semibold tracking-tight" aria-label="PlinthUI home">
      <span aria-hidden className="flex flex-col items-center">
        <span className="h-3.5 w-5 rounded-t-[4px] border border-foreground/80 bg-card" />
        <span className="h-1.5 w-6 rounded-b-[3px] bg-foreground" />
      </span>
      PlinthUI
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/")
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={cn("inline-flex h-11 items-center rounded-lg px-3 text-sm transition-colors", active(n.href) ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground")}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:block">
            <SearchTrigger />
          </div>
          <div className="md:hidden">
            <SearchTrigger compact />
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <Menu aria-hidden />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="px-4 pt-4">Menu</SheetTitle>
              <nav aria-label="Mobile" className="grid gap-1 p-4">
                {NAV.map((n) => (
                  <SheetClose key={n.href} render={<Link href={n.href} className={cn("flex h-12 items-center rounded-lg px-3 text-base", active(n.href) ? "bg-secondary font-medium" : "hover:bg-accent")} />}>
                    {n.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
