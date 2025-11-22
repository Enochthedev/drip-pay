'use client'

import { useAccount, useSignMessage } from 'wagmi'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
}

export function useDripPayAuth() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    isLoading: false,
  })

  // Check for existing token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('drippay_auth_token')
    const tokenAddress = localStorage.getItem('drippay_auth_address')

    if (token && tokenAddress === address) {
      setAuthState({
        isAuthenticated: true,
        token,
        isLoading: false,
      })
    }
  }, [address])

  // Clear auth state when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      localStorage.removeItem('drippay_auth_token')
      localStorage.removeItem('drippay_auth_address')
      setAuthState({
        isAuthenticated: false,
        token: null,
        isLoading: false,
      })
    }
  }, [isConnected])

  const login = async () => {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Get nonce from backend
      const nonceRes = await fetch(`/api/auth/nonce?address=${address}`)
      if (!nonceRes.ok) throw new Error('Failed to get nonce')

      const { nonce } = await nonceRes.json()

      // Create message to sign
      const message = `Sign this message to authenticate with DripPay.\n\nNonce: ${nonce}\nAddress: ${address}`

      // Request signature from wallet
      const signature = await signMessageAsync({ message })

      // Verify signature and get JWT token
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, message }),
      })

      if (!verifyRes.ok) throw new Error('Authentication failed')

      const { token } = await verifyRes.json()

      // Store token in localStorage
      localStorage.setItem('drippay_auth_token', token)
      localStorage.setItem('drippay_auth_address', address)

      setAuthState({
        isAuthenticated: true,
        token,
        isLoading: false,
      })

      toast.success('Successfully authenticated!')
    } catch (error) {
      console.error('Authentication error:', error)
      toast.error('Authentication failed. Please try again.')
      setAuthState({
        isAuthenticated: false,
        token: null,
        isLoading: false,
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('drippay_auth_token')
    localStorage.removeItem('drippay_auth_address')
    setAuthState({
      isAuthenticated: false,
      token: null,
      isLoading: false,
    })
    toast.success('Logged out successfully')
  }

  const getAuthHeaders = () => {
    if (!authState.token) return {}
    return {
      Authorization: `Bearer ${authState.token}`,
    }
  }

  return {
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
    isLoading: authState.isLoading,
    login,
    logout,
    getAuthHeaders,
  }
}
