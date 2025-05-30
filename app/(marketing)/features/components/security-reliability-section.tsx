import { Lock, ShieldCheck, Box, Users } from "lucide-react" // Added CheckCircle for Audits

const securityPoints = [
  {
    icon: Lock,
    title: "Immutable Smart Contract Logic",
    description: "Core billing logic is deployed on-chain, ensuring transparency and tamper-resistance.",
  },
  {
    icon: ShieldCheck, // Using ShieldCheck for audits
    title: "Security Audited",
    description: "Our smart contracts are undergoing rigorous security audits by leading firms. (Badge coming soon)",
  },
  {
    icon: Box,
    title: "Transparent Open-Source Stack",
    description: "Key components of DripPay are open-source, allowing for community review and contributions.",
  },
  {
    icon: Users,
    title: "Community-Informed Roadmap",
    description: "We actively seek community feedback to guide the future development and decentralization of DripPay.",
  },
]

export default function SecurityReliabilitySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_navy font-grotesk">
            Secure & Reliable <span className="text-electric_indigo">By Design</span>
          </h2>
          <p className="text-lg text-slate_gray mt-4 max-w-2xl mx-auto">
            Trust and transparency are at the core of DripPay's architecture.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {securityPoints.map((point) => (
            <div key={point.title} className="flex items-start space-x-4 p-6 bg-ghost_white/50 rounded-lg shadow-sm">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 rounded-full bg-drip_teal/10 inline-block">
                  <point.icon className="h-7 w-7 text-drip_teal" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-midnight_navy font-grotesk mb-1">{point.title}</h3>
                <p className="text-slate_gray">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Placeholder for Audit Badge - you can replace this with an actual image/component */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-slate-200 px-4 py-2 rounded-lg text-sm text-slate_gray">
            <ShieldCheck className="inline-block mr-2 h-5 w-5 text-green-600" />
            Audit Report by [AuditFirmName] - Q3 2025 (Placeholder)
          </div>
        </div>
      </div>
    </section>
  )
}
