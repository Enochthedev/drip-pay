import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqData } from "../data/pricing-data.tsx"
import { HelpCircle } from "lucide-react"

export default function PricingFaq() {
  if (!faqData || faqData.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-electric_indigo" />
            <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-midnight_navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
                <AccordionTrigger className="py-6 text-lg font-semibold text-midnight_navy/90 hover:text-electric_indigo text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-slate_gray text-base">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
