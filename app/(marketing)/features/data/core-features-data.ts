import { Repeat, Globe, Lock, Settings2, BarChart3, Bell } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface CoreFeature {
  icon: LucideIcon
  title: string
  description: string
}

export const coreFeaturesData: CoreFeature[] = [
  {
    icon: Repeat,
    title: "Recurring Payments, On-Chain",
    description: "Program billing cycles using smart contracts. Daily, weekly, monthly — all on-chain.",
  },
  {
    icon: Globe,
    title: "Multi-Chain Native",
    description: "Use DripPay on any EVM chain. Start with Swell, expand to Ethereum, Arbitrum, Base, and beyond.",
  },
  {
    icon: Lock,
    title: "Non-Custodial by Default",
    description: "We never hold user funds. You keep control, always.",
  },
  {
    icon: Settings2,
    title: "Developer-First Stack",
    description: "Simple APIs, CLI tools, and SDKs. Build fast and trust the logic.",
  },
  {
    icon: BarChart3,
    title: "Built-in Analytics",
    description: "Track payment history, subscription health, and user activity — in real-time.",
  },
  {
    icon: Bell,
    title: "Event Hooks & Webhooks",
    description: "Trigger backend logic when a subscription is renewed, canceled, or fails.",
  },
]
