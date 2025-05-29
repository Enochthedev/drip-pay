import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Code2, ShieldCheck, Settings, BarChart3 } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-10 w-10 text-electric_indigo" />,
    title: "Smart Contract Subscriptions",
    description:
      "Automate recurring crypto payments with robust, auditable on-chain logic. Set custom billing cycles, amounts, and token types with ease.",
    details: ["Fully decentralized payment flows", "Support for various ERC20 tokens", "Gas-optimized contracts"],
  },
  {
    icon: <Globe className="h-10 w-10 text-drip_teal" />,
    title: "Multi-Chain Support",
    description:
      "Launch on Swell Chain today and seamlessly expand to other EVM networks. DripPay is designed for a cross-chain future.",
    details: [
      "Live on Swell Chain",
      "Ethereum, Arbitrum, Optimism, Polygon, Base coming soon",
      "Unified API across chains",
    ],
  },
  {
    icon: <Code2 className="h-10 w-10 text-electric_indigo" />,
    title: "Developer Tools & APIs",
    description:
      "Integrate DripPay effortlessly with our comprehensive SDKs, powerful webhooks for real-time notifications, and detailed GraphQL API for custom queries.",
    details: [
      "JavaScript/TypeScript SDK",
      "Webhook notifications for payment events",
      "GraphQL API for flexible data access",
    ],
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-drip_teal" />,
    title: "Non-Custodial Security",
    description:
      "DripPay never takes custody of your funds. Users approve transactions directly from their wallets, ensuring maximum security and control.",
    details: [
      "User-controlled fund management",
      "Transparent smart contract interactions",
      "Audited and battle-tested architecture",
    ],
  },
  {
    icon: <Settings className="h-10 w-10 text-electric_indigo" />,
    title: "Customizable Billing Logic",
    description:
      "Tailor payment plans to your specific needs. Implement tiered pricing, metered billing, trial periods, and more with our flexible contract parameters.",
    details: [
      "Flexible plan creation",
      "Support for one-time setup fees",
      "Proration and discount capabilities (planned)",
    ],
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-drip_teal" />,
    title: "Analytics & Reporting",
    description:
      "Gain insights into your subscription revenue, active users, and payment trends through our intuitive dashboard or by querying our API.",
    details: ["Real-time revenue tracking", "Subscriber growth metrics", "Exportable transaction history"],
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-midnight_navy mb-4">
            Power Your Web3 Business with <span className="text-electric_indigo">DripPay</span>
          </h1>
          <p className="text-lg md:text-xl text-slate_gray max-w-3xl mx-auto">
            Explore the core functionalities that make DripPay the leading decentralized billing protocol for
            multi-chain applications and developer-first integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="items-center text-center pt-8">
                <div className="p-4 rounded-full bg-electric_indigo/10 mb-4 inline-block">{feature.icon}</div>
                <CardTitle className="text-2xl font-semibold text-midnight_navy font-grotesk">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-slate_gray text-center mb-4 flex-grow">{feature.description}</p>
                <ul className="space-y-1 text-sm text-slate_gray/80">
                  {feature.details?.map((detail) => (
                    <li key={detail} className="flex items-center">
                      <Zap size={14} className="mr-2 text-drip_teal flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
