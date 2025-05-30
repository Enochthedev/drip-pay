"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

// Define pricing plans
const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started with on-chain billing",
    price: "$0",
    period: "forever",
    cta: "Start for Free",
    href: "/waitlist",
    highlight: false,
    features: [
      { name: "All EVM Chains", included: true },
      { name: "Up to 100 Active Subscriptions", included: true },
      { name: "10/min Webhooks", included: true },
      { name: "Shared Smart Contract", included: true },
      { name: "Analytics Dashboard", included: false },
      { name: "Hosted Checkout", included: false },
      { name: "Priority Support", included: false },
      { name: "Onchain Watch Alerts", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For growing projects with more billing needs",
    price: "$49",
    period: "per month",
    cta: "Get Pro",
    href: "#subscribe-pro",
    highlight: true,
    badge: "Popular",
    features: [
      { name: "All EVM Chains", included: true },
      { name: "Up to 5,000 Active Subscriptions", included: true },
      { name: "100/min Webhooks", included: true },
      { name: "Deploy Per App", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Hosted Checkout", included: true },
      { name: "Priority Support", included: true },
      { name: "Onchain Watch Alerts", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large-scale applications",
    price: "Custom",
    period: "pricing",
    cta: "Contact Sales",
    href: "mailto:sales@drippay.xyz",
    highlight: false,
    features: [
      { name: "All EVM Chains + Early L2 Access", included: true },
      { name: "Unlimited Active Subscriptions", included: true },
      { name: "Unlimited Webhooks", included: true },
      { name: "Custom + Branded Contracts", included: true },
      { name: "Analytics Dashboard + API", included: true },
      { name: "White-labeled Checkout", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Onchain Watch Alerts", included: true },
    ],
  },
]

// Define feature categories for the dropdown
const featureCategories = [
  {
    name: "Core Features",
    features: ["All EVM Chains", "Active Subscriptions", "Webhooks", "Smart Contract Setup"],
  },
  {
    name: "Analytics & UI",
    features: ["Analytics Dashboard", "Hosted Checkout"],
  },
  {
    name: "Support & Security",
    features: ["Priority Support", "Onchain Watch Alerts"],
  },
]

export default function PricingCardsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Core Features")
  const [isHoveredPlan, setIsHoveredPlan] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  // Check if a feature belongs to a category
  const isFeatureInCategory = (feature: string, category: string) => {
    const cat = featureCategories.find((c) => c.name === category)
    if (!cat) return false

    return cat.features.some((f) => feature.includes(f))
  }

  // Get features for a specific category
  const getCategoryFeatures = (plan: any, category: string) => {
    return plan.features.filter((f) => isFeatureInCategory(f.name, category))
  }

  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setIsHoveredPlan(plan.name)}
                onHoverEnd={() => setIsHoveredPlan(null)}
                className="relative"
              >
                {/* Ripple effect on hover */}
                <AnimatePresence>
                  {isHoveredPlan === plan.name && (
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-electric_indigo/5 to-drip_teal/5 rounded-xl z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <div
                  className={`relative z-10 h-full flex flex-col rounded-xl overflow-hidden border ${
                    plan.highlight
                      ? "border-electric_indigo shadow-lg shadow-electric_indigo/10"
                      : "border-slate-200 shadow-md"
                  }`}
                >
                  {/* Card header */}
                  <div
                    className={`p-6 ${
                      plan.highlight ? "bg-gradient-to-br from-electric_indigo/10 to-drip_teal/5" : "bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold font-grotesk text-midnight_navy">{plan.name}</h3>
                      {plan.badge && <Badge className="bg-electric_indigo text-white">{plan.badge}</Badge>}
                    </div>
                    <p className="text-slate_gray mt-2 text-sm">{plan.description}</p>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold text-midnight_navy">{plan.price}</span>
                      <span className="text-slate_gray ml-1">{plan.period}</span>
                    </div>
                    <Button
                      asChild
                      className={`w-full ${
                        plan.highlight
                          ? "bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white"
                          : "bg-midnight_navy hover:bg-midnight_navy/90 text-ghost_white"
                      }`}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </div>

                  {/* Features section */}
                  <div className="flex-grow bg-white p-6 border-t border-slate-100">
                    <h4 className="font-medium text-midnight_navy mb-4">Included features:</h4>

                    {/* Feature categories with dropdowns */}
                    <div className="space-y-4">
                      {featureCategories.map((category) => (
                        <div key={category.name} className="border-b border-slate-100 pb-2">
                          <button
                            onClick={() => toggleCategory(category.name)}
                            className="w-full flex justify-between items-center py-2 text-left font-medium text-slate_gray hover:text-electric_indigo transition-colors"
                          >
                            {category.name}
                            {expandedCategory === category.name ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedCategory === category.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-2 py-2">
                                  {getCategoryFeatures(plan, category.name).map((feature, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="flex items-center text-sm"
                                    >
                                      {feature.included ? (
                                        <Check className="h-4 w-4 text-drip_teal mr-2 flex-shrink-0" />
                                      ) : (
                                        <X className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                                      )}
                                      <span className={feature.included ? "text-slate_gray" : "text-slate-400"}>
                                        {feature.name}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated drip effect at bottom for highlighted plan */}
                {plan.highlight && (
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                    <motion.div
                      className="w-2 h-8 bg-electric_indigo rounded-b-full"
                      animate={{
                        y: [0, 10, 0],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Additional info */}
          <motion.div
            className="text-center mt-12 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>
              All plans include access to the DripPay protocol. Prices shown are for reference and will be finalized at
              launch.
            </p>
            <p className="mt-2">
              Need a custom solution?{" "}
              <Link href="mailto:sales@drippay.xyz" className="text-electric_indigo hover:underline">
                Contact our sales team
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
