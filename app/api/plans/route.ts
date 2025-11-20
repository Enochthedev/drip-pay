import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'
import { isChainSupported } from '@/lib/blockchain/config'

/**
 * GET /api/plans
 * Get all subscription plans (optionally filter by creator)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get('creatorId')
    const chainId = searchParams.get('chainId')

    const where: any = { isActive: true }

    if (creatorId) {
      where.creatorId = creatorId
    }

    if (chainId) {
      where.chainId = parseInt(chainId)
    }

    const plans = await prisma.subscriptionPlan.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            address: true,
          },
        },
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Get plans error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/plans
 * Create a new subscription plan
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
    const {
      name,
      description,
      price,
      currency,
      interval,
      chainId,
      tokenAddress,
    } = body

    // Validate required fields
    if (!name || !price || !currency || !interval || !chainId || !tokenAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate chain support
    if (!isChainSupported(chainId)) {
      return NextResponse.json(
        { error: 'Chain not supported' },
        { status: 400 }
      )
    }

    // Validate interval
    const validIntervals = ['daily', 'weekly', 'monthly', 'yearly']
    if (!validIntervals.includes(interval)) {
      return NextResponse.json(
        { error: 'Invalid interval' },
        { status: 400 }
      )
    }

    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        description,
        price: price.toString(),
        currency,
        interval,
        chainId,
        tokenAddress,
        creatorId: auth.userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            address: true,
          },
        },
      },
    })

    return NextResponse.json({ plan }, { status: 201 })
  } catch (error) {
    console.error('Create plan error:', error)
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    )
  }
}
