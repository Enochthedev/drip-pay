import type React from "react"
import {
  NetworkSwell,
  NetworkEthereum,
  NetworkArbitrumOne,
  NetworkOptimism,
  NetworkPolygon,
  NetworkBase,
} from "@web3icons/react"
// import { HelpCircle } from 'lucide-react'; // Example placeholder for unlisted icons

export interface ChainFeature {
  id: string
  name: string
  supported: boolean
}

export interface Chain {
  id: string
  name: string
  shortName?: string
  IconComponent: React.ElementType
  iconColorClass?: string
  status: "live" | "soon" | "next"
  statusMessage: string
  timeline?: string
  docsLink?: string
  waitlistLink?: string
  features?: ChainFeature[]
  themeColorClass?: string // e.g., 'drip_teal', 'electric_indigo' for accents
  glowClass?: string // For hero visual
}

export const chainData: Chain[] = [
  {
    id: "swell",
    name: "Swell Chain",
    shortName: "Swell",
    IconComponent: NetworkSwell,
    iconColorClass: "text-green-400", // Swell's typical color
    status: "live",
    statusMessage: "Billing is fully active and verified on Mainnet.",
    docsLink: "https://docs.drippay.xyz/chains/swell",
    themeColorClass: "drip_teal",
    glowClass: "glow-swell", // For hero visual
    features: [
      { id: "stablecoins", name: "Supports Stablecoins", supported: true },
      { id: "gas_abstraction", name: "Gas Abstraction", supported: false },
      { id: "nft_subscription", name: "NFT Subscription Support", supported: true },
      { id: "mainnet", name: "Mainnet", supported: true },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    shortName: "Ethereum",
    IconComponent: NetworkEthereum,
    iconColorClass: "text-slate-400", // Ethereum's icon is often multi-color or single dark
    status: "soon",
    statusMessage: "Multi-chain rollout in progress. Ethereum support is a top priority.",
    timeline: "Q4 2025",
    waitlistLink: "/waitlist?chain=ethereum",
    glowClass: "glow-ethereum", // For hero visual
    features: [
      { id: "stablecoins", name: "Supports Stablecoins", supported: true },
      { id: "nft_subscription", name: "NFT Subscription Support", supported: true },
      { id: "mainnet", name: "Mainnet", supported: true },
    ],
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    shortName: "Arbitrum",
    IconComponent: NetworkArbitrumOne,
    iconColorClass: "text-blue-400", // Arbitrum's blue
    status: "soon",
    statusMessage: "Integration planned to leverage Arbitrum's speed and low fees.",
    timeline: "Q1 2026",
    waitlistLink: "/waitlist?chain=arbitrum",
    glowClass: "glow-arbitrum", // For hero visual
  },
  {
    id: "optimism",
    name: "Optimism",
    shortName: "Optimism",
    IconComponent: NetworkOptimism,
    iconColorClass: "text-red-500", // Optimism's red
    status: "next",
    statusMessage: "Exploring integration with the Optimism ecosystem.",
    timeline: "Roadmap 2026",
    waitlistLink: "/waitlist?chain=optimism",
  },
  {
    id: "polygon",
    name: "Polygon PoS",
    shortName: "Polygon",
    IconComponent: NetworkPolygon,
    iconColorClass: "text-purple-400", // Polygon's purple
    status: "next",
    statusMessage: "Evaluating Polygon PoS for its vibrant community and scalability.",
    timeline: "Roadmap 2026",
    waitlistLink: "/waitlist?chain=polygon",
  },
  {
    id: "base",
    name: "Base",
    shortName: "Base",
    IconComponent: NetworkBase,
    iconColorClass: "text-blue-500", // Base's blue
    status: "next",
    statusMessage: "Considering Base for its growing developer community and Coinbase ties.",
    timeline: "Roadmap 2026",
    waitlistLink: "/waitlist?chain=base",
  },
]

// For Developer Filter placeholder
export const allPossibleFeatures: Omit<ChainFeature, "supported">[] = [
  { id: "stablecoins", name: "Supports Stablecoins" },
  { id: "gas_abstraction", name: "Gas Abstraction" },
  { id: "nft_subscription", name: "NFT Subscription Support" },
  { id: "mainnet", name: "Mainnet Available" },
  { id: "testnet", name: "Testnet Available" },
]
