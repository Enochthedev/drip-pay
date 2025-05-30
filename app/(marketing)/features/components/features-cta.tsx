import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquareText, FileText } from "lucide-react"

export default function FeaturesCTA() {
  return (
    <section className="py-16 md:py-24 bg-midnight_navy text-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-grotesk mb-8">
          Get Started with On-Chain Billing <span className="text-electric_indigo">in Minutes</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Integrate DripPay today and unlock the power of decentralized recurring payments for your Web3 project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold"
          >
            <Link href="/waitlist">
              Start Billing
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-ghost_white text-ghost_white hover:bg-ghost_white/10 font-semibold"
          >
            <Link href="/docs">
              <FileText className="mr-2 h-5 w-5" />
              Read the Docs
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-drip_teal text-drip_teal hover:bg-drip_teal/10 font-semibold"
          >
            <Link href="#developer-chat">
              {" "}
              {/* Replace with actual link */}
              <MessageSquareText className="mr-2 h-5 w-5" />
              Join Developer Chat
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
