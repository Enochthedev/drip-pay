"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, ZoomIn } from "lucide-react"
import { motion } from "framer-motion"

// Define header height and original padding values (in rem)
const headerHeightPx = 80 // Approximate height of your sticky header in pixels
const originalPtRem = 6 // Reduced from 7 for better proportions
const originalMdPtRem = 8 // Keep medium screen padding
const originalPbRem = 6 // Reduced from 7
const originalMdPbRem = 8

export default function FeaturesHero() {
  const [newPtPx, setNewPtPx] = useState(0)
  const [newMdPtPx, setNewMdPtPx] = useState(0)
  const [newPbPx, setNewPbPx] = useState(0)
  const [newMdPbPx, setNewMdPbPx] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const calculatePadding = () => {
      const remInPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

      const currentOriginalPtPx = remInPx * originalPtRem
      const currentOriginalMdPtPx = remInPx * originalMdPtRem
      const currentOriginalPbPx = remInPx * originalPbRem
      const currentOriginalMdPbPx = remInPx * originalMdPbRem

      setNewPtPx(currentOriginalPtPx + headerHeightPx)
      setNewMdPtPx(currentOriginalMdPtPx + headerHeightPx)
      setNewPbPx(currentOriginalPbPx)
      setNewMdPbPx(currentOriginalMdPbPx)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    calculatePadding()
    window.addEventListener("resize", calculatePadding)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("resize", calculatePadding)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
      @media (min-width: 768px) {
        .features-hero-section {
          padding-top: ${newMdPtPx}px !important;
          padding-bottom: ${newMdPbPx}px !important;
        }
      }
    `}</style>
      <section
        className="features-hero-section relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden text-ghost_white"
        style={{
          marginTop: `-${headerHeightPx}px`,
          paddingTop: `${newPtPx}px`,
          paddingBottom: `${newPbPx}px`,
        }}
      >
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
              <pattern id="heroGridFeatures" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGridFeatures)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart Contract Billing.
            <br />
            <motion.span
              className="text-electric_indigo relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Designed for Web3.
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="font-sans text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DripPay gives you full control over recurring payments — no third parties, no invoices, just programmable
            logic on the chains you build on.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                asChild
                className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold"
              >
                <Link href="/docs">
                  <FileText className="mr-2 h-5 w-5" />
                  Explore the Docs
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo font-semibold"
              >
                <Link href="/waitlist">
                  Start Billing
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto h-48 md:h-64 lg:h-80 opacity-90 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Smart Contract Flow Diagram"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center"
              whileHover={{ opacity: 0.5 }}
            >
              <ZoomIn className="h-12 w-12 text-ghost_white opacity-0 group-hover:opacity-75 transition-all duration-300 delay-150 scale-50 group-hover:scale-100" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
