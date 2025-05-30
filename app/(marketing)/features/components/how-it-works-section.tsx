import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, FileSignature, Zap } from "lucide-react" // Changed RefreshCw to RefreshCwIcon for clarity if needed

const steps = [
  {
    icon: Wallet,
    title: "1. Connect Wallet",
    description: "User signs a one-time approval for DripPay to manage their subscription payments from their wallet.",
  },
  {
    icon: FileSignature,
    title: "2. Create Subscription",
    description:
      "Your application defines the terms (amount, token, interval) and creates a subscription via the DripPay smart contract.",
  },
  {
    icon: Zap, // Using Zap for "Drip Happens" as it implies automation/speed
    title: "3. Drip Happens",
    description:
      "The DripPay protocol automatically executes payments on-chain at the specified interval. No manual intervention needed.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-midnight_navy font-grotesk">
            How <span className="text-electric_indigo">DripPay</span> Fits Into Your App
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <Card key={step.title} className="bg-ghost_white/50 border-slate-200 shadow-md text-center">
              <CardHeader className="items-center">
                <div className="p-3 rounded-full bg-drip_teal/10 mb-4 inline-block">
                  <step.icon className="h-10 w-10 text-drip_teal" />
                </div>
                <CardTitle className="text-xl font-semibold text-midnight_navy font-grotesk">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate_gray">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
            <p className="text-sm font-mono text-slate-400 mb-2">// Example: Creating a subscription</p>
            <pre className="text-electric_indigo/90">
              <code className="language-javascript text-sm font-mono">
                <span className="text-sky-300">const</span> dripPay = <span className="text-purple-300">new</span>{" "}
                <span className="text-yellow-300">DripPay</span>(provider);{"\n"}
                <span className="text-sky-300">await</span> dripPay.createSubscription(&#123;{"\n"}
                {"  "}userAddress: <span className="text-orange-300">'0x123...'</span>,{"\n"}
                {"  "}tokenAddress: <span className="text-orange-300">'0xDAI...'</span>,{"\n"}
                {"  "}amount: <span className="text-green-300">ethers.utils.parseUnits</span>(
                <span className="text-orange-300">'10'</span>, <span className="text-green-300">18</span>),{"\n"}
                {"  "}interval: <span className="text-green-300">86400</span>{" "}
                <span className="text-slate-400"> // 1 day in seconds</span>
                {"\n"}
                &#125;);
              </code>
            </pre>
          </div>
          <div className="text-center md:text-left">
            <div className="relative h-48 md:h-64 w-full max-w-md mx-auto md:mx-0 opacity-80">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Automated Logic Loop"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <p className="text-slate_gray mt-4 text-center">
              Our protocol handles the recurring logic, so you can focus on your application's core features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
