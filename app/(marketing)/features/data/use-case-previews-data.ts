import { Landmark, Palette, Terminal, TrendingUp, type LucideIcon } from "lucide-react"

export interface UseCasePreview {
  icon: LucideIcon
  category: string
  description: string
  link: string
}

export const useCasePreviewsData: UseCasePreview[] = [
  {
    icon: Landmark,
    category: "DAOs",
    description: "Automate member dues & governance fees.",
    link: "/use-cases#daos",
  },
  {
    icon: Palette,
    category: "Creators",
    description: "Token-gated premium content & communities.",
    link: "/use-cases#creators",
  },
  {
    icon: Terminal,
    category: "SaaS",
    description: "Crypto-native API billing & tiered subscriptions.",
    link: "/use-cases#developers",
  },
  {
    icon: TrendingUp,
    category: "Restakers",
    description: "Monetize with yield automation & service fees.",
    link: "/use-cases#restaking",
  },
]
