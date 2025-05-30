import { Button } from "@/components/ui/button"
import { Wallet, Zap } from "lucide-react"

export default function InteractiveTestPrompt() {
  return (
    <section id="subscribe-pro" className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200">
          <Zap className="h-12 w-12 mx-auto mb-6 text-electric_indigo" />
          <h2 className="text-2xl md:text-3xl font-bold font-grotesk text-midnight_navy mb-4">
            Try It Live — Subscribe to Pro using DripPay
          </h2>
          <p className="text-slate_gray mb-8">
            We use our own protocol to charge you. Transparent, trustless, and always on-chain.
          </p>
          <Button size="lg" className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white group">
            <Wallet className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Subscribe via Wallet
          </Button>
          <p className="text-xs text-slate-400 mt-4">
            (Interactive demo coming soon. Clicking will simulate a wallet connection.)
          </p>
          {/* Placeholder for contract address, chain, modal */}
          <div className="mt-6 text-sm text-slate-500 space-y-1 hidden">
            <p>
              Contract: <span className="font-mono text-xs">0x123...abc</span>
            </p>
            <p>
              Chain: <span className="font-semibold">Swell L2</span>
            </p>
            <p>Action: Confirm subscription in wallet modal...</p>
          </div>
        </div>
      </div>
    </section>
  )
}
