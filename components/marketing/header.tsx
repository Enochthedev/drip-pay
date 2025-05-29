"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/chains", label: "Chains" },
  { href: "/use-cases", label: "Use Cases" },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled || mobileMenuOpen
          ? "bg-ghost_white/90 backdrop-blur-lg shadow-md border-b border-slate-200/80"
          : "bg-transparent backdrop-blur-none shadow-none border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/drippay-logo.png"
            alt="DripPay Logo"
            width={110}
            height={27.5}
            priority
            className={cn(isScrolled || mobileMenuOpen ? "" : "filter brightness-[0.1]")} // Darken logo on transparent bg
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-electric_indigo",
                pathname === link.href ? "text-electric_indigo font-semibold" : "text-midnight_navy/80",
                isScrolled || mobileMenuOpen ? "text-midnight_navy/80" : "text-midnight_navy", // Ensure visibility on transparent
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="https://docs.drippay.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-sm font-medium text-midnight_navy/80 hover:text-electric_indigo transition-colors flex items-center group",
              isScrolled || mobileMenuOpen ? "text-midnight_navy/80" : "text-midnight_navy",
            )}
          >
            Docs
            <ArrowUpRight className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Button
            asChild
            size="sm"
            className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold rounded-full px-5 py-2 text-sm shadow-md"
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
            className={cn(
              "hover:bg-slate-200/70",
              isScrolled || mobileMenuOpen ? "text-midnight_navy" : "text-midnight_navy",
            )}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ghost_white shadow-lg pb-4 border-t border-slate-200/80">
          <nav className="flex flex-col space-y-2 px-4 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-100",
                  pathname === link.href ? "text-electric_indigo font-semibold" : "text-midnight_navy",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://docs.drippay.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-medium text-midnight_navy hover:bg-slate-100 flex items-center group"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
              <ArrowUpRight className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>
            <div className="border-t border-slate_gray/20 pt-3 mt-2">
              <Button
                asChild
                className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold"
              >
                <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </div>
            <div className="pt-1">
              <Button
                variant="outline"
                className="w-full border-slate-300 text-midnight_navy hover:bg-slate-100 hover:border-slate-400"
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
