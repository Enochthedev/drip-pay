import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

/**
 * GET /api/plans/:id
 * Get a specific subscription plan
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id },
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
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Get plan error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plan' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/plans/:id
 * Update a subscription plan
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

    // Check if user owns this plan
    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { id },
    })

    if (!existingPlan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    if (existingPlan.creatorId !== auth.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const plan = await prisma.subscriptionPlan.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        isActive: body.isActive,
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

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Update plan error:', error)
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/plans/:id
 * Deactivate a subscription plan
 */
export async function DELETE(
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

    // Check if user owns this plan
    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { id },
    })

    if (!existingPlan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    if (existingPlan.creatorId !== auth.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Soft delete by setting isActive to false
    const plan = await prisma.subscriptionPlan.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Delete plan error:', error)
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    )
  }
}
