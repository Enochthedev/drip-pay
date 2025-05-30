"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useCasePreviewsData } from "../data/use-case-previews-data"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function BuiltForUseCasesSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="useCasesGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="rgba(90, 72, 242, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#useCasesGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_navy font-grotesk mb-4">
            Built For <span className="text-electric_indigo">Your Use Case</span>
          </h2>
          <p className="text-lg text-slate_gray max-w-2xl mx-auto">
            DripPay is flexible enough to power a wide range of on-chain billing scenarios across the Web3 ecosystem.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {useCasePreviewsData.map((useCase, index) => (
            <motion.div
              key={useCase.category}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="bg-white border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col text-center h-full relative overflow-hidden">
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-electric_indigo/5 to-drip_teal/5 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, borderRadius: "100%" }}
                  whileHover={{
                    scale: 1.5,
                    borderRadius: "0%",
                    transition: { duration: 0.4 },
                  }}
                />

                <CardHeader className="items-center relative z-10 pb-4">
                  <motion.div
                    className="p-4 rounded-full bg-electric_indigo/10 mb-3 inline-block relative"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    }}
                  >
                    <useCase.icon className="h-8 w-8 text-electric_indigo" />
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-electric_indigo/20"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{
                        scale: 1.5,
                        opacity: [0, 0.5, 0],
                        transition: { duration: 0.6 },
                      }}
                    />
                  </motion.div>
                  <CardTitle className="text-lg font-semibold text-midnight_navy font-grotesk">
                    {useCase.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow relative z-10 pt-0">
                  <p className="text-slate_gray text-sm leading-relaxed">{useCase.description}</p>
                </CardContent>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-electric_indigo to-drip_teal"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild className="bg-drip_teal hover:bg-drip_teal/90 text-white font-semibold shadow-lg">
              <Link href="/use-cases">
                See All Use Cases
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
