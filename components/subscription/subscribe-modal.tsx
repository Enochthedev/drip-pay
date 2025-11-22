'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react'
import { useSubscribe } from '@/hooks/use-subscribe'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import type { Address } from 'viem'

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
}

interface SubscribeModalProps {
  plan: Plan
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

enum Step {
  CONFIRM = 'confirm',
  SWITCH_NETWORK = 'switch_network',
  APPROVE = 'approve',
  SUBSCRIBE = 'subscribe',
  SUCCESS = 'success',
  ERROR = 'error',
}

export function SubscribeModal({ plan, isOpen, onClose, onSuccess }: SubscribeModalProps) {
  const { address } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { subscribe, isApproving, isSubscribing } = useSubscribe()

  const [currentStep, setCurrentStep] = useState<Step>(Step.CONFIRM)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const needsNetworkSwitch = chainId !== plan.chainId

  const formatInterval = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    if (days === 1) return 'daily'
    if (days === 7) return 'weekly'
    if (days === 30 || days === 31) return 'monthly'
    if (days === 365) return 'yearly'
    return `every ${days} days`
  }

  const handleSwitchNetwork = async () => {
    try {
      setError(null)
      await switchChain({ chainId: plan.chainId })
      setCurrentStep(Step.APPROVE)
    } catch (err: any) {
      setError(err.message || 'Failed to switch network')
      setCurrentStep(Step.ERROR)
    }
  }

  const handleSubscribe = async () => {
    if (!address) {
      setError('Please connect your wallet')
      return
    }

    try {
      setError(null)
      setCurrentStep(Step.APPROVE)

      const hash = await subscribe({
        recipientAddress: plan.creatorAddress as Address,
        tokenAddress: plan.tokenAddress as Address,
        amount: plan.amount,
        decimals: plan.decimals,
        interval: plan.interval,
      })

      if (hash) {
        setTxHash(hash)
        setCurrentStep(Step.SUCCESS)
        onSuccess?.()
      } else {
        throw new Error('Subscription failed')
      }
    } catch (err: any) {
      console.error('Subscribe error:', err)
      setError(err.message || 'Failed to subscribe')
      setCurrentStep(Step.ERROR)
    }
  }

  const handleConfirm = () => {
    if (needsNetworkSwitch) {
      setCurrentStep(Step.SWITCH_NETWORK)
      handleSwitchNetwork()
    } else {
      handleSubscribe()
    }
  }

  const handleClose = () => {
    setCurrentStep(Step.CONFIRM)
    setError(null)
    setTxHash(null)
    onClose()
  }

  const getStepIcon = (step: Step) => {
    if (currentStep === step && (isApproving || isSubscribing)) {
      return <Loader2 className="h-5 w-5 animate-spin text-primary" />
    }
    if (
      (step === Step.APPROVE && (currentStep === Step.SUBSCRIBE || currentStep === Step.SUCCESS)) ||
      (step === Step.SUBSCRIBE && currentStep === Step.SUCCESS)
    ) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentStep === Step.SUCCESS ? '🎉 Subscription Created!' : `Subscribe to ${plan.name}`}
          </DialogTitle>
          <DialogDescription>
            {currentStep === Step.CONFIRM &&
              `You're about to subscribe for ${plan.amount} ${plan.tokenSymbol} ${formatInterval(plan.interval)}`}
            {currentStep === Step.SWITCH_NETWORK && 'Please switch to the correct network'}
            {(currentStep === Step.APPROVE || currentStep === Step.SUBSCRIBE) && 'Processing your subscription...'}
            {currentStep === Step.SUCCESS && 'Your subscription has been created successfully!'}
            {currentStep === Step.ERROR && 'Something went wrong'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {currentStep === Step.CONFIRM && (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Amount</span>
                <span className="text-sm">
                  {plan.amount} {plan.tokenSymbol}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Frequency</span>
                <span className="text-sm capitalize">{formatInterval(plan.interval)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Network</span>
                <span className="text-sm">{getChainName(plan.chainId)}</span>
              </div>
              {needsNetworkSwitch && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You need to switch to {getChainName(plan.chainId)} network to subscribe
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {(currentStep === Step.APPROVE || currentStep === Step.SUBSCRIBE) && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {getStepIcon(Step.APPROVE)}
                  <span className="text-sm font-medium">
                    Approve {plan.tokenSymbol} spending
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {getStepIcon(Step.SUBSCRIBE)}
                  <span className="text-sm font-medium">Create subscription</span>
                </div>
              </div>
              <Progress
                value={currentStep === Step.APPROVE ? 50 : 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground text-center">
                Please confirm the transactions in your wallet
              </p>
            </div>
          )}

          {currentStep === Step.SUCCESS && txHash && (
            <div className="space-y-3">
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Your subscription is now active! Payments will be processed automatically {formatInterval(plan.interval)}.
                </AlertDescription>
              </Alert>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <p className="text-xs font-mono break-all">{txHash}</p>
              </div>
            </div>
          )}

          {currentStep === Step.ERROR && error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          {currentStep === Step.CONFIRM && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={!address}>
                {needsNetworkSwitch ? 'Switch Network & Subscribe' : 'Confirm Subscription'}
              </Button>
            </>
          )}

          {(currentStep === Step.APPROVE || currentStep === Step.SUBSCRIBE) && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isApproving ? 'Approving tokens...' : 'Creating subscription...'}
            </Button>
          )}

          {currentStep === Step.SUCCESS && (
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          )}

          {currentStep === Step.ERROR && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubscribe}>
                Try Again
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
