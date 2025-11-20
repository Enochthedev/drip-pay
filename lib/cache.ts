import Redis from 'ioredis'
import { env } from './env'

/**
 * Redis cache client for improving performance
 * Falls back to in-memory cache if Redis is not configured
 */

let redis: Redis | null = null
const memoryCache = new Map<string, { value: any; expiresAt: number }>()

// Initialize Redis if URL is provided
if (env.REDIS_URL || env.UPSTASH_REDIS_REST_URL) {
  try {
    redis = new Redis(env.REDIS_URL || env.UPSTASH_REDIS_REST_URL!)
    console.log('✅ Redis connected')
  } catch (error) {
    console.error('Failed to connect to Redis:', error)
  }
}

/**
 * Get value from cache
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    if (redis) {
      const value = await redis.get(key)
      return value ? JSON.parse(value) : null
    }

    // Fallback to memory cache
    const cached = memoryCache.get(key)
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value
    }
    memoryCache.delete(key)
    return null
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

/**
 * Set value in cache with TTL (time to live in seconds)
 */
export async function setCached(
  key: string,
  value: any,
  ttl: number = 300 // 5 minutes default
): Promise<void> {
  try {
    if (redis) {
      await redis.setex(key, ttl, JSON.stringify(value))
    } else {
      // Fallback to memory cache
      memoryCache.set(key, {
        value,
        expiresAt: Date.now() + ttl * 1000,
      })
    }
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

/**
 * Delete value from cache
 */
export async function deleteCached(key: string): Promise<void> {
  try {
    if (redis) {
      await redis.del(key)
    } else {
      memoryCache.delete(key)
    }
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}

/**
 * Delete multiple keys matching a pattern
 */
export async function deleteCachedPattern(pattern: string): Promise<void> {
  try {
    if (redis) {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } else {
      // For memory cache, delete matching keys
      for (const key of memoryCache.keys()) {
        if (key.includes(pattern.replace('*', ''))) {
          memoryCache.delete(key)
        }
      }
    }
  } catch (error) {
    console.error('Cache pattern delete error:', error)
  }
}

/**
 * Cache wrapper for functions
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  const cached = await getCached<T>(key)
  if (cached !== null) {
    return cached
  }

  const result = await fn()
  await setCached(key, result, ttl)
  return result
}

/**
 * Clean up expired entries from memory cache
 */
if (!redis) {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of memoryCache.entries()) {
      if (value.expiresAt <= now) {
        memoryCache.delete(key)
      }
    }
  }, 60000) // Every minute
}
