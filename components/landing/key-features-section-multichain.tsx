import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, ShieldCheck, Code2 } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent_primary" />,
    title: "On-Chain Subscriptions",
    description: "Program recurring billing with zero third parties. Web3-native and fully autonomous.",
  },
  {
    icon: <Globe className="h-8 w-8 text-accent_secondary" />,
    title: "Multi-Chain from Day One",
    description: "Swell is just the beginning. DripPay is built to support any EVM-compatible network.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent_primary" />,
    title: "Non-Custodial Architecture",
    description: "DripPay never touches your funds — users approve and control every transaction.",
  },
  {
    icon: <Code2 className="h-8 w-8 text-accent_secondary" />,
    title: "Dev-Friendly Integrations",
    description: "Simple SDKs, gas-optimized contracts, webhook and GraphQL APIs.",
  },
]

export default function KeyFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-deep_neutral/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-light_neutral">
          What Makes <span className="text-accent_primary">DripPay</span> Different?
        </h2>
        <p className="text-lg text-light_neutral/70 text-center mb-12 max-w-2xl mx-auto">
          Unlock the power of decentralized billing with features designed for the future of Web3.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-card_neutral border-border_neutral hover:border-accent_primary/70 transition-all duration-300 shadow-xl hover:shadow-glow-primary transform hover:-translate-y-1"
            >
              <CardHeader className="items-center pt-8">
                <div className="p-4 rounded-full bg-deep_neutral mb-4 border border-border_neutral">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-light_neutral text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-light_neutral/80 text-center text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
