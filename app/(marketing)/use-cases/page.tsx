import { Users, Package, Briefcase, Edit3, BarChartHorizontalBig, ShoppingBag } from "lucide-react"
import UseCasesHero from "./components/use-cases-hero"
import CategoryGridSection from "./components/category-grid-section"
import CaseStudySpotlight from "./components/case-study-spotlight"
import UseCasesCTA from "./components/use-cases-cta"

const useCases = [
  {
    icon: <Users className="h-8 w-8 text-electric_indigo" />,
    title: "DAOs & Communities",
    description:
      "Automate member contributions, manage tiered access, and fund treasuries with recurring on-chain payments.",
    examples: ["Membership fees", "Treasury funding", "Tooling subscriptions"],
  },
  {
    icon: <Package className="h-8 w-8 text-drip_teal" />,
    title: "NFT Platforms",
    description:
      "Offer subscription-based access to exclusive content, communities, or utility tied to NFTs. Enable auto-renewing passes.",
    examples: ["Alpha group access", "NFT-gated content", "Renewable utility NFTs"],
  },
  {
    icon: <Briefcase className="h-8 w-8 text-electric_indigo" />,
    title: "SaaS & Web3 Services",
    description:
      "Implement true on-chain subscription models for your software, APIs, or other digital services. Bill users directly in crypto.",
    examples: ["Analytics platforms", "Developer toolkits", "Decentralized storage"],
  },
  {
    icon: <Edit3 className="h-8 w-8 text-drip_teal" />,
    title: "Freelancers & Creators",
    description:
      "Set up recurring billing for clients or accept ongoing support from your audience with crypto subscriptions.",
    examples: ["Monthly retainers", "Patreon-style memberships", "Exclusive content tiers"],
  },
  {
    icon: <BarChartHorizontalBig className="h-8 w-8 text-electric_indigo" />,
    title: "Restaking & DeFi Protocols",
    description:
      "Monetize value-added services like automated restaking, yield optimization, or portfolio management tools via on-chain subscriptions.",
    examples: ["Restaking-as-a-Service fees", "Strategy vault subscriptions", "Premium analytics access"],
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-drip_teal" />,
    title: "E-commerce & Marketplaces",
    description:
      "Offer subscription boxes, recurring digital product deliveries, or premium marketplace memberships paid in crypto.",
    examples: ["Subscription boxes", "Digital product subscriptions", "Premium marketplace features"],
  },
]

export default function UseCasesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <UseCasesHero />
      <CategoryGridSection />
      <CaseStudySpotlight />
      <UseCasesCTA />
    </div>
  )
}
