"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  // Generate random droplet positions
  const generateDroplets = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 0.5,
    }))
  }

  const droplets = generateDroplets(25)

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Liquid transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Main liquid wave */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-electric_indigo via-drip_teal to-electric_indigo"
              initial={{
                clipPath: "circle(0% at 50% 50%)",
                scale: 0.8,
              }}
              animate={{
                clipPath: "circle(150% at 50% 50%)",
                scale: 1,
              }}
              exit={{
                clipPath: "circle(0% at 50% 50%)",
                scale: 1.2,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(0, 194, 168, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(90, 72, 242, 0.8) 0%, transparent 50%),
                  linear-gradient(135deg, #5A48F2 0%, #00C2A8 100%)
                `,
              }}
            />

            {/* Animated droplets */}
            {droplets.map((droplet) => (
              <motion.div
                key={droplet.id}
                className="absolute rounded-full bg-ghost_white/20 backdrop-blur-sm"
                style={{
                  left: `${droplet.x}%`,
                  top: `${droplet.y}%`,
                  width: `${droplet.size}px`,
                  height: `${droplet.size}px`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.8, 0.4],
                  y: [50, 0, -20],
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  y: -50,
                }}
                transition={{
                  duration: 0.8,
                  delay: droplet.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Ripple effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 border-2 border-ghost_white/30 rounded-full"
                initial={{
                  width: 0,
                  height: 0,
                  x: "-50%",
                  y: "-50%",
                  opacity: 0,
                }}
                animate={{
                  width: ["0px", "200px", "400px"],
                  height: ["0px", "200px", "400px"],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* DripPay logo during transition */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-ghost_white font-grotesk font-bold text-2xl md:text-3xl flex items-center">
                <motion.div
                  className="w-8 h-8 md:w-10 md:h-10 bg-ghost_white rounded-full mr-3"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                DripPay
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
