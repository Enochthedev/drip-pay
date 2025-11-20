import { Ratelimit } from '@upstash/ratelimit'
import Redis from 'ioredis'
import { env } from './env'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Rate limiting to prevent abuse
 * Uses Upstash Redis or falls back to in-memory store
 */

let ratelimit: Ratelimit | null = null

// Initialize rate limiter with Upstash if available
if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    // Use Upstash Redis REST API
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv() as any,
      limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
      analytics: true,
    })
  } catch (error) {
    console.error('Failed to initialize Upstash rate limiter:', error)
  }
}

// In-memory rate limiter fallback
const requestCounts = new Map<string, { count: number; resetAt: number }>()

function inMemoryRateLimit(identifier: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || record.resetAt <= now) {
    requestCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

/**
 * Check rate limit for a request
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 10
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  if (ratelimit) {
    try {
      const result = await ratelimit.limit(identifier)
      return {
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
      }
    } catch (error) {
      console.error('Rate limit check error:', error)
      return { success: true } // Fail open
    }
  }

  // Fallback to in-memory
  const success = inMemoryRateLimit(identifier, limit, windowSeconds * 1000)
  return { success }
}

/**
 * Rate limit middleware for API routes
 */
export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<Response>,
  options: {
    limit?: number
    window?: number
    identifier?: string
  } = {}
): Promise<Response> {
  const {
    limit = 10,
    window = 10,
    identifier = getIpAddress(request) || 'anonymous',
  } = options

  const result = await checkRateLimit(identifier, limit, window)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: result.reset ? Math.ceil((result.reset - Date.now()) / 1000) : window,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': (result.remaining || 0).toString(),
          'X-RateLimit-Reset': (result.reset || Date.now() + window * 1000).toString(),
          'Retry-After': (result.reset ? Math.ceil((result.reset - Date.now()) / 1000) : window).toString(),
        },
      }
    )
  }

  return handler()
}

/**
 * Get IP address from request
 */
function getIpAddress(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (real) {
    return real
  }

  return null
}

/**
 * Authenticated user rate limiter (higher limits)
 */
export async function withAuthRateLimit(
  request: NextRequest,
  userId: string,
  handler: () => Promise<Response>
): Promise<Response> {
  return withRateLimit(request, handler, {
    limit: 100, // 100 requests per minute for authenticated users
    window: 60,
    identifier: `user:${userId}`,
  })
}

// Clean up in-memory rate limit records every 5 minutes
if (!ratelimit) {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of requestCounts.entries()) {
      if (value.resetAt <= now) {
        requestCounts.delete(key)
      }
    }
  }, 300000)
}
