import { Chain } from 'viem'

export interface ChainConfig {
  id: number
  name: string
  rpcUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorer?: string
  subscriptionContract?: string
  supportedTokens: {
    symbol: string
    address: string
    decimals: number
  }[]
}

// Swell Chain Configuration
export const swellChain: ChainConfig = {
  id: 1923,
  name: 'Swell',
  rpcUrl: process.env.SWELL_RPC_URL || 'https://swell-mainnet.alt.technology',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://explorer.swell.network',
  subscriptionContract: process.env.SWELL_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0x...', // Add actual USDC address on Swell
      decimals: 6,
    },
    {
      symbol: 'USDT',
      address: '0x...', // Add actual USDT address on Swell
      decimals: 6,
    },
  ],
}

// Ethereum Configuration
export const ethereumChain: ChainConfig = {
  id: 1,
  name: 'Ethereum',
  rpcUrl: process.env.ETHEREUM_RPC_URL || '',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://etherscan.io',
  subscriptionContract: process.env.ETHEREUM_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
    },
    {
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
    },
  ],
}

// Arbitrum Configuration
export const arbitrumChain: ChainConfig = {
  id: 42161,
  name: 'Arbitrum One',
  rpcUrl: process.env.ARBITRUM_RPC_URL || '',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://arbiscan.io',
  subscriptionContract: process.env.ARBITRUM_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      decimals: 6,
    },
    {
      symbol: 'USDT',
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimals: 6,
    },
  ],
}

// Base Configuration
export const baseChain: ChainConfig = {
  id: 8453,
  name: 'Base',
  rpcUrl: process.env.BASE_RPC_URL || '',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://basescan.org',
  subscriptionContract: process.env.BASE_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      decimals: 6,
    },
  ],
}

// Polygon Configuration
export const polygonChain: ChainConfig = {
  id: 137,
  name: 'Polygon PoS',
  rpcUrl: process.env.POLYGON_RPC_URL || '',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorer: 'https://polygonscan.com',
  subscriptionContract: process.env.POLYGON_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      decimals: 6,
    },
    {
      symbol: 'USDT',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
    },
  ],
}

// Optimism Configuration
export const optimismChain: ChainConfig = {
  id: 10,
  name: 'Optimism',
  rpcUrl: process.env.OPTIMISM_RPC_URL || '',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://optimistic.etherscan.io',
  subscriptionContract: process.env.OPTIMISM_SUBSCRIPTION_CONTRACT,
  supportedTokens: [
    {
      symbol: 'USDC',
      address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      decimals: 6,
    },
    {
      symbol: 'USDT',
      address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      decimals: 6,
    },
  ],
}

// Map of all supported chains
export const SUPPORTED_CHAINS: Record<number, ChainConfig> = {
  [swellChain.id]: swellChain,
  [ethereumChain.id]: ethereumChain,
  [arbitrumChain.id]: arbitrumChain,
  [baseChain.id]: baseChain,
  [polygonChain.id]: polygonChain,
  [optimismChain.id]: optimismChain,
}

export function getChainConfig(chainId: number): ChainConfig | undefined {
  return SUPPORTED_CHAINS[chainId]
}

export function isChainSupported(chainId: number): boolean {
  return chainId in SUPPORTED_CHAINS
}
