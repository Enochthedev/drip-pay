"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const headerHeightPx = 80 // Approximate height of your sticky header
const originalPtRem = 7 // Original padding-top in rem (e.g., py-28 is roughly 7rem top)
const originalMdPtRem = 8 // Original md: padding-top in rem (e.g., md:py-32 is roughly 8rem top)
const originalPbRem = 7
const originalMdPbRem = 8

export default function PricingHero() {
  const [newPtPx, setNewPtPx] = useState(0)
  const [newMdPtPx, setNewMdPtPx] = useState(0)
  const [originalPbPx, setOriginalPbPx] = useState(0)
  const [originalMdPbPx, setOriginalMdPbPx] = useState(0)

  // Add this new animation variant after the existing useState hooks
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    const calculatePadding = () => {
      const remInPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

      const currentOriginalPtPx = originalPtRem * remInPx
      setNewPtPx(currentOriginalPtPx + headerHeightPx)

      const currentOriginalMdPtPx = originalMdPtRem * remInPx
      setNewMdPtPx(currentOriginalMdPtPx + headerHeightPx)

      setOriginalPbPx(originalPbRem * remInPx)
      setOriginalMdPbPx(originalMdPbRem * remInPx)
    }

    calculatePadding()
    window.addEventListener("resize", calculatePadding)
    return () => window.removeEventListener("resize", calculatePadding)
  }, [])

  if (newPtPx === 0) {
    // Still calculating or SSR
    return (
      <div
        style={{ height: `${(originalPtRem + originalPbRem) * 16 + headerHeightPx}px` }}
        className="bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo"
      />
    )
  }

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          .dynamic-hero-padding {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbPx}px !important;
          }
        }
      `}</style>
      <section
        className="dynamic-hero-padding relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden text-center"
        style={{
          marginTop: `-${headerHeightPx}px`,
          paddingTop: `${newPtPx}px`,
          paddingBottom: `${originalPbPx}px`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.03] animate-pulse">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGridPricing" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGridPricing)" />
          </svg>
        </div>

        {/* Animated floating droplets */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-drip_teal/20 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: -20,
                scale: 0,
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk text-ghost_white mb-6 animate-fade-in-up"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Transparent, Predictable Pricing
            <motion.span
              className="block text-electric_indigo/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Powered by Smart Contracts.
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ delay: 0.6 }}
          >
            Use DripPay free on any chain. Scale your billing volume, add dev tools, and get security-grade insights
            with our Pro and Enterprise plans.
          </motion.p>

          {/* Animated wave */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-8 opacity-10"
            style={{
              background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 20px,
                rgba(0, 194, 168, 0.3) 20px,
                rgba(0, 194, 168, 0.3) 40px
              )
            `,
            }}
            animate={{
              x: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </section>
    </>
  )
}
