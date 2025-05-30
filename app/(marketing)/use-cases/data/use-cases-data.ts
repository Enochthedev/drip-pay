import { Landmark, Palette, Code, Repeat, type LucideIcon } from "lucide-react"

export interface UseCaseItem {
  useCase: string
  description: string
}

export interface UseCaseCategory {
  id: string
  icon: LucideIcon
  title: string
  useCases: UseCaseItem[]
}

export const useCasesData: UseCaseCategory[] = [
  {
    id: "daos",
    icon: Landmark,
    title: "For DAOs",
    useCases: [
      {
        useCase: "Member Subscriptions",
        description: "Automate monthly dues from contributors or voters.",
      },
      {
        useCase: "Tool Access Fees",
        description: "Charge for dashboards, bots, analytics.",
      },
      {
        useCase: "Protocol Upgrades",
        description: "Gate advanced functionality behind recurring fees.",
      },
    ],
  },
  {
    id: "creators",
    icon: Palette,
    title: "For Creators & Communities",
    useCases: [
      {
        useCase: "Token-Gated Discords",
        description: "Use NFTs or tokens to manage monthly/quarterly access.",
      },
      {
        useCase: "Premium Content",
        description: "DripPay for newsletters, audio, video drops.",
      },
      {
        useCase: "Ongoing Donations",
        description: "Set up Patreon-style recurring donations in crypto.",
      },
    ],
  },
  {
    id: "developers",
    icon: Code,
    title: "For Developers & SaaS Projects",
    useCases: [
      {
        useCase: "Crypto SaaS Billing",
        description: "Bill users automatically for tool usage.",
      },
      {
        useCase: "API Usage Tiers",
        description: "Offer usage-based plans with stablecoin subscriptions.",
      },
      {
        useCase: "Plugin/Extension Billing",
        description: "Paid add-ons in the Web3 ecosystem.",
      },
    ],
  },
  {
    id: "restaking",
    icon: Repeat,
    title: "For Restaking & Yield Services",
    useCases: [
      {
        useCase: "Restaking-as-a-Service",
        description: "Let users pay recurring fees to auto-compound their yield.",
      },
      {
        useCase: "Yield-Gated Access",
        description: "Require payment from yield for tiered app access.",
      },
    ],
  },
]
