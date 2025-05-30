"use client"
import Image from "next/image"

export default function UseCasesHero() {
  // Constants for header overlap, similar to other hero sections
  const headerHeightPx = 65 // Assuming header height is approx 65px
  const originalPtRem = 5 // Base padding-top in rem (e.g., py-20 is 5rem)
  const originalMdPtRem = 7 // Base padding-top for md screens (e.g., md:py-28 is 7rem)
  const originalPbRem = 5 // Base padding-bottom in rem
  const originalMdPbRem = 7 // Base padding-bottom for md screens

  // Convert rem to px for calculation (assuming 1rem = 16px)
  const toPx = (rem: number) => rem * 16

  const newPtPx = toPx(originalPtRem) + headerHeightPx
  const newMdPtPx = toPx(originalMdPtRem) + headerHeightPx

  return (
    <section
      className="relative text-center overflow-hidden bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo text-ghost_white"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${toPx(originalPbRem)}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${toPx(originalMdPbRem)}px !important;
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk mb-6 animate-fade-in-up">
          One Billing Protocol. <span className="block sm:inline">Infinite Web3 Use Cases.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Whether you’re building a DAO tool, NFT platform, or premium community — DripPay makes it easy to get paid
          on-chain, again and again.
        </p>
        <div className="relative max-w-3xl mx-auto h-64 md:h-80 lg:h-96 animate-fade-in-up animation-delay-400">
          <Image
            src="/placeholder.svg?height=384&width=768"
            alt="DripPay Use Cases Diagram"
            layout="fill"
            objectFit="contain"
            className="opacity-90"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/10 via-transparent to-drip_teal/10 opacity-75 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
