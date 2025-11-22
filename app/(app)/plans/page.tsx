'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SubscribeModal } from '@/components/subscription/subscribe-modal'
import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/connect-wallet'
import { Clock, DollarSign, Users } from 'lucide-react'

interface Plan {
  id: string
  name: string
  description: string
  amount: string
  interval: number
  tokenSymbol: string
  tokenAddress: string
  decimals: number
  chainId: number
  creatorAddress: string
  creator: {
    name?: string
    address: string
  }
  subscriberCount?: number
}

export default function PlansPage() {
  const { address } = useAccount()
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/plans')
      if (!res.ok) throw new Error('Failed to fetch plans')
      const data = await res.json()
      setPlans(data)
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatInterval = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    if (days === 1) return 'Daily'
    if (days === 7) return 'Weekly'
    if (days === 30 || days === 31) return 'Monthly'
    if (days === 365) return 'Yearly'
    return `Every ${days} days`
  }

  const getChainName = (chainId: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      8453: 'Base',
      1923: 'Swell',
      137: 'Polygon',
      10: 'Optimism',
      42161: 'Arbitrum',
      11155111: 'Sepolia',
      84532: 'Base Sepolia',
    }
    return chains[chainId] || `Chain ${chainId}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Browse Subscription Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Browse Subscription Plans</h1>
          <p className="text-muted-foreground">
            Subscribe to your favorite creators and services with crypto
          </p>
        </div>
        <ConnectWallet />
      </div>

      {plans.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-xl text-muted-foreground mb-4">No plans available yet</p>
          <p className="text-sm text-muted-foreground">
            Check back later or create your own subscription plan
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <Badge variant="secondary">{getChainName(plan.chainId)}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <DollarSign className="h-6 w-6 text-muted-foreground" />
                  {plan.amount} {plan.tokenSymbol}
                  <span className="text-sm font-normal text-muted-foreground">
                    / {formatInterval(plan.interval)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{plan.subscriberCount || 0} subscribers</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Billed {formatInterval(plan.interval).toLowerCase()}</span>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="text-sm font-medium">
                    {plan.creator.name || `${plan.creatorAddress.slice(0, 6)}...${plan.creatorAddress.slice(-4)}`}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                {address ? (
                  <Button
                    className="w-full"
                    onClick={() => setSelectedPlan(plan)}
                    disabled={address.toLowerCase() === plan.creatorAddress.toLowerCase()}
                  >
                    {address.toLowerCase() === plan.creatorAddress.toLowerCase()
                      ? 'Your Plan'
                      : 'Subscribe Now'
                    }
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => {}}>
                    Connect Wallet to Subscribe
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedPlan && (
        <SubscribeModal
          plan={selectedPlan}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => {
            setSelectedPlan(null)
            // Optionally redirect to subscriptions page
          }}
        />
      )}
    </div>
  )
}
