"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LiquidLoadingProps {
  isVisible: boolean
  message?: string
}

export default function LiquidLoading({ isVisible, message = "Loading..." }: LiquidLoadingProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-midnight_navy/90 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* DripPay Logo with Ripple Effects */}
        <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          {/* Ripple effects */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-drip_teal/30 rounded-full"
              animate={{
                width: ["0px", "200px", "300px"],
                height: ["0px", "200px", "300px"],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Secondary ripples */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`secondary-${i}`}
              className="absolute border border-electric_indigo/20 rounded-full"
              animate={{
                width: ["20px", "150px", "250px"],
                height: ["20px", "150px", "250px"],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8 + 0.3,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Logo container with glow */}
          <motion.div
            className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(0, 194, 168, 0.3)",
                "0 0 40px rgba(0, 194, 168, 0.6)",
                "0 0 20px rgba(0, 194, 168, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/drippay-logo.png"
              alt="DripPay Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
          </motion.div>

          {/* Floating droplets around logo */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`droplet-${i}`}
              className="absolute w-2 h-2 bg-drip_teal/60 rounded-full"
              style={{
                left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
                top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading text with wave effect */}
        <motion.p
          className="text-ghost_white font-medium text-lg mb-2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-drip_teal rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
