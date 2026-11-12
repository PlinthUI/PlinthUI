"use client"

import Image from "next/image"

const PEOPLE = [
  { name: "Aiko Tanaka", seed: "aiko-tanaka-portrait" },
  { name: "Mateo Silva", seed: "mateo-silva-portrait" },
  { name: "Freya Lindqvist", seed: "freya-lindqvist-portrait" },
  { name: "Oluwaseun Bello", seed: "seun-bello-portrait" },
  { name: "Camille Roche", seed: "camille-roche-portrait" },
  { name: "Ravi Menon", seed: "ravi-menon-portrait" },
  { name: "Elena Vasquez", seed: "elena-vasquez-portrait" },
]
const VISIBLE = 4

export default function AvatarStack() {
  const rest = PEOPLE.slice(VISIBLE)
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <ul className="group flex items-center" aria-label="Project members">
        {PEOPLE.slice(0, VISIBLE).map((p, i) => (
          <li
            key={p.name}
            style={{ "--i": i } as React.CSSProperties}
            className="-ml-3 first:ml-0 transition-transform duration-200 ease-out group-hover:[transform:translateX(calc(var(--i)*10px))] group-focus-within:[transform:translateX(calc(var(--i)*10px))] motion-reduce:transition-none"
          >
            <Image
              src={`https://picsum.photos/seed/${p.seed}/80/80`}
              alt={p.name}
              width={44}
              height={44}
              unoptimized
              className="size-11 rounded-full object-cover ring-2 ring-stage"
            />
          </li>
        ))}
        <li
          style={{ "--i": VISIBLE } as React.CSSProperties}
          className="group/more relative -ml-3 transition-transform duration-200 ease-out group-hover:[transform:translateX(calc(var(--i)*10px))] motion-reduce:transition-none"
        >
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-secondary text-xs font-medium ring-2 ring-stage"
            aria-label={`${rest.length} more members: ${rest.map((r) => r.name).join(", ")}`}
          >
            +{rest.length}
          </button>
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover/more:opacity-100 group-focus-within/more:opacity-100"
          >
            {rest.map((r) => r.name).join(", ")}
          </span>
        </li>
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">Hover to spread the stack</p>
    </div>
  )
}
