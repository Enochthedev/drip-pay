"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Wallet, ArrowRight, CheckCircle, RefreshCw, Zap } from "lucide-react"
import Link from "next/link"
import { NetworkSwell } from "@web3icons/react"
import { motion } from "framer-motion"

export default function EcosystemSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-midnight_navy">
          Part of the <span className="text-electric_indigo">Swell Ecosystem</span>
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-4 mb-6 sm:mb-8">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20">
            <NetworkSwell className="w-full h-full text-green-400" />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-semibold bg-electric_indigo/10 text-electric_indigo px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium">
            Powered by Swell L2
          </span>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-slate_gray mb-10 sm:mb-12 max-w-xl mx-auto font-sans">
          DripPay is proud to build on Swell, leveraging its robust infrastructure for restaking-native financial tools.
        </p>

        {/* Payment Flow Illustration */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <motion.div
            className="relative bg-white rounded-xl shadow-lg p-6 sm:p-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-midnight_navy mb-6">Seamless Billing Flow</h3>

            {/* Payment Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
              {/* Wallet */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-electric_indigo/10 rounded-full flex items-center justify-center mb-2">
                  <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-electric_indigo" />
                </div>
                <p className="text-sm font-medium text-slate_gray">User Wallet</p>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex-grow flex justify-center items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-electric_indigo to-drip_teal relative">
                  <motion.div
                    className="absolute -top-1.5 right-0 w-3 h-3 bg-drip_teal rounded-full"
                    animate={{
                      x: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                  />
                </div>
                <ArrowRight className="md:hidden w-6 h-6 text-drip_teal rotate-90" />
              </motion.div>

              {/* DripPay */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-drip_teal/10 rounded-full flex items-center justify-center mb-2 relative">
                  <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-drip_teal" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-drip_teal/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-slate_gray">DripPay Protocol</p>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="flex-grow flex justify-center items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-drip_teal to-green-400 relative">
                  <motion.div
                    className="absolute -top-1.5 right-0 w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      x: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                      delay: 0.5,
                    }}
                  />
                </div>
                <ArrowRight className="md:hidden w-6 h-6 text-green-400 rotate-90" />
              </motion.div>

              {/* Merchant */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-400/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                </div>
                <p className="text-sm font-medium text-slate_gray">Merchant</p>
              </motion.div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10">
              <motion.div
                className="bg-slate-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Zap className="w-6 h-6 text-electric_indigo mb-2" />
                <h4 className="font-medium text-midnight_navy mb-1">Automated Billing</h4>
                <p className="text-xs text-slate_gray">Recurring payments execute automatically on schedule</p>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <NetworkSwell className="w-6 h-6 text-green-400 mb-2" />
                <h4 className="font-medium text-midnight_navy mb-1">Swell Integration</h4>
                <p className="text-xs text-slate_gray">Leverages Swell's speed and low transaction costs</p>
              </motion.div>

              <motion.div
                className="bg-slate-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <RefreshCw className="w-6 h-6 text-drip_teal mb-2" />
                <h4 className="font-medium text-midnight_navy mb-1">Smart Contracts</h4>
                <p className="text-xs text-slate_gray">Trustless execution with full on-chain verification</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer">
              Join our Discord <MessageSquare className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
