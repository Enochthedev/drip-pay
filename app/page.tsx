import HeroSection from "@/components/landing/hero-section"
import WhyDripPaySection from "@/components/landing/why-drippay-section"
import UseCasesSection from "@/components/landing/use-cases-section"
import DeveloperPreviewSection from "@/components/landing/developer-preview-section"
import EcosystemSection from "@/components/landing/ecosystem-section"
import FooterSection from "@/components/landing/footer-section"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Removed bg/text classes, handled by body style */}
      <HeroSection />
      <main className="flex-grow">
        <WhyDripPaySection />
        <UseCasesSection />
        <DeveloperPreviewSection />
        <EcosystemSection />
      </main>
      <FooterSection />
    </div>
  )
}
