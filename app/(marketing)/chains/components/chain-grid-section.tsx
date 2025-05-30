import { chainData } from "../data/chain-data"
import ChainCard from "./chain-card"

export default function ChainGridSection() {
  const liveChains = chainData.filter((chain) => chain.status === "live")
  const upcomingChains = chainData.filter((chain) => chain.status === "soon" || chain.status === "next")

  return (
    <section className="py-16 md:py-20 bg-midnight_navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {liveChains.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-ghost_white mb-3 text-center">
              <span className="text-drip_teal">Live</span> Integrations
            </h2>
            <p className="text-slate-300 text-center mb-10 max-w-xl mx-auto">
              DripPay is fully operational on these networks. Start building today!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {liveChains.map((chain, index) => (
                <ChainCard key={chain.id} chain={chain} animationDelay={`${index * 100}ms`} />
              ))}
            </div>
          </div>
        )}

        {upcomingChains.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-ghost_white mb-3 text-center">
              <span className="text-electric_indigo">Coming Soon</span> & Next Up
            </h2>
            <p className="text-slate-300 text-center mb-10 max-w-xl mx-auto">
              We're actively expanding. Join the waitlist for updates on these upcoming chains.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
