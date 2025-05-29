import type React from "react"
import FooterSection from "@/components/marketing/footer-section"
import Navbar from "@/components/marketing/navbar" // We'll create this

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-ghost_white text-slate_gray">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <FooterSection />
    </div>
  )
}
