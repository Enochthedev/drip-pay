# Testnet Configuration Guide

This guide helps you set up DripPay on testnets before launching on mainnet.

## Supported Testnets

| Chain | Testnet | Chain ID | Faucet |
|-------|---------|----------|--------|
| Swell | Swell Testnet | 1923 | https://faucet.swell.network |
| Base | Base Sepolia | 84532 | https://faucet.quicknode.com/base/sepolia |
| Ethereum | Sepolia | 11155111 | https://sepoliafaucet.com |

## Prerequisites

### 1. Create Accounts

#### Alchemy (RPC Provider)
1. Go to https://dashboard.alchemy.com/signup
2. Create account
3. Click "Create App"
4. Select networks:
   - Ethereum Sepolia
   - Base Sepolia
5. Copy API keys

#### OpenZeppelin Defender
1. Go to https://defender.openzeppelin.com
2. Sign up for free account
3. Go to "Relay" section
4. Click "Create Relayer"
5. Select networks:
   - Ethereum Sepolia
   - Base Sepolia
6. Copy API Key and Secret
7. Fund relayer with testnet ETH (for gas)

#### Neon (Database)
1. Go to https://neon.tech
2. Sign up for free account
3. Create a project
4. Copy connection string

#### WalletConnect
1. Go to https://cloud.walletconnect.com
2. Create account
3. Create new project
4. Copy Project ID

### 2. Configure Environment

Create `.env` file:

```bash
# Database (Neon)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb"

# Authentication
JWT_SECRET="your-super-secret-32-character-key-change-in-production-please"

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-walletconnect-project-id"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# OpenZeppelin Defender
DEFENDER_API_KEY="your-defender-api-key"
DEFENDER_API_SECRET="your-defender-api-secret"

# Alchemy RPC URLs
ETHEREUM_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"
BASE_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY"
SWELL_RPC_URL="https://swell-testnet.alt.technology"

# Alchemy API Key (for fallback)
ALCHEMY_API_KEY="YOUR_API_KEY"

# Email (Optional for testnet)
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="noreply@drippay.xyz"

# Redis (Optional for testnet)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Environment
NODE_ENV="development"
```

### 3. Get Testnet Funds

#### For Ethereum Sepolia:
```bash
# Visit faucet
https://sepoliafaucet.com

# Or use Alchemy faucet
https://sepoliafaucet.com

# Request ETH to your wallet address
```

#### For Base Sepolia:
```bash
# Bridge from Sepolia
https://bridge.base.org/deposit

# Or use faucet
https://faucet.quicknode.com/base/sepolia
```

#### For Swell Testnet:
```bash
# Visit Swell faucet
https://faucet.swell.network
```

#### Get Test Tokens (USDC/USDT):

For Sepolia:
```bash
# Deploy mock USDC or use existing test token
# Sepolia USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
```

For Base Sepolia:
```bash
# You may need to deploy your own mock token
# Or bridge from Sepolia
```

### 4. Initialize Database

```bash
npm install
npm run db:init
```

This creates all necessary tables in your Neon database.

### 5. Deploy Contracts to Testnets

#### Deploy to Ethereum Sepolia:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

#### Deploy to Base Sepolia:
```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

#### Deploy to Swell Testnet:
```bash
npx hardhat run scripts/deploy.ts --network swellTestnet
```

**Save the deployed contract addresses!**

### 6. Update Environment with Contract Addresses

Add to `.env`:
```bash
ETHEREUM_SUBSCRIPTION_CONTRACT="0xYourSepoliaContractAddress"
BASE_SUBSCRIPTION_CONTRACT="0xYourBaseSepoliaContractAddress"
SWELL_SUBSCRIPTION_CONTRACT="0xYourSwellTestnetContractAddress"
```

### 7. Configure Defender Relayers

For each deployed contract:

1. Go to Defender dashboard
2. Click on your Relayer
3. Add the contract address
4. Fund the relayer with testnet ETH (~0.1 ETH)

To fund relayer:
```bash
# Get relayer address from Defender dashboard
# Send testnet ETH from faucet to relayer address
```

### 8. Start Services

```bash
# Terminal 1: Start API
npm run dev

# Terminal 2: Start event listener
npm run listener:start
```

## Testing the Setup

### 1. Check Health
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "checks": {
    "database": { "status": "healthy" },
    "blockchain": {
      "11155111": { "status": "healthy", "name": "Ethereum" },
      "84532": { "status": "healthy", "name": "Base" },
      "1923": { "status": "healthy", "name": "Swell" }
    }
  }
}
```

### 2. Check Defender Status
```bash
curl http://localhost:3000/api/defender/status
```

### 3. Create Test Subscription

Using frontend or API:
```bash
# 1. Connect wallet
# 2. Create subscription plan
# 3. Subscribe to plan
# 4. Approve tokens
# 5. Process payment
```

### 4. Monitor Events
```bash
# Check database for events
npm run db:studio

# Look at SubscriptionEvent table
```

## Troubleshooting

### "Insufficient funds" error
- Fund Defender relayer with more testnet ETH
- Check relayer balance in Defender dashboard

### "Invalid signature" on auth
- Check JWT_SECRET is consistent
- Clear browser localStorage
- Request new nonce

### Contract deployment fails
- Ensure wallet has testnet ETH
- Check network configuration in hardhat.config.ts
- Verify RPC URL is correct

### Event listener not catching events
- Check contract address in .env
- Verify RPC connection
- Check BlockchainSync table for last synced block

## Next Steps

Once testnet is working:

1. Test full user flow
2. Invite beta testers
3. Monitor for issues
4. Collect feedback
5. Deploy to mainnet when ready

## Mainnet Deployment Checklist

Before deploying to mainnet:

- [ ] Smart contract audit completed
- [ ] All tests passing
- [ ] Testnet ran for 2+ weeks without issues
- [ ] Beta testers validated
- [ ] Defender relayers funded with real ETH
- [ ] Backup RPC providers configured
- [ ] Monitoring and alerts set up
- [ ] Incident response plan ready
- [ ] Legal review completed
- [ ] Security review completed

## Cost Estimates (Testnet)

| Service | Testnet Cost |
|---------|--------------|
| Neon Database | Free tier |
| Alchemy | Free tier (300M compute units) |
| Defender | Free tier (up to 100 txs/month) |
| Testnet ETH | Free from faucets |
| **Total** | **$0/month** |

## Support

- Alchemy Discord: https://discord.gg/alchemy
- Defender Docs: https://docs.openzeppelin.com/defender
- Neon Discord: https://discord.gg/neon
