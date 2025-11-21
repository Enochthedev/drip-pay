import { parseGwei, formatGwei } from 'viem'
import { getPublicClient } from './client'
import { getChainConfig } from './config'

/**
 * Gas price management and guards
 * Prevents overpaying during network congestion
 */

// Maximum gas price limits per chain (in gwei)
const MAX_GAS_PRICE: Record<number, bigint> = {
  1: parseGwei('100'),     // Ethereum: 100 gwei max
  1923: parseGwei('10'),   // Swell: 10 gwei max
  42161: parseGwei('1'),   // Arbitrum: 1 gwei max
  8453: parseGwei('0.1'),  // Base: 0.1 gwei max
  137: parseGwei('500'),   // Polygon: 500 gwei max (different scale)
  10: parseGwei('0.1'),    // Optimism: 0.1 gwei max
}

// Gas price alert thresholds (trigger warning but don't block)
const GAS_WARNING_THRESHOLD: Record<number, bigint> = {
  1: parseGwei('50'),
  1923: parseGwei('5'),
  42161: parseGwei('0.5'),
  8453: parseGwei('0.05'),
  137: parseGwei('200'),
  10: parseGwei('0.05'),
}

export interface GasEstimate {
  gasPrice: bigint
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  estimatedCost: bigint
  isHighGas: boolean
  isTooHigh: boolean
  formattedGasPrice: string
}

/**
 * Get current gas price with safety checks
 */
export async function getGasPrice(chainId: number): Promise<GasEstimate> {
  const client = getPublicClient(chainId)

  const gasPrice = await client.getGasPrice()

  const maxGas = MAX_GAS_PRICE[chainId] || parseGwei('100')
  const warningThreshold = GAS_WARNING_THRESHOLD[chainId] || parseGwei('50')

  return {
    gasPrice,
    estimatedCost: gasPrice * BigInt(100000), // Estimate for 100k gas
    isHighGas: gasPrice > warningThreshold,
    isTooHigh: gasPrice > maxGas,
    formattedGasPrice: formatGwei(gasPrice),
  }
}

/**
 * Check if gas price is acceptable for transaction
 */
export async function isGasPriceAcceptable(chainId: number): Promise<{
  acceptable: boolean
  reason?: string
  gasPrice: bigint
}> {
  const estimate = await getGasPrice(chainId)

  if (estimate.isTooHigh) {
    return {
      acceptable: false,
      reason: `Gas price ${estimate.formattedGasPrice} gwei exceeds maximum ${formatGwei(MAX_GAS_PRICE[chainId])} gwei`,
      gasPrice: estimate.gasPrice,
    }
  }

  if (estimate.isHighGas) {
    console.warn(`⚠️ High gas price on chain ${chainId}: ${estimate.formattedGasPrice} gwei`)
  }

  return {
    acceptable: true,
    gasPrice: estimate.gasPrice,
  }
}

/**
 * Wait for acceptable gas price
 * @param chainId Chain ID
 * @param maxWaitMs Maximum time to wait (default 5 minutes)
 * @param checkIntervalMs Check interval (default 30 seconds)
 */
export async function waitForAcceptableGas(
  chainId: number,
  maxWaitMs: number = 5 * 60 * 1000,
  checkIntervalMs: number = 30 * 1000
): Promise<{
  success: boolean
  gasPrice?: bigint
  waited: number
}> {
  const startTime = Date.now()

  while (Date.now() - startTime < maxWaitMs) {
    const check = await isGasPriceAcceptable(chainId)

    if (check.acceptable) {
      return {
        success: true,
        gasPrice: check.gasPrice,
        waited: Date.now() - startTime,
      }
    }

    console.log(`Gas too high, waiting... (${Math.round((Date.now() - startTime) / 1000)}s)`)
    await new Promise(resolve => setTimeout(resolve, checkIntervalMs))
  }

  return {
    success: false,
    waited: Date.now() - startTime,
  }
}

/**
 * Estimate transaction cost
 */
export async function estimateTransactionCost(
  chainId: number,
  gasLimit: bigint
): Promise<{
  cost: bigint
  costInEth: string
  costInUsd?: number
}> {
  const { gasPrice } = await getGasPrice(chainId)
  const cost = gasPrice * gasLimit

  // Convert to readable format
  const costInEth = Number(cost) / 1e18

  return {
    cost,
    costInEth: costInEth.toFixed(6),
    // TODO: Add USD conversion using price oracle
  }
}

/**
 * Get optimal gas settings for transaction
 */
export async function getOptimalGasSettings(chainId: number): Promise<{
  gasPrice?: bigint
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
}> {
  const client = getPublicClient(chainId)

  try {
    // Try EIP-1559 first
    const block = await client.getBlock()
    const baseFee = block.baseFeePerGas

    if (baseFee) {
      // EIP-1559 supported
      const priorityFee = parseGwei('1') // 1 gwei priority

      return {
        maxFeePerGas: baseFee * BigInt(2) + priorityFee,
        maxPriorityFeePerGas: priorityFee,
      }
    }
  } catch (error) {
    // EIP-1559 not supported, fallback to legacy
  }

  // Legacy gas pricing
  const gasPrice = await client.getGasPrice()
  return { gasPrice }
}

/**
 * Get gas price history for analysis
 */
export async function getGasPriceHistory(
  chainId: number,
  blocks: number = 10
): Promise<{
  average: bigint
  min: bigint
  max: bigint
  current: bigint
}> {
  const client = getPublicClient(chainId)

  const currentBlock = await client.getBlockNumber()
  const prices: bigint[] = []

  for (let i = 0; i < blocks; i++) {
    try {
      const block = await client.getBlock({ blockNumber: currentBlock - BigInt(i) })
      if (block.baseFeePerGas) {
        prices.push(block.baseFeePerGas)
      }
    } catch (error) {
      break
    }
  }

  if (prices.length === 0) {
    const current = await client.getGasPrice()
    return { average: current, min: current, max: current, current }
  }

  const sum = prices.reduce((a, b) => a + b, BigInt(0))
  const average = sum / BigInt(prices.length)
  const min = prices.reduce((a, b) => (a < b ? a : b))
  const max = prices.reduce((a, b) => (a > b ? a : b))

  return {
    average,
    min,
    max,
    current: prices[0],
  }
}
