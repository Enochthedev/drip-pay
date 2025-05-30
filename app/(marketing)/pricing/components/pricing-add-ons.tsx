"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addOnsData } from "../data/pricing-data"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingAddOns() {
  if (!addOnsData || addOnsData.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="addOnsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 194, 168, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#addOnsGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-midnight_navy mb-4">Optional Add-Ons</h2>
          <p className="text-lg text-slate_gray">Enhance your DripPay experience with these powerful additions.</p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Table className="min-w-[600px] border border-slate-200 rounded-lg shadow-lg bg-white">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="p-4 text-left text-sm font-semibold text-midnight_navy">Add-On</TableHead>
                <TableHead className="p-4 text-center text-sm font-semibold text-midnight_navy">Price</TableHead>
                <TableHead className="p-4 text-center text-sm font-semibold text-midnight_navy">Available On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addOnsData.map((addOn, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    backgroundColor: "rgba(90, 72, 242, 0.05)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <TableCell className="p-4 font-medium text-midnight_navy/90">
                    <div className="flex items-center">
                      <motion.div whileHover={{ rotate: 90, scale: 1.2 }} transition={{ duration: 0.2 }}>
                        <PlusCircle className="h-5 w-5 mr-2 text-drip_teal flex-shrink-0" />
                      </motion.div>
                      {addOn.name}
                    </div>
                    {addOn.description && <p className="text-xs text-slate-500 mt-1 ml-7">{addOn.description}</p>}
                  </TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">{addOn.price}</TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">{addOn.availableOn}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </section>
  )
}
