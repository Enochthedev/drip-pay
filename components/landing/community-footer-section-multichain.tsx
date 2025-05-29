import Link from "next/link"
import { Twitter, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const footerLinks = [
  { name: "Docs", href: "#docs" },
  { name: "GitHub", href: "https://github.com/drippay" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "mailto:contact@drippay.xyz" },
]

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/drippay", icon: <Twitter className="h-5 w-5" /> },
  { name: "Discord", href: "https://discord.gg/your-drippay", icon: <MessageSquare className="h-5 w-5" /> },
]

export default function CommunityFooterSection() {
  return (
    <footer className="bg-deep_neutral/90 border-t border-border_neutral py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-light_neutral">
          Join the Web3 Billing <span className="text-accent_primary">Revolution</span>
        </h2>
        <p className="text-light_neutral/70 max-w-lg mx-auto mb-8">
          Connect with the DripPay community, contribute to the protocol, or get support from our team.
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <Button asChild size="lg" className="bg-accent_primary hover:bg-opacity-85 text-light_neutral font-semibold">
            <Link href="https://discord.gg/your-drippay" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-5 w-5" /> Join Discord
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent_secondary text-accent_secondary hover:bg-accent_secondary hover:text-deep_neutral font-semibold"
          >
            <Link href="https://twitter.com/drippay" target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-5 w-5" /> Follow on X
            </Link>
          </Button>
        </div>

        <div className="border-t border-border_neutral pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={150} height={37.5} />
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-light_neutral/70 hover:text-accent_secondary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex justify-center space-x-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light_neutral/60 hover:text-accent_primary transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-10 text-sm text-light_neutral/50">
            DripPay is open, modular, and chain-agnostic. Start billing the Web3 way.
            <br />
            &copy; {new Date().getFullYear()} DripPay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
