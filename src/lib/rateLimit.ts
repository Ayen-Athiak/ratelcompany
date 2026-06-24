const KEY = 'ratel_form_submissions'
const MAX = 3
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getTimestamps(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function isRateLimited(): boolean {
  const now = Date.now()
  const recent = getTimestamps().filter(t => now - t < WINDOW_MS)
  return recent.length >= MAX
}

export function recordSubmission() {
  const now = Date.now()
  const recent = getTimestamps().filter(t => now - t < WINDOW_MS)
  localStorage.setItem(KEY, JSON.stringify([...recent, now]))
}

export function rateLimitRetryMs(): number {
  const now = Date.now()
  const recent = getTimestamps().filter(t => now - t < WINDOW_MS)
  if (recent.length < MAX) return 0
  return WINDOW_MS - (now - recent[0])
}
