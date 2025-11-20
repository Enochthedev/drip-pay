import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

/**
 * GET /api/subscriptions
 * Get subscriptions (for current user or as creator)
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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'subscriber' or 'creator'
    const status = searchParams.get('status')

    const where: any = {}

    if (type === 'subscriber') {
      where.subscriberId = auth.userId
    } else if (type === 'creator') {
      where.plan = {
        creatorId: auth.userId,
      }
    } else {
      // Default: get both subscriptions where user is subscriber
      where.subscriberId = auth.userId
    }

    if (status) {
      where.status = status
    }

    const subscriptions = await prisma.subscription.findMany({
      where,
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
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ subscriptions })
  } catch (error) {
    console.error('Get subscriptions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/subscriptions
 * Create a new subscription
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
    const { planId, txHash, subscriptionId: onChainSubId } = body

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // Get the plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    if (!plan.isActive) {
      return NextResponse.json(
        { error: 'Plan is not active' },
        { status: 400 }
      )
    }

    // Calculate next billing date based on interval
    const now = new Date()
    let nextBillingDate = new Date()

    switch (plan.interval) {
      case 'daily':
        nextBillingDate.setDate(now.getDate() + 1)
        break
      case 'weekly':
        nextBillingDate.setDate(now.getDate() + 7)
        break
      case 'monthly':
        nextBillingDate.setMonth(now.getMonth() + 1)
        break
      case 'yearly':
        nextBillingDate.setFullYear(now.getFullYear() + 1)
        break
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        planId,
        subscriberId: auth.userId,
        status: 'active',
        startDate: now,
        nextBillingDate,
        chainId: plan.chainId,
        subscriptionId: onChainSubId,
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

    // Create subscription event
    await prisma.subscriptionEvent.create({
      data: {
        subscriptionId: subscription.id,
        eventType: 'created',
        txHash,
        chainId: plan.chainId,
      },
    })

    // If there's a transaction, create initial payment record
    if (txHash) {
      await prisma.payment.create({
        data: {
          subscriptionId: subscription.id,
          userId: auth.userId,
          amount: plan.price,
          currency: plan.currency,
          status: 'completed',
          txHash,
          chainId: plan.chainId,
          tokenAddress: plan.tokenAddress,
          fromAddress: auth.address,
          toAddress: plan.tokenAddress, // This should be the recipient address
        },
      })
    }

    return NextResponse.json({ subscription }, { status: 201 })
  } catch (error) {
    console.error('Create subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}
