import { chainData } from "../data/chain-data"
import ChainCard from "./chain-card"

export default function ChainGridSection() {
  const liveChains = chainData.filter((chain) => chain.status === "live")
  const upcomingChains = chainData.filter((chain) => chain.status === "soon" || chain.status === "next")

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-midnight_navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {liveChains.length > 0 && (
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-bold text-ghost_white mb-2 sm:mb-3 text-center">
              <span className="text-drip_teal">Live</span> Integrations
            </h2>
            <p className="text-slate-300 text-center mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base">
              DripPay is fully operational on these networks. Start building today!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {liveChains.map((chain, index) => (
                <ChainCard key={chain.id} chain={chain} animationDelay={`${index * 100}ms`} />
              ))}
            </div>
          </div>
        )}

        {upcomingChains.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-bold text-ghost_white mb-2 sm:mb-3 text-center">
              <span className="text-electric_indigo">Coming Soon</span> & Next Up
            </h2>
            <p className="text-slate-300 text-center mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base">
              We're actively expanding. Join the waitlist for updates on these upcoming chains.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {upcomingChains.map((chain, index) => (
                <ChainCard key={chain.id} chain={chain} animationDelay={`${(liveChains.length + index) * 100}ms`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
