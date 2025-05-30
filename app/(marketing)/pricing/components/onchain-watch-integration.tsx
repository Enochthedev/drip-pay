"use client"

import Image from "next/image"
import { onchainWatchFeaturesList } from "../data/pricing-data"
import { motion } from "framer-motion"

export default function OnchainWatchIntegration() {
  return (
    <section className="py-16 md:py-24 bg-midnight_navy text-ghost_white relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-electric_indigo/10 to-drip_teal/10 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-drip_teal/20 rounded-full"
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://wcx4daekjjbukzxg.public.blob.vercel-storage.com/external/logo-dark-DUVQzpQkXNLyYNVvxQ9Q8W30YXFIIv.png"
              alt="Onchain Watch Logo"
              width={180}
              height={45}
              className="mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-bold font-grotesk mb-4">
              Security First. <span className="text-drip_teal">Always.</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Enterprise subscribers get real-time contract monitoring via Onchain Watch — receive alerts for:
            </p>
          </motion.div>

          <motion.ul
            className="space-y-3 text-left max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {onchainWatchFeaturesList.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <feature.Icon className="h-6 w-6 mr-3 mt-1 text-drip_teal flex-shrink-0" />
                <span className="text-slate-300">{feature.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{
              boxShadow: "0 0 30px rgba(0, 194, 168, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <p className="text-xl font-semibold text-drip_teal italic">
              "It's like having an on-chain auditor watching your protocol 24/7."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
