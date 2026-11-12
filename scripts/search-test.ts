import assert from "node:assert/strict"
import { ENTRIES } from "../data/entries"
import { toCard } from "../lib/card"
import { searchEntries } from "../lib/search"

const cards = ENTRIES.map(toCard)
const top = (q: string, n: number) => searchEntries(cards, q, n).map((c) => c.slug)

// 1. "Modern SaaS pricing cards" returns pricing components first
const pricing = top("Modern SaaS pricing cards", 3)
console.log("pricing query ->", pricing)
assert.ok(pricing.every((s) => s.startsWith("pricing-")), `top 3 should all be pricing, got ${pricing}`)

// 2. login, signin and auth return the same family
const AUTH = new Set(ENTRIES.filter((e) => e.category === "Authentication").map((e) => e.slug))
for (const q of ["login", "signin", "auth"]) {
  const r = top(q, 4)
  console.log(`${q} ->`, r)
  assert.equal(r.length, 4)
  assert.ok(r.every((s) => AUTH.has(s)), `${q} top 4 should all be authentication entries, got ${r}`)
}
const sets = ["login", "signin", "auth"].map((q) => new Set(top(q, 4)))
assert.ok([...sets[0]].every((s) => sets[1].has(s) && sets[2].has(s)), "login, signin, auth should share the same top family")

// 3. nonsense returns nothing
assert.equal(top("zzzxqv", 5).length, 0)
console.log("search acceptance: ok")
