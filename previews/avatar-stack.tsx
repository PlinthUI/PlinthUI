"use client"

const PEOPLE = ["Aiko Tanaka", "Mateo Silva", "Freya Lindqvist", "Seun Bello", "Camille Roche", "Ravi Menon", "Elena Vasquez"]
const VISIBLE = 4
const tone = ["bg-secondary", "bg-accent", "bg-muted", "bg-secondary"]

export default function AvatarStack() {
  const rest = PEOPLE.slice(VISIBLE)
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
      <ul className="group flex items-center" aria-label="Project members">
        {PEOPLE.slice(0, VISIBLE).map((n, i) => (
          <li key={n} style={{ "--i": i } as React.CSSProperties} className="-ml-3 transition-transform duration-200 first:ml-0 group-hover:[transform:translateX(calc(var(--i)*10px))] group-focus-within:[transform:translateX(calc(var(--i)*10px))] motion-reduce:transition-none">
            <span title={n} role="img" aria-label={n} className={`grid size-11 place-items-center rounded-full text-sm font-semibold ring-2 ring-stage ${tone[i]}`}>{n.split(" ").map((p) => p[0]).join("")}</span>
          </li>
        ))}
        <li style={{ "--i": VISIBLE } as React.CSSProperties} className="-ml-3 transition-transform duration-200 group-hover:[transform:translateX(calc(var(--i)*10px))] motion-reduce:transition-none">
          <button type="button" title={rest.join(", ")} aria-label={`${rest.length} more: ${rest.join(", ")}`} className="grid size-11 place-items-center rounded-full bg-primary text-xs font-medium text-primary-foreground ring-2 ring-stage">+{rest.length}</button>
        </li>
      </ul>
      <p className="mt-2 text-sm text-muted-foreground">Hover to spread the stack</p>
    </div>
  )
}
