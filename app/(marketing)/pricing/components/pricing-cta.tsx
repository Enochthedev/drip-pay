import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Rocket, BookOpen, MessageSquare } from "lucide-react"

export default function PricingCta() {
  return (
    <section className="py-16 md:py-24 bg-midnight_navy text-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Rocket className="h-16 w-16 mx-auto mb-6 text-drip_teal" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk mb-6">
          Start Billing On-Chain in Minutes — <span className="text-drip_teal">for Free.</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Join the growing ecosystem of Web3 builders using DripPay for seamless, decentralized recurring payments.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-drip_teal hover:bg-drip_teal/90 text-midnight_navy font-semibold">
            <Link href="/waitlist">
              {" "}
              {/* Assuming waitlist or signup */}
              <Rocket className="h-5 w-5 mr-2" />
              Start for Free
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo"
          >
            <Link href="/docs">
              {" "}
              {/* Placeholder for docs link */}
              <BookOpen className="h-5 w-5 mr-2" />
              See Developer Docs
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-700/50 hover:text-ghost_white"
          >
            <Link href="#subscribe-pro">
              {" "}
              {/* Link to interactive prompt section */}
              {/* Using a different icon for variety, or could be Zap/Wallet */}
              <MessageSquare className="h-5 w-5 mr-2" />
              Try a Live Subscription
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
