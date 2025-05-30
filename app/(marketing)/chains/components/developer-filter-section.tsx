// Placeholder for v0.5+ feature
import { allPossibleFeatures } from "../data/chain-data"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DeveloperFilterSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-900 border-y border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-grotesk font-bold text-ghost_white mb-3 text-center">Developer Quick Check</h2>
        <p className="text-slate-400 text-center mb-10 max-w-xl mx-auto">
          Filter by features to find the perfect chain for your needs. (Full filtering coming in a future update)
        </p>
        <div className="max-w-3xl mx-auto bg-slate-800/50 p-6 md:p-8 rounded-lg border border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {allPossibleFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2.5 opacity-60">
                <Checkbox
                  id={`feature-${feature.id}`}
                  disabled
                  className="border-slate-600 data-[state=checked]:bg-electric_indigo data-[state=checked]:border-electric_indigo cursor-not-allowed"
                />
                <Label htmlFor={`feature-${feature.id}`} className="text-sm text-slate-300 cursor-not-allowed">
                  {feature.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-8">
          Note: This section is a preview. Detailed feature support will be shown per chain and filtering will be
          enabled soon.
        </p>
      </div>
    </section>
  )
}
