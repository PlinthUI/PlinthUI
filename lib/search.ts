import type { EntryCard } from "./schema"

/** Small synonym map. Each group is treated as one concept. */
const SYNONYM_GROUPS: string[][] = [
  ["login", "signin", "sign-in", "auth", "authentication", "logon", "sign"],
  ["signup", "sign-up", "register", "registration", "join", "onboard"],
  ["pricing", "price", "plan", "tier", "subscription", "billing"],
  ["modal", "dialog", "popup", "lightbox"],
  ["drawer", "sheet", "offcanvas", "slideover"],
  ["menu", "dropdown", "context"],
  ["nav", "navigation", "navbar", "header", "menubar"],
  ["footer", "sitemap"],
  ["hero", "banner", "masthead"],
  ["table", "grid", "datagrid", "list"],
  ["toast", "snackbar", "notification", "alert"],
  ["tab", "tabs", "segment", "segmented"],
  ["input", "field", "textbox"],
  ["otp", "code", "verification", "2fa", "mfa", "twofactor"],
  ["faq", "accordion", "collapse", "question"],
  ["kanban", "board", "dnd", "drag"],
  ["testimonial", "review", "quote", "social"],
  ["animation", "animated", "motion", "effect"],
  ["dashboard", "metric", "kpi", "analytics", "stat"],
]

const STOPWORDS = new Set(["a", "an", "the", "for", "with", "and", "of", "to", "in", "on", "modern", "new", "best", "simple", "ui", "component", "components"])

export function stem(word: string) {
  let w = word.toLowerCase()
  if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y"
  else if (w.length > 4 && w.endsWith("ing")) w = w.slice(0, -3)
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2)
  else if (w.length > 3 && w.endsWith("es") && /(ch|sh|x|s)es$/.test(w)) w = w.slice(0, -2)
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1)
  return w
}

export function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s]+/)
    .filter(Boolean)
}

const CONCEPT_OF = new Map<string, number>()
SYNONYM_GROUPS.forEach((group, i) => {
  group.forEach((w) => CONCEPT_OF.set(stem(w), i))
})

function concept(stemmed: string) {
  return CONCEPT_OF.get(stemmed)
}

type Field = { text: string; weight: number }

function fieldsOf(e: EntryCard): Field[] {
  return [
    { text: e.title, weight: 6 },
    { text: e.tags.join(" "), weight: 4 },
    { text: e.synonyms.join(" "), weight: 3.5 },
    { text: e.category, weight: 2 },
    { text: e.sourceId.replace(/-/g, " "), weight: 1.5 },
    { text: e.summary, weight: 1 },
  ]
}

export type Scored = { entry: EntryCard; score: number }

export function scoreEntry(e: EntryCard, query: string): number {
  const qTokens = tokenize(query).filter((t) => !STOPWORDS.has(t))
  if (qTokens.length === 0) return 0
  const fields = fieldsOf(e).map((f) => ({
    weight: f.weight,
    stems: tokenize(f.text).map(stem),
    raw: f.text.toLowerCase(),
  }))
  let total = 0
  let matchedTokens = 0
  for (const t of qTokens) {
    const st = stem(t)
    const c = concept(st)
    let best = 0
    for (const f of fields) {
      let s = 0
      if (f.stems.includes(st)) s = f.weight
      else if (c !== undefined && f.stems.some((x) => concept(x) === c)) s = f.weight * 0.8
      else if (st.length >= 3 && (f.raw.includes(st) || f.stems.some((x) => x.startsWith(st)))) s = f.weight * 0.5
      if (s > best) best = s
    }
    if (best > 0) matchedTokens++
    total += best
  }
  if (matchedTokens === 0) return 0
  // reward covering more of the query, lightly reward popularity
  const coverage = matchedTokens / qTokens.length
  return total * (0.5 + coverage) + e.popularity / 1000
}

export function searchEntries(entries: EntryCard[], query: string, limit = 100): EntryCard[] {
  const q = query.trim()
  if (!q) return entries
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry)
}

export const SEARCH_SUGGESTIONS = ["pricing cards", "login form", "command menu", "kanban", "modal", "animated card"]
