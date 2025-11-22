'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ConnectWallet } from '@/components/connect-wallet'
import { useAccount } from 'wagmi'
import { useDripPayAuth } from '@/hooks/use-drippay-auth'
import { useSubscriptions } from '@/hooks/use-subscriptions'
import { useManageSubscription } from '@/hooks/use-manage-subscription'
import { AlertCircle, Package, Clock, DollarSign, Pause, Play, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function MySubscriptionsPage() {
  const { address } = useAccount()
  const { isAuthenticated, login } = useDripPayAuth()
  const { subscriptions, isLoading, refetch } = useSubscriptions('subscriber')
  const { pauseSubscription, resumeSubscription, cancelSubscription, isLoading: isManaging } =
    useManageSubscription()

  const [actionType, setActionType] = useState<'pause' | 'resume' | 'cancel' | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)

  if (!address) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-8 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to view your subscriptions
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
            <CardDescription>Authenticate to view your subscriptions</CardDescription>
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

  const handleAction = async () => {
    if (!selectedSubscription || !actionType) return

    let success = false
    switch (actionType) {
      case 'pause':
        success = await pauseSubscription(selectedSubscription)
        break
      case 'resume':
        success = await resumeSubscription(selectedSubscription)
        break
      case 'cancel':
        success = await cancelSubscription(selectedSubscription)
        break
    }

    if (success) {
      refetch()
    }

    setActionType(null)
    setSelectedSubscription(null)
  }

  const formatInterval = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    if (days === 1) return 'Daily'
    if (days === 7) return 'Weekly'
    if (days === 30 || days === 31) return 'Monthly'
    if (days === 365) return 'Yearly'
    return `Every ${days} days`
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Subscriptions</h1>
          <p className="text-muted-foreground">Manage your active subscriptions</p>
        </div>
        <ConnectWallet />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : subscriptions.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Subscriptions Yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't subscribed to any plans yet
          </p>
          <Button asChild>
            <a href="/plans">Browse Plans</a>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">
                    {subscription.plan?.name || 'Unknown Plan'}
                  </CardTitle>
                  <Badge
                    variant={
                      subscription.isPaused
                        ? 'secondary'
                        : subscription.isActive
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {subscription.isPaused ? 'Paused' : subscription.isActive ? 'Active' : 'Cancelled'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {subscription.plan?.description || 'No description available'}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-lg font-bold">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  {subscription.amount}
                  <span className="text-sm font-normal text-muted-foreground">
                    / {formatInterval(subscription.interval)}
                  </span>
                </div>

                {subscription.isActive && !subscription.isPaused && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Next payment{' '}
                      {formatDistanceToNow(new Date(subscription.nextPayment * 1000), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Creator</p>
                  <p className="text-sm font-medium">
                    {subscription.recipient.slice(0, 6)}...{subscription.recipient.slice(-4)}
                  </p>
                </div>

                {subscription.isActive && (
                  <div className="flex gap-2 pt-2">
                    {subscription.isPaused ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedSubscription(subscription.subscriptionId)
                          setActionType('resume')
                        }}
                        disabled={isManaging}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedSubscription(subscription.subscriptionId)
                          setActionType('pause')
                        }}
                        disabled={isManaging}
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedSubscription(subscription.subscriptionId)
                        setActionType('cancel')
                      }}
                      disabled={isManaging}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog open={!!actionType} onOpenChange={() => setActionType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'pause' && 'Pause Subscription?'}
              {actionType === 'resume' && 'Resume Subscription?'}
              {actionType === 'cancel' && 'Cancel Subscription?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'pause' &&
                'This will pause your subscription. You will not be charged until you resume it.'}
              {actionType === 'resume' &&
                'This will resume your subscription. The next payment will be processed according to the schedule.'}
              {actionType === 'cancel' &&
                'This action cannot be undone. You will lose access when the current billing period ends.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isManaging}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} disabled={isManaging}>
              {isManaging ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
