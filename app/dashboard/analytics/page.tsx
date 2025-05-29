import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react" // Placeholder icons for chart types

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight_navy mb-8">Subscription Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-midnight_navy">MRR Growth</CardTitle>
            <CardDescription className="text-slate_gray">Monthly Recurring Revenue trend.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center bg-slate-50 rounded-md">
            <LineChart className="h-16 w-16 text-slate_gray/50" />
            <p className="text-slate_gray/70 ml-2">Line chart placeholder</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-midnight_navy">Active Subscribers</CardTitle>
            <CardDescription className="text-slate_gray">Total active users over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center bg-slate-50 rounded-md">
            <BarChart className="h-16 w-16 text-slate_gray/50" />
            <p className="text-slate_gray/70 ml-2">Bar chart placeholder</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-midnight_navy">Plan Distribution</CardTitle>
            <CardDescription className="text-slate_gray">Breakdown of subscribers by plan.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center bg-slate-50 rounded-md">
            <PieChart className="h-16 w-16 text-slate_gray/50" />
            <p className="text-slate_gray/70 ml-2">Pie chart placeholder</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-midnight_navy">Detailed Metrics</CardTitle>
          <CardDescription className="text-slate_gray">
            Further breakdowns and data points will be available here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate_gray/80">Churn rate, LTV, payment success rates, etc.</p>
        </CardContent>
      </Card>
    </div>
  )
}
