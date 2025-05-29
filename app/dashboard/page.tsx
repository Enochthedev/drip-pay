import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Activity, CreditCard } from "lucide-react"

export default function DashboardPage() {
  // Placeholder data
  const stats = [
    {
      title: "Total Revenue (USD)",
      value: "$12,345.67",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      change: "+5.2% this month",
    },
    {
      title: "Active Subscriptions",
      value: "789",
      icon: <Users className="h-6 w-6 text-electric_indigo" />,
      change: "+32 new",
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$2,870.00",
      icon: <Activity className="h-6 w-6 text-drip_teal" />,
      change: "Stable",
    },
    {
      title: "Failed Payments",
      value: "12",
      icon: <CreditCard className="h-6 w-6 text-red-500" />,
      change: "Needs attention",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight_navy mb-8">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate_gray">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-midnight_navy">{stat.value}</div>
              <p className="text-xs text-slate_gray/70 pt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-midnight_navy">Recent Activity</CardTitle>
            <CardDescription className="text-slate_gray">Latest subscription events and payments.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent activity list */}
            <ul className="space-y-3">
              <li className="text-sm text-slate_gray">
                New subscription: <span className="font-medium text-electric_indigo">user_abc.eth</span> to 'Pro Plan'
              </li>
              <li className="text-sm text-slate_gray">
                Payment successful: <span className="font-medium text-drip_teal">0.5 ETH</span> from{" "}
                <span className="font-medium text-electric_indigo">user_xyz.eth</span>
              </li>
              <li className="text-sm text-slate_gray text-red-600">
                Payment failed: <span className="font-medium text-electric_indigo">user_123.eth</span> for 'Basic Plan'
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-midnight_navy">Subscription Growth</CardTitle>
            <CardDescription className="text-slate_gray">Visualize your active subscriber trends.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md">
            {/* Placeholder for a chart */}
            <p className="text-slate_gray/70">Chart placeholder</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Placeholder pages for other dashboard sections
// app/dashboard/subscriptions/page.tsx
// app/dashboard/analytics/page.tsx
// app/dashboard/settings/page.tsx
// You can create these files with basic content similar to DashboardPage
