import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EcosystemSection() {
  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-midnight_navy">
          Part of the <span className="text-electric_indigo">Swell Ecosystem</span>
        </h2>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <Image src="/placeholder.svg?height=80&width=80" alt="Swell Logo" layout="fill" objectFit="contain" />
          </div>
          <span className="text-lg md:text-xl font-semibold bg-electric_indigo/10 text-electric_indigo px-4 py-2 rounded-full font-medium">
            Powered by Swell L2
          </span>
        </div>
        <p className="text-lg text-slate_gray/80 mb-8 max-w-xl mx-auto font-sans">
          DripPay is proud to build on Swell, leveraging its robust infrastructure for restaking-native financial tools.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo font-semibold text-lg px-8 py-3 shadow-md hover:shadow-lg"
          >
            <Link href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer">
              Join our Discord <MessageSquare className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
