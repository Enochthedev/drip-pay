"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Rocket, BookOpen, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingCta() {
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

      {/* Ripple effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 border-2 border-drip_teal/10 rounded-full"
            style={{
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              width: ["0px", "200px", "400px"],
              height: ["0px", "200px", "400px"],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Rocket className="h-16 w-16 mx-auto mb-6 text-drip_teal" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Start Billing On-Chain in Minutes — <span className="text-drip_teal">for Free.</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join the growing ecosystem of Web3 builders using DripPay for seamless, decentralized recurring payments.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-drip_teal hover:bg-drip_teal/90 text-midnight_navy font-semibold relative overflow-hidden"
            >
              <Link href="/waitlist">
                <span className="relative z-10 flex items-center">
                  <Rocket className="h-5 w-5 mr-2" />
                  Start for Free
                </span>

                {/* Liquid button effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-electric_indigo/30 to-drip_teal opacity-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%", opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo"
            >
              <Link href="/docs">
                <BookOpen className="h-5 w-5 mr-2" />
                See Developer Docs
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-slate-300 hover:bg-slate-700/50 hover:text-ghost_white"
            >
              <Link href="#subscribe-pro">
                <MessageSquare className="h-5 w-5 mr-2" />
                Try a Live Subscription
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
