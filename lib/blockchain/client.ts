import { createPublicClient, createWalletClient, http, PublicClient, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { getChainConfig } from './config'

/**
 * Create a public client for reading blockchain data
 */
export function getPublicClient(chainId: number): PublicClient {
  const chainConfig = getChainConfig(chainId)

  if (!chainConfig) {
    throw new Error(`Chain ${chainId} is not supported`)
  }

  return createPublicClient({
    chain: {
      id: chainConfig.id,
      name: chainConfig.name,
      nativeCurrency: chainConfig.nativeCurrency,
      rpcUrls: {
        default: { http: [chainConfig.rpcUrl] },
        public: { http: [chainConfig.rpcUrl] },
      },
      blockExplorers: chainConfig.blockExplorer ? {
        default: { name: 'Explorer', url: chainConfig.blockExplorer },
      } : undefined,
    },
    transport: http(chainConfig.rpcUrl),
  })
}

/**
 * Create a wallet client for writing to blockchain
 */
export function getWalletClient(chainId: number): WalletClient {
  const chainConfig = getChainConfig(chainId)

  if (!chainConfig) {
    throw new Error(`Chain ${chainId} is not supported`)
  }

  if (!process.env.ADMIN_PRIVATE_KEY) {
    throw new Error('ADMIN_PRIVATE_KEY is not set')
  }

  const account = privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY as `0x${string}`)

  return createWalletClient({
    account,
    chain: {
      id: chainConfig.id,
      name: chainConfig.name,
      nativeCurrency: chainConfig.nativeCurrency,
      rpcUrls: {
        default: { http: [chainConfig.rpcUrl] },
        public: { http: [chainConfig.rpcUrl] },
      },
      blockExplorers: chainConfig.blockExplorer ? {
        default: { name: 'Explorer', url: chainConfig.blockExplorer },
      } : undefined,
    },
    transport: http(chainConfig.rpcUrl),
  })
}

/**
 * Get the current block number
 */
export async function getCurrentBlock(chainId: number): Promise<bigint> {
  const client = getPublicClient(chainId)
  return await client.getBlockNumber()
}

/**
 * Verify a wallet signature
 */
export async function verifySignature(
  address: string,
  message: string,
  signature: string
): Promise<boolean> {
  try {
    const { verifyMessage } = await import('viem')

    const valid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    })

    return valid
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}
