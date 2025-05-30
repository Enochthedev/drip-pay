"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
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

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  const buttonVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out py-2",
        "bg-transparent border-b border-transparent",
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
          <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={28} height={28} priority />
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
              mobileMenuOpen ? "text-ghost_white" : isScrolled ? scrolledTextColor : transparentLogoTextColor,
            )}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* New Mobile Menu Design */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mobileMenuGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mobileMenuGrid)" />
              </svg>
            </div>

            <div className="container mx-auto px-6 py-16 flex flex-col h-full">
              {/* Logo */}
              <motion.div className="mb-12 flex justify-center" variants={itemVariants}>
                <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={140} height={35} priority />
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center space-y-6 mb-auto">
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-grotesk font-semibold text-ghost_white hover:text-electric_indigo transition-colors flex items-center",
                        pathname === link.href && "text-electric_indigo",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronRight
                        className={cn(
                          "ml-1 h-5 w-5 transition-transform",
                          pathname === link.href ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <Link
                    href="https://docs.drippay.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-grotesk font-semibold text-ghost_white hover:text-electric_indigo transition-colors flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Docs
                    <ArrowUpRight className="ml-1 h-5 w-5 opacity-70" />
                  </Link>
                </motion.div>
              </nav>

              {/* CTA Buttons */}
              <div className="mt-12 space-y-4">
                <motion.div variants={buttonVariants}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold text-lg py-6"
                  >
                    <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                      Join Waitlist
                    </Link>
                  </Button>
                </motion.div>

                <motion.div variants={buttonVariants}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    disabled
                    className="w-full border-ghost_white/30 text-ghost_white hover:bg-ghost_white/10 font-semibold text-lg py-6"
                  >
                    <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div className="mt-8 text-center text-sm text-ghost_white/60" variants={buttonVariants}>
                &copy; {new Date().getFullYear()} DripPay
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}