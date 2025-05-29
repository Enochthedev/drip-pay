import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-ghost_white via-slate-50 to-electric_indigo/10 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-electric_indigo/10 rounded-full opacity-50 animate-pulse" />
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-drip_teal/5 rounded-full opacity-60 animate-pulse animation-delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
              <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={180} height={45} priority />
            </div>
            <h1 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-midnight_navy">
              <span className="block">Automated Crypto Billing.</span>
              <span className="block text-electric_indigo">Built for Restakers.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-slate_gray mb-8 max-w-xl mx-auto md:mx-0">
              Start on Swell. Scale anywhere. DripPay brings seamless, smart contract-based subscriptions to the next
              generation of Web3 products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold text-lg px-8 py-3 shadow-lg hover:shadow-glow-indigo transform transition-all duration-300 hover:scale-105"
              >
                <Link href="#launch">
                  Launch on Swell <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo font-semibold text-lg px-8 py-3 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <Link href="#how-it-works">
                  See How It Works <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96">
            <Image
              src="/placeholder.svg?height=384&width=512"
              alt="Animated flow of crypto payments"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-electric_indigo/5 via-transparent to-drip_teal/5 opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-subtle-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
