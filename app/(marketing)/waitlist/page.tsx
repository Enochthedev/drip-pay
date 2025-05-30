"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, type FormEvent, useEffect } from "react"
import { CheckCircle, Loader2, Zap, Users, Rocket, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  NetworkSwell,
  NetworkEthereum,
  NetworkArbitrumOne,
  NetworkOptimism,
  NetworkPolygon,
  NetworkBase,
} from "@web3icons/react"
import OceanBackground from "@/components/ocean-background"

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
    description: "Be among the first to use DripPay when it launches",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our Discord and connect with other builders",
  },
  {
    icon: Rocket,
    title: "Beta Features",
    description: "Get exclusive access to new features before public release",
  },
  {
    icon: Sparkles,
    title: "Special Pricing",
    description: "Enjoy discounted rates as an early supporter",
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
        "🎉 Welcome to the DripPay community! We'll be in touch soon with updates and early access opportunities.",
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
  const headerHeightPx = 80
  const originalPtRem = 6
  const originalMdPtRem = 8
  const originalPbRem = 6
  const originalMdPbRem = 8

  const newPtPx = originalPtRem * 16 + headerHeightPx
  const newMdPtPx = originalMdPtRem * 16 + headerHeightPx

  return (
    <section
      className="relative bg-gradient-to-br from-midnight_navy via-slate-900 to-electric_indigo overflow-hidden min-h-screen flex items-center"
      style={{
        marginTop: `-${headerHeightPx}px`,
        paddingTop: `${newPtPx}px`,
        paddingBottom: `${originalPbRem * 16}px`,
      }}
    >
      <style jsx>{`
        @media (min-width: 768px) {
          section {
            padding-top: ${newMdPtPx}px !important;
            padding-bottom: ${originalMdPbRem * 16}px !important;
          }
        }
      `}</style>

      {/* Ocean background with enhanced intensity */}
      <OceanBackground intensity="medium" />

      {/* Animated flowing background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-gradient-to-br from-electric_indigo/20 via-drip_teal/10 to-electric_indigo/20 animate-gradient-flow"
          style={{
            backgroundSize: "400% 400%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waitlistGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(90, 72, 242, 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waitlistGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-grotesk text-ghost_white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the{" "}
              <motion.span
                className="text-electric_indigo relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                DripPay
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                />
              </motion.span>{" "}
              Revolution
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Be among the first to experience the future of on-chain billing. Get early access, exclusive updates, and
              special pricing.
            </motion.p>

            {/* Benefits grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <benefit.icon className="h-6 w-6 text-drip_teal mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-ghost_white mb-1">{benefit.title}</h3>
                  <p className="text-xs text-slate-300">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center lg:justify-start space-x-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div>
                <div className="text-2xl font-bold text-drip_teal">1000+</div>
                <div className="text-sm text-slate-300">Developers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-electric_indigo">6</div>
                <div className="text-sm text-slate-300">Chains</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-drip_teal">∞</div>
                <div className="text-sm text-slate-300">Possibilities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Waitlist form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl relative overflow-hidden">
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric_indigo via-drip_teal to-electric_indigo" />

              <CardHeader className="text-center relative z-10">
                <motion.div
                  className="inline-block p-3 bg-electric_indigo/20 rounded-full mb-4 mx-auto"
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
                  <Rocket className="h-8 w-8 text-electric_indigo" />
                </motion.div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-ghost_white font-grotesk">
                  Join the Waitlist
                </CardTitle>
                <CardDescription className="text-slate-300 text-base">
                  Get early access to DripPay and be part of the Web3 billing revolution.
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-16 w-16 text-drip_teal mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-ghost_white mb-2">Welcome aboard! 🚀</h3>
                      <p className="text-slate-300">{message}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      <div>
                        <Label htmlFor="email" className="font-medium text-ghost_white">
                          Email Address <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo"
                        />
                      </div>

                      <div>
                        <Label htmlFor="projectName" className="font-medium text-ghost_white">
                          Project Name
                        </Label>
                        <Input
                          id="projectName"
                          type="text"
                          placeholder="My Awesome Web3 App"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo"
                        />
                      </div>

                      <div>
                        <Label htmlFor="useCase" className="font-medium text-ghost_white">
                          Primary Use Case
                        </Label>
                        <Select value={useCase} onValueChange={setUseCase}>
                          <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-ghost_white focus:border-electric_indigo focus:ring-electric_indigo">
                            <SelectValue placeholder="Select your use case" />
                          </SelectTrigger>
                          <SelectContent className="bg-midnight_navy border-white/20">
                            <SelectItem value="dao">DAO & Community Billing</SelectItem>
                            <SelectItem value="saas">SaaS & Web3 Services</SelectItem>
                            <SelectItem value="nft">NFT Platforms</SelectItem>
                            <SelectItem value="creator">Creator & Content</SelectItem>
                            <SelectItem value="defi">DeFi & Restaking</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="chainPreference" className="font-medium text-ghost_white">
                          Preferred Chain
                        </Label>
                        <Select value={chainPreference} onValueChange={setChainPreference}>
                          <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-ghost_white focus:border-electric_indigo focus:ring-electric_indigo">
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
                        <Label htmlFor="projectDescription" className="font-medium text-ghost_white">
                          Tell Us About Your Project
                        </Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Briefly describe how you plan to use DripPay..."
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className="mt-1 bg-white/10 border-white/20 text-ghost_white placeholder:text-slate-400 focus:border-electric_indigo focus:ring-electric_indigo"
                          rows={3}
                        />
                      </div>

                      {status === "error" && (
                        <motion.p
                          className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {message}
                        </motion.p>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white text-lg py-3 font-semibold relative overflow-hidden"
                        disabled={status === "loading"}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {status === "loading" ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Joining the Revolution...
                            </>
                          ) : (
                            <>
                              <Rocket className="mr-2 h-5 w-5" />
                              Join the Waitlist
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

              <CardFooter className="text-center block relative z-10">
                <p className="text-xs text-slate-400">
                  We respect your privacy. Your information will only be used to contact you about DripPay updates and
                  early access opportunities.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
