"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Repeat, Layers, ShieldCheck, Globe2 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <Repeat className="h-6 w-6 sm:h-8 sm:w-8 text-electric_indigo" />,
    title: "Smart Subscriptions",
    description: "Automate recurring billing with full on-chain logic.",
    color: "electric_indigo",
  },
  {
    icon: <Layers className="h-6 w-6 sm:h-8 sm:w-8 text-drip_teal" />,
    title: "Built on Swell",
    description: "Optimized for restaking-native payments and incentives.",
    color: "drip_teal",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-electric_indigo" />,
    title: "Non-Custodial & Secure",
    description: "No middlemen. You stay in control of your assets.",
    color: "electric_indigo",
  },
  {
    icon: <Globe2 className="h-6 w-6 sm:h-8 sm:w-8 text-drip_teal" />,
    title: "Chain-Agnostic by Design",
    description: "Launching on Swell, expanding to all EVM chains soon.",
    color: "drip_teal",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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

export default function WhyDripPaySection() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-24 bg-ghost_white relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-electric_indigo rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-drip_teal rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-midnight_navy">
            Why{" "}
            <span className="text-electric_indigo relative">
              DripPay
              {/* Drip effect */}
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-electric_indigo to-drip_teal"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
            ?
          </h2>
          <motion.p
            className="text-base sm:text-lg text-slate_gray max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the core advantages of using DripPay for your decentralized billing needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="bg-white border-slate-200 hover:border-electric_indigo/50 transition-all duration-300 shadow-lg hover:shadow-xl transform relative overflow-hidden h-full">
                {/* Liquid hover effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    feature.color === "electric_indigo"
                      ? "from-electric_indigo/5 to-drip_teal/5"
                      : "from-drip_teal/5 to-electric_indigo/5"
                  } opacity-0 group-hover:opacity-100`}
                  initial={{ scale: 0, borderRadius: "100%" }}
                  whileHover={{
                    scale: 1.5,
                    borderRadius: "0%",
                    transition: { duration: 0.4 },
                  }}
                />

                <CardHeader className="items-center pt-6 sm:pt-8 pb-2 sm:pb-3 relative z-10">
                  <motion.div
                    className="p-3 sm:p-4 rounded-full bg-electric_indigo/10 mb-3 sm:mb-4 relative"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {feature.icon}
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
                  <CardTitle className="text-lg sm:text-xl font-semibold text-midnight_navy text-center font-grotesk relative z-10">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6 sm:pb-8 px-4 sm:px-6 relative z-10">
                  <p className="text-sm sm:text-base text-slate_gray text-center font-sans">{feature.description}</p>
                </CardContent>

                {/* Drip effect at bottom */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    feature.color === "electric_indigo"
                      ? "from-electric_indigo to-drip_teal"
                      : "from-drip_teal to-electric_indigo"
                  }`}
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
