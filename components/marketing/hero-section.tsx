"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
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
      {/* Apply responsive padding for medium screens using a wrapper or more complex style logic if needed,
          For simplicity in this QuickEdit, md specific padding is handled by overriding pt/pb below if necessary,
          but Tailwind classes in className would be cleaner if this was not a QuickEdit.
          The style prop here will set base padding. We can add md specific padding classes too.
      */}
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPtPx}px !important; /* md:pb-32 (8rem) */
          }
        }
      `}</style>
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
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
              <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={180} height={45} priority />
            </div>
            <h1 className="font-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-ghost_white">
              <span className="block">Automated Crypto Billing.</span>
              <span className="block text-electric_indigo">Built for Restakers.</span>
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
              Start on Swell. Scale anywhere. DripPay brings seamless, smart contract-based subscriptions to the next
              generation of Web3 products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-electric_indigo hover:bg-opacity-85 text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_4px_14px_0_rgba(90,72,242,0.39)] hover:shadow-[0_6px_20px_0_rgba(90,72,242,0.23)] transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link href="#launch">
                  Launch on Swell <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <Link href="#how-it-works">
                  See How It Works <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-48 sm:h-64 md:h-96 mt-4 md:mt-0">
            {/* Visual: Animated flow from wallet → smart contract → recurring payments */}
            <Image
              src="/placeholder.svg?height=384&width=512"
              alt="Animated flow of crypto payments"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/20 via-transparent to-drip_teal/20 opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
