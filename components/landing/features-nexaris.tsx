import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function FeaturesNexaris() {
  return (
    <section className="py-20 md:py-32 bg-ghost_white text-nex_text_dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nex_deep_navy">
              Evolving beyond traditional systems
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              We address the rising challenges of a cashless society by replacing complex card fees and monopolistic
              practices with secure, blockchain-based solutions.
            </p>
            {/* Placeholder for small floating icons from screenshot 2 */}
            <div className="flex space-x-3 mt-4">
              <span className="p-2 bg-nex_primary_blue/10 rounded-full text-nex_primary_blue text-xs">Blockchain</span>
              <span className="p-2 bg-nex_accent_blue/10 rounded-full text-nex_accent_blue text-xs">Secure</span>
              <span className="p-2 bg-drip_teal/10 rounded-full text-drip_teal text-xs">Low Fees</span>
            </div>
          </div>
          <div className="relative h-64 md:h-80">
            <Image
              src="/placeholder.svg?height=320&width=512"
              alt="Abstract traditional systems vs blockchain"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-slate-700 mb-6">
            Join us and embrace the next generation of payments—powered by crypto and designed for everyone.
          </p>
          <Button
            size="lg"
            className="bg-nex_primary_blue hover:bg-nex_primary_blue/90 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-nex-glow"
          >
            Join waitlist
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative h-64 md:h-80 order-last md:order-first">
            {/* Placeholder for the dark circle with Nexaris logo and UI elements */}
            <Image
              src="/placeholder.svg?height=320&width=512"
              alt="Nexaris disrupting status quo visual"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nex_deep_navy">Disrupting the status quo</h2>
            <p className="text-lg text-slate-700">
              DripPay (inspired by Nexaris) streamlines payments for businesses of all sizes, boosting profitability and
              removing barriers caused by outdated systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
