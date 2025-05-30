import { Quote } from "lucide-react"

export default function CaseStudySpotlight() {
  return (
    <section className="py-16 md:py-24 bg-midnight_navy text-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto p-8 md:p-12 border-2 border-electric_indigo/50 rounded-xl shadow-2xl bg-slate-800/30 relative">
          <Quote className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-electric_indigo/40 opacity-50" />
          <Quote className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 h-16 w-16 text-electric_indigo/40 opacity-50" />

          <h3 className="text-2xl md:text-3xl font-grotesk font-semibold mb-6">Case Study Spotlight</h3>
          <blockquote className="text-xl md:text-2xl font-sans italic text-slate-300 mb-6">
            “How a DAO used DripPay to automate contributor billing across 120 wallets.”
          </blockquote>
          <p className="text-sm text-slate-400">
            (Placeholder for future real stories, testimonials, or detailed quote cards)
          </p>
        </div>
      </div>
    </section>
  )
}
