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
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const baseGroupStyle = "transition-all duration-300 ease-in-out flex items-center"
  const scrolledGroupStyle = "bg-white/70 backdrop-blur-md shadow-sm border border-slate-200/60"
  const transparentGroupStyle = "bg-transparent shadow-none border border-transparent"

  const scrolledTextColor = "text-midnight_navy"
  const transparentTextColor = "text-slate-200"
  const transparentLogoTextColor = "text-ghost_white"

  const activeLinkTransparentBg = "text-ghost_white bg-slate-700/50"
  const activeLinkScrolledBg = "text-electric_indigo bg-electric_indigo/10"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out py-2",
        "bg-transparent border-b border-transparent" /* Always transparent, no shadow or backdrop on the header bar itself */,
      )}
    >
      <div className="container mx-auto flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            baseGroupStyle,
            "px-3 py-1.5 rounded-full",
            isScrolled ? scrolledGroupStyle : transparentGroupStyle,
          )}
        >
          <Image
            src="/images/drippay-logo.png"
            alt="DripPay Logo"
            width={28}
            height={28} // Corrected: Removed stray backslash
            priority // Simplified boolean prop, comment moved or removed for clarity during fix
          />
          <span
            className={cn(
              "ml-2 text-lg font-grotesk font-bold",
              isScrolled ? scrolledTextColor : transparentLogoTextColor,
            )}
          >
            DripPay
          </span>
        </Link>

        <nav
          className={cn(
            baseGroupStyle,
            "hidden md:flex space-x-1 px-2 py-1.5 rounded-full",
            isScrolled ? scrolledGroupStyle : transparentGroupStyle,
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                isScrolled
                  ? `${scrolledTextColor} hover:bg-slate-200/50 hover:text-electric_indigo`
                  : `${transparentTextColor} hover:bg-slate-700/40 hover:text-ghost_white`,
                pathname === link.href && (isScrolled ? activeLinkScrolledBg : activeLinkTransparentBg),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className={cn(
            baseGroupStyle,
            "hidden md:flex space-x-2 px-3 py-1.5 rounded-full items-center" /* Added items-center */,
            isScrolled ? scrolledGroupStyle : transparentGroupStyle,
          )}
        >
          <Link
            href="https://docs.drippay.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-sm font-medium transition-colors flex items-center group px-2 py-1 rounded-md",
              isScrolled
                ? `${scrolledTextColor} hover:bg-slate-200/50 hover:text-electric_indigo`
                : `${transparentTextColor} hover:bg-slate-700/40 hover:text-ghost_white`,
            )}
          >
            Docs
            <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Button // "Join Waitlist" button is always styled prominently
            asChild
            size="sm"
            className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold rounded-full px-4 text-xs shadow-md h-8"
          >
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "hover:bg-slate-200/70 rounded-full",
              isScrolled || mobileMenuOpen
                ? scrolledTextColor
                : transparentLogoTextColor /* Use logo text color for consistency */,
            )}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ghost_white shadow-lg pb-4 border-t border-slate-200/80">
          <nav className="flex flex-col space-y-1 px-4 pt-3">
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
            <div className="border-t border-slate_gray/20 pt-3 mt-2 space-y-2">
              <Button
                asChild
                className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold"
              >
                <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-300 text-midnight_navy hover:bg-slate-100 hover:border-slate-400"
                asChild
              >
                <Link href="/dashboard" scroll={false} onClick={() => setMobileMenuOpen(false)}>
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
