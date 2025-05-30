"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const baseGroupStyle = "transition-all duration-300 ease-in-out flex items-center"
  const scrolledGroupStyle = "bg-white/70 backdrop-blur-md shadow-sm border border-slate-200/60"
  const transparentGroupStyle = "bg-transparent shadow-none border border-transparent"

  const scrolledTextColor = "text-midnight_navy"
  const transparentTextColor = "text-slate-200"
  const transparentLogoTextColor = "text-ghost_white"

  const activeLinkTransparentBg = "text-ghost_white bg-slate-700/50"
  const activeLinkScrolledBg = "text-electric_indigo bg-electric_indigo/10"

  const mobileMenuVariants = {
    closed: {
      x: "100%",
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
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out py-2",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={cn(
            baseGroupStyle,
            "px-3 py-1.5 rounded-full",
            isScrolled ? scrolledGroupStyle : transparentGroupStyle,
          )}
        >
          <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={32} height={32} priority />
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
            "hidden md:flex space-x-2 px-3 py-1.5 rounded-full items-center",
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
          <Button
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
              "hover:bg-slate-200/70 rounded-full z-50 relative",
              isScrolled || mobileMenuOpen ? scrolledTextColor : transparentLogoTextColor,
            )}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <motion.nav className="flex flex-col space-y-1 px-6 pt-8 h-full overflow-y-auto">
              {navLinks.map((link) => (
                <motion.div key={link.label} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-4 py-4 text-xl font-medium transition-colors border-b border-slate-700/50",
                      pathname === link.href ? "text-electric_indigo font-semibold" : "text-ghost_white",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 transition-transform",
                        pathname === link.href ? "text-electric_indigo rotate-90" : "text-ghost_white/70",
                      )}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={menuItemVariants}>
                <Link
                  href="https://docs.drippay.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg px-4 py-4 text-xl font-medium text-ghost_white border-b border-slate-700/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Docs</span>
                  <ArrowUpRight className="h-5 w-5 text-ghost_white/70" />
                </Link>
              </motion.div>

              <motion.div variants={menuItemVariants} className="pt-6 px-4">
                <Button
                  asChild
                  className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold py-6 text-lg rounded-lg"
                >
                  <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                    Join Waitlist
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={menuItemVariants} className="pt-4 px-4">
                <Button
                  variant="outline"
                  className="w-full border-slate-300/30 text-ghost_white hover:bg-slate-700/50 hover:border-slate-300/50 py-6 text-lg rounded-lg"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={menuItemVariants} className="mt-auto pt-8 pb-8 px-4 text-center">
                <p className="text-ghost_white/60 text-sm">&copy; {new Date().getFullYear()} DripPay</p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
