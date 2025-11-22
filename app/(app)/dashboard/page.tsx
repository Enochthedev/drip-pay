'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ConnectWallet } from '@/components/connect-wallet'
import { useAccount, useChainId } from 'wagmi'
import { useDripPayAuth } from '@/hooks/use-drippay-auth'
import { useSubscriptions } from '@/hooks/use-subscriptions'
import { DollarSign, TrendingUp, Users, Clock, ArrowUpRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface Analytics {
  totalRevenue: string
  monthlyRecurringRevenue: string
  totalSubscribers: number
  activeSubscribers: number
  churnRate: number
  averageSubscriptionValue: string
}

export default function DashboardPage() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { isAuthenticated, login, isLoading: authLoading } = useDripPayAuth()
  const { subscriptions: creatorSubscriptions, isLoading: subsLoading } = useSubscriptions('creator')

  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false)

  useEffect(() => {
    if (isAuthenticated && address) {
      fetchAnalytics()
    }
  }, [isAuthenticated, address])

  const fetchAnalytics = async () => {
    try {
      setIsLoadingAnalytics(true)
      const res = await fetch('/api/analytics/creator', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('drippay_auth_token')}`,
        },
      })
      if (res.ok) {
        const data = await res.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoadingAnalytics(false)
    }
  }

  if (!address) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to view your creator dashboard
            </CardDescription>
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
            <CardDescription>
              Sign a message to authenticate and access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} disabled={authLoading} className="w-full">
              {authLoading ? 'Signing in...' : 'Sign In with Wallet'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCurrency = (amount: string, symbol: string = 'USDC') => {
    return `${parseFloat(amount).toLocaleString()} ${symbol}`
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and track revenue
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/create-plan">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </Link>
          <ConnectWallet />
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {analytics?.totalRevenue ? formatCurrency(analytics.totalRevenue) : '$0'}
                </div>
                <p className="text-xs text-muted-foreground">All-time earnings</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {analytics?.monthlyRecurringRevenue
                    ? formatCurrency(analytics.monthlyRecurringRevenue)
                    : '$0'}
                </div>
                <p className="text-xs text-muted-foreground">Monthly recurring revenue</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {analytics?.activeSubscribers || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analytics?.totalSubscribers || 0} total
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Value</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {analytics?.averageSubscriptionValue
                    ? formatCurrency(analytics.averageSubscriptionValue)
                    : '$0'}
                </div>
                <p className="text-xs text-muted-foreground">Per subscription</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                Subscribers currently paying for your plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ) : creatorSubscriptions.filter((s) => s.isActive && !s.isPaused).length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active subscriptions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Create a plan to start earning recurring revenue
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {creatorSubscriptions
                    .filter((s) => s.isActive && !s.isPaused)
                    .map((subscription) => (
                      <div
                        key={subscription.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {subscription.subscriber.slice(0, 6)}...
                              {subscription.subscriber.slice(-4)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {subscription.plan?.name || 'Unknown Plan'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {subscription.amount} {subscription.plan?.name || ''}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Next payment:{' '}
                            {formatDistanceToNow(new Date(subscription.nextPayment * 1000), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paused">
          <Card>
            <CardHeader>
              <CardTitle>Paused Subscriptions</CardTitle>
              <CardDescription>
                Subscriptions that have been temporarily paused
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No paused subscriptions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Subscriptions</CardTitle>
              <CardDescription>
                Subscriptions that have been cancelled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No cancelled subscriptions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
