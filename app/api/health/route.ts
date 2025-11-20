import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getPublicClient } from '@/lib/blockchain/client'
import { SUPPORTED_CHAINS } from '@/lib/blockchain/config'

/**
 * GET /api/health
 * Health check endpoint for monitoring
 */
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    checks: {} as Record<string, any>,
  }

  try {
    // Check database connectivity
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    checks.checks.database = {
      status: 'healthy',
      latency: Date.now() - dbStart,
    }
  } catch (error: any) {
    checks.status = 'unhealthy'
    checks.checks.database = {
      status: 'unhealthy',
      error: error.message,
    }
  }

  // Check blockchain RPC connectivity
  const blockchainChecks: Record<number, any> = {}

  for (const [chainIdStr, chainConfig] of Object.entries(SUPPORTED_CHAINS)) {
    const chainId = parseInt(chainIdStr)

    try {
      if (!chainConfig.rpcUrl) {
        blockchainChecks[chainId] = {
          status: 'not_configured',
          name: chainConfig.name,
        }
        continue
      }

      const client = getPublicClient(chainId)
      const blockNumber = await client.getBlockNumber()

      blockchainChecks[chainId] = {
        status: 'healthy',
        name: chainConfig.name,
        blockNumber: Number(blockNumber),
      }
    } catch (error: any) {
      checks.status = 'degraded'
      blockchainChecks[chainId] = {
        status: 'unhealthy',
        name: chainConfig.name,
        error: error.message,
      }
    }
  }

  checks.checks.blockchain = blockchainChecks

  // Return appropriate status code
  const statusCode = checks.status === 'healthy' ? 200 : checks.status === 'degraded' ? 200 : 503

  return NextResponse.json(checks, { status: statusCode })
}
