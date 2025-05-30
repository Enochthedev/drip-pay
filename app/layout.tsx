import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransition from "@/components/page-transition"
import DripCursor from "@/components/drip-cursor"

export const metadata: Metadata = {
  title: "DripPay - Automated Crypto Billing",
  description: "Seamless, smart contract-based subscriptions for Web3.",
  icons: {
    icon: "/images/drippay-logo.png",
    shortcut: "/images/drippay-logo.png",
    apple: "/images/drippay-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/drippay-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/drippay-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/drippay-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DripCursor />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
