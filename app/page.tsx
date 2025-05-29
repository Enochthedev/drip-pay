// Using new component names for clarity
import HeroNexaris from "@/components/landing/hero-nexaris"
import FeaturesNexaris from "@/components/landing/features-nexaris"
import SolutionNexaris from "@/components/landing/solution-nexaris"
import ProductsNexaris from "@/components/landing/products-nexaris"
import FooterNexaris from "@/components/landing/footer-nexaris"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DripPayNexarisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="absolute top-0 left-0 right-0 z-50 py-6 px-4 md:px-8">
        <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={120} height={30} />
      </header>
      <HeroNexaris />
      <FeaturesNexaris />
      <SolutionNexaris />
      <ProductsNexaris />
      {/* Call to Action Section (from Nexaris screenshot 5) */}
      <section className="py-20 md:py-32 bg-nex_primary_blue text-nex_text_light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?width=1920&height=1080"
            alt="Abstract background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <Image
              src="/images/drippay-logo.png"
              alt="DripPay Logo"
              width={80}
              height={20}
              className="mx-auto rounded-md p-1 bg-white/20 backdrop-blur-sm"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Unlock the future of payments</h2>
          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto text-nex_light_blue">
            Join the waitlist to unlock next-gen payments with DripPay.
          </p>
          <form className="max-w-md mx-auto flex items-center bg-white rounded-full p-1.5 shadow-lg">
            <Input
              type="email"
              placeholder="Your email"
              className="flex-grow bg-transparent border-none focus:ring-0 text-nex_deep_navy placeholder:text-slate-400 px-4 py-2.5"
              aria-label="Email for waitlist"
            />
            <Button
              type="submit"
              className="bg-nex_deep_navy hover:bg-nex_deep_navy/90 text-white rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Join waitlist
            </Button>
          </form>
        </div>
      </section>
      <FooterNexaris />
    </div>
  )
}
