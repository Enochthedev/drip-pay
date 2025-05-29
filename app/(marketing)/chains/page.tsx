import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Construction, ListTree, Hexagon, Copy, Shield } from "lucide-react"

const chainData = [
  {
    name: "Swell Chain",
    status: "Live",
    icon: <CheckCircle className="h-10 w-10 text-green-500" />,
    description:
      "DripPay is live and fully operational on Swell Chain, offering optimized performance for restaking-native payments and incentives.",
    detailsLink: "https://docs.drippay.xyz/chains/swell",
    color: "green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  {
    name: "Ethereum",
    status: "Coming Soon",
    icon: <Hexagon className="h-10 w-10 text-blue-500" />,
    description:
      "Integration with Ethereum Mainnet is under active development to bring DripPay's decentralized billing to the largest smart contract ecosystem.",
    detailsLink: "https://docs.drippay.xyz/chains/ethereum",
    color: "blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Arbitrum",
    status: "Coming Soon",
    icon: <Copy className="h-10 w-10 text-sky-500" />,
    description:
      "Support for Arbitrum is planned, enabling fast and low-cost recurring payments on this leading Layer 2 scaling solution.",
    detailsLink: "https://docs.drippay.xyz/chains/arbitrum",
    color: "sky-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
  },
  {
    name: "Optimism",
    status: "Next",
    icon: <Shield className="h-10 w-10 text-red-500" />,
    description:
      "Optimism integration is on our roadmap, extending DripPay's capabilities to another key Ethereum Layer 2 network.",
    detailsLink: "https://docs.drippay.xyz/chains/optimism",
    color: "red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  {
    name: "Polygon",
    status: "Next",
    icon: <ListTree className="h-10 w-10 text-purple-500" />,
    description:
      "We are exploring Polygon integration to provide DripPay users with access to its vibrant ecosystem and scalable infrastructure.",
    detailsLink: "https://docs.drippay.xyz/chains/polygon",
    color: "purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Base",
    status: "Next",
    icon: <Construction className="h-10 w-10 text-blue-600" />,
    description:
      "Base integration is being considered to tap into its growing developer community and Coinbase ecosystem.",
    detailsLink: "https://docs.drippay.xyz/chains/base",
    color: "blue-600",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-600/30",
  },
]

export default function SupportedChainsPage() {
  return (
    <div className="py-16 md:py-24 bg-ghost_white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-midnight_navy mb-4">Supported Chains</h1>
          <p className="text-lg md:text-xl text-slate_gray max-w-2xl mx-auto">
            DripPay is committed to a multi-chain future. Discover our current integrations and what's coming next.
          </p>
        </div>

        <div className="space-y-10">
          {chainData.map((chain) => (
            <Card key={chain.name} className={`bg-white border ${chain.borderColor} shadow-lg overflow-hidden`}>
              <CardHeader
                className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${chain.bgColor}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-md bg-white/50`}>{chain.icon}</div>
                  <div>
                    <CardTitle className={`text-2xl font-bold font-grotesk text-${chain.color}`}>
                      {chain.name}
                    </CardTitle>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full bg-${chain.color}/20 text-${chain.color} border border-${chain.color}/50`}
                    >
                      {chain.status}
                    </span>
                  </div>
                </div>
                {chain.detailsLink && (
                  <a
                    href={chain.detailsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium text-${chain.color} hover:underline`}
                  >
                    Integration Details &rarr;
                  </a>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate_gray">{chain.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-slate_gray mt-12">
          Don't see your favorite chain?{" "}
          <Link href="mailto:chains@drippay.xyz" className="text-electric_indigo hover:underline font-medium">
            Let us know!
          </Link>
        </p>
      </div>
    </div>
  )
}
