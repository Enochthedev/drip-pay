"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coreFeaturesData } from "../data/core-features-data"
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
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
}

export default function CoreFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_navy font-grotesk">
            What Makes{" "}
            <span className="text-electric_indigo relative">
              DripPay
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-electric_indigo to-drip_teal"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>{" "}
            Different?
          </h2>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {coreFeaturesData.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="bg-white border-slate-200 hover:border-electric_indigo/50 transition-all duration-300 shadow-lg hover:shadow-xl transform relative overflow-hidden flex flex-col text-center md:text-left h-full">
                {/* Liquid hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-electric_indigo/5 to-drip_teal/5 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, borderRadius: "100%" }}
                  whileHover={{
                    scale: 1.5,
                    borderRadius: "0%",
                    transition: { duration: 0.4 },
                  }}
                />

                <CardHeader className="items-center md:items-start relative z-10">
                  <motion.div
                    className="p-3 rounded-full bg-electric_indigo/10 mb-4 inline-block relative"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  >
                    <feature.icon className="h-8 w-8 text-electric_indigo" />
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
                  <CardTitle className="text-xl font-semibold text-midnight_navy font-grotesk relative z-10">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow relative z-10">
                  <p className="text-slate_gray">{feature.description}</p>
                </CardContent>

                {/* Drip effect at bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-electric_indigo to-drip_teal"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
