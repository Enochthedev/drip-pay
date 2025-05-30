import PricingHero from "./components/pricing-hero"
import PricingTableSection from "./components/pricing-table-section"
import OnchainWatchIntegration from "./components/onchain-watch-integration"
import InteractiveTestPrompt from "./components/interactive-test-prompt"
import PricingAddOns from "./components/pricing-add-ons"
import PricingFaq from "./components/pricing-faq"
import PricingCta from "./components/pricing-cta"

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    priceSuffix: "",
    description: "Ideal for startups, individual developers, and exploring DripPay.",
    features: ["Up to 100 active subscriptions", "Basic analytics", "Swell Chain support", "Community support"],
    cta: "Get Started",
    href: "/waitlist",
    highlight: false,
  },
  {
    name: "Pro",
    price: "Contact Us", // "$49",
    priceSuffix: "", // "/month"
    description: "For growing businesses requiring advanced features and higher limits.",
    features: [
      "Up to 1,000 active subscriptions",
      "Advanced analytics & reporting",
      "Multi-chain support (as available)",
      "Webhook integrations",
      "Priority support",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@drippay.xyz",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSuffix: "",
    description: "Tailored solutions for large-scale operations and specific needs.",
    features: [
      "Unlimited subscriptions",
      "Custom chain integrations",
      "Dedicated account manager",
      "Premium support & SLAs",
      "Volume discounts",
    ],
    cta: "Talk to Us",
    href: "mailto:enterprise@drippay.xyz",
    highlight: false,
  },
]

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

          <PricingTableSection pricingTiers={pricingTiers} />

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
