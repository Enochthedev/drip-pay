"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function UseCasesHero() {
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

  // Constants for header overlap, similar to other hero sections
  const headerHeightPx = 65 // Assuming header height is approx 65px
  const originalPtRem = 5 // Base padding-top in rem (e.g., py-20 is 5rem)
  const originalMdPtRem = 7 // Base padding-top for md screens (e.g., md:py-28 is 7rem)
  const originalPbRem = 5 // Base padding-bottom in rem
  const originalMdPbRem = 7 // Base padding-bottom for md screens

  // Convert rem to px for calculation (assuming 1rem = 16px)
  const toPx = (rem: number) => rem * 16

  const newPtPx = toPx(originalPtRem) + headerHeightPx
  const newMdPtPx = toPx(originalMdPtRem) + headerHeightPx

  return (
    <section
      className="relative text-center overflow-hidden bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo text-ghost_white"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${toPx(originalPbRem)}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${toPx(originalMdPbRem)}px !important;
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
        {[...Array(10)].map((_, i) => (
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
            <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          One Billing Protocol.{" "}
          <motion.span
            className="block sm:inline text-electric_indigo relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Infinite Web3 Use Cases.
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
          Whether you're building a DAO tool, NFT platform, or premium community — DripPay makes it easy to get paid
          on-chain, again and again.
        </motion.p>
        <motion.div
          className="relative max-w-3xl mx-auto h-64 md:h-80 lg:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/placeholder.svg?height=384&width=768"
            alt="DripPay Use Cases Diagram"
            layout="fill"
            objectFit="contain"
            className="opacity-90"
          />
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-75"
            animate={{
              opacity: [0.3, 0.7, 0.3],
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
