"use client"

import { useState, useEffect } from "react"

const headerHeightPx = 80 // Approximate height of your sticky header
const originalPtRem = 7 // Original padding-top in rem (e.g., py-28 is roughly 7rem top)
const originalMdPtRem = 8 // Original md: padding-top in rem (e.g., md:py-32 is roughly 8rem top)
const originalPbRem = 7
const originalMdPbRem = 8

export default function PricingHero() {
  const [newPtPx, setNewPtPx] = useState(0)
  const [newMdPtPx, setNewMdPtPx] = useState(0)
  const [originalPbPx, setOriginalPbPx] = useState(0)
  const [originalMdPbPx, setOriginalMdPbPx] = useState(0)

  useEffect(() => {
    const calculatePadding = () => {
      const remInPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)

      const currentOriginalPtPx = originalPtRem * remInPx
      setNewPtPx(currentOriginalPtPx + headerHeightPx)

      const currentOriginalMdPtPx = originalMdPtRem * remInPx
      setNewMdPtPx(currentOriginalMdPtPx + headerHeightPx)

      setOriginalPbPx(originalPbRem * remInPx)
      setOriginalMdPbPx(originalMdPbRem * remInPx)
    }

    calculatePadding()
    window.addEventListener("resize", calculatePadding)
    return () => window.removeEventListener("resize", calculatePadding)
  }, [])

  if (newPtPx === 0) {
    // Still calculating or SSR
    return (
      <div
        style={{ height: `${(originalPtRem + originalPbRem) * 16 + headerHeightPx}px` }}
        className="bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo"
      />
    )
  }

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          .dynamic-hero-padding {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbPx}px !important;
          }
        }
      `}</style>
      <section
        className="dynamic-hero-padding relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden text-center"
        style={{
          marginTop: `-${headerHeightPx}px`,
          paddingTop: `${newPtPx}px`,
          paddingBottom: `${originalPbPx}px`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.03] animate-pulse">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGridPricing" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGridPricing)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk text-ghost_white mb-6 animate-fade-in-up">
            Transparent, Predictable Pricing
            <span className="block text-electric_indigo/90">Powered by Smart Contracts.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            Use DripPay free on any chain. Scale your billing volume, add dev tools, and get security-grade insights
            with our Pro and Enterprise plans.
          </p>
        </div>
      </section>
    </>
  )
}
