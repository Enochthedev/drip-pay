import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const FloatingCoin = ({
  src,
  alt,
  animationClass,
  className,
}: { src: string; alt: string; animationClass: string; className?: string }) => (
  <div className={`absolute ${animationClass} ${className}`}>
    <Image src={src || "/placeholder.svg"} alt={alt} width={100} height={100} className="drop-shadow-2xl" />
  </div>
)

export default function HeroNexaris() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32 bg-nex-hero-gradient text-nex_text_light overflow-hidden">
      {/* Background Image from Screenshot (or similar gradient) */}
      <div className="absolute inset-0">
        <Image
          src="/images/nexaris-hero-bg.png" // Using the provided hero image
          alt="Abstract blue background with wave patterns"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Floating Coins - using placeholders */}
      <FloatingCoin
        src="/images/nexaris-coin-usd.png"
        alt="USD Coin"
        animationClass="animate-float-slow"
        className="top-[15%] left-[10%] w-20 h-20 md:w-28 md:h-28"
      />
      <FloatingCoin
        src="/images/nexaris-coin-btc.png"
        alt="Bitcoin"
        animationClass="animate-float-medium"
        className="top-[20%] left-[30%] w-24 h-24 md:w-32 md:h-32"
      />
      <FloatingCoin
        src="/images/nexaris-coin-generic.png"
        alt="Generic Coin"
        animationClass="animate-float-fast"
        className="top-[15%] right-[35%] w-16 h-16 md:w-20 md:h-20 opacity-80"
      />
      <FloatingCoin
        src="/images/nexaris-coin-eth.png"
        alt="Ethereum"
        animationClass="animate-float-slow"
        className="top-[25%] right-[15%] w-28 h-28 md:w-36 md:h-36"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
          The future of <br className="hidden md:block" /> payments is here
        </h1>
        <form className="max-w-md mx-auto flex items-center bg-white rounded-full p-1.5 shadow-xl">
          <Input
            type="email"
            placeholder="Your email"
            className="flex-grow bg-transparent border-none focus:ring-0 text-nex_deep_navy placeholder:text-slate-400 px-4 py-3"
            aria-label="Email for waitlist"
          />
          <Button
            type="submit"
            className="bg-nex_deep_navy hover:bg-nex_deep_navy/90 text-white rounded-full px-8 py-3 text-base font-semibold"
          >
            Join waitlist
          </Button>
        </form>
      </div>
    </section>
  )
}
