import HeroSection from "@/components/marketing/hero-section"
import WhyDripPaySection from "@/components/marketing/why-drippay-section"
import UseCasesSection from "@/components/marketing/use-cases-section"
import DeveloperPreviewSection from "@/components/marketing/developer-preview-section"
import EcosystemSection from "@/components/marketing/ecosystem-section"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <main className="flex-grow">
        <WhyDripPaySection />
        <UseCasesSection />
        <DeveloperPreviewSection />
        <EcosystemSection />
      </main>
    </div>
  )
}
