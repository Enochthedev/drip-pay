import { getPublicClient, getWalletClient } from '../client'
import { getChainConfig } from '../config'
import { SUBSCRIPTION_ABI, ERC20_ABI } from './subscription-abi'
import { formatUnits, parseUnits } from 'viem'

export interface OnChainSubscription {
  subscriptionId: bigint
  subscriber: string
  recipient: string
  tokenAddress: string
  amount: bigint
  interval: bigint
  nextPayment: bigint
  isActive: boolean
}

/**
 * Get subscription details from blockchain
 */
export async function getSubscriptionFromChain(
  chainId: number,
  subscriptionId: bigint
): Promise<OnChainSubscription | null> {
  try {
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig?.subscriptionContract) {
      throw new Error(`No subscription contract for chain ${chainId}`)
    }

    const client = getPublicClient(chainId)

    const result = await client.readContract({
      address: chainConfig.subscriptionContract as `0x${string}`,
      abi: SUBSCRIPTION_ABI,
      functionName: 'getSubscription',
      args: [subscriptionId],
    })

    return {
      subscriptionId,
      subscriber: result[0],
      recipient: result[1],
      tokenAddress: result[2],
      amount: result[3],
      interval: result[4],
      nextPayment: result[5],
      isActive: result[6],
    }
  } catch (error) {
    console.error('Error fetching subscription from chain:', error)
    return null
  }
}

/**
 * Get all subscription IDs for a subscriber
 */
export async function getSubscriptionIdsBySubscriber(
  chainId: number,
  subscriberAddress: string
): Promise<bigint[]> {
  try {
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig?.subscriptionContract) {
      throw new Error(`No subscription contract for chain ${chainId}`)
    }

    const client = getPublicClient(chainId)

    const subscriptionIds = await client.readContract({
      address: chainConfig.subscriptionContract as `0x${string}`,
      abi: SUBSCRIPTION_ABI,
      functionName: 'getSubscriptionsBySubscriber',
      args: [subscriberAddress as `0x${string}`],
    })

    return subscriptionIds
  } catch (error) {
    console.error('Error fetching subscriber subscriptions:', error)
    return []
  }
}

/**
 * Get all subscription IDs for a recipient
 */
export async function getSubscriptionIdsByRecipient(
  chainId: number,
  recipientAddress: string
): Promise<bigint[]> {
  try {
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig?.subscriptionContract) {
      throw new Error(`No subscription contract for chain ${chainId}`)
    }

    const client = getPublicClient(chainId)

    const subscriptionIds = await client.readContract({
      address: chainConfig.subscriptionContract as `0x${string}`,
      abi: SUBSCRIPTION_ABI,
      functionName: 'getSubscriptionsByRecipient',
      args: [recipientAddress as `0x${string}`],
    })

    return subscriptionIds
  } catch (error) {
    console.error('Error fetching recipient subscriptions:', error)
    return []
  }
}

/**
 * Get ERC20 token balance
 */
export async function getTokenBalance(
  chainId: number,
  tokenAddress: string,
  walletAddress: string
): Promise<{ balance: bigint; formatted: string; decimals: number }> {
  try {
    const client = getPublicClient(chainId)

    const [balance, decimals] = await Promise.all([
      client.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
      }),
      client.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ])

    return {
      balance,
      formatted: formatUnits(balance, decimals),
      decimals,
    }
  } catch (error) {
    console.error('Error fetching token balance:', error)
    throw error
  }
}

/**
 * Check token allowance for subscription contract
 */
export async function checkTokenAllowance(
  chainId: number,
  tokenAddress: string,
  ownerAddress: string
): Promise<{ allowance: bigint; formatted: string }> {
  try {
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig?.subscriptionContract) {
      throw new Error(`No subscription contract for chain ${chainId}`)
    }

    const client = getPublicClient(chainId)

    const [allowance, decimals] = await Promise.all([
      client.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [
          ownerAddress as `0x${string}`,
          chainConfig.subscriptionContract as `0x${string}`,
        ],
      }),
      client.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ])

    return {
      allowance,
      formatted: formatUnits(allowance, decimals),
    }
  } catch (error) {
    console.error('Error checking token allowance:', error)
    throw error
  }
}

/**
 * Process a subscription payment (backend operation)
 */
export async function processSubscriptionPayment(
  chainId: number,
  subscriptionId: bigint
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const chainConfig = getChainConfig(chainId)
    if (!chainConfig?.subscriptionContract) {
      throw new Error(`No subscription contract for chain ${chainId}`)
    }

    const walletClient = getWalletClient(chainId)

    const hash = await walletClient.writeContract({
      address: chainConfig.subscriptionContract as `0x${string}`,
      abi: SUBSCRIPTION_ABI,
      functionName: 'processPayment',
      args: [subscriptionId],
    })

    return {
      success: true,
      txHash: hash,
    }
  } catch (error: any) {
    console.error('Error processing payment:', error)
    return {
      success: false,
      error: error.message || 'Failed to process payment',
    }
  }
}

/**
 * Get transaction receipt
 */
export async function getTransactionReceipt(chainId: number, txHash: string) {
  try {
    const client = getPublicClient(chainId)
    return await client.getTransactionReceipt({
      hash: txHash as `0x${string}`,
    })
  } catch (error) {
    console.error('Error fetching transaction receipt:', error)
    return null
  }
}
