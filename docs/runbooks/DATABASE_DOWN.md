# Runbook: Database Down

**Severity**: SEV1 - Critical
**Response Time**: 15 minutes

## Symptoms

- Health check returns `unhealthy` for database
- API returns 500 errors
- Error logs show: `Can't reach database server`

## Impact

- All API requests fail
- No new subscriptions can be created
- Payments not recorded (but may still process on-chain)
- Event listener cannot sync state

## Immediate Actions

### 1. Verify Database Status

```bash
# Check if database is accessible
psql $DATABASE_URL -c "SELECT 1"

# Or use Prisma
npx prisma db execute --stdin <<< "SELECT 1"
```

### 2. Check Database Provider

**Neon**:
- Go to https://console.neon.tech
- Check project status
- Check for maintenance windows

**Supabase**:
- Go to https://app.supabase.com
- Check project status

**Self-hosted**:
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check disk space
df -h

# Check memory
free -m

# Check connections
psql -c "SELECT count(*) FROM pg_stat_activity"
```

### 3. Attempt Recovery

**If database is down**:
```bash
# Restart PostgreSQL (self-hosted)
sudo systemctl restart postgresql

# Or restore from backup
pg_restore -d drippay backup.dump
```

**If connection pool exhausted**:
```bash
# Restart application to reset connections
pm2 restart all

# Or deploy fresh instance
vercel --prod
```

### 4. Failover (if available)

If using read replicas or multi-region:
```bash
# Update DATABASE_URL to failover instance
# Redeploy application
```

## Post-Incident

### 1. Verify Recovery

```bash
# Check health
curl https://your-app.com/api/health

# Check database
npm run db:studio
```

### 2. Check for Data Loss

```bash
# Compare blockchain events to database
# Look for gaps in BlockchainSync table
```

### 3. Resync if Needed

```bash
# If events were missed during downtime
npm run resync -- --from-block=XXXXX
```

### 4. Document Incident

- What happened
- Timeline
- Root cause
- Prevention measures

## Prevention

1. Set up database monitoring alerts
2. Enable automatic backups
3. Use managed database with auto-failover
4. Monitor connection pool usage
5. Set up read replicas for high-traffic

## Contacts

- Database Provider Support: [Add contact]
- On-call Engineer: [Add contact]
