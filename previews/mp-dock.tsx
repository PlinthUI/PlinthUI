"use client"

import { Calendar, Camera, Folder, Mail, Music, Settings } from "lucide-react"
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/motion/dock"

const APPS = [{ n: "Mail", i: Mail }, { n: "Calendar", i: Calendar }, { n: "Photos", i: Camera }, { n: "Music", i: Music }, { n: "Files", i: Folder }, { n: "Settings", i: Settings }]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-fit">
      <Dock className="items-end pb-3">
        {APPS.map(({ n, i: Icon }) => (
          <DockItem key={n} className="aspect-square rounded-full bg-secondary">
            <DockLabel>{n}</DockLabel>
            <DockIcon><Icon className="size-full p-2" aria-hidden /></DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  )
}
