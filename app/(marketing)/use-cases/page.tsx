import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, Briefcase, Edit3, BarChartHorizontalBig, ShoppingBag } from "lucide-react"

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
    <div className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-midnight_navy mb-4">
            Powering the Next Wave of Web3 Applications
          </h1>
          <p className="text-lg md:text-xl text-slate_gray max-w-3xl mx-auto">
            DripPay's flexible on-chain billing protocol enables a wide range of innovative use cases across the
            decentralized web.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-electric_indigo/10">{useCase.icon}</div>
                  <CardTitle className="text-xl font-semibold text-midnight_navy font-grotesk">
                    {useCase.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-slate_gray/90">{useCase.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow mt-auto">
                <p className="text-sm font-medium text-electric_indigo mb-1">Examples:</p>
                <ul className="space-y-1 text-sm text-slate_gray/80 list-disc list-inside">
                  {useCase.examples.map((example) => (
                    <li key={example}>{example}</li>
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
