"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, type FormEvent } from "react"
import { CheckCircle, Loader2 } from "lucide-react"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [chainPreference, setChainPreference] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email && email.includes("@")) {
      // Basic email validation
      setStatus("success")
      setMessage(
        "Thanks for joining the DripPay waitlist! We'll be in touch soon with updates and early access opportunities.",
      )
      setEmail("")
      setProjectName("")
      setProjectDescription("")
      setChainPreference("")
    } else {
      setStatus("error")
      setMessage("Please enter a valid email address.")
    }
  }

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-electric_indigo/10 via-ghost_white to-drip_teal/10 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto shadow-2xl border-slate-200">
          <CardHeader className="text-center">
            <div className="inline-block p-3 bg-electric_indigo/10 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-electric_indigo lucide lucide-mail-check"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-midnight_navy">
              Join the DripPay Waitlist
            </CardTitle>
            <CardDescription className="text-slate_gray/90 text-lg pt-2">
              Be among the first to access DripPay and revolutionize your Web3 billing. Get early updates, feature
              previews, and exclusive benefits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-midnight_navy mb-2">You're on the list!</p>
                <p className="text-slate_gray">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="font-medium text-midnight_navy">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="projectName" className="font-medium text-midnight_navy">
                    Project Name (Optional)
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    placeholder="My Awesome Web3 App"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="projectDescription" className="font-medium text-midnight_navy">
                    Tell Us About Your Project (Optional)
                  </Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Briefly describe how you plan to use DripPay..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="chainPreference" className="font-medium text-midnight_navy">
                    Preferred Launch Chain (Optional)
                  </Label>
                  <Input
                    id="chainPreference"
                    type="text"
                    placeholder="e.g., Swell, Ethereum, Arbitrum"
                    value={chainPreference}
                    onChange={(e) => setChainPreference(e.target.value)}
                    className="mt-1"
                  />
                </div>
                {status === "error" && <p className="text-sm text-red-600">{message}</p>}
                <Button
                  type="submit"
                  className="w-full bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white text-lg py-3"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Join Waitlist"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="text-center block">
            <p className="text-xs text-slate_gray/70">
              We respect your privacy. Your information will only be used to contact you about DripPay.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
