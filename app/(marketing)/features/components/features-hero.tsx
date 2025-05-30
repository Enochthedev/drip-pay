"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, ZoomIn } from "lucide-react"

// Define header height and original padding values (in rem)
const headerHeightPx = 80 // Approximate height of your sticky header in pixels
const originalPtRem = 7 // Original top padding in rem (e.g., py-28 -> 7rem top, 7rem bottom)
const originalMdPtRem = 8 // Original medium screen top padding in rem (e.g., md:py-32 -> 8rem top, 8rem bottom)
const originalPbRem = 7
const originalMdPbRem = 8

export default function FeaturesHero() {
  const [newPtPx, setNewPtPx] = useState(0)
  const [newMdPtPx, setNewMdPtPx] = useState(0)
  const [newPbPx, setNewPbPx] = useState(0)
  const [newMdPbPx, setNewMdPbPx] = useState(0)

  useEffect(() => {
    const calculatePadding = () => {
      const remInPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

      const currentOriginalPtPx = remInPx * originalPtRem
      const currentOriginalMdPtPx = remInPx * originalMdPtRem
      const currentOriginalPbPx = remInPx * originalPbRem
      const currentOriginalMdPbPx = remInPx * originalMdPbRem

      setNewPtPx(currentOriginalPtPx + headerHeightPx)
      setNewMdPtPx(currentOriginalMdPtPx + headerHeightPx)
      setNewPbPx(currentOriginalPbPx) // Keep original bottom padding
      setNewMdPbPx(currentOriginalMdPbPx)
    }

    calculatePadding()
    window.addEventListener("resize", calculatePadding)
    return () => window.removeEventListener("resize", calculatePadding)
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16 text-center">
          <h1 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Smart Contract Billing.
            <br />
            <span className="text-electric_indigo">Designed for the Multi-Chain Web3 Stack.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            DripPay gives you full control over recurring payments — no third parties, no invoices, just programmable
            logic on the chains you build on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold"
            >
              <Link href="/docs">
                <FileText className="mr-2 h-5 w-5" />
                Explore the Docs
              </Link>
            </Button>
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
          </div>
          <div className="relative mt-12 md:mt-16 max-w-4xl mx-auto h-64 md:h-80 lg:h-96 opacity-90 group">
            <Image
              src="/placeholder.svg?height=600&width=1000"
              alt="Smart Contract Flow Diagram"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 animate-pulse flex items-center justify-center">
              <ZoomIn className="h-12 w-12 text-ghost_white opacity-0 group-hover:opacity-75 transition-all duration-300 delay-150 scale-50 group-hover:scale-100" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
