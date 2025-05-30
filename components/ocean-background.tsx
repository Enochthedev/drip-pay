"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface OceanBackgroundProps {
  intensity?: "light" | "medium" | "heavy"
  className?: string
}

export default function OceanBackground({ intensity = "light", className = "" }: OceanBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [droplets, setDroplets] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const dropletCount = intensity === "light" ? 15 : intensity === "medium" ? 25 : 40

    const newDroplets = Array.from({ length: dropletCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 5,
    }))

    setDroplets(newDroplets)
  }, [intensity])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Flowing water background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(0, 194, 168, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(90, 72, 242, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(0, 194, 168, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Animated droplets */}
      {droplets.map((droplet) => (
        <motion.div
          key={droplet.id}
          className="absolute rounded-full bg-drip_teal/20"
          style={{
            left: `${droplet.x}%`,
            top: `${droplet.y}%`,
            width: `${droplet.size}px`,
            height: `${droplet.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: droplet.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: droplet.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wave patterns */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 opacity-5"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(0, 194, 168, 0.1) 20px,
              rgba(0, 194, 168, 0.1) 40px
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
  )
}
