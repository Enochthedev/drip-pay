import Image from "next/image"

export default function SolutionNexaris() {
  return (
    <section className="py-20 md:py-32 bg-nex_primary_blue text-nex_text_light relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/placeholder.svg?width=1920&height=1080"
          alt="Abstract background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 bg-white/20 text-sm rounded-full mb-6 backdrop-blur-sm">
          Our Solution
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 max-w-3xl mx-auto leading-tight">
          Our Solution streamlines crypto transactions, ensuring effortless adoption for all merchants.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto text-left">
          <div className="relative p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
            <p className="text-lg text-nex_light_blue">
              DripPay (inspired by Nexaris) provides no-code solutions for payments, boosting profits and removing
              banking hurdles. Online or offline, we’ve got you covered.
            </p>
            {/* Placeholder for 3D visual from screenshot 3 (top-left) */}
            <div className="absolute -top-8 -left-8 w-24 h-24">
              <Image src="/placeholder.svg?width=96&height=96" alt="Ethereum on UI element" width={96} height={96} />
            </div>
          </div>
          <div className="relative p-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
            <p className="text-lg text-nex_light_blue">
              Our products suit any merchant, letting you harness crypto without old banks. Streamlined processes
              deliver higher profitability.
            </p>
            {/* Placeholder for 3D visual from screenshot 3 (bottom-right) */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24">
              <Image
                src="/placeholder.svg?width=96&height=96"
                alt="Cloud download on UI element"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
