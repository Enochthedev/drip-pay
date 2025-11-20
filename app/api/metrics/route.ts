import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

/**
 * GET /api/metrics
 * System metrics for monitoring
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)

    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get various metrics
    const [
      totalUsers,
      totalPlans,
      totalSubscriptions,
      activeSubscriptions,
      totalPayments,
      totalPaymentsAmount,
      recentPayments,
      failedPayments,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.subscriptionPlan.count({ where: { isActive: true } }),
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: 'active' } }),
      prisma.payment.count(),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'completed' },
      }),
      prisma.payment.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
          status: 'completed',
        },
      }),
      prisma.payment.count({
        where: {
          status: 'failed',
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ])

    // Get sync status for each chain
    const syncStatus = await prisma.blockchainSync.findMany()

    return NextResponse.json({
      users: {
        total: totalUsers,
      },
      plans: {
        total: totalPlans,
      },
      subscriptions: {
        total: totalSubscriptions,
        active: activeSubscriptions,
        inactive: totalSubscriptions - activeSubscriptions,
      },
      payments: {
        total: totalPayments,
        last24h: recentPayments,
        failed24h: failedPayments,
        totalVolume: totalPaymentsAmount._sum.amount || '0',
      },
      blockchain: {
        chains: syncStatus.map((sync) => ({
          chainId: sync.chainId,
          lastBlock: sync.lastSyncedBlock,
          status: sync.syncStatus,
          lastSync: sync.lastSyncedAt,
        })),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Metrics error:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}
