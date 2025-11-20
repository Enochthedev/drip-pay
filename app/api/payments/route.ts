import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

/**
 * GET /api/payments
 * Get payment history for the current user
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
    const subscriptionId = searchParams.get('subscriptionId')
    const status = searchParams.get('status')

    const where: any = { userId: auth.userId }

    if (subscriptionId) {
      where.subscriptionId = subscriptionId
    }

    if (status) {
      where.status = status
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        subscription: {
          include: {
            plan: {
              select: {
                name: true,
                currency: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/payments
 * Record a new payment (typically called after blockchain transaction)
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
      subscriptionId,
      txHash,
      amount,
      currency,
      tokenAddress,
      toAddress,
      chainId,
      blockNumber,
    } = body

    // Validate required fields
    if (!subscriptionId || !txHash || !amount || !currency || !tokenAddress || !chainId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify subscription exists and user owns it
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    if (subscription.subscriberId !== auth.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Check if payment with this txHash already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { txHash },
    })

    if (existingPayment) {
      return NextResponse.json(
        { error: 'Payment already recorded' },
        { status: 409 }
      )
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        subscriptionId,
        userId: auth.userId,
        amount: amount.toString(),
        currency,
        status: 'completed',
        txHash,
        blockNumber,
        chainId,
        tokenAddress,
        fromAddress: auth.address,
        toAddress: toAddress || tokenAddress,
      },
    })

    // Update subscription last payment date and reset failed payments
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        lastPaymentDate: new Date(),
        failedPayments: 0,
      },
    })

    return NextResponse.json({ payment }, { status: 201 })
  } catch (error) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    )
  }
}
