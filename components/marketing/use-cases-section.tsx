"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const useCases = [
  "Restaking-as-a-Service monetization",
  "SaaS solutions for DAOs and Web3 communities",
  "Renewable NFT utility passes & memberships",
  "Token-gated content and community access",
  "Automated streaming payments for services",
  "Decentralized creator subscription platforms",
]

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

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

export default function UseCasesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Floating drip elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-drip_teal/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-midnight_navy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          What Can You Build with{" "}
          <span className="text-electric_indigo relative">
            DripPay
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </span>
          ?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 5,
                transition: { duration: 0.2 },
              }}
              className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 group relative overflow-hidden"
            >
              {/* Liquid background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-drip_teal/5 to-electric_indigo/5 rounded-lg"
                initial={{ scale: 0, borderRadius: "100%" }}
                whileHover={{
                  scale: 1.2,
                  borderRadius: "8px",
                  transition: { duration: 0.3 },
                }}
              />

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
                className="relative z-10"
              >
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-drip_teal flex-shrink-0 mt-0.5" />
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-drip_teal/20"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{
                    scale: 2,
                    opacity: [0, 0.5, 0],
                    transition: { duration: 0.6 },
                  }}
                />
              </motion.div>

              <p className="text-slate_gray text-sm sm:text-base lg:text-lg font-sans relative z-10 group-hover:text-midnight_navy transition-colors duration-300">
                {useCase}
              </p>

              {/* Drip accent */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-drip_teal to-electric_indigo"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
