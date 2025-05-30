"use client"

// Improve the dashboard layout for mobile devices

import type React from "react"
// Basic layout for authenticated dashboard area
// This would typically include a sidebar navigation for dashboard sections

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, BarChart3, LogOut, Wallet, Menu, X } from "lucide-react"
import { useState } from "react"

// Mock authentication check - replace with actual auth logic
const isAuthenticated = true // In a real app, this would come from an auth provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    // Or use Next.js middleware for route protection
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ghost_white p-4">
        <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={150} height={37.5} className="mb-6 sm:mb-8" />
        <h1 className="text-xl sm:text-2xl font-bold text-midnight_navy mb-3 sm:mb-4">Access Denied</h1>
        <p className="text-slate_gray mb-4 sm:mb-6 text-center">
          Please connect your wallet or log in to access the dashboard.
        </p>
        <Button asChild className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white">
          <Link href="/#connect-wallet">Connect Wallet</Link> {/* Placeholder link */}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 z-20" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar - fixed on mobile, regular on desktop */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 z-20 h-full w-64 bg-white border-r border-slate-200 p-4 sm:p-6 flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <Link href="/dashboard" className="mb-6 sm:mb-8">
          <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={130} height={32.5} />
        </Link>
        <nav className="flex-grow space-y-1 sm:space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link
            href="/dashboard/subscriptions"
            className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <Wallet size={18} /> Subscriptions
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart3 size={18} /> Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate_gray hover:bg-red-500/10 hover:text-red-600"
          >
            <LogOut size={18} className="mr-3" /> Log Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  )
}
