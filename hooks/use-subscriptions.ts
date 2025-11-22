'use client'

import { useAccount, useChainId, useReadContract } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { type Address } from 'viem'
import { dripPaySubscriptionAbi } from '@/lib/abis/drip-pay-subscription'
import { chainConfig } from '@/lib/wagmi'
import { useDripPayAuth } from './use-drippay-auth'

interface Subscription {
  id: string
  subscriptionId: string
  subscriber: Address
  recipient: Address
  token: Address
  amount: string
  interval: number
  nextPayment: number
  isActive: boolean
  isPaused: boolean
  chainId: number
  createdAt: string
  plan?: {
    id: string
    name: string
    description: string
  }
}

export function useSubscriptions(type: 'subscriber' | 'creator' = 'subscriber') {
  const { address } = useAccount()
  const chainId = useChainId()
  const { getAuthHeaders } = useDripPayAuth()

  const subscriptionContract = chainConfig[chainId as keyof typeof chainConfig]?.subscriptionContract

  // Fetch subscriptions from backend API
  const { data: apiSubscriptions, isLoading: isApiLoading, refetch } = useQuery({
    queryKey: ['subscriptions', type, address],
    queryFn: async () => {
      if (!address) return []

      const endpoint = type === 'subscriber'
        ? `/api/subscriptions?subscriber=${address}`
        : `/api/subscriptions?creator=${address}`

      const res = await fetch(endpoint, {
        headers: getAuthHeaders(),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch subscriptions')
      }

      return res.json() as Promise<Subscription[]>
    },
    enabled: !!address,
  })

  // Fetch on-chain subscription IDs
  const { data: onChainSubscriptionIds } = useReadContract({
    address: subscriptionContract,
    abi: dripPaySubscriptionAbi,
    functionName: type === 'subscriber' ? 'getSubscriptionsBySubscriber' : 'getSubscriptionsByRecipient',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!subscriptionContract,
    },
  })

  return {
    subscriptions: apiSubscriptions || [],
    onChainIds: onChainSubscriptionIds || [],
    isLoading: isApiLoading,
    refetch,
  }
}

// Hook to get a single subscription details
export function useSubscription(subscriptionId: string) {
  const chainId = useChainId()
  const { getAuthHeaders } = useDripPayAuth()

  const subscriptionContract = chainConfig[chainId as keyof typeof chainConfig]?.subscriptionContract

  // Fetch from API
  const { data: apiData, isLoading: isApiLoading } = useQuery({
    queryKey: ['subscription', subscriptionId],
    queryFn: async () => {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
        headers: getAuthHeaders(),
      })

      if (!res.ok) {
        throw new Error('Failed to fetch subscription')
      }

      return res.json() as Promise<Subscription>
    },
    enabled: !!subscriptionId,
  })

  // Fetch on-chain data
  const { data: onChainData, isLoading: isChainLoading } = useReadContract({
    address: subscriptionContract,
    abi: dripPaySubscriptionAbi,
    functionName: 'subscriptions',
    args: apiData?.subscriptionId ? [BigInt(apiData.subscriptionId)] : undefined,
    query: {
      enabled: !!apiData?.subscriptionId && !!subscriptionContract,
    },
  })

  return {
    subscription: apiData,
    onChainData,
    isLoading: isApiLoading || isChainLoading,
  }
}

// Hook to check if a subscription payment is due
export function useIsSubscriptionDue(subscriptionId?: string) {
  const chainId = useChainId()
  const subscriptionContract = chainConfig[chainId as keyof typeof chainConfig]?.subscriptionContract

  const { data: isDue, refetch } = useReadContract({
    address: subscriptionContract,
    abi: dripPaySubscriptionAbi,
    functionName: 'isDue',
    args: subscriptionId ? [BigInt(subscriptionId)] : undefined,
    query: {
      enabled: !!subscriptionId && !!subscriptionContract,
    },
  })

  return {
    isDue: isDue || false,
    refetch,
  }
}
