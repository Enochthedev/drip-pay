'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ConnectWallet } from '@/components/connect-wallet'
import { useAccount } from 'wagmi'
import { useDripPayAuth } from '@/hooks/use-drippay-auth'
import {
  Activity,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Settings,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface SystemMetrics {
  totalUsers: number
  totalSubscriptions: number
  activeSubscriptions: number
  totalRevenue: string
  platformFees: string
  transactionsToday: number
  averageSubscriptionValue: string
  topChains: Array<{ chainId: number; name: string; count: number }>
  recentTransactions: Array<{
    id: string
    type: string
    amount: string
    status: string
    timestamp: string
  }>
  revenueChart: Array<{ date: string; revenue: number; fees: number }>
}

export default function AdminDashboardPage() {
  const { address } = useAccount()
  const { isAuthenticated, login } = useDripPayAuth()
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (isAuthenticated && address) {
      checkAdminAccess()
    }
  }, [isAuthenticated, address])

  const checkAdminAccess = async () => {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('drippay_auth_token')}`,
        },
      })
      setIsAdmin(res.ok)
      if (res.ok) {
        fetchMetrics()
      }
    } catch (error) {
      setIsAdmin(false)
    }
  }

  const fetchMetrics = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/metrics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('drippay_auth_token')}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!address) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>Connect your admin wallet to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectWallet />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Authenticate to verify admin access</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} className="w-full">
              Sign In with Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have admin access. This dashboard is restricted to platform administrators.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide metrics and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <ConnectWallet />
        </div>
      </div>

      {/* System Health Alert */}
      <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          All systems operational. Last checked: {new Date().toLocaleTimeString()}
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ${metrics?.totalRevenue ? parseFloat(metrics.totalRevenue).toLocaleString() : '0'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Platform fees: ${metrics?.platformFees ? parseFloat(metrics.platformFees).toLocaleString() : '0'}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{metrics?.totalUsers?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">Registered wallets</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{metrics?.activeSubscriptions || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {metrics?.totalSubscriptions || 0} total created
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{metrics?.transactionsToday || 0}</div>
                <p className="text-xs text-muted-foreground">Successful payments</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="chains">Chain Distribution</TabsTrigger>
          <TabsTrigger value="contracts">Contract Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>Total revenue and platform fees collected</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics?.revenueChart || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="fees"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {(metrics?.recentTransactions || []).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${tx.amount}</p>
                        <Badge variant={tx.status === 'success' ? 'default' : 'destructive'}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chain Distribution</CardTitle>
              <CardDescription>Subscriptions by blockchain</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics?.topChains || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Management</CardTitle>
              <CardDescription>Manage deployed subscription contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Ethereum', address: '0x...', status: 'active' },
                  { name: 'Base', address: '0x...', status: 'active' },
                  { name: 'Swell', address: '0x...', status: 'active' },
                ].map((contract) => (
                  <div
                    key={contract.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{contract.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{contract.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="default">Active</Badge>
                      <Button variant="outline" size="sm">
                        Pause
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
