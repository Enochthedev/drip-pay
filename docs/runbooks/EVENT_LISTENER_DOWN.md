# Runbook: Event Listener Down

**Severity**: SEV2 - Major
**Response Time**: 1 hour

## Symptoms

- No new events in `SubscriptionEvent` table
- `BlockchainSync` table shows old `lastSyncedAt`
- Webhooks not being triggered
- Users report subscriptions not updating

## Impact

- Blockchain events not captured
- Database out of sync with chain
- Webhooks not delivered
- Users see stale data

## Immediate Actions

### 1. Check Listener Status

```bash
# If using PM2
pm2 status
pm2 logs drippay-listener

# If using systemd
sudo systemctl status drippay-listener
journalctl -u drippay-listener -n 100
```

### 2. Check Sync Status

```sql
-- Check last synced blocks
SELECT * FROM "BlockchainSync" ORDER BY "lastSyncedAt" DESC;
```

### 3. Restart Listener

```bash
# PM2
pm2 restart drippay-listener

# systemd
sudo systemctl restart drippay-listener

# Manual
npm run listener:start
```

### 4. Check RPC Connectivity

```bash
# Test RPC endpoint
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  $SWELL_RPC_URL
```

## Root Cause Investigation

### Common Causes

1. **RPC endpoint down**
   - Switch to fallback RPC
   - Check provider status page

2. **Memory exhaustion**
   - Check system memory
   - Increase instance size

3. **Unhandled exception**
   - Check error logs
   - Fix bug and redeploy

4. **Network issues**
   - Check connectivity
   - Verify firewall rules

### Check Logs

```bash
# Look for errors
pm2 logs drippay-listener --err --lines 100

# Look for specific patterns
grep -i "error\|exception\|fail" logs/listener.log
```

## Recovery: Resync Missed Events

### 1. Find Last Synced Block

```sql
SELECT "chainId", "lastSyncedBlock", "lastSyncedAt"
FROM "BlockchainSync";
```

### 2. Get Current Block

```bash
# Use cast (foundry) or any RPC tool
cast block-number --rpc-url $SWELL_RPC_URL
```

### 3. Manual Resync

```typescript
// scripts/resync.ts
import { processEventsInRange } from '../lib/blockchain/event-listener'

const chainId = 1923 // Swell
const fromBlock = BigInt(LAST_SYNCED_BLOCK + 1)
const toBlock = BigInt(CURRENT_BLOCK)

await processEventsInRange(chainId, fromBlock, toBlock)
```

Run:
```bash
npx tsx scripts/resync.ts
```

### 4. Verify Resync

```sql
-- Check for new events
SELECT * FROM "SubscriptionEvent"
WHERE "createdAt" > NOW() - INTERVAL '1 hour'
ORDER BY "createdAt" DESC;
```

## Post-Incident

1. **Verify all events captured**
   - Compare on-chain events to database
   - Check for gaps in event sequence

2. **Check subscription states**
   - Verify active subscriptions match chain
   - Fix any inconsistencies

3. **Process queued webhooks**
   - Check `WebhookDelivery` for pending
   - Manually trigger if needed

4. **Set up monitoring**
   - Alert on BlockchainSync staleness
   - Alert on listener process death

## Prevention

1. Run listener with process manager (PM2/systemd)
2. Set up automatic restart on crash
3. Configure fallback RPC endpoints
4. Monitor BlockchainSync table freshness
5. Set up alerts for listener downtime

## Contacts

- On-call Engineer: [Add contact]
- RPC Provider Support: [Add contact]
