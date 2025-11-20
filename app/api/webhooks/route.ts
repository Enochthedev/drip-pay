import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import crypto from 'crypto'

/**
 * GET /api/webhooks
 * Get webhooks for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const webhooks = await prisma.webhook.findMany({
      where: { userId: auth.userId },
      select: {
        id: true,
        url: true,
        events: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ webhooks })
  } catch (error) {
    console.error('Get webhooks error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch webhooks' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/webhooks
 * Create a new webhook
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { url, events } = body

    if (!url || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'URL and events array are required' },
        { status: 400 }
      )
    }

    // Validate events
    const validEvents = [
      'subscription.created',
      'subscription.cancelled',
      'subscription.paused',
      'subscription.resumed',
      'payment.succeeded',
      'payment.failed',
    ]

    const invalidEvents = events.filter(e => !validEvents.includes(e))
    if (invalidEvents.length > 0) {
      return NextResponse.json(
        { error: `Invalid events: ${invalidEvents.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate webhook secret
    const secret = crypto.randomBytes(32).toString('hex')

    const webhook = await prisma.webhook.create({
      data: {
        userId: auth.userId,
        url,
        events,
        secret,
        isActive: true,
      },
      select: {
        id: true,
        url: true,
        events: true,
        secret: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ webhook }, { status: 201 })
  } catch (error) {
    console.error('Create webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to create webhook' },
      { status: 500 }
    )
  }
}
