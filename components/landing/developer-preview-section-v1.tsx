import { Button } from "@/components/ui/button"
import { Code, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const smartContractSnippet = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@drippay/contracts/DripPayCore.sol"; // Fictional import

contract YourService is DripPayManaged {
    uint256 public constant MONTHLY_FEE = 0.05 ether; // Example fee
    address public immutable feeRecipient;

    constructor(address dripPayRouter, address recipient) 
        DripPayManaged(dripPayRouter) 
    {
        feeRecipient = recipient;
        _createPlan(MONTHLY_FEE, 30 days, recipient);
    }

    function _createPlan(
        uint256 amount, 
        uint256 interval, 
        address recipient
    ) internal {
        // Simplified: Register a new payment plan with DripPay
        uint256 planId = _registerDripPayPlan(
            address(0), // Native Swell token (example)
            amount,
            interval,
            recipient
        );
        // Your logic to store/use planId
    }
}
`.trim()

export default function DeveloperPreviewSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-midnight_navy">
          Developer <span className="text-electric_indigo">Preview</span>
        </h2>
        <p className="text-lg text-slate_gray/80 text-center mb-12 max-w-2xl mx-auto font-sans">
          Integrate DripPay seamlessly into your Swell-based applications.
        </p>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-midnight_navy p-6 rounded-lg shadow-xl border border-slate-700">
            <div className="flex items-center text-drip_teal mb-3">
              <Code className="h-5 w-5 mr-2" />
              <span className="font-mono text-sm">YourService.sol (Swell L2)</span>
            </div>
            <pre className="bg-slate-950 text-sm text-slate-300 p-4 rounded-md overflow-x-auto max-h-96 font-mono">
              <code>{smartContractSnippet}</code>
            </pre>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg h-64 md:h-80 mb-6">
              <Image
                src="/placeholder.svg?height=320&width=512"
                alt="Mock DripPay Dashboard or CLI Interface"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-2xl border border-slate-200"
              />
            </div>
            <Button
              asChild
              size="lg"
              className="bg-electric_indigo hover:bg-electric_indigo/90 text-ghost_white font-semibold text-lg px-8 py-3 shadow-lg hover:shadow-glow-indigo"
            >
              <Link href="#docs">
                Explore the Docs <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
