"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { pricingPageFeatures, renderFeatureValue } from "../data/pricing-data"
import { useState } from "react"
import { motion } from "framer-motion"

const plans = [
  { name: "Free", cta: "Start for Free", href: "/waitlist", highlight: false, cost: "$0/mo" },
  { name: "Pro", cta: "Get Pro", href: "#subscribe-pro", highlight: true, cost: "$49/mo" },
  { name: "Enterprise", cta: "Contact Sales", href: "mailto:sales@drippay.xyz", highlight: false, cost: "Custom" },
]

export default function PricingTableSection() {
  const [isScrollable, setIsScrollable] = useState(false)

  // Check if table is scrollable on mount and window resize
  useState(() => {
    const checkScrollable = () => {
      const tableContainer = document.querySelector(".pricing-table-container")
      if (tableContainer) {
        setIsScrollable(tableContainer.scrollWidth > tableContainer.clientWidth)
      }
    }

    window.addEventListener("resize", checkScrollable)
    // Run once after render
    setTimeout(checkScrollable, 100)

    return () => window.removeEventListener("resize", checkScrollable)
  })

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
          <div className="pricing-table-container overflow-x-auto pb-4 relative">
            {isScrollable && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-ghost_white to-transparent w-12 h-full pointer-events-none z-10"></div>
            )}

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
                    <TableCell className="p-4 text-slate_gray text-center">
                      {renderFeatureValue(feature.free)}
                    </TableCell>
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

          {isScrollable && (
            <p className="text-xs text-slate-500 text-center mt-2 animate-pulse">
              ← Swipe to see all pricing details →
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
