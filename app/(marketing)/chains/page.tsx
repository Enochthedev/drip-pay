"use client"
import {
  NetworkSwell,
  NetworkEthereum,
  NetworkOptimism,
  NetworkPolygon,
  NetworkBase,
  NetworkArbitrumOne,
} from "@web3icons/react"
import { useState, useEffect } from "react"
import ChainsPageHero from "./components/chains-page-hero"
import ChainGridSection from "./components/chain-grid-section"
import DeveloperFilterSection from "./components/developer-filter-section"
import WhyMultiChainSection from "./components/why-multi-chain-section"
import ChainsPageCTA from "./components/chains-page-cta"

const chainData = [
  {
    id: "swell",
    name: "Swell Chain",
    shortName: "Swell",
    status: "Live",
    IconComponent: NetworkSwell,
    iconColorClass: "text-green-400", // Adjusted for visibility on dark orbs
    orbGradient: "bg-gradient-radial from-drip_teal/70 via-electric_indigo/60 to-drip_teal/70",
    orbBorderColor: "border-drip_teal/80",
    description:
      "DripPay is live on Swell Chain, offering optimized performance for restaking-native payments. Leverage Swell's L2 capabilities for efficient billing.",
    detailsLink: "https://docs.drippay.xyz/chains/swell",
    ctaText: "Explore Swell Integration",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    shortName: "Ethereum",
    status: "Coming Soon",
    IconComponent: NetworkEthereum,
    iconColorClass: "text-blue-400",
    orbGradient: "bg-gradient-radial from-slate-600 via-slate-700 to-slate-600",
    orbBorderColor: "border-slate-500",
    description:
      "Ethereum Mainnet integration is under active development. Soon, bring DripPay's decentralized billing to the largest smart contract ecosystem.",
    detailsLink: "https://docs.drippay.xyz/chains/ethereum",
    ctaText: "Learn about Ethereum Plans",
  },
  {
    id: "arbitrum",
    name: "Arbitrum One",
    shortName: "Arbitrum",
    status: "Coming Soon",
    IconComponent: NetworkArbitrumOne,
    iconColorClass: "text-sky-400",
    orbGradient: "bg-gradient-radial from-slate-600 via-slate-700 to-slate-600",
    orbBorderColor: "border-slate-500",
    description:
      "Support for Arbitrum One is planned, enabling fast and low-cost recurring payments on this leading Layer 2 scaling solution.",
    detailsLink: "https://docs.drippay.xyz/chains/arbitrum",
    ctaText: "Arbitrum Integration Roadmap",
  },
  {
    id: "optimism",
    name: "Optimism",
    shortName: "Optimism",
    status: "Next",
    IconComponent: NetworkOptimism,
    iconColorClass: "text-red-400",
    orbGradient: "bg-gradient-radial from-slate-600 via-slate-700 to-slate-600",
    orbBorderColor: "border-slate-500",
    description:
      "Optimism integration is on our roadmap, extending DripPay's capabilities to another key Ethereum Layer 2 network.",
    detailsLink: "https://docs.drippay.xyz/chains/optimism",
    ctaText: "Optimism Future Scope",
  },
  {
    id: "polygon",
    name: "Polygon PoS",
    shortName: "Polygon",
    status: "Next",
    IconComponent: NetworkPolygon,
    iconColorClass: "text-purple-400",
    orbGradient: "bg-gradient-radial from-slate-600 via-slate-700 to-slate-600",
    orbBorderColor: "border-slate-500",
    description:
      "We are exploring Polygon PoS integration for access to its vibrant ecosystem and scalable infrastructure.",
    detailsLink: "https://docs.drippay.xyz/chains/polygon",
    ctaText: "Polygon Integration Insights",
  },
  {
    id: "base",
    name: "Base",
    shortName: "Base",
    status: "Next",
    IconComponent: NetworkBase,
    iconColorClass: "text-blue-500", // Base's blue
    orbGradient: "bg-gradient-radial from-slate-600 via-slate-700 to-slate-600",
    orbBorderColor: "border-slate-500",
    description:
      "Base integration is being considered to tap into its growing developer community and Coinbase ecosystem.",
    detailsLink: "https://docs.drippay.xyz/chains/base",
    ctaText: "Discover Base Possibilities",
  },
]

export default function SupportedChainsPage() {
  const [hoveredOrbId, setHoveredOrbId] = useState<string | null>(null)
  const [openAccordionItem, setOpenAccordionItem] = useState<string | null>(null)
  const [isPageBlurred, setIsPageBlurred] = useState(false)

  useEffect(() => {
    setIsPageBlurred(!!hoveredOrbId)
  }, [hoveredOrbId])

  return (
    <div className="bg-midnight_navy text-slate_gray">
      {" "}
      {/* Ensures dark background for the entire page */}
      <ChainsPageHero />
      <ChainGridSection />
      <DeveloperFilterSection /> {/* Placeholder for v0.5+ */}
      <WhyMultiChainSection />
      <ChainsPageCTA />
    </div>
  )
}
