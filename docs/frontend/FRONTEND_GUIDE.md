# DripPay Frontend Integration Guide

Complete guide for building a frontend application with DripPay's blockchain subscription system.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Authentication](#authentication)
3. [Subscription Plans](#subscription-plans)
4. [Creating Subscriptions](#creating-subscriptions)
5. [Managing Subscriptions](#managing-subscriptions)
6. [Payment Flow](#payment-flow)
7. [UI/UX Best Practices](#uiux-best-practices)
8. [Example Components](#example-components)

## Quick Start

### Install Dependencies

```bash
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
```

### Configure WalletConnect

```typescript
// lib/wagmi-config.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia, baseSepolia } from 'wagmi/chains'

// Custom chain for Swell
const swellTestnet = {
  id: 1923,
  name: 'Swell Testnet',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://swell-testnet.alt.technology'] },
    public: { http: ['https://swell-testnet.alt.technology'] },
  },
  blockExplorers: {
    default: { name: 'Swell Explorer', url: 'https://explorer-testnet.swell.network' },
  },
}

export const config = getDefaultConfig({
  appName: 'DripPay',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia, baseSepolia, swellTestnet],
  ssr: true,
})
```

### Wrap Your App

```typescript
// app/providers.tsx
'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi-config'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.Node }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## Authentication

DripPay uses wallet-based authentication with signature verification.

### Complete Auth Flow

```typescript
// hooks/useAuth.ts
import { useAccount, useSignMessage } from 'wagmi'
import { useState } from 'react'

export function useAuth() {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [token, setToken] = useState<string | null>(null)

  const login = async () => {
    if (!address) throw new Error('No wallet connected')

    // 1. Get nonce from backend
    const nonceRes = await fetch(`/api/auth/nonce?address=${address}`)
    const { nonce } = await nonceRes.json()

    // 2. Create message to sign
    const message = `Welcome to DripPay!

Sign this message to authenticate your wallet.

Wallet: ${address}
Nonce: ${nonce}

This request will not trigger any blockchain transaction or cost any gas fees.`

    // 3. Sign message with wallet
    const signature = await signMessageAsync({ message })

    // 4. Verify signature and get JWT
    const verifyRes = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, signature }),
    })

    const { token: jwt } = await verifyRes.json()

    // 5. Store token
    setToken(jwt)
    localStorage.setItem('drippay_token', jwt)

    return jwt
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('drippay_token')
  }

  return { address, token, login, logout }
}
```

### Auth Component

```typescript
// components/ConnectButton.tsx
'use client'

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export function ConnectButton() {
  const { address, token, login, logout } = useAuth()

  useEffect(() => {
    // Auto-login if wallet connected but no token
    if (address && !token) {
      login().catch(console.error)
    }
  }, [address, token])

  return (
    <div>
      <RainbowConnectButton />
      {address && !token && (
        <button onClick={login}>Sign In</button>
      )}
      {token && (
        <button onClick={logout}>Sign Out</button>
      )}
    </div>
  )
}
```

## Subscription Plans

### Fetching Plans

```typescript
// hooks/usePlans.ts
import { useQuery } from '@tanstack/react-query'

export function usePlans(chainId?: number) {
  return useQuery({
    queryKey: ['plans', chainId],
    queryFn: async () => {
      const url = chainId
        ? `/api/plans?chainId=${chainId}`
        : '/api/plans'

      const res = await fetch(url)
      return res.json()
    },
  })
}
```

### Plans Display Component

```typescript
// components/PlanCard.tsx
interface PlanCardProps {
  plan: {
    id: string
    name: string
    description: string
    price: string
    currency: string
    interval: string
    chainId: number
  }
  onSubscribe: () => void
}

export function PlanCard({ plan, onSubscribe }: PlanCardProps) {
  // Convert price to readable format
  const decimals = plan.currency === 'USDC' ? 6 : 18
  const displayPrice = (Number(plan.price) / 10 ** decimals).toFixed(2)

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="text-gray-600 mt-2">{plan.description}</p>

      <div className="mt-4">
        <span className="text-3xl font-bold">{displayPrice}</span>
        <span className="text-gray-600"> {plan.currency}</span>
        <span className="text-gray-600"> / {plan.interval}</span>
      </div>

      <button
        onClick={onSubscribe}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Subscribe Now
      </button>
    </div>
  )
}
```

## Creating Subscriptions

Complete flow: Approve tokens → Create on-chain subscription → Register in backend

```typescript
// hooks/useSubscribe.ts
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'

export function useSubscribe() {
  const { writeContractAsync } = useWriteContract()

  const subscribe = async (plan: any) => {
    // 1. Approve tokens
    const tokenAddress = plan.tokenAddress as `0x${string}`
    const contractAddress = getSubscriptionContract(plan.chainId) as `0x${string}`

    const approveTx = await writeContractAsync({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [contractAddress, parseUnits('1000000', 6)], // Approve large amount
    })

    // Wait for approval
    await waitForTransaction(approveTx)

    // 2. Create subscription on-chain
    const subTx = await writeContractAsync({
      address: contractAddress,
      abi: SUBSCRIPTION_ABI,
      functionName: 'createSubscription',
      args: [
        plan.creator.address, // recipient
        tokenAddress,
        BigInt(plan.price),
        getIntervalSeconds(plan.interval),
      ],
    })

    // Wait for subscription creation
    const receipt = await waitForTransaction(subTx)

    // 3. Get subscription ID from event logs
    const subscriptionId = parseSubscriptionId(receipt.logs)

    // 4. Register in backend
    const token = localStorage.getItem('drippay_token')
    await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        planId: plan.id,
        txHash: subTx,
        subscriptionId: subscriptionId.toString(),
      }),
    })

    return subscriptionId
  }

  return { subscribe }
}

function getIntervalSeconds(interval: string): bigint {
  const intervals: Record<string, bigint> = {
    daily: BigInt(86400),
    weekly: BigInt(604800),
    monthly: BigInt(2592000),
    yearly: BigInt(31536000),
  }
  return intervals[interval] || BigInt(2592000)
}
```

### Subscribe Modal Component

```typescript
// components/SubscribeModal.tsx
'use client'

import { useState } from 'react'
import { useSubscribe } from '@/hooks/useSubscribe'

export function SubscribeModal({ plan, onClose }: any) {
  const { subscribe } = useSubscribe()
  const [step, setStep] = useState<'approve' | 'subscribe' | 'done'>('approve')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    try {
      setLoading(true)

      // Show approval step
      setStep('approve')
      await new Promise(r => setTimeout(r, 1000)) // UX delay

      // Show subscribe step
      setStep('subscribe')

      const subId = await subscribe(plan)

      // Done!
      setStep('done')

      setTimeout(() => {
        onClose()
        window.location.href = '/dashboard'
      }, 2000)
    } catch (error) {
      console.error('Subscribe error:', error)
      alert('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold">Subscribe to {plan.name}</h2>

        <div className="mt-6 space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-4">
            <Step active={step === 'approve'} done={step !== 'approve'}>
              1. Approve tokens
            </Step>
            <Step active={step === 'subscribe'} done={step === 'done'}>
              2. Create subscription
            </Step>
            <Step active={step === 'done'}>
              3. Done!
            </Step>
          </div>

          {step === 'done' ? (
            <div className="text-center py-8">
              <div className="text-6xl">✅</div>
              <p className="mt-4 text-lg font-semibold">Subscription active!</p>
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          )}
        </div>

        <button onClick={onClose} className="mt-4 text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  )
}
```

## Managing Subscriptions

### Fetch User Subscriptions

```typescript
// hooks/useMySubscriptions.ts
import { useQuery } from '@tanstack/react-query'

export function useMySubscriptions() {
  const token = localStorage.getItem('drippay_token')

  return useQuery({
    queryKey: ['my-subscriptions'],
    queryFn: async () => {
      const res = await fetch('/api/subscriptions?type=subscriber', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      return res.json()
    },
    enabled: !!token,
  })
}
```

### Subscription Management Component

```typescript
// components/SubscriptionCard.tsx
export function SubscriptionCard({ subscription }: any) {
  const [loading, setLoading] = useState(false)

  const cancel = async () => {
    if (!confirm('Cancel this subscription?')) return

    setLoading(true)
    try {
      const token = localStorage.getItem('drippay_token')

      // Cancel on-chain
      const tx = await writeContract({
        address: getSubscriptionContract(subscription.chainId),
        abi: SUBSCRIPTION_ABI,
        functionName: 'cancelSubscription',
        args: [BigInt(subscription.subscriptionId)],
      })

      // Update backend
      await fetch(`/api/subscriptions/${subscription.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cancel',
          txHash: tx,
        }),
      })

      alert('Subscription cancelled')
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Failed to cancel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{subscription.plan.name}</h3>
          <p className="text-sm text-gray-600">
            {subscription.plan.price} {subscription.plan.currency} / {subscription.plan.interval}
          </p>
        </div>

        <div className="text-right">
          <span className={`px-2 py-1 rounded text-sm ${
            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
          }`}>
            {subscription.status}
          </span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</p>
        <p>Started: {new Date(subscription.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={cancel}
          disabled={loading || subscription.status !== 'active'}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  )
}
```

## Payment Flow

### Check Allowance & Balance

```typescript
// utils/checkPayment.ts
import { readContract } from 'wagmi/actions'

export async function checkPaymentReady(
  userAddress: string,
  tokenAddress: string,
  subscriptionContract: string,
  amount: bigint
) {
  // Check balance
  const balance = await readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [userAddress],
  })

  // Check allowance
  const allowance = await readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [userAddress, subscriptionContract],
  })

  return {
    hasBalance: balance >= amount,
    hasAllowance: allowance >= amount,
    balance,
    allowance,
  }
}
```

## UI/UX Best Practices

### Loading States

Always show transaction progress:

```typescript
<button disabled={loading}>
  {loading ? (
    <>
      <Spinner />
      {step === 'approving' && 'Approving tokens...'}
      {step === 'subscribing' && 'Creating subscription...'}
    </>
  ) : (
    'Subscribe'
  )}
</button>
```

### Error Handling

```typescript
try {
  await subscribe(plan)
} catch (error: any) {
  if (error.message.includes('User rejected')) {
    toast.error('Transaction cancelled')
  } else if (error.message.includes('insufficient funds')) {
    toast.error('Insufficient balance')
  } else {
    toast.error('Failed to subscribe. Please try again.')
  }
}
```

### Transaction Confirmations

```typescript
// Show pending state
toast.info('Transaction pending...')

// Wait for confirmation
const receipt = await waitForTransaction(txHash)

// Show success
toast.success(`Confirmed in block ${receipt.blockNumber}`)
```

## Complete Example App

See `/examples/subscription-app` for a complete Next.js application with:
- Wallet connection
- Plan browsing
- Subscription creation
- Dashboard
- Payment history

## Support

- Documentation: https://docs.drippay.xyz
- Discord: https://discord.gg/drippay
- GitHub: https://github.com/Enochthedev/drip-pay
