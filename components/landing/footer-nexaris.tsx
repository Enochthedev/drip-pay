import Link from "next/link"
import { Twitter, Facebook, Instagram, Github } from "lucide-react" // Assuming 'F' was Facebook

export default function FooterNexaris() {
  const socialLinks = [
    { name: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
    { name: "Facebook", href: "#", icon: <Facebook className="h-5 w-5" /> },
    { name: "Instagram", href: "#", icon: <Instagram className="h-5 w-5" /> },
    { name: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
  ]

  return (
    <footer className="py-10 bg-nex_primary_blue text-nex_light_blue border-t border-nex_accent_blue/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} DripPay. All rights reserved.</p>
        <div className="flex space-x-5">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nex_light_blue/80 hover:text-white transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
