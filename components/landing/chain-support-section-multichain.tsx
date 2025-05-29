import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// Removed: import { Siethereum, Sioptimism, Siarbitrum } from "@icons-pack/react-simple-icons"
import { Construction, ListTree, Hexagon, Copy, Shield } from "lucide-react" // Added Hexagon, Copy, Shield

const supportedChains = [
  {
    name: "Swell",
    status: "Live",
    icon: <Construction className="h-8 w-8 text-chain_swell" />, // Keep for Swell or choose another Lucide icon
    color: "text-chain_swell",
    bgColor: "bg-chain_swell/10",
    borderColor: "border-chain_swell/30",
  },
  {
    name: "Ethereum",
    status: "Coming Soon",
    icon: <Hexagon size={32} className="text-blue-400" />, // Replaced Siethereum
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    name: "Arbitrum",
    status: "Next",
    icon: <Copy size={32} className="text-sky-400" />, // Replaced Siarbitrum
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
    borderColor: "border-sky-400/30",
  },
  {
    name: "Optimism",
    status: "Next",
    icon: <Shield size={32} className="text-red-500" />, // Replaced Sioptimism
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  {
    name: "Base",
    status: "Next",
    icon: <ListTree className="h-8 w-8 text-blue-500" />, // Kept ListTree
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Polygon",
    status: "Next",
    icon: <ListTree className="h-8 w-8 text-purple-500" />, // Kept ListTree
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Linea",
    status: "Next",
    icon: <ListTree className="h-8 w-8 text-gray-400" />, // Kept ListTree
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/30",
  },
]

const getStatusChip = (status: string) => {
  if (status === "Live")
    return (
      <span className="px-2 py-0.5 text-xs font-medium bg-status_live/20 text-status_live rounded-full">{status}</span>
    )
  if (status === "Coming Soon")
    return (
      <span className="px-2 py-0.5 text-xs font-medium bg-status_soon/20 text-status_soon rounded-full">{status}</span>
    )
  return (
    <span className="px-2 py-0.5 text-xs font-medium bg-status_next/20 text-status_next rounded-full">{status}</span>
  )
}

export default function ChainSupportSection() {
  return (
    <section id="supported-chains" className="py-16 md:py-24 bg-deep_neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-light_neutral">
          Supported <span className="text-accent_primary">Chains</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {supportedChains.map((chain) => (
            <Card
              key={chain.name}
              className={`bg-card_neutral border ${chain.borderColor} hover:${chain.borderColor?.replace("30", "70")} transition-colors duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-x-2 pb-2">
                <div className={`p-2 rounded-md ${chain.bgColor}`}>{chain.icon}</div>
                {getStatusChip(chain.status)}
              </CardHeader>
              <CardContent>
                <CardTitle className={`text-lg font-semibold ${chain.color}`}>{chain.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Optional: Roadmap progression bar or toggle */}
        <div className="mt-12 text-center">
          <p className="text-light_neutral/70">More chains are on the way. Stay tuned for updates!</p>
        </div>
      </div>
    </section>
  )
}
