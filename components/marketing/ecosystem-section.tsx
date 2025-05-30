import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EcosystemSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-midnight_navy">
          Part of the <span className="text-electric_indigo">Swell Ecosystem</span>
        </h2>
        <div className="flex justify-center items-center flex-wrap gap-4 mb-6 sm:mb-8">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20">
            <Image src="/placeholder.svg?height=80&width=80" alt="Swell Logo" layout="fill" objectFit="contain" />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-semibold bg-electric_indigo/10 text-electric_indigo px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium">
            Powered by Swell L2
          </span>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-slate_gray mb-6 sm:mb-8 max-w-xl mx-auto font-sans">
          DripPay is proud to build on Swell, leveraging its robust infrastructure for restaking-native financial tools.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer">
              Join our Discord <MessageSquare className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
