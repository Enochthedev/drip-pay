import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Repeat, Layers, ShieldCheck, Globe2 } from "lucide-react"

const features = [
  {
    icon: <Repeat className="h-8 w-8 text-electric_indigo" />,
    title: "Smart Subscriptions",
    description: "Automate recurring billing with full on-chain logic.",
  },
  {
    icon: <Layers className="h-8 w-8 text-drip_teal" />, // Swell icon was here, using Layers for "Built on Swell"
    title: "Built on Swell",
    description: "Optimized for restaking-native payments and incentives.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-electric_indigo" />,
    title: "Non-Custodial & Secure",
    description: "No middlemen. You stay in control of your assets.",
  },
  {
    icon: <Globe2 className="h-8 w-8 text-drip_teal" />,
    title: "Chain-Agnostic by Design",
    description: "Launching on Swell, expanding to all EVM chains soon.",
  },
]

export default function WhyDripPaySection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-midnight_navy">
          Why <span className="text-electric_indigo">DripPay</span>?
        </h2>
        <p className="text-lg text-slate_gray/80 text-center mb-12 max-w-2xl mx-auto">
          Discover the core advantages of using DripPay for your decentralized billing needs.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-slate-200 hover:border-electric_indigo/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <CardHeader className="items-center pt-8">
                <div className="p-4 rounded-full bg-electric_indigo/10 mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-midnight_navy text-center font-grotesk">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-slate_gray text-center font-sans">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
