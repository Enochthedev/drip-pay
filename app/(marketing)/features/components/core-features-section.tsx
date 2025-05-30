import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coreFeaturesData } from "../data/core-features-data"

export default function CoreFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_navy font-grotesk">
            What Makes <span className="text-electric_indigo">DripPay</span> Different?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeaturesData.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center md:text-left"
            >
              <CardHeader className="items-center md:items-start">
                <div className="p-3 rounded-full bg-electric_indigo/10 mb-4 inline-block">
                  <feature.icon className="h-8 w-8 text-electric_indigo" />
                </div>
                <CardTitle className="text-xl font-semibold text-midnight_navy font-grotesk">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate_gray">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
