import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, ExternalLink } from "lucide-react"
import type { Chain } from "../data/chain-data"
import { cn } from "@/lib/utils"

interface ChainCardProps {
  chain: Chain
  animationDelay?: string
}

export default function ChainCard({ chain, animationDelay }: ChainCardProps) {
  const isLive = chain.status === "live"
  const Icon = chain.IconComponent

  return (
    <div
      className={cn(
        "bg-slate-800/60 backdrop-blur-sm border rounded-xl p-6 flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1 animate-fade-in-up",
        isLive
          ? `border-${chain.themeColorClass || "electric_indigo"}/60 hover:border-${chain.themeColorClass || "electric_indigo"}`
          : "border-slate-700 opacity-70 hover:opacity-100", // More pronounced opacity for upcoming
        isLive ? `shadow-lg shadow-${chain.themeColorClass || "electric_indigo"}/10` : "shadow-md",
      )}
      style={{ animationDelay: animationDelay || "0s" }}
    >
      <div className="flex items-center mb-4">
        <Icon className={cn("w-10 h-10 mr-4 flex-shrink-0", chain.iconColorClass || "text-slate-300")} />
        <div>
          <h3 className="text-2xl font-grotesk font-semibold text-ghost_white">{chain.shortName || chain.name}</h3>
          {isLive ? (
            <Badge variant="outline" className="border-drip_teal/80 bg-drip_teal/20 text-drip_teal text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Live on Mainnet
            </Badge>
          ) : (
            <Badge variant="outline" className="border-slate-600 bg-slate-700/60 text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 mr-1.5" /> {chain.status === "soon" ? "Coming Soon" : "Planned"}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-3 flex-grow min-h-[40px]">{chain.statusMessage}</p>
      {chain.timeline && !isLive && (
        <p className="text-xs text-slate-400 mb-4 font-medium">Expected: {chain.timeline}</p>
      )}

      <div className="mt-auto">
        {isLive && chain.docsLink && (
          <Button
            asChild
            variant="link"
            size="sm"
            className={cn(
              "text-sm p-0 justify-start group font-medium",
              `text-${chain.themeColorClass || "electric_indigo"} hover:text-${chain.themeColorClass || "electric_indigo"}/80`,
            )}
          >
            <Link href={chain.docsLink} target="_blank" rel="noopener noreferrer">
              View Docs <ExternalLink className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        )}
        {!isLive && chain.waitlistLink && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full text-sm border-slate-600 hover:border-electric_indigo hover:text-electric_indigo text-slate-200 bg-slate-700/50 hover:bg-electric_indigo/10 font-medium"
          >
            <Link href={chain.waitlistLink}>
              Join Waitlist <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
