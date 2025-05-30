"use client"

import type React from "react"
// Basic layout for authenticated dashboard area
// This would typically include a sidebar navigation for dashboard sections

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, BarChart3, LogOut, Wallet } from "lucide-react"
import { useState } from "react"

// Mock authentication check - replace with actual auth logic
const isAuthenticated = true // In a real app, this would come from an auth provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!isAuthenticated) {
    // Or use Next.js middleware for route protection
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ghost_white p-4">
        <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={150} height={37.5} className="mb-8" />
        <h1 className="text-2xl md:text-3xl font-bold text-midnight_navy mb-4">Access Denied</h1>
        <p className="text-slate_gray mb-6">Please connect your wallet or log in to access the dashboard.</p>
        <Button
          asChild
          className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white py-4 px-8 rounded-lg"
        >
          <Link href="/#connect-wallet">Connect Wallet</Link> {/* Placeholder link */}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside
        className={`w-64 bg-white border-r border-slate-200 p-6 flex flex-col ${isMenuOpen ? "block" : "hidden md:block"}`}
      >
        <Link href="/dashboard" className="mb-8">
          <Image
            src="/images/drippay-logo.png"
            alt="DripPay Logo"
            width={130}
            height={32.5}
            className="w-full md:w-auto"
          />
        </Link>
        <nav className="flex-grow space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm md:text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link
            href="/dashboard/subscriptions"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm md:text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <Wallet size={18} /> Subscriptions
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm md:text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <BarChart3 size={18} /> Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm md:text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate_gray hover:bg-red-500/10 hover:text-red-600 py-4 px-8 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogOut size={18} className="mr-3" /> Log Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Button
          variant="ghost"
          className="md:hidden bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white py-4 px-8 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰ Menu
        </Button>
        {children}
      </main>
    </div>
  )
}
