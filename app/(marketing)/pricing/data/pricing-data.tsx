import type { LucideIcon } from "lucide-react"
import { Check, X, ShieldCheck, BarChart3, Repeat, Settings2 } from "lucide-react"

// Types
export interface PricingFeature {
  name: string
  free: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}

export interface PricingTier {
  name: string
  monthlyCost: string
  cta: string
  href: string
  highlight?: boolean
  features: Record<string, string | boolean> // Corresponds to PricingFeature 'name'
}

export interface AddOn {
  name: string
  price: string
  availableOn: string
  description?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface OnchainWatchFeature {
  Icon: LucideIcon
  text: string
}

// Data
export const pricingPageFeatures: PricingFeature[] = [
  { name: "Monthly Cost", free: "$0/mo", pro: "$49/mo", enterprise: "Custom" },
  {
    name: "Supported Chains",
    free: "✅ All EVM Chains",
    pro: "✅ All EVM Chains",
    enterprise: "✅ All + early L2 access",
  },
  { name: "Active Subscriptions", free: "Up to 100", pro: "Up to 5,000", enterprise: "Unlimited" },
  { name: "Webhooks / Event Triggers", free: "10/min", pro: "100/min", enterprise: "Unlimited / custom" },
  { name: "Analytics & Usage Logs", free: "❌", pro: "✅ Dashboard View", enterprise: "✅ + Export / API" },
  { name: "Smart Contract Setup", free: "✅ Shared", pro: "✅ Deploy Per App", enterprise: "✅ Custom + Branded" },
  { name: "Hosted Checkout", free: "❌", pro: "✅ Default", enterprise: "✅ Branded + White-labeled" },
  { name: "Support", free: "Community", pro: "Email / Priority", enterprise: "Dedicated Slack + Call Support" },
  { name: "Onchain Watch Alerts", free: "❌", pro: "❌", enterprise: "✅ Realtime alerting on issues" },
  { name: "Security & SLA", free: "❌", pro: "❌", enterprise: "✅ Audit pipeline + 99.9% SLA" },
]

export const pricingTiersData: PricingTier[] = [
  // This is illustrative, the table section will build columns from pricingPageFeatures
  {
    name: "Free",
    monthlyCost: "$0/mo",
    cta: "Start for Free",
    href: "/waitlist", // Assuming waitlist or signup
    features: {
      // This structure is not directly used by the table component as designed, but good for reference
      "Supported Chains": "✅ All EVM Chains",
      "Active Subscriptions": "Up to 100",
      // ... and so on for all features
    },
  },
  {
    name: "Pro",
    monthlyCost: "$49/mo",
    cta: "Get Pro",
    href: "#", // Placeholder for Pro signup
    highlight: true,
    features: {},
  },
  {
    name: "Enterprise",
    monthlyCost: "Custom",
    cta: "Contact Sales",
    href: "mailto:sales@drippay.xyz",
    features: {},
  },
]

export const onchainWatchFeaturesList: OnchainWatchFeature[] = [
  { Icon: ShieldCheck, text: "Critical vulnerabilities" },
  { Icon: BarChart3, text: "Unusual transaction flows" },
  { Icon: Settings2, text: "Upgrade or access control changes" },
  { Icon: Repeat, text: "Sudden spikes in gas or cancellations" },
]

export const addOnsData: AddOn[] = [
  { name: "Extra webhook volume", price: "$10/mo per 100/min", availableOn: "Pro / Enterprise" },
  { name: "Usage log export (CSV/API)", price: "$20/mo", availableOn: "Pro / Enterprise" },
  { name: "Branded checkout setup", price: "$99 one-time", availableOn: "Enterprise" },
  { name: "Custom audit integration", price: "Custom", availableOn: "Enterprise" },
]

export const faqData: FAQItem[] = [
  {
    question: "Can I use any chain on the Free plan?",
    answer: "Yes. DripPay is chain-agnostic and supports all EVM chains on all plans.",
  },
  {
    question: "Do I pay gas separately?",
    answer: "Yes. Users and dApps pay gas directly — DripPay never touches your funds.",
  },
  {
    question: "Can I upgrade or downgrade at any time?",
    answer: "Absolutely. All billing is handled by smart contracts — cancel or change plans with a transaction.",
  },
  {
    question: "What’s Onchain Watch?",
    answer:
      "It’s an alert system that monitors deployed contracts for unusual or risky behavior. Enterprise plans get integrated access.",
  },
]

// Helper for rendering feature values in the table
export const renderFeatureValue = (value: string | boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-drip-teal mx-auto" />
    ) : (
      <X className="h-5 w-5 text-slate-400 mx-auto" />
    )
  }
  if (
    value === "✅ All EVM Chains" ||
    value === "✅ All + early L2 access" ||
    value === "✅ Dashboard View" ||
    value === "✅ + Export / API" ||
    value === "✅ Shared" ||
    value === "✅ Deploy Per App" ||
    value === "✅ Custom + Branded" ||
    value === "✅ Default" ||
    value === "✅ Branded + White-labeled" ||
    value === "✅ Realtime alerting on issues" ||
    value === "✅ Audit pipeline + 99.9% SLA"
  ) {
    return (
      <span className="flex items-center justify-center">
        <Check className="h-5 w-5 text-drip_teal mr-1 flex-shrink-0" /> {value.replace("✅ ", "")}
      </span>
    )
  }
  if (value === "❌") {
    return <X className="h-5 w-5 text-slate-400 mx-auto" />
  }
  return <span className="block text-center">{value}</span>
}
