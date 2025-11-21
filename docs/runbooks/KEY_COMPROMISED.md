# Runbook: Private Key Compromised

**Severity**: SEV1 - Critical
**Response Time**: IMMEDIATE

## Symptoms

- Unauthorized transactions from admin wallet
- Unexpected contract state changes
- Security alert from monitoring
- User reports of suspicious activity

## Impact

- Attacker can drain admin wallet
- Attacker can manipulate contract (if admin functions exist)
- Potential loss of user funds
- Complete platform compromise

## IMMEDIATE ACTIONS (First 15 Minutes)

### 1. STOP ALL SERVICES

```bash
# Stop everything immediately
pm2 stop all

# Or if using Vercel
vercel rm drippay --yes

# Kill listener
pkill -f "listener:start"
```

### 2. Revoke Contract Access (if possible)

If contract has emergency functions:
```bash
# Using foundry
cast send $CONTRACT_ADDRESS "pause()" --private-key $BACKUP_KEY

# Or using script
npx tsx scripts/emergency-pause.ts
```

### 3. Transfer Remaining Funds

If admin wallet still has funds:
```bash
# Move funds to secure wallet
cast send $SECURE_WALLET --value $(cast balance $ADMIN_WALLET) --private-key $BACKUP_KEY
```

### 4. Rotate All Secrets

```bash
# Generate new JWT secret
openssl rand -base64 32

# Generate new webhook secret
openssl rand -hex 32

# Rotate database password
# (Do this in your database provider's console)
```

## INVESTIGATION (Next 2 Hours)

### 1. Identify Compromise Vector

Check:
- [ ] Was `.env` file committed to git?
- [ ] Was key exposed in logs?
- [ ] Was key in plaintext somewhere?
- [ ] Was there unauthorized server access?
- [ ] Was a team member's machine compromised?

### 2. Audit All Transactions

```bash
# Get all transactions from admin wallet
cast tx-history $ADMIN_ADDRESS --rpc-url $RPC_URL

# Check for unauthorized actions
# Look at block explorer for full history
```

### 3. Check for Data Breach

- Review access logs
- Check for unauthorized API calls
- Audit database access logs

## RECOVERY (Next 24 Hours)

### 1. Deploy New Contract

```bash
# Generate new admin wallet
cast wallet new

# Deploy new contract
npx hardhat run scripts/deploy.ts --network swell

# Update .env with new addresses
```

### 2. Migrate Subscriptions

Option A: On-chain migration (if old contract still accessible)
```solidity
// Call migration function to transfer subscription data
```

Option B: Database recreation
```sql
-- Export subscription data
-- Users will need to re-subscribe to new contract
```

### 3. Notify Users

Send notification:
- What happened (without security details)
- What we're doing about it
- What users need to do
- Timeline for resolution

Template:
```
Subject: Important Security Update - Action Required

Dear DripPay User,

We detected unauthorized activity and have taken immediate action to secure
the platform.

What happened:
- We identified a security incident affecting our payment processing
- We immediately stopped all services to protect user funds

What we're doing:
- Deploying new secure infrastructure
- Migrating all subscription data
- Implementing additional security measures

What you need to do:
- Your existing subscription will need to be re-authorized
- You will receive instructions once the new system is live
- No action needed on your part right now

Timeline:
- Expected resolution: [DATE]
- We will notify you when services resume

We apologize for any inconvenience and are committed to maintaining the
highest security standards.

The DripPay Team
```

### 4. Implement Better Key Management

Before going live again:

1. **Use key management service**
   ```bash
   # AWS KMS
   aws kms create-key --description "DripPay Admin Key"

   # Or OpenZeppelin Defender
   # Set up Relay in Defender dashboard
   ```

2. **Implement multi-sig**
   - Deploy Gnosis Safe
   - Set as contract admin
   - Require 2/3 signatures

3. **Remove private key from environment**
   - Use HSM or KMS for signing
   - Never store raw keys in `.env`

## POST-INCIDENT (Next Week)

### 1. Security Audit

- [ ] Full code review
- [ ] Penetration testing
- [ ] Smart contract audit
- [ ] Infrastructure review

### 2. Implement Monitoring

- [ ] Alert on admin wallet activity
- [ ] Alert on contract admin functions
- [ ] Alert on unusual patterns

### 3. Documentation

Write post-mortem:
- Timeline of events
- Root cause analysis
- What we learned
- Prevention measures

### 4. Update Procedures

- [ ] Key rotation schedule
- [ ] Access control review
- [ ] Incident response training

## PREVENTION CHECKLIST

- [ ] Never commit `.env` files
- [ ] Use secrets manager (not env vars)
- [ ] Implement multi-sig for admin operations
- [ ] Set up transaction monitoring
- [ ] Regular security audits
- [ ] Employee security training
- [ ] Principle of least privilege
- [ ] Regular key rotation

## Emergency Contacts

- Security Lead: [Add contact]
- Legal Counsel: [Add contact]
- PR/Communications: [Add contact]
- Contract Auditor: [Add contact]
