/**
 * Lightweight in-memory TTL cache
 * Avoids hitting SQLite on every request for rarely-changing data.
 *
 * Usage:
 *   const { getCache, setCache, invalidate } = require('../utils/cache')
 *   const cached = getCache('products')
 *   if (cached) return res.json(cached)
 *   // ... query DB ...
 *   setCache('products', data, 60)   // 60 s TTL
 */

const store = new Map()

/**
 * @param {string} key
 * @returns {any|null}  cached value, or null if missing/expired
 */
function getCache(key) {
    const entry = store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
        store.delete(key)
        return null
    }
    return entry.value
}

/**
 * @param {string} key
 * @param {any}    value
 * @param {number} ttlSeconds  default 60
 */
function setCache(key, value, ttlSeconds = 60) {
    store.set(key, {
        value,
        expiresAt: Date.now() + ttlSeconds * 1000,
    })
}

/**
 * Drop one key (call this after a write/update so stale data is gone).
 * @param {string|RegExp} keyOrPattern
 */
function invalidate(keyOrPattern) {
    if (keyOrPattern instanceof RegExp) {
        for (const k of store.keys()) {
            if (keyOrPattern.test(k)) store.delete(k)
        }
    } else {
        store.delete(keyOrPattern)
    }
}

module.exports = { getCache, setCache, invalidate }
