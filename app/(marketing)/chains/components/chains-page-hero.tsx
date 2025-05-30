"use client" // Required for style jsx and potentially constants if not hardcoded

import Image from "next/image"

export default function ChainsPageHero() {
  // Constants for header overlap, similar to landing page hero
  const headerHeightPx = 65 // Assuming header height is consistently 64px or similar
  const originalPtRem = 5 // Original desired top padding (e.g., py-20 -> 5rem)
  const originalMdPtRem = 7 // Original desired md top padding (e.g., md:py-28 -> 7rem)
  const originalPbRem = 5 // Original desired bottom padding
  const originalMdPbRem = 7 // Original desired md bottom padding

  // Convert rem to px for calculation (assuming 1rem = 16px)
  const originalPtPx = originalPtRem * 16
  const originalMdPtPx = originalMdPtRem * 16
  const originalPbPx = originalPbRem * 16
  const originalMdPbPx = originalMdPbRem * 16

  const newPtPx = originalPtPx + headerHeightPx
  const newMdPtPx = originalMdPtPx + headerHeightPx

  return (
    <section
      className="relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden text-center"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${originalPbPx}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbPx}px !important;
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk text-ghost_white mb-6">
          Multi-Chain Billing, <span className="text-electric_indigo">One Protocol.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          DripPay is built to work across the EVM ecosystem. Whether you’re building on Swell, Ethereum, or another
          chain — we’ve got you covered.
        </p>
        <div className="relative max-w-4xl mx-auto h-64 md:h-80 lg:h-96">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Abstract multi-chain network map with DripPay integrations"
            layout="fill"
            objectFit="contain"
            priority
            className="opacity-90" // Slightly increased opacity
          />
          {/* Optional: Add a subtle animated gradient overlay like in the main hero if desired for the visual */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
