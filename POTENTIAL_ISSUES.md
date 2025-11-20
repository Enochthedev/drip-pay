# ⚠️ Potential Issues & Mitigations

This document outlines potential problems that may arise and how we've addressed them (or what you need to do).

## 🔴 Critical Issues

### 1. Private Key Exposure
**Risk Level**: 🔴 CRITICAL

**Problem**:
- Private key stored in `.env` file
- If leaked, attacker controls admin wallet
- Can drain funds, manipulate subscriptions

**Current Mitigation**:
- `.env` is in `.gitignore` ✅
- Clear warnings in documentation ✅

**What You Must Do**:
- **NEVER** commit `.env` to git
- Use key management service (AWS KMS/Defender) for production
- Rotate keys if exposed
- Consider multi-sig for admin operations

**If key is compromised**:
1. Immediately stop all services
2. Deploy new contract with new admin
3. Migrate subscriptions
4. Notify all users

---

### 2. Payment Processing Failures
**Risk Level**: 🟡 HIGH

**Problem**:
- Network outages during payment processing
- RPC endpoint rate limits
- Blockchain congestion
- Smart contract bugs

**Mitigations Implemented**:
- ✅ Dunning management (3 retry attempts)
- ✅ Failed payment tracking in database
- ✅ Email notifications to users
- ✅ Graceful error handling (logs, doesn't crash)

**What Could Still Go Wrong**:
- Payment processor crashes during run
- Database write fails after on-chain success
- Double-processing same payment

**Additional safeguards needed**:
```typescript
// Add payment idempotency
// Check if payment already exists before processing
if (await paymentExists(txHash)) {
  return 'already_processed'
}
```

---

### 3. Blockchain Reorganizations (Reorgs)
**Risk Level**: 🟡 MEDIUM

**Problem**:
- Blockchain reorganizes recent blocks
- Events we already processed get "un-done"
- Database becomes out of sync with chain

**Mitigations Implemented**:
- ✅ Wait for confirmations before processing (6-128 blocks depending on chain)
- ✅ Configurable per chain
- ✅ Sync state tracking

**What Could Still Go Wrong**:
- Deep reorg beyond confirmation window (rare but possible)
- Event listener crashes during reorg

**Solution if this happens**:
```bash
# Manual resync from specific block
npm run resync -- --chain=1923 --from-block=12345
```

*(You may want me to implement this script)*

---

### 4. RPC Endpoint Failures
**Risk Level**: 🟡 MEDIUM

**Problem**:
- RPC provider goes down
- Rate limits exceeded
- Websocket connection drops

**Mitigations Implemented**:
- ✅ Error logging
- ✅ Automatic reconnection (Viem handles this)

**What's Missing**:
- Fallback RPC endpoints
- Automatic RPC rotation

**Recommend adding**:
```typescript
const RPCs = [
  'https://primary-rpc.com',
  'https://fallback-rpc.com',
  'https://public-rpc.com'
]
// Rotate on failure
```

---

### 5. Database Connection Loss
**Risk Level**: 🟡 MEDIUM

**Problem**:
- Database becomes unavailable
- Connection pool exhausted
- Query timeout

**Mitigations Implemented**:
- ✅ Prisma connection pooling
- ✅ Error handling on queries

**What Could Go Wrong**:
- Lost events during downtime (not persisted)
- Payments processed but not recorded

**Recommendations**:
1. Set up database monitoring/alerts
2. Enable automatic backups
3. Use managed database with auto-failover (Neon, RDS)

---

## 🟡 Medium Risk Issues

### 6. Gas Price Spikes
**Risk Level**: 🟡 MEDIUM

**Problem**:
- Gas prices surge (e.g., NFT mint on Ethereum)
- Payment processing becomes expensive
- May exceed subscription value

**Current State**:
- ❌ No gas price limits
- ❌ No gas price checking before sending

**Solutions**:
1. Set maximum gas price threshold
2. Queue payments during high gas periods
3. Use L2s (already configured for multiple L2s ✅)

**Implement gas price guard**:
```typescript
const maxGasPrice = parseGwei('50') // 50 gwei max
const currentGas = await publicClient.getGasPrice()

if (currentGas > maxGasPrice) {
  console.log('Gas too high, queuing payment')
  return 'queued'
}
```

---

### 7. Smart Contract Bugs
**Risk Level**: 🟡 MEDIUM

**Problem**:
- Bug in subscription contract
- Funds locked or drained
- Logic error in payment processing

**Mitigations**:
- ✅ Based on standard patterns (OpenZeppelin)
- ✅ ReentrancyGuard for protection

**What's Missing**:
- ❌ No formal audit
- ❌ No upgradability mechanism
- ❌ No emergency pause function

**Recommendations**:
1. Get contract audited before mainnet ($5k-20k)
2. Add timelock for admin operations
3. Implement pause mechanism
4. Consider upgradeable proxy pattern

---

### 8. Webhook Delivery Failures
**Risk Level**: 🟢 LOW

**Problem**:
- User's webhook endpoint is down
- Takes too long to respond
- Returns error

**Mitigations Implemented**:
- ✅ Retry mechanism (up to 5 attempts)
- ✅ Exponential backoff
- ✅ Delivery tracking
- ✅ Timeout handling

**Edge Cases**:
- Webhook endpoint accepts but doesn't process
- HMAC validation fails on user side
- Webhook queue grows too large

**Monitor**: Check WebhookDelivery table for stuck deliveries

---

### 9. Token Approval Issues
**Risk Level**: 🟡 MEDIUM

**Problem**:
- User doesn't approve enough tokens
- Approval expires or is revoked
- Wrong token approved

**Current Handling**:
- ✅ Contract checks allowance
- ✅ Emits PaymentFailed event
- ✅ Email notification sent

**User Experience Issue**:
- Users might not understand why payment failed
- No clear UI to approve tokens

**Frontend TODO** (not in backend):
```typescript
// Check and request approval before subscribing
const allowance = await tokenContract.allowance(user, subscriptionContract)
if (allowance < amount) {
  await tokenContract.approve(subscriptionContract, MAX_UINT256)
}
```

---

## 🟢 Low Risk Issues

### 10. Rate Limiting False Positives
**Risk Level**: 🟢 LOW

**Problem**:
- Legitimate users get rate limited
- Shared IP addresses (corporate networks)
- Aggressive bot protection

**Mitigations Implemented**:
- ✅ Higher limits for authenticated users (100 req/min)
- ✅ Per-user tracking for auth requests
- ✅ Graceful error messages with retry info

**If users complain**:
- Increase limits in `lib/rate-limit.ts`
- Add whitelist for known good IPs
- Implement CAPTCHA for suspicious activity

---

### 11. Email Deliverability
**Risk Level**: 🟢 LOW

**Problem**:
- Emails land in spam
- Bounces or delivery failures
- User provides wrong email

**Mitigations**:
- ✅ Using reputable service (Resend)
- ✅ Email is optional (not required for core functionality)

**Best Practices**:
1. Set up SPF/DKIM/DMARC records
2. Don't send too many emails (use batching)
3. Add unsubscribe option
4. Verify email addresses

---

### 12. Time Zone Issues
**Risk Level**: 🟢 LOW

**Problem**:
- Billing times display wrong for users
- Subscription timing confusion

**Current State**:
- ✅ All times stored as UTC in database
- ✅ Date calculations use server time

**Frontend TODO**:
```typescript
// Display in user's timezone
new Date(subscription.nextBillingDate).toLocaleString()
```

---

### 13. Concurrent Request Conflicts
**Risk Level**: 🟢 LOW

**Problem**:
- User clicks "cancel" multiple times
- Race condition in database updates
- Duplicate subscriptions created

**Mitigations**:
- ✅ Database unique constraints
- ✅ Transaction handling with Prisma

**Additional Safety**:
```typescript
// Add database transaction isolation
await prisma.$transaction(async (tx) => {
  // Operations here are atomic
}, {
  isolationLevel: 'Serializable'
})
```

---

### 14. Cron Job Overlap
**Risk Level**: 🟢 LOW

**Problem**:
- Payment processor takes >10 minutes
- Next cron run starts before previous finishes
- Double-processing subscriptions

**Current State**:
- ❌ No locking mechanism

**Solution** (if needed):
```typescript
import { Redis } from 'ioredis'

async function processWithLock() {
  const lock = await redis.set('payment:lock', '1', 'EX', 600, 'NX')

  if (!lock) {
    console.log('Payment processor already running')
    return
  }

  try {
    await processAllDuePayments()
  } finally {
    await redis.del('payment:lock')
  }
}
```

---

## 🔮 Future Scalability Concerns

### 15. Database Performance at Scale
**When**: >100k subscriptions

**Problems**:
- Slow queries
- Table scans
- Lock contention

**Solutions**:
- ✅ Indexes already added to schema
- Add read replicas
- Partition large tables
- Archive old data

---

### 16. Event Listener Bottleneck
**When**: High-volume chains (Ethereum mainnet)

**Problems**:
- Can't process events fast enough
- Memory usage grows
- Missed events

**Solutions**:
- Run multiple event listeners (sharding)
- Use message queue (RabbitMQ, AWS SQS)
- Batch process events

---

### 17. Blockchain State Bloat
**When**: Years of operation

**Problems**:
- 1000s of subscriptions on-chain
- Reading all subscriptions becomes slow
- Gas costs increase

**Solutions**:
- Archive old subscriptions
- Use subgraphs (The Graph)
- Implement pagination in contract

---

## 🛡️ Security Vulnerabilities

### 18. JWT Token Theft
**Risk**: User's JWT is stolen

**Impact**: Attacker can access user account

**Mitigations Implemented**:
- ✅ HTTPOnly cookies (can't be accessed by JavaScript)
- ✅ 7-day expiration

**Additional Safeguards**:
- Add refresh token rotation
- IP address validation
- Device fingerprinting

---

### 19. Replay Attacks
**Risk**: Attacker replays signed message

**Impact**: Could authenticate as user

**Mitigations Implemented**:
- ✅ Nonce-based signatures
- ✅ Nonce changes after each use

**Secure** ✅

---

### 20. SQL Injection
**Risk**: Malicious SQL in queries

**Impact**: Database compromise

**Mitigations Implemented**:
- ✅ Prisma ORM (parameterized queries)
- ✅ No raw SQL

**Secure** ✅

---

## 📊 Monitoring Checklist

Set up alerts for:

- [ ] Database connection failures
- [ ] RPC endpoint errors
- [ ] Payment processing failures (>10% failure rate)
- [ ] Webhook delivery failures (>50% failure rate)
- [ ] Event listener crashes
- [ ] High gas prices (>100 gwei)
- [ ] Low admin wallet balance
- [ ] Rate limit violations spike
- [ ] API error rate >1%
- [ ] Response time >2 seconds

---

## 🚨 Incident Response Plan

### If Event Listener Crashes:

1. Check logs for error
2. Fix issue or restart service
3. Determine last synced block
4. Manually resync missed events
5. Verify no duplicate processing

### If Payment Processing Fails:

1. Stop payment processor
2. Check contract state
3. Check database state
4. Identify failed payments
5. Manually process if needed
6. Resume automated processing

### If Database Goes Down:

1. Event listener will error (graceful)
2. Payments will queue (not processed)
3. Restore database from backup
4. Check last synced blocks
5. Resync events if needed
6. Process queued payments

### If Admin Key is Compromised:

1. **IMMEDIATELY** stop all services
2. Deploy new contract (new admin)
3. Pause old contract if possible
4. Notify all users
5. Migrate subscriptions to new contract
6. Post-mortem: how was key leaked?

---

## 🔧 Tools You Should Have Ready

1. **Database client** - Query database directly
2. **Blockchain explorer** - Verify transactions
3. **RPC access** - Backup way to interact with chain
4. **Backup admin key** - In case primary is lost
5. **Monitoring dashboard** - Grafana, Datadog, or simple health check
6. **Runbook** - Step-by-step recovery procedures

---

## ✅ What's Already Protected

- ✅ Reentrancy attacks (smart contract)
- ✅ SQL injection (Prisma)
- ✅ Rate limiting (DDoS protection)
- ✅ Blockchain reorgs (confirmation blocks)
- ✅ Failed payments (retry logic)
- ✅ Signature replay (nonces)
- ✅ Type safety (TypeScript + Zod)
- ✅ Input validation (Zod schemas)
- ✅ Error handling (try-catch everywhere)
- ✅ Graceful degradation (Redis fallback)

---

## 📝 Summary

**Most Critical Risks**:
1. **Private key management** - MUST use KMS/Vault for production
2. **Smart contract bugs** - Consider audit before large amounts
3. **Payment processing failures** - Monitor closely at launch

**Everything else is standard web3 application risks with reasonable mitigations in place.**

The architecture is solid for an MVP. Launch on testnet first, monitor carefully, then move to mainnet with low limits initially.
