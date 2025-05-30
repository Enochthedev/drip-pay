"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function InteractiveTestPrompt() {
  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulate = () => {
    setIsSimulating(true)
    // Reset after animation completes
    setTimeout(() => setIsSimulating(false), 3000)
  }

  return (
    <section id="subscribe-pro" className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(90, 72, 242, 0.25)" }}
        >
          {/* Background ripple effect */}
          <div className="absolute inset-0 pointer-events-none">
            {isSimulating && (
              <motion.div
                className="absolute inset-0 bg-electric_indigo/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {isSimulating &&
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 border-2 border-electric_indigo/20 rounded-full"
                  initial={{
                    width: 0,
                    height: 0,
                    x: "-50%",
                    y: "-50%",
                    opacity: 0.8,
                  }}
                  animate={{
                    width: ["0px", "300px", "600px"],
                    height: ["0px", "300px", "600px"],
                    opacity: [0.8, 0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
          </div>

          <motion.div
            animate={
              isSimulating
                ? {
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <Zap className="h-12 w-12 mx-auto mb-6 text-electric_indigo" />
            <h2 className="text-2xl md:text-3xl font-bold font-grotesk text-midnight_navy mb-4">
              Try It Live — Subscribe to Pro using DripPay
            </h2>
            <p className="text-slate_gray mb-8">
              We use our own protocol to charge you. Transparent, trustless, and always on-chain.
            </p>
            <Button
              size="lg"
              className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white group relative overflow-hidden"
              onClick={handleSimulate}
              disabled={isSimulating}
            >
              <span className="relative z-10 flex items-center">
                {isSimulating ? "Connecting..." : "Subscribe via Wallet"}
                <Wallet className={`h-5 w-5 ml-2 ${isSimulating ? "animate-pulse" : "group-hover:animate-pulse"}`} />
              </span>

              {/* Liquid button effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-drip_teal to-electric_indigo opacity-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%", opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <p className="text-xs text-slate-400 mt-4">
              (Interactive demo coming soon. Clicking will simulate a wallet connection.)
            </p>

            {/* Animated contract details */}
            <motion.div
              className="mt-6 text-sm text-slate-500 space-y-1"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isSimulating ? "auto" : 0,
                opacity: isSimulating ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <p>
                Contract: <span className="font-mono text-xs">0x123...abc</span>
              </p>
              <p>
                Chain: <span className="font-semibold">Swell L2</span>
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isSimulating ? 1 : 0 }}
                transition={{ delay: 0.5 }}
              >
                Action: Confirm subscription in wallet modal...
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
