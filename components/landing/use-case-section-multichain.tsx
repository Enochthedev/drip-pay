import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, RefreshCw, Briefcase, Lock, Palette } from "lucide-react"

const useCases = [
  {
    icon: <Package className="h-7 w-7 text-accent_primary" />,
    title: "Subscription NFTs",
    description: "Sell NFT passes that auto-renew access monthly or annually.",
  },
  {
    icon: <Users className="h-7 w-7 text-accent_secondary" />,
    title: "DAO Tools & Services",
    description: "Charge DAOs for dashboards, alerts, or automation tools.",
  },
  {
    icon: <RefreshCw className="h-7 w-7 text-accent_primary" />,
    title: "Restaking-as-a-Service",
    description: "Let users pay for compounding rewards via recurring fees.",
  },
  {
    icon: <Briefcase className="h-7 w-7 text-accent_secondary" />,
    title: "Crypto SaaS Products",
    description: "Replace manual invoices with instant, on-chain billing.",
  },
  {
    icon: <Lock className="h-7 w-7 text-accent_primary" />,
    title: "Token-Gated Access",
    description: "Manage subscriptions for Telegram/Discord premium tiers.",
  },
  {
    icon: <Palette className="h-7 w-7 text-accent_secondary" />,
    title: "Creator Monetization",
    description: "Accept recurring donations or content subscription payments.",
  },
]

export default function UseCaseSection() {
  return (
    <section className="py-16 md:py-24 bg-deep_neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-light_neutral">
          Built for <span className="text-accent_primary">Web3 Builders</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="bg-card_neutral border-border_neutral hover:border-accent_secondary/70 transition-colors duration-300 flex flex-col"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                <div className="p-3 rounded-lg bg-deep_neutral border border-border_neutral">{useCase.icon}</div>
                <CardTitle className="text-lg font-semibold text-light_neutral">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-light_neutral/70 text-sm">{useCase.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
