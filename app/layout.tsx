import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "DripPay — on-chain recurring billing",
    template: "%s · DripPay",
  },
  description:
    "Non-custodial subscription billing for crypto: recurring payments that run on smart contracts, across EVM chains.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DripPay — on-chain recurring billing",
    description:
      "Non-custodial subscription billing for crypto: recurring payments that run on smart contracts, across EVM chains.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
