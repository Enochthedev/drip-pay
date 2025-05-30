"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, FileSignature, Zap } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Wallet,
    title: "1. Connect Wallet",
    description: "User signs a one-time approval for DripPay to manage their subscription payments from their wallet.",
  },
  {
    icon: FileSignature,
    title: "2. Create Subscription",
    description:
      "Your application defines the terms (amount, token, interval) and creates a subscription via the DripPay smart contract.",
  },
  {
    icon: Zap,
    title: "3. Drip Happens",
    description:
      "The DripPay protocol automatically executes payments on-chain at the specified interval. No manual intervention needed.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-electric_indigo/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-drip_teal/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_navy font-grotesk mb-4">
            How <span className="text-electric_indigo">DripPay</span> Fits Into Your App
          </h2>
          <p className="text-lg text-slate_gray max-w-2xl mx-auto">
            Three simple steps to implement automated recurring payments in your Web3 application.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-ghost_white/50 border-slate-200 shadow-md text-center h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-electric_indigo/5 to-drip_teal/5 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <CardHeader className="items-center relative z-10">
                  <motion.div
                    className="p-4 rounded-full bg-drip_teal/10 mb-4 inline-block relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <step.icon className="h-10 w-10 text-drip_teal" />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-midnight_navy font-grotesk">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate_gray leading-relaxed">{step.description}</p>
                </CardContent>

                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-drip_teal to-electric_indigo z-20" />
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-700 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-mono text-slate-400">// Example: Creating a subscription</p>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-slate-300">
                <span className="text-sky-300">const</span> dripPay = <span className="text-purple-300">new</span>{" "}
                <span className="text-yellow-300">DripPay</span>(provider);{"\n"}
                <span className="text-sky-300">await</span> dripPay.createSubscription(&#123;{"\n"}
                {"  "}userAddress: <span className="text-orange-300">'0x123...'</span>,{"\n"}
                {"  "}tokenAddress: <span className="text-orange-300">'0xDAI...'</span>,{"\n"}
                {"  "}amount: <span className="text-green-300">ethers.utils.parseUnits</span>(
                <span className="text-orange-300">'10'</span>, <span className="text-green-300">18</span>),{"\n"}
                {"  "}interval: <span className="text-green-300">86400</span>{" "}
                <span className="text-slate-400">// 1 day in seconds</span>
                {"\n"}
                &#125;);
              </code>
            </pre>
          </motion.div>

          <div className="text-center md:text-left">
            <motion.div
              className="relative h-64 w-full max-w-md mx-auto md:mx-0 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Automated Logic Loop"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-electric_indigo/10 to-drip_teal/10 rounded-lg opacity-0 hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <h3 className="text-2xl font-bold text-midnight_navy font-grotesk mb-4">Focus on Your Core Features</h3>
            <p className="text-slate_gray text-lg leading-relaxed">
              Our protocol handles the recurring logic, so you can focus on your application's core features and user
              experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
