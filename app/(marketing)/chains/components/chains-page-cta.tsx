import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Rocket } from "lucide-react"

export default function ChainsPageCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight_navy via-slate-900 to-midnight_navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-ghost_white mb-6">
          Ready to Start Billing On-Chain?
        </h2>
        <p className="text-slate-300 max-w-xl mx-auto mb-10">
          Integrate DripPay and offer seamless crypto subscriptions to your users, starting with Swell and expanding
          across the multi-chain landscape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-drip_teal hover:bg-drip_teal/90 text-midnight_navy font-semibold text-lg px-8 py-3 shadow-[0_4px_14px_0_rgba(0,194,168,0.39)] hover:shadow-[0_6px_20px_0_rgba(0,194,168,0.23)] transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/#launch">
              {" "}
              {/* Assuming /#launch is a valid target on homepage */}
              <Zap className="mr-2 h-5 w-5" /> Launch on Swell
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-lg px-8 py-3 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/waitlist?ref=multichain-preview">
              <Rocket className="mr-2 h-5 w-5" /> Join Multi-Chain Preview
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
