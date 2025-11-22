'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { useTheme } from 'next-themes'
import { config } from '@/lib/wagmi'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={
            resolvedTheme === 'dark'
              ? darkTheme({
                  accentColor: '#0ea5e9',
                  accentColorForeground: 'white',
                  borderRadius: 'medium',
                })
              : lightTheme({
                  accentColor: '#0ea5e9',
                  accentColorForeground: 'white',
                  borderRadius: 'medium',
                })
          }
          appInfo={{
            appName: 'DripPay',
            learnMoreUrl: 'https://docs.drippay.io',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
