import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

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

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col ${tier.highlight ? "border-electric_indigo shadow-xl ring-2 ring-electric_indigo" : "border-slate-200 shadow-lg"}`}
            >
              <CardHeader className="pb-4">
                <CardTitle
                  className={`text-2xl font-bold font-grotesk ${tier.highlight ? "text-electric_indigo" : "text-midnight_navy"}`}
                >
                  {tier.name}
                </CardTitle>
                <div className="flex items-baseline gap-1 pt-2">
                  <span
                    className={`text-4xl font-extrabold ${tier.highlight ? "text-electric_indigo" : "text-midnight_navy"}`}
                  >
                    {tier.price}
                  </span>
                  {tier.priceSuffix && <span className="text-sm font-medium text-slate_gray">{tier.priceSuffix}</span>}
                </div>
                <CardDescription className="pt-1 text-slate_gray/90 min-h-[40px]">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle
                        className={`h-5 w-5 mr-2 flex-shrink-0 ${tier.highlight ? "text-electric_indigo" : "text-drip_teal"}`}
                      />
                      <span className="text-slate_gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  asChild
                  size="lg"
                  className={`w-full ${tier.highlight ? "bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white" : "bg-midnight_navy hover:bg-midnight_navy/90 text-ghost_white"}`}
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center text-slate_gray mt-12">
          Need something different?{" "}
          <Link href="mailto:custom@drippay.xyz" className="text-electric_indigo hover:underline font-medium">
            Contact us
          </Link>{" "}
          for custom solutions.
        </p>
      </div>
    </div>
  )
}
