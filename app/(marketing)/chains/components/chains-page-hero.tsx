"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function ChainsPageHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Constants for header overlap, similar to landing page hero
  const headerHeightPx = 65 // Assuming header height is consistently 64px or similar
  const originalPtRem = 5 // Original desired top padding (e.g., py-20 -> 5rem)
  const originalMdPtRem = 7 // Original desired md top padding (e.g., md:py-28 -> 7rem)
  const originalPbRem = 5 // Original desired bottom padding
  const originalMdPbRem = 7 // Original desired md bottom padding

  // Convert rem to px for calculation (assuming 1rem = 16px)
  const originalPtPx = originalPtRem * 16
  const originalMdPtPx = originalMdPtRem * 16
  const originalPbPx = originalPbRem * 16
  const originalMdPbPx = originalMdPbRem * 16

  const newPtPx = originalPtPx + headerHeightPx
  const newMdPtPx = originalMdPtPx + headerHeightPx

  return (
    <section
      className="relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden text-center"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${originalPbPx}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbPx}px !important;
          }
        }
      `}</style>

      {/* Animated flowing background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-electric_indigo/20 via-drip_teal/10 to-electric_indigo/20 animate-gradient-flow"
          style={{
            backgroundSize: "400% 400%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk text-ghost_white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Multi-Chain Billing,{" "}
          <motion.span
            className="text-electric_indigo relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            One Protocol.
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            />
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          DripPay is built to work across the EVM ecosystem. Whether you're building on Swell, Ethereum, or another
          chain — we've got you covered.
        </motion.p>
        <motion.div
          className="relative max-w-4xl mx-auto h-64 md:h-80 lg:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Abstract multi-chain network map with DripPay integrations"
            layout="fill"
            objectFit="contain"
            priority
            className="opacity-90" // Slightly increased opacity
          />
          {/* Optional: Add a subtle animated gradient overlay like in the main hero if desired for the visual */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
