"use client"

import { motion } from "framer-motion"

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
        {/* Liquid droplet animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Main droplet */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-electric_indigo to-drip_teal rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              borderRadius: ["50%", "60% 40% 30% 70%", "50%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Smaller droplets */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-drip_teal/60 rounded-full"
              style={{
                left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 30}px`,
                top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 30}px`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="text-ghost_white font-medium text-lg"
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

        {/* Ripple effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-drip_teal/30 rounded-full"
              animate={{
                width: ["0px", "200px"],
                height: ["0px", "200px"],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
