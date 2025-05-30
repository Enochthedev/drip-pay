"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { pricingPageFeatures, renderFeatureValue } from "../data/pricing-data" // Assuming pricingTiersData is not needed here directly for columns
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const plans = [
  { name: "Free", cta: "Start for Free", href: "/waitlist", highlight: false, cost: "$0/mo" },
  { name: "Pro", cta: "Get Pro", href: "#subscribe-pro", highlight: true, cost: "$49/mo" }, // Link to interactive prompt
  { name: "Enterprise", cta: "Contact Sales", href: "mailto:sales@drippay.xyz", highlight: false, cost: "Custom" },
]

export default function PricingTableSection() {
  const [expandedFeatures, setExpandedFeatures] = useState<boolean>(false)

  // Show only first 5 features by default on mobile
  const visibleFeatures = expandedFeatures ? pricingPageFeatures : pricingPageFeatures.slice(0, 5)

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop version - hidden on mobile */}
        <div className="hidden md:block max-w-5xl mx-auto overflow-x-auto">
          <Table className="min-w-[800px] border border-slate-200 rounded-lg shadow-lg">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[250px] p-4 text-left text-sm font-semibold text-midnight_navy sticky left-0 bg-slate-50 z-10">
                  Feature
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.name}
                    className={`p-4 text-center text-sm font-semibold ${plan.highlight ? "text-electric_indigo" : "text-midnight_navy"}`}
                  >
                    {plan.name}
                    <span className="block text-xs font-normal text-slate_gray">{plan.cost}</span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingPageFeatures.map((feature, idx) => (
                <TableRow key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <TableCell className="p-4 font-medium text-midnight_navy/90 sticky left-0 bg-inherit z-10">
                    {feature.name}
                  </TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">{renderFeatureValue(feature.free)}</TableCell>
                  <TableCell
                    className={`p-4 text-slate_gray text-center ${plans[1].highlight ? "bg-electric_indigo/5" : ""}`}
                  >
                    {renderFeatureValue(feature.pro)}
                  </TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-slate-100">
                <TableCell className="p-4 sticky left-0 bg-slate-100 z-10"></TableCell>
                {plans.map((plan) => (
                  <TableCell
                    key={plan.name}
                    className={`p-4 text-center ${plan.highlight ? "bg-electric_indigo/10" : ""}`}
                  >
                    <Button
                      asChild
                      className={`w-full max-w-[150px] mx-auto ${plan.highlight ? "bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white" : "bg-midnight_navy hover:bg-midnight_navy/90 text-ghost_white"}`}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Mobile version - cards for each plan */}
        <div className="md:hidden space-y-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg border ${plan.highlight ? "border-electric_indigo" : "border-slate-200"} overflow-hidden`}
            >
              <div className={`p-4 ${plan.highlight ? "bg-electric_indigo/10" : "bg-slate-50"}`}>
                <h3 className={`text-xl font-bold ${plan.highlight ? "text-electric_indigo" : "text-midnight_navy"}`}>
                  {plan.name}
                </h3>
                <p className="text-slate_gray font-medium mt-1">{plan.cost}</p>
              </div>

              <div className="p-4 bg-white">
                <ul className="space-y-3">
                  {visibleFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-slate_gray">{feature.name}</span>
                      <span>
                        {plan.name === "Free" && renderFeatureValue(feature.free)}
                        {plan.name === "Pro" && renderFeatureValue(feature.pro)}
                        {plan.name === "Enterprise" && renderFeatureValue(feature.enterprise)}
                      </span>
                    </li>
                  ))}
                </ul>

                {pricingPageFeatures.length > 5 && (
                  <button
                    onClick={() => setExpandedFeatures(!expandedFeatures)}
                    className="w-full mt-4 text-sm text-electric_indigo flex items-center justify-center"
                  >
                    {expandedFeatures ? (
                      <>
                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <Button
                  asChild
                  className={`w-full ${plan.highlight ? "bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white" : "bg-midnight_navy hover:bg-midnight_navy/90 text-ghost_white"}`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
