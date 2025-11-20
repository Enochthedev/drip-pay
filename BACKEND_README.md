# DripPay Backend Documentation

## Overview

DripPay is a crypto-native billing platform for managing blockchain-based subscription payments. This backend provides:

- **Web3 Authentication** - Wallet-based authentication with signature verification
- **Subscription Management** - Create and manage recurring payment plans
- **Multi-Chain Support** - Swell, Ethereum, Arbitrum, Base, Polygon, Optimism
- **Smart Contract Integration** - Interact with on-chain subscription contracts
- **Blockchain Event Listeners** - Real-time monitoring of on-chain events
- **Webhook System** - Notify external services of subscription events
- **Payment Processing** - Track and verify on-chain payments

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌────────────┬──────────────┬─────────────┬──────────────┐ │
│  │  Wallet    │  Dashboard   │  Plans      │  Payments    │ │
│  │  Connect   │              │             │              │ │
│  └────────────┴──────────────┴─────────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     API Routes (Next.js)                     │
│  ┌────────┬────────┬──────────────┬──────────┬────────────┐ │
│  │ Auth   │ Plans  │ Subscriptions│ Payments │ Webhooks   │ │
│  └────────┴────────┴──────────────┴──────────┴────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
│  ┌──────────────────────┬────────────────────────────────┐  │
│  │ Blockchain Client    │  Event Listener Service        │  │
│  │ Contract Services    │  Webhook Dispatcher            │  │
│  └──────────────────────┴────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────┬──────────────────────────────────────┐
│   Database (Prisma)  │      Blockchain Networks             │
│   - Users            │  - Swell Chain (Live)                │
│   - Subscriptions    │  - Ethereum                          │
│   - Payments         │  - Arbitrum                          │
│   - Events           │  - Base                              │
│   - Webhooks         │  - Polygon, Optimism                 │
└──────────────────────┴──────────────────────────────────────┘
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Viem, Wagmi, Ethers.js
- **Authentication**: JWT with wallet signature verification
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- RPC endpoints for blockchain networks (Alchemy, Infura, etc.)
- WalletConnect Project ID

### Installation

1. **Clone and install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/drippay"

# Authentication
JWT_SECRET="your-secret-key"

# Blockchain RPC URLs
SWELL_RPC_URL="https://swell-mainnet.alt.technology"
ETHEREUM_RPC_URL="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
# ... more chains

# Smart Contract Addresses (after deployment)
SWELL_SUBSCRIPTION_CONTRACT="0x..."

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id"

# Admin wallet for contract operations
ADMIN_PRIVATE_KEY="0x..."
```

3. **Initialize the database**

```bash
npm run db:init
```

This will:
- Generate Prisma Client
- Run database migrations
- Set up all required tables

4. **Start the development server**

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

### Deploy Smart Contracts

Before using the platform, deploy the subscription smart contract to your target chains:

1. **Install Hardhat** (or use Foundry)

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

2. **Deploy to a network**

```bash
npx hardhat run scripts/deploy.ts --network swell
```

3. **Update `.env` with contract address**

```env
SWELL_SUBSCRIPTION_CONTRACT="0xYourContractAddress"
```

### Start Event Listeners

To monitor blockchain events in real-time:

```bash
npm run listener:start
```

This process should run continuously (use PM2 or systemd for production).

## API Documentation

### Authentication

#### Get Nonce
```http
GET /api/auth/nonce?address=0x123...
```

Returns a nonce for wallet signing.

#### Verify Signature
```http
POST /api/auth/verify
Content-Type: application/json

{
  "address": "0x123...",
  "signature": "0xabc..."
}
```

Returns JWT token on successful verification.

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Subscription Plans

#### List Plans
```http
GET /api/plans?creatorId=<id>&chainId=<id>
```

#### Create Plan
```http
POST /api/plans
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Premium Monthly",
  "description": "Access to all premium features",
  "price": "10000000", // 10 USDC (6 decimals)
  "currency": "USDC",
  "interval": "monthly",
  "chainId": 1923,
  "tokenAddress": "0x..."
}
```

#### Get Plan Details
```http
GET /api/plans/:id
```

#### Update Plan
```http
PATCH /api/plans/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Plan Name",
  "isActive": true
}
```

### Subscriptions

#### List Subscriptions
```http
GET /api/subscriptions?type=subscriber&status=active
Authorization: Bearer <token>
```

#### Create Subscription
```http
POST /api/subscriptions
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "plan_123",
  "txHash": "0xabc...",
  "subscriptionId": "1"
}
```

#### Get Subscription
```http
GET /api/subscriptions/:id
Authorization: Bearer <token>
```

#### Update Subscription
```http
PATCH /api/subscriptions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "pause", // or "resume", "cancel"
  "txHash": "0x..."
}
```

### Payments

#### List Payments
```http
GET /api/payments?subscriptionId=<id>&status=completed
Authorization: Bearer <token>
```

#### Record Payment
```http
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "subscriptionId": "sub_123",
  "txHash": "0x...",
  "amount": "10000000",
  "currency": "USDC",
  "tokenAddress": "0x...",
  "chainId": 1923,
  "blockNumber": 12345
}
```

### Webhooks

#### List Webhooks
```http
GET /api/webhooks
Authorization: Bearer <token>
```

#### Create Webhook
```http
POST /api/webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": [
    "subscription.created",
    "subscription.cancelled",
    "payment.succeeded",
    "payment.failed"
  ]
}
```

#### Delete Webhook
```http
DELETE /api/webhooks/:id
Authorization: Bearer <token>
```

## Database Schema

### Key Models

- **User** - Wallet-based users
- **SubscriptionPlan** - Payment plans created by users
- **Subscription** - Active subscriptions
- **Payment** - Payment records
- **SubscriptionEvent** - Event history
- **Webhook** - Webhook endpoints
- **WebhookDelivery** - Delivery tracking
- **BlockchainSync** - Sync state for event listeners

View the full schema in `prisma/schema.prisma`.

## Smart Contract

The `DripPaySubscription` contract (`contracts/DripPaySubscription.sol`) provides:

### Features

- Create subscriptions with ERC20 tokens
- Automatic recurring payments
- Pause/resume/cancel functionality
- Platform fee collection (configurable)
- Batch payment processing
- Event emission for all actions

### Key Functions

- `createSubscription()` - Create new subscription
- `cancelSubscription()` - Cancel active subscription
- `pauseSubscription()` - Temporarily pause
- `resumeSubscription()` - Resume paused subscription
- `processPayment()` - Process due payment
- `batchProcessPayments()` - Process multiple payments

## Blockchain Integration

### Supported Chains

| Chain | Chain ID | Status | RPC URL |
|-------|----------|--------|---------|
| Swell | 1923 | Live | https://swell-mainnet.alt.technology |
| Ethereum | 1 | Planned | - |
| Arbitrum | 42161 | Planned | - |
| Base | 8453 | Planned | - |
| Polygon | 137 | Planned | - |
| Optimism | 10 | Planned | - |

### Event Listening

The event listener service monitors these events:

- `SubscriptionCreated`
- `SubscriptionCancelled`
- `SubscriptionPaused`
- `SubscriptionResumed`
- `PaymentProcessed`
- `PaymentFailed`

## Webhook Events

DripPay sends webhooks for:

- `subscription.created` - New subscription created
- `subscription.cancelled` - Subscription cancelled
- `subscription.paused` - Subscription paused
- `subscription.resumed` - Subscription resumed
- `payment.succeeded` - Payment processed successfully
- `payment.failed` - Payment failed

### Webhook Payload

```json
{
  "id": "evt_123",
  "event": "subscription.created",
  "timestamp": 1234567890,
  "data": {
    "subscriptionId": "sub_123",
    "subscriber": "0x...",
    "amount": "10000000",
    "chainId": 1923,
    "txHash": "0x..."
  }
}
```

### Webhook Signature Verification

Verify webhooks using HMAC:

```typescript
import crypto from 'crypto'

const signature = request.headers['x-drippay-signature']
const payload = JSON.stringify(request.body)

const expectedSignature = crypto
  .createHmac('sha256', webhookSecret)
  .update(payload)
  .digest('hex')

if (signature === expectedSignature) {
  // Valid webhook
}
```

## Utilities

### Prisma Studio

View and edit database records:

```bash
npm run db:studio
```

### Database Migrations

Create a new migration:

```bash
npm run db:migrate
```

### Generate Prisma Client

```bash
npm run db:generate
```

## Production Deployment

### Environment Setup

1. Set up production database (PostgreSQL)
2. Configure production RPC endpoints
3. Deploy smart contracts to mainnets
4. Set secure JWT_SECRET
5. Configure ADMIN_PRIVATE_KEY for payment processing

### Process Management

Use PM2 to manage the event listener:

```bash
pm2 start npm --name "drippay-listener" -- run listener:start
pm2 save
pm2 startup
```

### Security Considerations

- Store private keys in secure vault (AWS Secrets Manager, etc.)
- Use environment-specific RPC endpoints
- Enable rate limiting on API routes
- Implement proper CORS policies
- Use SSL/TLS for all connections
- Regularly rotate JWT secrets
- Monitor webhook delivery for anomalies

## Testing

### Manual Testing

1. Connect wallet and authenticate
2. Create a subscription plan
3. Subscribe to a plan (with testnet tokens)
4. Process payments
5. Monitor events in database

### Smart Contract Testing

Use Hardhat or Foundry for contract testing:

```bash
npx hardhat test
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists

### Event Listener Not Receiving Events

- Verify contract address in `.env`
- Check RPC endpoint connectivity
- Ensure contract has events emitted
- Check BlockchainSync table for sync status

### Webhook Delivery Failures

- Check webhook URL is accessible
- Verify endpoint returns 200 status
- Review WebhookDelivery table for errors
- Check retry schedule

## Support

For issues or questions:
- GitHub Issues: https://github.com/Enochthedev/drip-pay/issues
- Documentation: https://docs.drippay.xyz

## License

MIT
