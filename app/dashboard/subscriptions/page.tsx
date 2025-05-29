import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

// Placeholder data
const subscriptions = [
  {
    id: "sub_1",
    customer: "0x123...abc",
    plan: "Pro Tier",
    status: "Active",
    amount: "$49/mo",
    nextBilling: "2025-06-15",
    chain: "Swell",
  },
  {
    id: "sub_2",
    customer: "0x456...def",
    plan: "Starter Tier",
    status: "Active",
    amount: "Free",
    nextBilling: "N/A",
    chain: "Swell",
  },
  {
    id: "sub_3",
    customer: "0x789...ghi",
    plan: "Pro Tier",
    status: "Cancelled",
    amount: "$49/mo",
    nextBilling: "-",
    chain: "Swell",
  },
  {
    id: "sub_4",
    customer: "0xabc...123",
    plan: "Enterprise",
    status: "Active",
    amount: "Custom",
    nextBilling: "2025-06-01",
    chain: "Ethereum (Soon)",
  },
]

export default function SubscriptionsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-midnight_navy">Manage Subscriptions</h1>
        <Button className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white">
          <PlusCircle size={18} className="mr-2" /> Create New Plan
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-midnight_navy">Active & Past Subscriptions</CardTitle>
          <CardDescription className="text-slate_gray">View, modify, or cancel user subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell
                    className="font-medium text-electric_indigo truncate max-w-[100px] hover:underline cursor-pointer"
                    title={sub.customer}
                  >
                    {sub.customer}
                  </TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sub.status === "Active" ? "default" : "destructive"}
                      className={
                        sub.status === "Active"
                          ? "bg-green-500/20 text-green-700 border-green-500/30"
                          : "bg-red-500/20 text-red-700 border-red-500/30"
                      }
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sub.amount}</TableCell>
                  <TableCell>{sub.nextBilling}</TableCell>
                  <TableCell>{sub.chain}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="text-slate_gray hover:text-electric_indigo">
                      <Edit size={16} /> <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate_gray hover:text-red-600">
                      <Trash2 size={16} /> <span className="sr-only">Cancel</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
