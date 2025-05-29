import Image from "next/image"
import { CheckCircle, CreditCard, FileText, Zap } from "lucide-react"

const products = [
  {
    icon: <CreditCard className="h-6 w-6 text-nex_primary_blue" />,
    name: "DripPay Payments",
    features: [
      "No KYC payments: enjoy seamless transactions without the friction of Know Your Customer requirements.",
      "Quick setup: get started in under 10 minutes with our non-gated platform.",
      "Convenience: re-use wallet authorizations for a smoother payment experience.",
    ],
  },
  {
    icon: <Zap className="h-6 w-6 text-nex_primary_blue" />,
    name: "DripPay Billing",
    features: [
      "Custom subscription plans: flexible pricing models to cater to all subscription needs, allowing you to adapt to your business requirements effortlessly.",
    ],
  },
  {
    icon: <FileText className="h-6 w-6 text-nex_primary_blue" />,
    name: "DripPay Invoicing",
    features: [
      "Low code / no code integration: easily create hosted invoice pages with minimal technical knowledge.",
      "Automated receipts: our managed invoice email service ensures your customers receive their receipts promptly, enhancing their experience.",
    ],
  },
]

export default function ProductsNexaris() {
  return (
    <section className="py-20 md:py-32 bg-nex_primary_blue text-nex_text_light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-10">
            {products.map((product) => (
              <div key={product.name}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-md backdrop-blur-sm">{product.icon}</div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                </div>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-drip_teal mr-2 mt-1 flex-shrink-0" />
                      <span className="text-nex_light_blue">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] bg-nex_deep_navy/70 rounded-3xl p-8 flex items-center justify-center shadow-2xl overflow-hidden backdrop-blur-lg border border-white/10">
            {/* Placeholder for the large glowing Bitcoin logo from screenshot 4 */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/placeholder.svg?width=500&height=500"
                alt="Abstract background"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <Image
              src="/images/nexaris-coin-btc.png"
              alt="Glowing Bitcoin Logo"
              width={250}
              height={250}
              className="animate-float-medium drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] z-10" // Example Bitcoin glow
            />
            <div className="absolute inset-1/4 rounded-full border-2 border-nex_primary_blue/30 animate-ping opacity-30"></div>
            <div className="absolute inset-1/3 rounded-full border border-nex_primary_blue/20 animate-ping animation-delay-1000 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
