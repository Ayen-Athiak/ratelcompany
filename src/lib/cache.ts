type CacheEntry<T> = { data: T; expires: number }

const PREFIX = 'ratel_cache_'

export function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return null
    const entry: CacheEntry<T> = JSON.parse(raw)
    if (Date.now() > entry.expires) { localStorage.removeItem(PREFIX + key); return null }
    return entry.data
  } catch {
    return null
  }
}

export function cacheSet<T>(key: string, data: T, ttlMs = 10 * 60 * 1000) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ data, expires: Date.now() + ttlMs }))
  } catch {
    // localStorage full or unavailable — silently skip
  }
}
