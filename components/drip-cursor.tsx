"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DripCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [droplets, setDroplets] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Create droplet effect on click
      const newDroplet = {
        id: Date.now(),
        x: mousePosition.x,
        y: mousePosition.y,
      }
      setDroplets((prev) => [...prev, newDroplet])

      // Remove droplet after animation
      setTimeout(() => {
        setDroplets((prev) => prev.filter((d) => d.id !== newDroplet.id))
      }, 1000)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [mousePosition])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full bg-drip_teal rounded-full opacity-80" />
      </motion.div>

      {/* Click droplets */}
      <AnimatePresence>
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: droplet.x - 10,
              top: droplet.y - 10,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="w-5 h-5 bg-electric_indigo/60 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
