import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Layers, Bitcoin, Settings } from "lucide-react" // Example icons
import Image from "next/image"
import Link from "next/link"

const chainIcons = [
  { name: "Swell", icon: <Settings className="h-6 w-6 text-chain_swell" />, color: "text-chain_swell" }, // Placeholder for Swell
  { name: "Ethereum", icon: <Bitcoin className="h-6 w-6 text-blue-400" />, color: "text-blue-400" }, // Placeholder
  { name: "Arbitrum", icon: <Layers className="h-6 w-6 text-sky-400" />, color: "text-sky-400" }, // Placeholder
]

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 bg-deep_neutral overflow-hidden glow-effect">
      <div className="absolute inset-0 opacity-[0.03]">
        {/* Subtle grid or dot pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="subtleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(90, 72, 242, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subtleGrid)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-8">
          <Image
            src="/images/drippay-logo.png"
            alt="DripPay Logo"
            width={200}
            height={50}
            priority
            className="mx-auto"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-light_neutral">
          Crypto Billing{" "}
          <span className="block md:inline">
            Made for <span className="text-accent_primary">Chains.</span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-light_neutral/80 mb-10 max-w-2xl mx-auto">
          Automate recurring payments with smart contracts. DripPay works across EVM chains — starting with Swell, and
          expanding across Web3.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-accent_primary hover:bg-opacity-85 text-light_neutral font-semibold text-lg px-8 py-3 shadow-glow-primary transform transition-all duration-300 hover:scale-105"
          >
            <Link href="#start-billing">
              Start Billing <Zap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent_secondary text-accent_secondary hover:bg-accent_secondary hover:text-deep_neutral font-semibold text-lg px-8 py-3 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="#supported-chains">
              See Chains We Support <ChevronDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="relative h-48 md:h-64 max-w-3xl mx-auto mb-8">
          <Image
            src="/placeholder.svg?height=256&width=768"
            alt="Animated flow: Wallet -> Contract -> Recurring Payment"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-center items-center space-x-4 md:space-x-6">
          <span className="text-sm text-light_neutral/70 mr-2">Compatible with:</span>
          {chainIcons.map((item) => (
            <div
              key={item.name}
              className={`flex items-center space-x-1.5 p-2 rounded-md bg-card_neutral/50 border border-border_neutral hover:border-accent_primary/50 transition-colors`}
            >
              {item.icon}
              <span className={`text-xs font-medium ${item.color}`}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
