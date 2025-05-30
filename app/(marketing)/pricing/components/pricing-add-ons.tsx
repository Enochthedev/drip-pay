import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addOnsData } from "../data/pricing-data.tsx"
import { PlusCircle } from "lucide-react"

export default function PricingAddOns() {
  if (!addOnsData || addOnsData.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-midnight_navy mb-4">Optional Add-Ons</h2>
          <p className="text-lg text-slate_gray">Enhance your DripPay experience with these powerful additions.</p>
        </div>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <Table className="min-w-[600px] border border-slate-200 rounded-lg shadow-lg bg-white">
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="p-4 text-left text-sm font-semibold text-midnight_navy">Add-On</TableHead>
                <TableHead className="p-4 text-center text-sm font-semibold text-midnight_navy">Price</TableHead>
                <TableHead className="p-4 text-center text-sm font-semibold text-midnight_navy">Available On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addOnsData.map((addOn, index) => (
                <TableRow key={index}>
                  <TableCell className="p-4 font-medium text-midnight_navy/90">
                    <div className="flex items-center">
                      <PlusCircle className="h-5 w-5 mr-2 text-drip_teal flex-shrink-0" />
                      {addOn.name}
                    </div>
                    {addOn.description && <p className="text-xs text-slate-500 mt-1 ml-7">{addOn.description}</p>}
                  </TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">{addOn.price}</TableCell>
                  <TableCell className="p-4 text-slate_gray text-center">{addOn.availableOn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
