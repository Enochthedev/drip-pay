"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, type FormEvent, useEffect } from "react"
import { CheckCircle, Loader2, Zap, Users, Rocket, Sparkles, Mail, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  NetworkSwell,
  NetworkEthereum,
  NetworkArbitrumOne,
  NetworkOptimism,
  NetworkPolygon,
  NetworkBase,
} from "@web3icons/react"

const chainOptions = [
  { value: "swell", label: "Swell", icon: NetworkSwell, color: "text-green-400" },
  { value: "ethereum", label: "Ethereum", icon: NetworkEthereum, color: "text-blue-400" },
  { value: "arbitrum", label: "Arbitrum", icon: NetworkArbitrumOne, color: "text-sky-400" },
  { value: "optimism", label: "Optimism", icon: NetworkOptimism, color: "text-red-400" },
  { value: "polygon", label: "Polygon", icon: NetworkPolygon, color: "text-purple-400" },
  { value: "base", label: "Base", icon: NetworkBase, color: "text-blue-500" },
]

const benefits = [
  {
    icon: Zap,
    title: "Early Access",
    description: "First to use DripPay",
    color: "text-electric_indigo",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our Discord",
    color: "text-drip_teal",
  },
  {
    icon: Rocket,
    title: "Beta Features",
    description: "Exclusive previews",
    color: "text-electric_indigo",
  },
  {
    icon: Sparkles,
    title: "Special Pricing",
    description: "Early bird discounts",
    color: "text-drip_teal",
  },
]

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [chainPreference, setChainPreference] = useState("")
  const [useCase, setUseCase] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (email && email.includes("@")) {
      setStatus("success")
      setMessage(
        "Welcome to the DripPay community! We'll be in touch soon with updates and early access opportunities.",
      )
      // Reset form
      setEmail("")
      setProjectName("")
      setProjectDescription("")
      setChainPreference("")
      setUseCase("")
    } else {
      setStatus("error")
      setMessage("Please enter a valid email address.")
    }
  }

  // Header height calculation for proper spacing
  const headerHeightPx = 65
  const originalPtRem = 4
  const originalMdPtRem = 6
  const originalPbRem = 4
  const originalMdPbRem = 6

  const newPtPx = originalPtRem * 16 + headerHeightPx
  const newMdPtPx = originalMdPtRem * 16 + headerHeightPx

  return (
    <div
      className="relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden min-h-screen"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${originalPbRem * 16}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          div {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbRem * 16}px !important;
          }
        }
      `}</style>

      {/* Animated flowing background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-electric_indigo/30 via-drip_teal/20 to-electric_indigo/30 animate-gradient-flow"
          style={{
            backgroundSize: "400% 400%",
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Floating particles - reduced for mobile performance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-drip_teal/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: -20,
              scale: 0,
            }}
            animate={{
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 20,
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern - lighter for mobile */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waitlistGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waitlistGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile-first layout */}
        <div className="max-w-2xl mx-auto">
          {/* Hero section - mobile optimized */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block p-3 md:p-4 bg-electric_indigo/20 rounded-full mb-4 md:mb-6"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(90, 72, 242, 0.3)",
                  "0 0 40px rgba(90, 72, 242, 0.6)",
                  "0 0 20px rgba(90, 72, 242, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Mail className="h-6 w-6 md:h-8 md:w-8 text-electric_indigo" />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-grotesk text-ghost_white mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the{" "}
              <motion.span
                className="text-electric_indigo relative inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                DripPay
                <motion.div
                  className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                />
              </motion.span>{" "}
              Waitlist
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Be among the first to experience the future of on-chain billing. Get early access, exclusive updates, and
              special pricing.
            </motion.p>

            {/* Benefits - mobile optimized grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <benefit.icon className={`h-5 w-5 md:h-6 md:w-6 ${benefit.color} mx-auto mb-2`} />
                  <h3 className="text-xs md:text-sm font-semibold text-ghost_white mb-1">{benefit.title}</h3>
                  <p className="text-xs text-slate-300 hidden md:block">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats - mobile optimized */}
            <motion.div
              className="flex justify-center space-x-6 md:space-x-8 text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div>
                <div className="text-xl md:text-2xl font-bold text-drip_teal">1000+</div>
                <div className="text-xs md:text-sm text-slate-300">Developers</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-electric_indigo">6</div>
                <div className="text-xs md:text-sm text-slate-300">Chains</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-drip_teal">∞</div>
                <div className="text-xs md:text-sm text-slate-300">Possibilities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Waitlist form - mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl relative overflow-hidden">
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo" />

              <CardHeader className="text-center relative z-10 pb-4 md:pb-6">
                <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-ghost_white font-grotesk">
                  Get Early Access
                </CardTitle>
                <CardDescription className="text-slate-300 text-sm md:text-base">
                  Join 1000+ developers building the future of Web3 billing.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 px-4 md:px-6">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      className="text-center py-6 md:py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-drip_teal mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-semibold text-ghost_white mb-2">Welcome aboard! 🚀</h3>
                      <p className="text-sm md:text-base text-slate-300">{message}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-6"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      <div>
                        <Label htmlFor="email" className="font-medium text-ghost_white text-sm md:text-base">
                          Email Address <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo h-10 md:h-11"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label htmlFor="projectName" className="font-medium text-ghost_white text-sm md:text-base">
                            Project Name
                          </Label>
                          <Input
                            id="projectName"
                            type="text"
                            placeholder="My Web3 App"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo h-10 md:h-11"
                          />
                        </div>

                        <div>
                          <Label htmlFor="useCase" className="font-medium text-ghost_white text-sm md:text-base">
                            Use Case
                          </Label>
                          <Select value={useCase} onValueChange={setUseCase}>
                            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-ghost_white focus:border-electric_indigo focus:ring-electric_indigo h-10 md:h-11">
                              <SelectValue placeholder="Select use case" />
                            </SelectTrigger>
                            <SelectContent className="bg-midnight_navy border-white/20">
                              <SelectItem value="dao">DAO & Community</SelectItem>
                              <SelectItem value="saas">SaaS & Services</SelectItem>
                              <SelectItem value="nft">NFT Platforms</SelectItem>
                              <SelectItem value="creator">Creator Economy</SelectItem>
                              <SelectItem value="defi">DeFi & Restaking</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="chainPreference" className="font-medium text-ghost_white text-sm md:text-base">
                          Preferred Chain
                        </Label>
                        <Select value={chainPreference} onValueChange={setChainPreference}>
                          <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-ghost_white focus:border-electric_indigo focus:ring-electric_indigo h-10 md:h-11">
                            <SelectValue placeholder="Select preferred chain" />
                          </SelectTrigger>
                          <SelectContent className="bg-midnight_navy border-white/20">
                            {chainOptions.map((chain) => (
                              <SelectItem key={chain.value} value={chain.value}>
                                <div className="flex items-center space-x-2">
                                  <chain.icon className={`h-4 w-4 ${chain.color}`} />
                                  <span>{chain.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="projectDescription"
                          className="font-medium text-ghost_white text-sm md:text-base"
                        >
                          Project Description
                        </Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Tell us about your project and how you plan to use DripPay..."
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo resize-none"
                          rows={3}
                        />
                      </div>

                      {status === "error" && (
                        <motion.p
                          className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {message}
                        </motion.p>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white text-base md:text-lg py-3 md:py-4 font-semibold relative overflow-hidden"
                        disabled={status === "loading"}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {status === "loading" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                              Joining...
                            </>
                          ) : (
                            <>
                              Join Waitlist
                              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </>
                          )}
                        </span>

                        {/* Liquid button effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-drip_teal to-electric_indigo opacity-0"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%", opacity: 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="text-center block relative z-10 pt-2 md:pt-4">
                <p className="text-xs text-slate-400">
                  We respect your privacy. Your information will only be used for DripPay updates and early access.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
