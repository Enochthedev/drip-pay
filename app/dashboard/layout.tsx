"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, BarChart3, LogOut, Wallet, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Mock authentication check - replace with actual auth logic
const isAuthenticated = true // In a real app, this would come from an auth provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Desktop sidebar - always visible on md+ screens */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 p-6 flex-col">
        <Link href="/dashboard" className="mb-8">
          <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={130} height={32.5} />
        </Link>
        <nav className="flex-grow space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link
            href="/dashboard/subscriptions"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <Wallet size={18} /> Subscriptions
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
          >
            <BarChart3 size={18} /> Analytics
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
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

      {/* Mobile sidebar - animated slide-in */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            className="fixed inset-0 z-50 w-4/5 max-w-xs bg-white border-r border-slate-200 p-6 flex flex-col md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/dashboard">
                <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={130} height={32.5} />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="md:hidden">
                <X size={24} />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex-grow space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={20} /> Overview
              </Link>
              <Link
                href="/dashboard/subscriptions"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Wallet size={20} /> Subscriptions
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 size={20} /> Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate_gray hover:bg-electric_indigo/10 hover:text-electric_indigo transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={20} /> Settings
              </Link>
            </nav>
            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate_gray hover:bg-red-500/10 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogOut size={20} className="mr-3" /> Log Out
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <Link href="/dashboard">
            <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={120} height={30} />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            <Menu size={24} />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
        {children}
      </main>
    </div>
  )
}
