import HeroSection from "@/components/landing/hero-section-v1"
import WhyDripPaySection from "@/components/landing/why-drippay-section-v1"
import UseCasesSection from "@/components/landing/use-cases-section-v1"
import DeveloperPreviewSection from "@/components/landing/developer-preview-section-v1"
import EcosystemSection from "@/components/landing/ecosystem-section-v1"
import FooterSection from "@/components/landing/footer-section-v1"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-ghost_white text-slate_gray">
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
