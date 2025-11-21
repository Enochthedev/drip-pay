# Quick Start Guide

Get DripPay running locally in 5 minutes.

## Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Git

## Installation

### 1. Clone and Install

```bash
git clone https://github.com/Enochthedev/drip-pay.git
cd drip-pay
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with minimum required values:

```env
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/drippay"
JWT_SECRET="your-32-character-secret-key-here"
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-walletconnect-id"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional but recommended
SWELL_RPC_URL="https://swell-mainnet.alt.technology"
```

### 3. Initialize Database

```bash
npm run db:init
```

This generates the Prisma client and creates database tables.

### 4. Start Development Server

```bash
npm run dev
```

App runs at http://localhost:3000

### 5. Start Background Services (Optional)

In a separate terminal:

```bash
npm run listener:start
```

This starts:
- Blockchain event listeners
- Automated payment processor
- Webhook retry mechanism

## Verify Installation

### Check Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "checks": {
    "database": { "status": "healthy" }
  }
}
```

### Check API

```bash
# Get nonce for wallet authentication
curl "http://localhost:3000/api/auth/nonce?address=0x742d35Cc6634C0532925a3b844Bc9e7595f5E0E0"
```

## Project Structure

```
drip-pay/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── (marketing)/       # Frontend pages
├── contracts/             # Solidity smart contracts
├── docs/                  # Documentation
├── lib/                   # Shared libraries
│   ├── blockchain/        # Blockchain utilities
│   ├── services/          # Business logic
│   ├── notifications/     # Email system
│   └── validation/        # Zod schemas
├── prisma/                # Database schema
├── scripts/               # Utility scripts
└── test/                  # Test files
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:init          # Initialize database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio

# Services
npm run listener:start   # Start blockchain listeners

# Testing
npm run test             # Run tests
npm run test:contracts   # Test smart contracts
```

## Next Steps

1. [Deploy Smart Contract](./DEPLOYMENT.md#smart-contract-deployment)
2. [Configure External Services](./ENVIRONMENT.md)
3. [Set Up Monitoring](./MONITORING.md)
4. [Review Security Decisions](./DECISIONS_NEEDED.md)

## Troubleshooting

### Database Connection Failed

```
Error: Can't reach database server
```

**Solution**: Ensure PostgreSQL is running and DATABASE_URL is correct.

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# Create database if needed
createdb drippay
```

### Prisma Client Not Generated

```
Error: @prisma/client did not initialize yet
```

**Solution**: Generate Prisma client:

```bash
npm run db:generate
```

### Port Already in Use

```
Error: Port 3000 is already in use
```

**Solution**: Use different port:

```bash
PORT=3001 npm run dev
```

## Getting Help

- [GitHub Issues](https://github.com/Enochthedev/drip-pay/issues)
- [Full Documentation](./README.md)
