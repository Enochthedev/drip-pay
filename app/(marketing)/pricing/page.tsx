import PricingHero from "./components/pricing-hero"
import PricingTableSection from "./components/pricing-table-section"
import OnchainWatchIntegration from "./components/onchain-watch-integration"
import InteractiveTestPrompt from "./components/interactive-test-prompt"
import PricingAddOns from "./components/pricing-add-ons"
import PricingFaq from "./components/pricing-faq"
import PricingCta from "./components/pricing-cta"

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <div className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-midnight_navy mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-slate_gray max-w-2xl mx-auto">
              Choose the DripPay plan that fits your project. No hidden fees, just powerful on-chain billing.
              <br />
              <span className="text-sm text-slate_gray/80">
                (Note: Pricing details will be finalized closer to full launch.)
              </span>
            </p>
          </div>

          <PricingTableSection />

          <OnchainWatchIntegration />
          <InteractiveTestPrompt />
          <PricingAddOns />
          <PricingFaq />
          <PricingCta />
        </div>
      </div>
    </>
  )
}
