import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

/**
 * GET /api/subscriptions/:id
 * Get a specific subscription
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        plan: {
          include: {
            creator: {
              select: {
                id: true,
                address: true,
              },
            },
          },
        },
        subscriber: {
          select: {
            id: true,
            address: true,
          },
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        events: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 20,
        },
      },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Check if user has access to this subscription
    if (
      subscription.subscriberId !== auth.userId &&
      subscription.plan.creatorId !== auth.userId
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/subscriptions/:id
 * Update subscription status (pause, resume, cancel)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(request)

    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { action, txHash } = body // action: 'pause', 'resume', 'cancel'

    // Get the subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id },
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Check if user is the subscriber
    if (existingSubscription.subscriberId !== auth.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    let newStatus = existingSubscription.status
    let eventType = ''

    switch (action) {
      case 'pause':
        newStatus = 'paused'
        eventType = 'paused'
        break
      case 'resume':
        newStatus = 'active'
        eventType = 'resumed'
        break
      case 'cancel':
        newStatus = 'cancelled'
        eventType = 'cancelled'
        break
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update subscription
    const subscription = await prisma.subscription.update({
      where: { id },
      data: {
        status: newStatus,
        endDate: action === 'cancel' ? new Date() : undefined,
      },
      include: {
        plan: {
          include: {
            creator: {
              select: {
                id: true,
                address: true,
              },
            },
          },
        },
      },
    })

    // Create event
    await prisma.subscriptionEvent.create({
      data: {
        subscriptionId: subscription.id,
        eventType,
        txHash,
        chainId: subscription.chainId,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Update subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    )
  }
}
