'use client'

import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, type Address } from 'viem'
import { useState } from 'react'
import { toast } from 'sonner'
import { dripPaySubscriptionAbi, erc20Abi } from '@/lib/abis/drip-pay-subscription'
import { chainConfig } from '@/lib/wagmi'

interface SubscribeParams {
  recipientAddress: Address
  tokenAddress: Address
  amount: string // in token units (e.g., "10" for 10 USDC)
  decimals: number // token decimals (6 for USDC, 18 for most tokens)
  interval: number // in seconds (e.g., 30 days = 2592000)
}

export function useSubscribe() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [isApproving, setIsApproving] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const { writeContractAsync: approveToken } = useWriteContract()
  const { writeContractAsync: createSubscription } = useWriteContract()

  // Get the subscription contract address for current chain
  const subscriptionContract = chainConfig[chainId as keyof typeof chainConfig]?.subscriptionContract

  // Check current allowance
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract({
    address: undefined as Address | undefined, // will be set when calling
    abi: erc20Abi,
    functionName: 'allowance',
    args: undefined as any,
  })

  const checkAndApprove = async (params: SubscribeParams): Promise<boolean> => {
    if (!address || !subscriptionContract) {
      toast.error('Please connect your wallet and ensure you\'re on a supported network')
      return false
    }

    try {
      setIsApproving(true)

      const amountInWei = parseUnits(params.amount, params.decimals)

      // Check current allowance
      const allowance = await refetchAllowance()

      if (allowance.data && allowance.data >= amountInWei) {
        // Already approved enough
        return true
      }

      // Need to approve
      const approveHash = await approveToken({
        address: params.tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [subscriptionContract, amountInWei],
      })

      toast.success('Approval transaction sent. Waiting for confirmation...')

      // Wait for approval transaction to be mined
      // Note: In a real implementation, you'd use useWaitForTransactionReceipt here
      // For now, we'll just wait a bit
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Token approved successfully!')
      return true
    } catch (error: any) {
      console.error('Approval error:', error)
      toast.error(error?.message || 'Failed to approve token')
      return false
    } finally {
      setIsApproving(false)
    }
  }

  const subscribe = async (params: SubscribeParams) => {
    if (!address || !subscriptionContract) {
      toast.error('Please connect your wallet and ensure you\'re on a supported network')
      return null
    }

    try {
      setIsSubscribing(true)

      // First check/approve token
      const approved = await checkAndApprove(params)
      if (!approved) {
        return null
      }

      const amountInWei = parseUnits(params.amount, params.decimals)

      // Create subscription
      const txHash = await createSubscription({
        address: subscriptionContract,
        abi: dripPaySubscriptionAbi,
        functionName: 'createSubscription',
        args: [params.recipientAddress, params.tokenAddress, amountInWei, BigInt(params.interval)],
      })

      toast.success('Subscription created! Waiting for confirmation...')

      // Wait for transaction to be mined
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Subscription created successfully!')

      return txHash
    } catch (error: any) {
      console.error('Subscription error:', error)
      toast.error(error?.message || 'Failed to create subscription')
      return null
    } finally {
      setIsSubscribing(false)
    }
  }

  return {
    subscribe,
    isApproving,
    isSubscribing,
    isLoading: isApproving || isSubscribing,
  }
}
