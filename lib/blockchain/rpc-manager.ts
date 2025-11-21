import { createPublicClient, http, PublicClient, fallback, webSocket } from 'viem'
import { getChainConfig } from './config'

/**
 * RPC Manager with fallback support
 * Automatically switches to backup RPCs on failure
 */

interface RPCEndpoint {
  url: string
  weight?: number
  priority?: number
}

// Fallback RPC configurations per chain
const FALLBACK_RPCS: Record<number, RPCEndpoint[]> = {
  // Swell Chain
  1923: [
    { url: process.env.SWELL_RPC_URL || 'https://swell-mainnet.alt.technology', priority: 1 },
    { url: 'https://rpc.ankr.com/swell', priority: 2 },
  ],

  // Ethereum
  1: [
    { url: process.env.ETHEREUM_RPC_URL || '', priority: 1 },
    { url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, priority: 2 },
    { url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`, priority: 3 },
    { url: 'https://eth.llamarpc.com', priority: 4 },
    { url: 'https://rpc.ankr.com/eth', priority: 5 },
  ],

  // Arbitrum
  42161: [
    { url: process.env.ARBITRUM_RPC_URL || '', priority: 1 },
    { url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, priority: 2 },
    { url: 'https://arb1.arbitrum.io/rpc', priority: 3 },
    { url: 'https://rpc.ankr.com/arbitrum', priority: 4 },
  ],

  // Base
  8453: [
    { url: process.env.BASE_RPC_URL || '', priority: 1 },
    { url: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, priority: 2 },
    { url: 'https://mainnet.base.org', priority: 3 },
    { url: 'https://rpc.ankr.com/base', priority: 4 },
  ],

  // Polygon
  137: [
    { url: process.env.POLYGON_RPC_URL || '', priority: 1 },
    { url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, priority: 2 },
    { url: 'https://polygon-rpc.com', priority: 3 },
    { url: 'https://rpc.ankr.com/polygon', priority: 4 },
  ],

  // Optimism
  10: [
    { url: process.env.OPTIMISM_RPC_URL || '', priority: 1 },
    { url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, priority: 2 },
    { url: 'https://mainnet.optimism.io', priority: 3 },
    { url: 'https://rpc.ankr.com/optimism', priority: 4 },
  ],
}

// Cache for clients
const clientCache = new Map<number, PublicClient>()

/**
 * Get RPC endpoints for a chain
 */
export function getRPCEndpoints(chainId: number): string[] {
  const endpoints = FALLBACK_RPCS[chainId] || []
  return endpoints
    .filter(e => e.url && e.url.length > 0)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99))
    .map(e => e.url)
}

/**
 * Create a public client with fallback RPCs
 */
export function createFallbackClient(chainId: number): PublicClient {
  // Return cached client if exists
  if (clientCache.has(chainId)) {
    return clientCache.get(chainId)!
  }

  const chainConfig = getChainConfig(chainId)
  if (!chainConfig) {
    throw new Error(`Chain ${chainId} is not supported`)
  }

  const endpoints = getRPCEndpoints(chainId)
  if (endpoints.length === 0) {
    throw new Error(`No RPC endpoints configured for chain ${chainId}`)
  }

  // Create fallback transport
  const transports = endpoints.map(url => http(url, {
    timeout: 10000,
    retryCount: 2,
    retryDelay: 1000,
  }))

  const client = createPublicClient({
    chain: {
      id: chainConfig.id,
      name: chainConfig.name,
      nativeCurrency: chainConfig.nativeCurrency,
      rpcUrls: {
        default: { http: endpoints },
        public: { http: endpoints },
      },
      blockExplorers: chainConfig.blockExplorer ? {
        default: { name: 'Explorer', url: chainConfig.blockExplorer },
      } : undefined,
    },
    transport: fallback(transports, {
      rank: true,
      retryCount: 3,
      retryDelay: 1000,
    }),
  })

  clientCache.set(chainId, client)
  return client
}

/**
 * Test RPC endpoint connectivity
 */
export async function testRPCEndpoint(url: string): Promise<{
  success: boolean
  latency?: number
  error?: string
}> {
  const start = Date.now()

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` }
    }

    const data = await response.json()
    if (data.error) {
      return { success: false, error: data.error.message }
    }

    return {
      success: true,
      latency: Date.now() - start,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Connection failed',
    }
  }
}

/**
 * Test all RPC endpoints for a chain and return the fastest working one
 */
export async function findBestRPC(chainId: number): Promise<string | null> {
  const endpoints = getRPCEndpoints(chainId)
  const results = await Promise.all(
    endpoints.map(async (url) => ({
      url,
      result: await testRPCEndpoint(url),
    }))
  )

  const working = results
    .filter(r => r.result.success)
    .sort((a, b) => (a.result.latency || 0) - (b.result.latency || 0))

  return working.length > 0 ? working[0].url : null
}

/**
 * Clear client cache (useful for testing or after RPC issues)
 */
export function clearClientCache(): void {
  clientCache.clear()
}
