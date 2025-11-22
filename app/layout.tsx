import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/providers/web3-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "DripPay - Crypto-Native Subscription Billing",
  description: "Accept recurring payments in crypto with zero hassle. Built for creators, developers, and businesses.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL('https://drippay.io'),
  keywords: ['crypto', 'subscriptions', 'billing', 'web3', 'payments', 'defi'],
  authors: [{ name: 'DripPay' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://drippay.io',
    title: 'DripPay - Crypto-Native Subscription Billing',
    description: 'Accept recurring payments in crypto with zero hassle.',
    siteName: 'DripPay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DripPay - Crypto-Native Subscription Billing',
    description: 'Accept recurring payments in crypto with zero hassle.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            {children}
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
