import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCasesData, type UseCaseCategory, type UseCaseItem } from "../data/use-cases-data"
import { Separator } from "@/components/ui/separator"

export default function CategoryGridSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {useCasesData.map((category: UseCaseCategory) => (
            <Card
              key={category.id}
              className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-electric_indigo/10 text-electric_indigo">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-grotesk text-midnight_navy">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex-grow">
                <ul className="space-y-5">
                  {category.useCases.map((item: UseCaseItem, index: number) => (
                    <li key={item.useCase}>
                      <div className="flex flex-col sm:flex-row sm:gap-4">
                        <h4 className="text-lg font-semibold text-slate-800 font-sans sm:w-1/3 mb-1 sm:mb-0">
                          {item.useCase}
                        </h4>
                        <p className="text-slate_gray text-base sm:w-2/3">{item.description}</p>
                      </div>
                      {index < category.useCases.length - 1 && <Separator className="my-4 bg-slate-200" />}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
