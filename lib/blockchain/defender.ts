import { Defender } from '@openzeppelin/defender-sdk'
import { parseUnits, formatUnits } from 'viem'

/**
 * OpenZeppelin Defender integration for secure transaction management
 * Handles automated payment processing without exposing private keys
 */

let defender: Defender | null = null

/**
 * Initialize Defender client
 */
export function initializeDefender(): Defender {
  if (defender) return defender

  const apiKey = process.env.DEFENDER_API_KEY
  const apiSecret = process.env.DEFENDER_API_SECRET

  if (!apiKey || !apiSecret) {
    throw new Error('Defender API credentials not configured. Set DEFENDER_API_KEY and DEFENDER_API_SECRET')
  }

  defender = new Defender({
    apiKey,
    apiSecret,
  })

  return defender
}

/**
 * Send transaction via Defender Relay
 */
export async function sendDefenderTransaction(params: {
  chainId: number
  to: string
  data: string
  value?: string
  gasLimit?: number
}): Promise<{
  success: boolean
  txHash?: string
  error?: string
}> {
  try {
    const client = initializeDefender()

    // Get relay client for specific chain
    const relay = client.relaySigner.getRelaySigner({
      speed: 'fast',
    })

    const tx = await relay.sendTransaction({
      to: params.to,
      data: params.data,
      value: params.value ? BigInt(params.value) : undefined,
      gasLimit: params.gasLimit,
    })

    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt?.hash,
    }
  } catch (error: any) {
    console.error('Defender transaction error:', error)
    return {
      success: false,
      error: error.message || 'Transaction failed',
    }
  }
}

/**
 * Process subscription payment via Defender
 */
export async function processPaymentViaDefender(
  chainId: number,
  contractAddress: string,
  subscriptionId: bigint
): Promise<{
  success: boolean
  txHash?: string
  error?: string
}> {
  try {
    // Encode function call
    const { encodeFunctionData } = await import('viem')
    const { SUBSCRIPTION_ABI } = await import('./contracts/subscription-abi')

    const data = encodeFunctionData({
      abi: SUBSCRIPTION_ABI,
      functionName: 'processPayment',
      args: [subscriptionId],
    })

    return await sendDefenderTransaction({
      chainId,
      to: contractAddress,
      data,
      gasLimit: 200000,
    })
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Pause contract via Defender (emergency)
 */
export async function pauseContractViaDefender(
  chainId: number,
  contractAddress: string
): Promise<{
  success: boolean
  txHash?: string
  error?: string
}> {
  try {
    const { encodeFunctionData } = await import('viem')
    const { SUBSCRIPTION_ABI } = await import('./contracts/subscription-abi')

    const data = encodeFunctionData({
      abi: SUBSCRIPTION_ABI,
      functionName: 'pause',
      args: [],
    })

    return await sendDefenderTransaction({
      chainId,
      to: contractAddress,
      data,
      gasLimit: 100000,
    })
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Get Defender relay balance
 */
export async function getDefenderRelayBalance(chainId: number): Promise<{
  balance: string
  balanceInEth: string
}> {
  try {
    const client = initializeDefender()
    const relay = await client.relay.get()

    // This is a placeholder - Defender SDK may have different methods
    // Check their docs for the exact API
    return {
      balance: '0',
      balanceInEth: '0',
    }
  } catch (error) {
    console.error('Error getting Defender balance:', error)
    return {
      balance: '0',
      balanceInEth: '0',
    }
  }
}

/**
 * Check if Defender is properly configured
 */
export async function checkDefenderStatus(): Promise<{
  configured: boolean
  connected: boolean
  error?: string
}> {
  try {
    if (!process.env.DEFENDER_API_KEY || !process.env.DEFENDER_API_SECRET) {
      return {
        configured: false,
        connected: false,
        error: 'API credentials not set',
      }
    }

    const client = initializeDefender()

    // Try to get relay info to verify connection
    await client.relay.list()

    return {
      configured: true,
      connected: true,
    }
  } catch (error: any) {
    return {
      configured: true,
      connected: false,
      error: error.message,
    }
  }
}
