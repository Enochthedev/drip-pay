# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Web App   │  │  Mobile App │  │   Webhooks  │  │    API      │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼────────────┘
          │                │                │                │
          ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Next.js API Routes                          │   │
│  │  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │   │
│  │  │   Auth   │  Plans   │  Subs    │ Payments │ Webhooks │      │   │
│  │  └──────────┴──────────┴──────────┴──────────┴──────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                     MIDDLEWARE LAYER                            │    │
│  │  ┌──────────┬──────────┬──────────┬──────────┬──────────┐     │    │
│  │  │   Rate   │  Auth    │  Input   │  Cache   │  Error   │     │    │
│  │  │  Limit   │  Verify  │  Valid   │  Check   │  Handle  │     │    │
│  │  └──────────┴──────────┴──────────┴──────────┴──────────┘     │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│    DATABASE      │    │   BLOCKCHAIN     │    │    SERVICES      │
│                  │    │                  │    │                  │
│  ┌────────────┐  │    │  ┌────────────┐  │    │  ┌────────────┐  │
│  │ PostgreSQL │  │    │  │   Swell    │  │    │  │   Email    │  │
│  │  (Prisma)  │  │    │  │  Ethereum  │  │    │  │  (Resend)  │  │
│  └────────────┘  │    │  │  Arbitrum  │  │    │  └────────────┘  │
│                  │    │  │   Base     │  │    │                  │
│  ┌────────────┐  │    │  │  Polygon   │  │    │  ┌────────────┐  │
│  │   Redis    │  │    │  │  Optimism  │  │    │  │  Webhooks  │  │
│  │  (Cache)   │  │    │  └────────────┘  │    │  │ Dispatcher │  │
│  └────────────┘  │    │                  │    │  └────────────┘  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        BACKGROUND WORKERS                                │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │ Event Listener │  │    Payment     │  │    Webhook     │            │
│  │  (Blockchain)  │  │   Processor    │  │     Retry      │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │                      CRON SCHEDULER                             │    │
│  │  • Process payments (every 10 min)                              │    │
│  │  • Send reminders (daily 9 AM)                                  │    │
│  │  • Retry webhooks (every 5 min)                                 │    │
│  │  • Cleanup old data (monthly)                                   │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### API Layer

The API layer handles all HTTP requests and is built on Next.js App Router.

**Rate Limiting**:
- Guest users: 10 requests per 10 seconds
- Authenticated users: 100 requests per minute
- Uses sliding window algorithm

**Authentication Flow**:
```
1. Client requests nonce → GET /api/auth/nonce?address=0x...
2. Client signs message with wallet
3. Client submits signature → POST /api/auth/verify
4. Server verifies and returns JWT
5. Client includes JWT in Authorization header
```

### Database Layer

PostgreSQL with Prisma ORM provides:
- Type-safe database queries
- Automatic migrations
- Connection pooling
- Query optimization

**Key Tables**:
- `User` - Wallet-based users
- `SubscriptionPlan` - Payment plans
- `Subscription` - Active subscriptions
- `Payment` - Payment records
- `SubscriptionEvent` - Event audit log
- `Webhook` - Webhook configurations
- `WebhookDelivery` - Delivery tracking
- `BlockchainSync` - Sync state

### Blockchain Layer

Multi-chain support with Viem/Wagmi:

```
┌─────────────────────────────────────────────────────────────┐
│                     BLOCKCHAIN CLIENT                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐    ┌──────────────────┐              │
│  │   Public Client  │    │   Wallet Client  │              │
│  │  (Read-only)     │    │  (Write ops)     │              │
│  └──────────────────┘    └──────────────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CHAIN CONFIGURATIONS                     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Swell (1923)    │ 6 confirmations  │ LIVE          │  │
│  │  Ethereum (1)    │ 12 confirmations │ PLANNED       │  │
│  │  Arbitrum (42161)│ 1 confirmation   │ PLANNED       │  │
│  │  Base (8453)     │ 1 confirmation   │ PLANNED       │  │
│  │  Polygon (137)   │ 128 confirmations│ PLANNED       │  │
│  │  Optimism (10)   │ 1 confirmation   │ PLANNED       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Smart Contract Architecture

```solidity
DripPaySubscription
├── State
│   ├── subscriptions (mapping)
│   ├── subscriberSubscriptions (mapping)
│   ├── recipientSubscriptions (mapping)
│   ├── platformFee (uint256)
│   └── feeCollector (address)
│
├── Functions
│   ├── createSubscription()
│   ├── cancelSubscription()
│   ├── pauseSubscription()
│   ├── resumeSubscription()
│   ├── processPayment()
│   └── batchProcessPayments()
│
└── Events
    ├── SubscriptionCreated
    ├── SubscriptionCancelled
    ├── SubscriptionPaused
    ├── SubscriptionResumed
    ├── PaymentProcessed
    └── PaymentFailed
```

### Background Workers

**Event Listener**:
- Monitors blockchain for subscription events
- Waits for block confirmations (reorg protection)
- Syncs on-chain state with database
- Triggers webhooks on events

**Payment Processor**:
- Runs every 10 minutes
- Finds subscriptions due for payment
- Checks token balances
- Processes payments on-chain
- Handles failures with dunning

**Webhook Dispatcher**:
- Delivers webhooks to user endpoints
- Signs payloads with HMAC
- Retries failed deliveries (5 attempts)
- Exponential backoff (1min → 12hr)

## Data Flow

### Subscription Creation Flow

```
User                    API                  Database           Blockchain
  │                      │                      │                    │
  │──Create Sub Request──▶                      │                    │
  │                      │──Validate Input──────▶                    │
  │                      │◀─────────OK──────────│                    │
  │                      │                      │                    │
  │                      │──────────────────────────Create Sub TX───▶│
  │                      │◀─────────────────────────TX Hash─────────│
  │                      │                      │                    │
  │                      │──Save Subscription──▶│                    │
  │                      │◀────────OK───────────│                    │
  │◀───Success Response──│                      │                    │
  │                      │                      │                    │
  │                      │        Event Listener monitors...         │
  │                      │                      │◀──SubCreated Event─│
  │                      │                      │                    │
  │                      │──────────Trigger Webhooks────────────────▶│
```

### Payment Processing Flow

```
Cron                  Processor              Database           Blockchain
  │                      │                      │                    │
  │──Trigger (10 min)───▶│                      │                    │
  │                      │──Find Due Subs──────▶│                    │
  │                      │◀────Subscriptions────│                    │
  │                      │                      │                    │
  │                      │      For each subscription:               │
  │                      │                      │                    │
  │                      │──────Check Balance───────────────────────▶│
  │                      │◀─────────OK─────────────────────────────│
  │                      │                      │                    │
  │                      │──────Process Payment─────────────────────▶│
  │                      │◀─────────TX Hash────────────────────────│
  │                      │                      │                    │
  │                      │──Update Subscription─▶                    │
  │                      │──Create Payment──────▶                    │
  │                      │                      │                    │
  │                      │──Send Email──────────────────────────────▶│
  │                      │──Trigger Webhooks────────────────────────▶│
```

## Scaling Considerations

### Current Limits

| Component | Current Capacity | Bottleneck |
|-----------|-----------------|------------|
| API | ~1000 req/sec | Rate limiting |
| Database | ~10k subscriptions | Single instance |
| Event Listener | ~100 events/sec | Single thread |
| Payment Processor | ~1000 subs/run | Batch size |

### Scaling Strategies

**Horizontal Scaling**:
1. Add read replicas for database queries
2. Shard event listeners by chain
3. Use message queue for payment processing
4. Deploy API to multiple regions

**Vertical Scaling**:
1. Increase database connection pool
2. Add more memory for caching
3. Use dedicated Redis instance

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: Network                                            │
│  ├── TLS encryption (HTTPS)                                 │
│  ├── DDoS protection (Vercel/Cloudflare)                    │
│  └── Rate limiting                                          │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Application                                        │
│  ├── Input validation (Zod)                                 │
│  ├── JWT authentication                                     │
│  ├── Wallet signature verification                          │
│  └── CSRF protection                                        │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Data                                               │
│  ├── Parameterized queries (Prisma)                         │
│  ├── Encrypted sensitive data                               │
│  └── Audit logging                                          │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Blockchain                                         │
│  ├── ReentrancyGuard on contract                            │
│  ├── Access controls (onlyOwner)                            │
│  └── Confirmation requirements                              │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

### Recommended Setup

```
                    ┌─────────────┐
                    │   Vercel    │
                    │  (Frontend  │
                    │    + API)   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│     Neon      │  │   Upstash     │  │   Railway     │
│  (Database)   │  │   (Redis)     │  │  (Workers)    │
└───────────────┘  └───────────────┘  └───────────────┘
```

### Production Requirements

| Service | Provider | Min Tier |
|---------|----------|----------|
| Frontend/API | Vercel | Pro ($20/mo) |
| Database | Neon | Launch ($19/mo) |
| Cache | Upstash | Pay-as-you-go |
| Workers | Railway | Starter ($5/mo) |
| RPC | Alchemy | Growth ($49/mo) |
| Email | Resend | Free / Pro |
