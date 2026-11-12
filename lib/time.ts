/** Fixed reference date so "New" is deterministic. */
export const MOCK_TODAY = "2026-11-12"
export const NEW_WINDOW_DAYS = 45

export function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000)
}

export function isNewEntry(updatedAt: string) {
  return daysBetween(updatedAt, MOCK_TODAY) <= NEW_WINDOW_DAYS
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}
