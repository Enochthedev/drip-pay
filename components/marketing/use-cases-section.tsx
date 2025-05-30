import { CheckCircle } from "lucide-react"

const useCases = [
  "Restaking-as-a-Service monetization",
  "SaaS solutions for DAOs and Web3 communities",
  "Renewable NFT utility passes & memberships",
  "Token-gated content and community access",
  "Automated streaming payments for services",
  "Decentralized creator subscription platforms",
]

export default function UseCasesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slate-50">
      {" "}
      {/* Slightly different bg for separation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-midnight_navy">
          What Can You Build with <span className="text-electric_indigo">DripPay</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-6 max-w-4xl mx-auto">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-drip_teal flex-shrink-0 mt-0.5 sm:mt-1" />
              <p className="text-slate_gray text-base sm:text-lg font-sans">{useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
