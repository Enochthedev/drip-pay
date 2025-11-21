# DripPay Documentation

Welcome to the DripPay documentation. DripPay is a crypto-native billing platform for blockchain-based subscription payments.

## Quick Links

### Getting Started
- [Backend Setup Guide](./BACKEND_README.md)
- [Environment Configuration](./guides/ENVIRONMENT.md)
- [Quick Start Guide](./guides/QUICKSTART.md)

### Architecture
- [System Overview](./architecture/OVERVIEW.md)
- [Database Schema](./architecture/DATABASE.md)
- [Smart Contracts](./architecture/CONTRACTS.md)

### API Reference
- [Authentication](./api/AUTH.md)
- [Subscription Plans](./api/PLANS.md)
- [Subscriptions](./api/SUBSCRIPTIONS.md)
- [Payments](./api/PAYMENTS.md)
- [Webhooks](./api/WEBHOOKS.md)

### Guides
- [Deployment Guide](./guides/DEPLOYMENT.md)
- [Decisions Needed](./guides/DECISIONS_NEEDED.md)
- [Potential Issues](./guides/POTENTIAL_ISSUES.md)

### Operations
- [Runbooks](./runbooks/README.md)
- [Monitoring](./guides/MONITORING.md)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Blockchain | Viem, Wagmi, Ethers.js |
| Smart Contracts | Solidity 0.8.20 |
| Caching | Redis / In-memory |
| Email | Resend |

## Supported Chains

| Chain | Chain ID | Status |
|-------|----------|--------|
| Swell | 1923 | ✅ Live |
| Ethereum | 1 | 🔜 Q4 2025 |
| Arbitrum | 42161 | 🔜 Q1 2026 |
| Base | 8453 | 🔜 2026 |
| Polygon | 137 | 🔜 2026 |
| Optimism | 10 | 🔜 2026 |

## License

MIT
