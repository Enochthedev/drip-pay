import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Rocket, Network } from "lucide-react"

export default function UseCasesCTA() {
  return (
    <section className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-midnight_navy mb-8">
          Ready to Build with <span className="text-electric_indigo">DripPay</span>?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <Button
            asChild
            size="lg"
            className="bg-electric_indigo hover:bg-opacity-85 text-ghost_white font-semibold text-lg px-8 py-3 shadow-[0_4px_14px_0_rgba(90,72,242,0.39)] hover:shadow-[0_6px_20px_0_rgba(90,72,242,0.23)] transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/docs">
              {" "}
              {/* Assuming /docs is the path */}
              Explore the Docs <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo hover:text-ghost_white font-semibold text-lg px-8 py-3 shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/#launch">
              {" "}
              {/* Assuming #launch is an ID on the homepage or a specific launch page */}
              Launch Now <Rocket className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-electric_indigo hover:bg-electric_indigo/10 hover:text-electric_indigo font-semibold text-lg px-8 py-3 transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/chains">
              See Supported Chains <Network className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
