import assert from "node:assert/strict"
import { ENTRIES } from "../data/entries"
import { toCard } from "../lib/card"
import { searchEntries } from "../lib/search"

const cards = ENTRIES.map(toCard)
const top = (q: string, n = 3) => searchEntries(cards, q, n).map((c) => c.slug)

const cases: [string, string, number][] = [
  ["Modern SaaS pricing cards", "pricing-switch", 1],
  ["pricing", "pricing-switch", 1],
  ["modal", "confirm-dialog", 1],
  ["popup", "confirm-dialog", 1],
  ["tabs", "animated-tabs", 1],
  ["otp", "code-input", 1],
  ["verification code", "code-input", 1],
  ["parallax", "parallax-divider", 4],
  ["typing animation", "typewriter-text", 2],
  ["skeleton", "skeleton-loader", 1],
  ["countdown", "landing-launch", 1],
  ["upload", "file-dropzone", 1],
]

for (const [query, expected, n] of cases) {
  const r = top(query, n)
  console.log(`${query.padEnd(28)} -> ${r.join(", ")}`)
  assert.ok(r.includes(expected), `"${query}" should return ${expected} in its top ${n}, got ${r.join(", ")}`)
}

assert.equal(top("zzzxqv", 5).length, 0, "nonsense should return nothing")
console.log(`search acceptance: ok (${cases.length + 1} checks, ${cards.length} entries)`)
