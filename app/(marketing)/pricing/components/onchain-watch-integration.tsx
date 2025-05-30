import Image from "next/image"
import { onchainWatchFeaturesList } from "../data/pricing-data.tsx"

export default function OnchainWatchIntegration() {
  return (
    <section className="py-16 md:py-24 bg-midnight_navy text-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Image
            src="https://wcx4daekjjbukzxg.public.blob.vercel-storage.com/external/logo-dark-DUVQzpQkXNLyYNVvxQ9Q8W30YXFIIv.png"
            alt="Onchain Watch Logo"
            width={180} // Adjusted for potential wordmark style
            height={45} // Assuming roughly 4:1 aspect ratio
            className="mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk mb-4">
            Security First. <span className="text-drip_teal">Always.</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Enterprise subscribers get real-time contract monitoring via Onchain Watch — receive alerts for:
          </p>
          <ul className="space-y-3 text-left max-w-md mx-auto mb-10">
            {onchainWatchFeaturesList.map((feature, index) => (
              <li key={index} className="flex items-start">
                <feature.Icon className="h-6 w-6 mr-3 mt-1 text-drip_teal flex-shrink-0" />
                <span className="text-slate-300">{feature.text}</span>
              </li>
            ))}
          </ul>
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg shadow-xl">
            <p className="text-xl font-semibold text-drip_teal italic">
              “It’s like having an on-chain auditor watching your protocol 24/7.”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
