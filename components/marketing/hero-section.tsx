"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import OceanBackground from "@/components/ocean-background"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for interactive effects
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

  // Header height is 4rem (64px). We'll use 65px for a slight overdraw.
  const headerHeightPx = 65
  const originalPtRem = 5 // py-20 is 5rem
  const originalMdPtRem = 8 // md:py-32 is 8rem

  // Convert rem to px for calculation (assuming 1rem = 16px)
  const originalPtPx = originalPtRem * 16
  const originalMdPtPx = originalMdPtRem * 16

  const newPtPx = originalPtPx + headerHeightPx
  const newMdPtPx = originalMdPtPx + headerHeightPx

  return (
    <section
      className="relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${originalPtPx}px`, // pb-20 (5rem)
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPtPx}px !important; /* md:pb-32 (8rem) */
          }
        }
      `}</style>

      {/* Ocean background with droplets */}
      <OceanBackground intensity="medium" />

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

      {/* Enhanced drip particles with ocean theme */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-drip_teal/20 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
            }}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: -20,
              scale: 0,
            }}
            animate={{
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
              scale: [0, 1, 0.8, 0],
              opacity: [0, 0.8, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern with enhanced animation */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
        >
          <defs>
            <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(90, 72, 242, 0.5)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="mb-6 md:mb-8 flex justify-center md:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Image
                  src="/images/drippay-logo.png"
                  alt="DripPay Logo"
                  width={180}
                  height={45}
                  priority
                  className="max-w-[160px] md:max-w-[180px] w-auto h-auto"
                />
                {/* Enhanced glow effect with droplet animation */}
                <motion.div
                  className="absolute inset-0 bg-electric_indigo/20 blur-xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            <motion.h1
              className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-ghost_white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">Automated Crypto Billing.</span>
              <motion.span
                className="block text-electric_indigo relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Built for Restakers.
                {/* Enhanced drip effect under text */}
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                />
                {/* Droplet effects on the line */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute -bottom-1 w-2 h-2 bg-drip_teal rounded-full"
                    style={{ left: `${20 + i * 30}%` }}
                    initial={{ scale: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      y: [0, 10, 20],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 2 + i * 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              className="font-sans text-base sm:text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Start on Swell. Scale anywhere. DripPay brings seamless, smart contract-based subscriptions to the next
              generation of Web3 products.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-electric_indigo hover:bg-opacity-85 text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 shadow-[0_4px_14px_0_rgba(90,72,242,0.39)] hover:shadow-[0_6px_20px_0_rgba(90,72,242,0.23)] transform transition-all duration-300 relative overflow-hidden"
                >
                  <Link href="#launch">
                    <span className="relative z-10 flex items-center">
                      Launch on Swell <Zap className="ml-2 h-5 w-5" />
                    </span>
                    {/* Enhanced liquid hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-drip_teal to-electric_indigo opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg transform transition-all duration-300"
                >
                  <Link href="#how-it-works">
                    See How It Works <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-56 sm:h-64 md:h-96 mt-4 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Enhanced morphing blob background with ocean theme */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric_indigo/30 to-drip_teal/30 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
                borderRadius: ["50%", "60% 40% 30% 70%", "50%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Visual: Animated flow from wallet → smart contract → recurring payments */}
            <motion.div className="relative z-10" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Image
                src="/placeholder.svg?height=384&width=512"
                alt="Animated flow of crypto payments"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/20 via-transparent to-drip_teal/20"
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

            {/* Enhanced floating elements with droplet theme */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-drip_teal/40 backdrop-blur-sm"
                style={{
                  width: `${Math.random() * 8 + 6}px`,
                  height: `${Math.random() * 8 + 6}px`,
                  left: `${20 + i * 10}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
