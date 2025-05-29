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
  { href: "/chains", label: "Chains" },
  { href: "/use-cases", label: "Use Cases" },
]

const secondaryLinks = [
  { href: "https://docs.drippay.xyz", label: "Docs", external: true },
  // { href: "/dashboard", label: "Dashboard" }, // Dashboard is usually a primary CTA or post-login
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-midnight_navy/95 backdrop-blur-lg text-ghost_white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-6">
            <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={110} height={27.5} priority />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                "bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-ghost_white",
                {
                  "bg-electric_indigo text-ghost_white hover:bg-electric_indigo/80": pathname === link.href,
                },
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {secondaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-slate-300 hover:text-ghost_white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-ghost_white hover:bg-slate-200 text-midnight_navy font-semibold rounded-full px-5 py-2 text-sm shadow-md"
          >
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-ghost_white hover:bg-slate_gray/20"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-midnight_navy shadow-lg pb-4 border-t border-slate_gray/30">
          <nav className="flex flex-col space-y-2 px-4 pt-3">
            {[...navLinks, ...secondaryLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-electric_indigo text-ghost_white"
                    : "text-slate-300 hover:text-ghost_white hover:bg-slate_gray/20",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate_gray/30 pt-3 mt-2">
              <Button asChild className="w-full bg-ghost_white hover:bg-slate-200 text-midnight_navy font-semibold">
                <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </div>
            <div className="pt-1">
              <Button
                variant="outline"
                className="w-full border-slate_gray/50 text-ghost_white hover:bg-slate_gray/30 hover:text-ghost_white"
                asChild
              >
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
