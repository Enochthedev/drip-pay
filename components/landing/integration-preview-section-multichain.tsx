import { Button } from "@/components/ui/button"
import { Code, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"

const codeSnippet = `
import { DripPay } from "@drippay/sdk"; // Fictional SDK

// Initialize DripPay for a specific chain
const dripPay = new DripPay({ chainId: 'swell_chain_id' });

async function createSubscription(userAddress, planId) {
  const tx = await dripPay.subscribe({
    user: userAddress,
    planId: planId,
    // Optional: paymentToken, referralCode, etc.
  });
  return tx.hash;
}
`.trim()

export default function IntegrationPreviewSection() {
  return (
    <section className="py-16 md:py-24 bg-deep_neutral/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-light_neutral">
          Add Billing in <span className="text-accent_primary">Minutes</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-card_neutral p-6 rounded-lg shadow-xl border border-border_neutral">
            <div className="flex items-center text-accent_secondary mb-3">
              <Code className="h-5 w-5 mr-2" />
              <span className="font-mono text-sm">DripPay SDK (TypeScript Example)</span>
            </div>
            <pre className="bg-deep_neutral text-sm text-light_neutral/90 p-4 rounded-md overflow-x-auto max-h-80 font-mono">
              <code>{codeSnippet}</code>
            </pre>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-xl text-light_neutral/80 mb-6 leading-relaxed">
              No oracles. No custodians. Just contracts, tokens, and logic you control. DripPay provides the tools, you
              build the future.
            </p>
            <ul className="space-y-2 mb-8 text-light_neutral/70">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-accent_secondary" />
                Gas-optimized smart contracts.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-accent_secondary" />
                Comprehensive SDKs and APIs.
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-accent_secondary" />
                Webhooks for real-time notifications.
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-accent_primary hover:bg-opacity-85 text-light_neutral font-semibold"
              >
                <Link href="#docs">
                  Explore the Docs <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent_secondary text-accent_secondary hover:bg-accent_secondary hover:text-deep_neutral font-semibold"
              >
                <Link href="#developer-preview">Join Developer Preview</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
