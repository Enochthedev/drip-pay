import Link from "next/link"
import { Twitter, Github, MessageSquare } from "lucide-react"
import Image from "next/image"

const footerLinks = [
  { name: "Docs", href: "#docs" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "mailto:contact@drippay.xyz" },
  { name: "Blog", href: "/blog" }, // Optional
]

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/drippay", icon: <Twitter className="h-5 w-5" /> },
  { name: "Discord", href: "https://discord.gg/your-discord", icon: <MessageSquare className="h-5 w-5" /> },
  { name: "GitHub", href: "https://github.com/drippay", icon: <Github className="h-5 w-5" /> },
]

export default function FooterSection() {
  return (
    <footer className="bg-midnight_navy border-t border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-2">
              <Image src="/images/drippay-logo.png" alt="DripPay Logo" width={150} height={37.5} />
            </Link>
            <span className="text-xs bg-electric_indigo/20 text-electric_indigo px-3 py-1 rounded-full font-medium">
              Launching on Swell
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:col-span-1">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-drip_teal transition-colors font-sans"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center md:justify-end space-x-5">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-drip_teal transition-colors"
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-400 font-sans">
          <p>&copy; {new Date().getFullYear()} DripPay. All rights reserved. Powering decentralized subscriptions.</p>
        </div>
      </div>
    </footer>
  )
}
