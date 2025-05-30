import type React from "react"
import FooterSection from "@/components/marketing/footer-section"
import Header from "@/components/marketing/header"
import { ScrollToTop } from "./scroll-to-top"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-ghost_white text-slate_gray">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">{children}</main>
      <FooterSection />
    </div>
  )
}
