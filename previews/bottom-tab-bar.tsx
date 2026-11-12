"use client"

import { useState } from "react"
import { Bell, Home, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [{ id: "Home", icon: Home }, { id: "Search", icon: Search }, { id: "Alerts", icon: Bell, badge: 3 }, { id: "Profile", icon: User }]

export default function BottomTabBar() {
  const [tab, setTab] = useState("Home")
  return (
    <div className="mx-auto flex h-72 w-full max-w-xs flex-col overflow-hidden rounded-2xl border bg-card">
      <div className="flex-1 p-4"><h3 className="font-semibold">{tab}</h3><p className="mt-1 text-sm text-muted-foreground">Screen content for {tab.toLowerCase()}.</p></div>
      <nav aria-label="Primary" className="grid grid-cols-4 border-t">
        {TABS.map(({ id, icon: Icon, ...r }) => (
          <button key={id} type="button" aria-current={tab === id ? "page" : undefined} onClick={() => setTab(id)} className={cn("relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs", tab === id ? "font-medium text-foreground" : "text-muted-foreground")}>
            <span className={cn("absolute inset-x-4 top-0 h-0.5 rounded-full", tab === id ? "bg-primary" : "bg-transparent")} aria-hidden />
            <Icon className="size-5" aria-hidden />{id}
            {"badge" in r && <span className="absolute right-4 top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground tnum"><span className="sr-only">Unread: </span>{r.badge}</span>}
          </button>
        ))}
      </nav>
    </div>
  )
}
