"use client"

import { Button } from "@/components/ui/button"
import { Code, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const smartContractSnippet = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@drippay/contracts/DripPayCore.sol"; // Fictional import

contract YourService is DripPayManaged {
  uint256 public constant MONTHLY_FEE = 0.05 ether; // Example fee in Swell ETH
  address public immutable feeRecipient;

  constructor(address dripPayRouter, address recipient) 
      DripPayManaged(dripPayRouter) 
  {
      feeRecipient = recipient;
      // Example: Create a subscription plan upon deployment
      _createSubscriptionPlan(MONTHLY_FEE, 30 days, recipient);
  }

  function _createSubscriptionPlan(
      uint256 amount, 
      uint256 interval, 
      address recipient
  ) internal {
      // Simplified: Register a new payment plan with DripPay
      // Assumes native token (Swell ETH) if tokenAddress is address(0)
      uint256 planId = _registerDripPayPlan(
          address(0), // Token address (0x0 for native Swell ETH)
          amount,
          interval,
          recipient
      );
      // Your application logic to store or use planId
  }

  // Users would typically subscribe to this service's plan
  // via the DripPayRouter contract, referencing the planId.
}
`.trim()

const terminalCommands = [
  { command: "$ drippay init my-subscription-app", delay: 0 },
  { text: "✓ Creating smart contract templates...", delay: 1000 },
  { text: "✓ Setting up Swell L2 configuration...", delay: 1500 },
  { text: "✓ Installing dependencies...", delay: 2000 },
  { command: "$ drippay deploy --network swell", delay: 3000 },
  { text: "📦 Deploying to Swell L2...", delay: 3500 },
  { text: "🎉 Contract deployed: 0x742d35Cc6634C0532925a3b8D", delay: 4000, highlight: true },
  { command: "$ drippay create-plan --amount 0.05 --interval monthly", delay: 5000 },
  { text: "✓ Subscription plan created", delay: 5500 },
  { text: "Plan ID: plan_abc123", delay: 6000 },
]

export default function DeveloperPreviewSection() {
  const [visibleCommands, setVisibleCommands] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCommands((prev) => {
        if (prev < terminalCommands.length) {
          return prev + 1
        }
        // Reset after showing all commands
        setTimeout(() => setVisibleCommands(0), 2000)
        return prev
      })
    }, 800)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-ghost_white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-midnight_navy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Developer <span className="text-electric_indigo">Preview</span>
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-slate_gray text-center mb-8 sm:mb-12 max-w-2xl mx-auto font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Integrate DripPay seamlessly into your Swell-based applications.
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            className="bg-midnight_navy p-4 sm:p-6 rounded-lg shadow-xl border border-slate-700 overflow-x-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center text-drip_teal mb-3">
              <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="font-mono text-xs sm:text-sm">YourService.sol (Swell L2)</span>
            </div>
            <pre className="bg-slate-950 text-xs sm:text-sm text-slate-300 p-3 sm:p-4 rounded-md overflow-x-auto max-h-80 sm:max-h-96 font-mono">
              <code>{smartContractSnippet}</code>
            </pre>
          </motion.div>
          <div className="flex flex-col items-center">
            <motion.div
              className="relative w-full max-w-lg h-48 sm:h-64 md:h-80 mb-6 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Terminal/CLI Interface Mockup */}
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                  />
                </div>
                <span className="text-slate-400 text-sm font-mono">drippay-cli</span>
              </div>

              <div className="p-4 font-mono text-sm space-y-2 h-full overflow-hidden">
                {terminalCommands.slice(0, visibleCommands).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      item.command ? "text-drip_teal" : item.highlight ? "text-electric_indigo" : "text-slate-400"
                    }
                  >
                    {item.command || item.text}
                  </motion.div>
                ))}

                {visibleCommands === terminalCommands.length && (
                  <div className="mt-2 flex items-center">
                    <span className="text-drip_teal">$</span>
                    <motion.div
                      className="ml-2 w-2 h-4 bg-drip_teal"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                )}
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-4 right-4 bg-electric_indigo/10 backdrop-blur-sm rounded px-2 py-1 text-xs text-electric_indigo border border-electric_indigo/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Smart Contract
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-4 bg-drip_teal/10 backdrop-blur-sm rounded px-2 py-1 text-xs text-drip_teal border border-drip_teal/20"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              >
                Swell L2
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-electric_indigo hover:bg-opacity-85 text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_4px_14px_0_rgba(90,72,242,0.39)] hover:shadow-[0_6px_20px_0_rgba(90,72,242,0.23)] transform transition-all duration-300"
              >
                <Link href="#docs">
                  Explore the Docs <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
