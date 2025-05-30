import { Button } from "@/components/ui/button"
import { Code, ExternalLink } from "lucide-react"
import Link from "next/link"

const smartContractSnippet = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@drippay/contracts/DripPayCore.sol"; // Fictional import

contract YourService is DripPayManaged {
  uint256 public constant MONTHLY_FEE = 0.05 ether; // Example fee in Swell ETH
  address public immutable feeRecipient;

  constructor(address dripPayRouter, address recipient) 
      DripPayManaged(dripPayRouter) 
  {
      feeRecipient = recipient;
      // Example: Create a subscription plan upon deployment
      _createSubscriptionPlan(MONTHLY_FEE, 30 days, recipient);
  }

  function _createSubscriptionPlan(
      uint256 amount, 
      uint256 interval, 
      address recipient
  ) internal {
      // Simplified: Register a new payment plan with DripPay
      // Assumes native token (Swell ETH) if tokenAddress is address(0)
      uint256 planId = _registerDripPayPlan(
          address(0), // Token address (0x0 for native Swell ETH)
          amount,
          interval,
          recipient
      );
      // Your application logic to store or use planId
  }

  // Users would typically subscribe to this service's plan
  // via the DripPayRouter contract, referencing the planId.
}
`.trim()

export default function DeveloperPreviewSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-ghost_white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 text-midnight_navy">
          Developer <span className="text-electric_indigo">Preview</span>
        </h2>
        <p className="text-base sm:text-lg text-slate_gray text-center mb-8 sm:mb-12 max-w-2xl mx-auto font-sans">
          Integrate DripPay seamlessly into your Swell-based applications.
        </p>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-midnight_navy p-4 sm:p-6 rounded-lg shadow-xl border border-slate-700 overflow-x-auto">
            <div className="flex items-center text-drip_teal mb-3">
              <Code className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="font-mono text-xs sm:text-sm">YourService.sol (Swell L2)</span>
            </div>
            <pre className="bg-slate-950 text-xs sm:text-sm text-slate-300 p-3 sm:p-4 rounded-md overflow-x-auto max-h-80 sm:max-h-96 font-mono">
              <code>{smartContractSnippet}</code>
            </pre>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg h-48 sm:h-64 md:h-80 mb-6 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
              {/* Terminal/CLI Interface Mockup */}
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-slate-400 text-sm font-mono">drippay-cli</span>
              </div>

              <div className="p-4 font-mono text-sm space-y-2">
                <div className="text-drip_teal">$ drippay init my-subscription-app</div>
                <div className="text-slate-400">✓ Creating smart contract templates...</div>
                <div className="text-slate-400">✓ Setting up Swell L2 configuration...</div>
                <div className="text-slate-400">✓ Installing dependencies...</div>

                <div className="mt-4 text-drip_teal">$ drippay deploy --network swell</div>
                <div className="text-slate-400">📦 Deploying to Swell L2...</div>
                <div className="text-electric_indigo">🎉 Contract deployed: 0x742d35Cc6634C0532925a3b8D</div>

                <div className="mt-4 text-drip_teal">$ drippay create-plan --amount 0.05 --interval monthly</div>
                <div className="text-slate-400">✓ Subscription plan created</div>
                <div className="text-slate-400">Plan ID: plan_abc123</div>

                <div className="mt-2 flex items-center">
                  <span className="text-drip_teal">$</span>
                  <div className="ml-2 w-2 h-4 bg-drip_teal animate-pulse"></div>
                </div>
              </div>

              {/* Floating code snippets */}
              <div className="absolute top-4 right-4 bg-electric_indigo/10 backdrop-blur-sm rounded px-2 py-1 text-xs text-electric_indigo border border-electric_indigo/20">
                Smart Contract
              </div>
              <div className="absolute bottom-4 left-4 bg-drip_teal/10 backdrop-blur-sm rounded px-2 py-1 text-xs text-drip_teal border border-drip_teal/20">
                Swell L2
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-electric_indigo hover:bg-opacity-85 text-ghost_white font-semibold text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_4px_14px_0_rgba(90,72,242,0.39)] hover:shadow-[0_6px_20px_0_rgba(90,72,242,0.23)] transform transition-all duration-300 hover:scale-105"
            >
              <Link href="#docs">
                Explore the Docs <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
