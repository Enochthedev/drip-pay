import FeaturesHero from "./components/features-hero"
import CoreFeaturesSection from "./components/core-features-section"
import HowItWorksSection from "./components/how-it-works-section"
import BuiltForUseCasesSection from "./components/built-for-use-cases-section"
import SecurityReliabilitySection from "./components/security-reliability-section"
import FeaturesCTA from "./components/features-cta"

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <CoreFeaturesSection />
      <HowItWorksSection />
      <BuiltForUseCasesSection />
      <SecurityReliabilitySection />
      <FeaturesCTA />
    </>
  )
}
