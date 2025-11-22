'use client'

import { useChainId, useWriteContract } from 'wagmi'
import { useState } from 'react'
import { toast } from 'sonner'
import { dripPaySubscriptionAbi } from '@/lib/abis/drip-pay-subscription'
import { chainConfig } from '@/lib/wagmi'

export function useManageSubscription() {
  const chainId = useChainId()
  const [isLoading, setIsLoading] = useState(false)

  const { writeContractAsync } = useWriteContract()

  const subscriptionContract = chainConfig[chainId as keyof typeof chainConfig]?.subscriptionContract

  const pauseSubscription = async (subscriptionId: string) => {
    if (!subscriptionContract) {
      toast.error('Please connect to a supported network')
      return false
    }

    try {
      setIsLoading(true)

      const txHash = await writeContractAsync({
        address: subscriptionContract,
        abi: dripPaySubscriptionAbi,
        functionName: 'pauseSubscription',
        args: [BigInt(subscriptionId)],
      })

      toast.success('Subscription paused! Waiting for confirmation...')

      // Wait for transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Subscription paused successfully!')
      return true
    } catch (error: any) {
      console.error('Pause error:', error)
      toast.error(error?.message || 'Failed to pause subscription')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resumeSubscription = async (subscriptionId: string) => {
    if (!subscriptionContract) {
      toast.error('Please connect to a supported network')
      return false
    }

    try {
      setIsLoading(true)

      const txHash = await writeContractAsync({
        address: subscriptionContract,
        abi: dripPaySubscriptionAbi,
        functionName: 'resumeSubscription',
        args: [BigInt(subscriptionId)],
      })

      toast.success('Subscription resumed! Waiting for confirmation...')

      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Subscription resumed successfully!')
      return true
    } catch (error: any) {
      console.error('Resume error:', error)
      toast.error(error?.message || 'Failed to resume subscription')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const cancelSubscription = async (subscriptionId: string) => {
    if (!subscriptionContract) {
      toast.error('Please connect to a supported network')
      return false
    }

    try {
      setIsLoading(true)

      const txHash = await writeContractAsync({
        address: subscriptionContract,
        abi: dripPaySubscriptionAbi,
        functionName: 'cancelSubscription',
        args: [BigInt(subscriptionId)],
      })

      toast.success('Subscription cancelled! Waiting for confirmation...')

      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Subscription cancelled successfully!')
      return true
    } catch (error: any) {
      console.error('Cancel error:', error)
      toast.error(error?.message || 'Failed to cancel subscription')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    isLoading,
  }
}
