# DripPay

**Recurring billing for crypto, without holding anyone's keys.** A subscription is a smart-contract allowance the customer can revoke, so the merchant charges on a schedule and never takes custody. This repo is the product's marketing site — the eight pages that explain the model, the chains, the pricing and the developer story.

[![Try it live](https://img.shields.io/badge/Try_it-live-2ea44f?style=for-the-badge)](https://drip-pay.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## Why this exists

Card-based subscription billing does not translate to crypto: there is no stored payment method to charge, and asking a customer to hand over a wallet defeats the point. DripPay's answer is an on-chain allowance — the customer approves a recurring pull, the contract enforces the amount and interval, and revoking is a transaction rather than a support ticket. This site is where that idea gets explained to the two audiences who have to believe it: the developer who integrates it, and the DAO or creator who bills through it.

## What's here

Eight static pages, all prerendered:

| Route | What it covers |
|---|---|
| `/` | Hero, why-DripPay, use cases, ecosystem, developer preview |
| `/features` | Core features, how it works, security and reliability |
| `/pricing` | Three tiers with an expandable feature matrix, add-ons, FAQ |
| `/use-cases` | DAOs, creators, protocols, SaaS — with a case-study spotlight |
| `/chains` | Per-chain support grid with a developer filter |
| `/waitlist` | Early-access form |
| `/privacy`, `/terms` | Legal pages |

Chain support as the site states it: **Swell Chain live**, Ethereum and Arbitrum One "soon", Optimism, Polygon PoS and Base under evaluation.

## Getting started

**Requirements:** Node 22, pnpm 10.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Checks — all three run in CI on every pull request:

```bash
pnpm run lint       # eslint, next/core-web-vitals
pnpm run typecheck  # tsc --noEmit
pnpm run build      # 11 routes, all static
```

There is no backend, no database and no environment file. Everything renders from data modules under `app/(marketing)/*/data/`, which is also where you edit copy: pricing tiers live in `pricing/data/pricing-data.tsx`, chains in `chains/data/chain-data.ts`.

## Project status

- ✅ Lint, typecheck and build all pass, 11 routes prerender.
- ⚠️ **The waitlist form stores nothing.** It waits two seconds and then tells the visitor they are on the list. Anyone who has filled it in on the live site is not on any list. Needs a real endpoint before the page is honest.
- ⚠️ The deployed site is behind this branch — it still renders the v0 title and description until this merges.
- 🟡 Marketing copy describes the protocol; **the protocol itself is not in this repo**, and nothing here has been verified against a deployed contract.
- 🟡 No tests. It is a static marketing site, so the build and typecheck are the gate; that is a deliberate trade, not an oversight.
- 📌 Two lockfiles are committed (`pnpm-lock.yaml` and `package-lock.json`). pnpm is the one in use.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui (Radix) · Framer Motion · @web3icons/react · deployed on Vercel

## License

No licence file yet. Built by [Enoch (Enochthedev)](https://github.com/Enochthedev).
