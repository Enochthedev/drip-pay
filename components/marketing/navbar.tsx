"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/chains", label: "Supported Chains" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "https://docs.drippay.xyz", label: "Docs", external: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-ghost_white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={120} height={30} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-electric_indigo",
                pathname === link.href ? "text-electric_indigo" : "text-slate_gray",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10"
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white" asChild>
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-ghost_white shadow-lg pb-4">
          <nav className="flex flex-col space-y-3 px-4 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-100 hover:text-electric_indigo",
                  pathname === link.href ? "bg-slate-100 text-electric_indigo" : "text-slate_gray",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full border-electric_indigo text-electric_indigo hover:bg-electric_indigo/10"
                asChild
              >
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <Button className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white" asChild>
                <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
