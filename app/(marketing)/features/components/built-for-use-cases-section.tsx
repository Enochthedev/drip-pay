import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useCasePreviewsData } from "../data/use-case-previews-data"

export default function BuiltForUseCasesSection() {
  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_navy font-grotesk">
            Built For <span className="text-electric_indigo">Your Use Case</span>
          </h2>
          <p className="text-lg text-slate_gray mt-4 max-w-2xl mx-auto">
            DripPay is flexible enough to power a wide range of on-chain billing scenarios.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {useCasePreviewsData.map((useCase) => (
            <Card
              key={useCase.category}
              className="bg-white border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col text-center"
            >
              <CardHeader className="items-center">
                <div className="p-3 rounded-full bg-electric_indigo/10 mb-3 inline-block">
                  <useCase.icon className="h-8 w-8 text-electric_indigo" />
                </div>
                <CardTitle className="text-lg font-semibold text-midnight_navy font-grotesk">
                  {useCase.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate_gray text-sm">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" asChild className="bg-drip_teal hover:bg-drip_teal/90 text-white font-semibold">
            <Link href="/use-cases">
              See All Use Cases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
