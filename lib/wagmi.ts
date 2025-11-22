import { http, createConfig } from 'wagmi'
import { mainnet, base, polygon, optimism, arbitrum, sepolia, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

// Custom chain definition for Swell
export const swell = {
  id: 1923,
  name: 'Swell',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_SWELL_RPC_URL || 'https://swell-mainnet.alt.technology'] },
    public: { http: ['https://swell-mainnet.alt.technology'] },
  },
  blockExplorers: {
    default: { name: 'Swell Explorer', url: 'https://explorer.swell.network' },
  },
  contracts: {
    subscriptionContract: {
      address: process.env.NEXT_PUBLIC_SWELL_SUBSCRIPTION_CONTRACT as `0x${string}`,
    },
  },
} as const

// Custom chain definition for Swell Testnet
export const swellTestnet = {
  id: 1923, // Update with actual testnet chain ID when available
  name: 'Swell Testnet',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://swell-testnet.alt.technology'] },
    public: { http: ['https://swell-testnet.alt.technology'] },
  },
  blockExplorers: {
    default: { name: 'Swell Testnet Explorer', url: 'https://testnet-explorer.swell.network' },
  },
  testnet: true,
} as const

// Determine if we're in testnet mode
const isTestnet = process.env.NEXT_PUBLIC_NETWORK_MODE === 'testnet'

// Select chains based on environment
const chains = isTestnet
  ? [sepolia, baseSepolia, swellTestnet] as const
  : [mainnet, base, swell, polygon, optimism, arbitrum] as const

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) {
  console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not work.')
}

// Create wagmi config
export const config = createConfig({
  chains,
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'DripPay',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://drippay.io',
      },
    }),
    walletConnect({
      projectId,
      metadata: {
        name: 'DripPay',
        description: 'Crypto-native subscription billing platform',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://drippay.io',
        icons: ['https://drippay.io/logo.png'],
      },
    }),
    coinbaseWallet({
      appName: 'DripPay',
      appLogoUrl: 'https://drippay.io/logo.png',
    }),
  ],
  transports: {
    // Mainnet transports
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ||
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [base.id]: http(
      process.env.NEXT_PUBLIC_BASE_RPC_URL ||
        `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [swell.id]: http(process.env.NEXT_PUBLIC_SWELL_RPC_URL || 'https://swell-mainnet.alt.technology'),
    [polygon.id]: http(
      process.env.NEXT_PUBLIC_POLYGON_RPC_URL ||
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [optimism.id]: http(
      process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL ||
        `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [arbitrum.id]: http(
      process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL ||
        `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    // Testnet transports
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ||
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [baseSepolia.id]: http(
      process.env.NEXT_PUBLIC_BASE_RPC_URL ||
        `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
    [swellTestnet.id]: http('https://swell-testnet.alt.technology'),
  },
})

// Export chain metadata for contract addresses
export const chainConfig = {
  [mainnet.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_ETHEREUM_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as `0x${string}`,
    },
  },
  [base.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_BASE_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}`,
      USDT: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2' as `0x${string}`,
    },
  },
  [swell.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_SWELL_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x...' as `0x${string}`, // Update with actual Swell USDC address
      USDT: '0x...' as `0x${string}`, // Update with actual Swell USDT address
    },
  },
  [polygon.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_POLYGON_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as `0x${string}`,
      USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as `0x${string}`,
    },
  },
  [optimism.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_OPTIMISM_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85' as `0x${string}`,
      USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58' as `0x${string}`,
    },
  },
  [arbitrum.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_ARBITRUM_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' as `0x${string}`,
      USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9' as `0x${string}`,
    },
  },
  [sepolia.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_ETHEREUM_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x...' as `0x${string}`, // Mock USDC on Sepolia
      USDT: '0x...' as `0x${string}`, // Mock USDT on Sepolia
    },
  },
  [baseSepolia.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_BASE_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x...' as `0x${string}`, // Mock USDC on Base Sepolia
      USDT: '0x...' as `0x${string}`, // Mock USDT on Base Sepolia
    },
  },
  [swellTestnet.id]: {
    subscriptionContract: process.env.NEXT_PUBLIC_SWELL_SUBSCRIPTION_CONTRACT as `0x${string}`,
    tokens: {
      USDC: '0x...' as `0x${string}`, // Mock USDC on Swell Testnet
      USDT: '0x...' as `0x${string}`, // Mock USDT on Swell Testnet
    },
  },
} as const

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
