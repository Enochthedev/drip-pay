"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqData } from "../data/pricing-data"
import { HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function PricingFaq() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (!faqData || faqData.length === 0) {
    return null
  }

  const handleAccordionChange = (value: string) => {
    setExpandedItem(expandedItem === value ? null : value)
  }

  return (
    <section className="py-16 md:py-24 bg-ghost_white relative overflow-hidden">
      {/* Floating droplets */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-electric_indigo/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-electric_indigo" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-midnight_navy mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={expandedItem || ""}
            onValueChange={handleAccordionChange}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-slate-200">
                  <AccordionTrigger className="py-6 text-lg font-semibold text-midnight_navy/90 hover:text-electric_indigo text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-slate_gray text-base">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: expandedItem === `item-${index}` ? 1 : 0,
                        y: expandedItem === `item-${index}` ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
