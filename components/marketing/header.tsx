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
  { href: "/chains", label: "Chains" }, // Updated label
  { href: "/use-cases", label: "Use Cases" },
  { href: "https://docs.drippay.xyz", label: "Docs", external: true },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-midnight_navy text-ghost_white flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={120} height={30} priority />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-center flex-grow">
        <div className="flex items-center space-x-2 bg-slate_gray/20 p-1 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-slate_gray/30",
                pathname === link.href
                  ? "bg-electric_indigo text-ghost_white"
                  : "text-slate-300 hover:text-ghost_white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="hidden md:flex items-center space-x-3 shrink-0">
        <Button variant="ghost" className="text-slate-300 hover:text-ghost_white hover:bg-slate_gray/20" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button className="bg-ghost_white hover:bg-slate-200 text-midnight_navy font-semibold rounded-full" asChild>
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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-midnight_navy shadow-lg pb-4 border-t border-slate_gray/30">
          <nav className="flex flex-col space-y-2 px-4 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate_gray/30",
                  pathname === link.href
                    ? "bg-electric_indigo text-ghost_white"
                    : "text-slate-300 hover:text-ghost_white",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-slate_gray/30 pt-3 space-y-2">
              <Button
                variant="outline"
                className="w-full border-slate_gray/50 text-ghost_white hover:bg-slate_gray/30 hover:text-ghost_white"
                asChild
              >
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <Button className="w-full bg-ghost_white hover:bg-slate-200 text-midnight_navy font-semibold" asChild>
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
