import { Zap, Globe, BarChart3, Settings2 } from "lucide-react"

const benefits = [
  {
    icon: <Globe className="w-7 h-7 text-electric_indigo mb-3" />,
    title: "Reach More Users",
    description: "Support DAOs, dApps, and creators wherever they are, on their preferred networks.",
  },
  {
    icon: <Zap className="w-7 h-7 text-drip_teal mb-3" />,
    title: "Optimize UX & Fees",
    description: "Choose chains that offer the best transaction speeds and cost-effectiveness for your users.",
  },
  {
    icon: <Settings2 className="w-7 h-7 text-electric_indigo mb-3" />,
    title: "Enhanced Composability",
    description: "Expand your billing logic with cross-chain access and tap into diverse DeFi ecosystems.",
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-drip_teal mb-3" />,
    title: "Future-Proof Your dApp",
    description: "Build with flexibility, ensuring your application can adapt to the evolving blockchain landscape.",
  },
]

export default function WhyMultiChainSection() {
  return (
    <section className="py-16 md:py-20 bg-midnight_navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-ghost_white mb-12 text-center">
          Why <span className="text-electric_indigo">Multi-Chain</span> Matters for Billing
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center transition-all duration-300 hover:border-electric_indigo/50 hover:shadow-lg hover:bg-slate-800"
            >
              {benefit.icon}
              <h3 className="text-xl font-grotesk font-semibold text-ghost_white mb-2">{benefit.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
