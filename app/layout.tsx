import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Assuming you still want theme provider for dark mode if ever needed

export const metadata: Metadata = {
  title: "DripPay - Automated Crypto Billing",
  description: "Seamless, smart contract-based subscriptions for Web3.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-slate_gray bg-ghost_white">
        {/* ThemeProvider can be kept if you plan to support dark mode based on system preference or a toggle,
          otherwise, if it's strictly light mode, you can remove it and its related files.
          For now, I'll keep it as it doesn't hurt. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Forcing light theme based on Ghost White background
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
