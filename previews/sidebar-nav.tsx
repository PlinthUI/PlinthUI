"use client"

import { useState } from "react"
import { BarChart3, FolderKanban, Inbox, PanelLeftClose, PanelLeftOpen, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const GROUPS = [
  { title: "Workspace", items: [{ label: "Inbox", icon: Inbox, badge: "4" }, { label: "Projects", icon: FolderKanban }, { label: "Reports", icon: BarChart3 }] },
  { title: "Admin", items: [{ label: "Members", icon: Users }, { label: "Settings", icon: Settings }] },
]

export default function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("Projects")
  return (
    <div className="mx-auto flex h-80 w-full max-w-md overflow-hidden rounded-lg border bg-card">
      <aside aria-label="Primary" className={cn("flex shrink-0 flex-col border-r p-2", collapsed ? "w-14" : "w-48")}>
        <button type="button" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="mb-2 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
          {collapsed ? <PanelLeftOpen className="size-4" aria-hidden /> : <PanelLeftClose className="size-4" aria-hidden />}
        </button>
        <nav className="grid gap-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              {!collapsed && <p className="px-2 pb-1 font-mono text-xs text-muted-foreground">{g.title}</p>}
              <ul className="grid gap-0.5">
                {g.items.map(({ label, icon: Icon, ...r }) => (
                  <li key={label}>
                    <button type="button" title={collapsed ? label : undefined} aria-label={collapsed ? label : undefined} aria-current={active === label ? "page" : undefined} onClick={() => setActive(label)} className={cn("flex h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-sm", active === label ? "bg-accent font-medium" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground")}>
                      <Icon className="size-4 shrink-0" aria-hidden />
                      {!collapsed && <span className="flex-1 text-left">{label}</span>}
                      {!collapsed && "badge" in r && <span className="rounded-md bg-primary px-1.5 text-xs text-primary-foreground tnum">{r.badge}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4"><h3 className="text-sm font-medium">{active}</h3><p className="mt-1 text-sm text-muted-foreground">Content for {active.toLowerCase()}.</p></main>
    </div>
  )
}
