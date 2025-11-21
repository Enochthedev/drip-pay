# Operational Runbooks

Emergency response and operational procedures for DripPay.

## Runbook Index

### Critical Incidents
- [Database Down](./DATABASE_DOWN.md)
- [Event Listener Crashed](./EVENT_LISTENER_DOWN.md)
- [Payment Processing Failed](./PAYMENT_FAILURE.md)
- [Private Key Compromised](./KEY_COMPROMISED.md)
- [Smart Contract Issue](./CONTRACT_ISSUE.md)

### Operational Tasks
- [Manual Event Resync](./RESYNC_EVENTS.md)
- [Process Stuck Payments](./STUCK_PAYMENTS.md)
- [Rotate Secrets](./ROTATE_SECRETS.md)
- [Scale Services](./SCALING.md)

## Incident Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| SEV1 | Critical - System down | 15 min | Database down, all payments failing |
| SEV2 | Major - Feature broken | 1 hour | Event listener crashed, email down |
| SEV3 | Minor - Degraded | 4 hours | Slow queries, some webhooks failing |
| SEV4 | Low - Cosmetic | 24 hours | UI glitch, log noise |

## On-Call Contacts

| Role | Primary | Backup |
|------|---------|--------|
| Engineering | [Add contact] | [Add contact] |
| DevOps | [Add contact] | [Add contact] |
| Security | [Add contact] | [Add contact] |

## Monitoring Dashboards

- Health Check: `/api/health`
- Metrics: `/api/metrics`
- Database: Prisma Studio (`npm run db:studio`)
- Logs: [Add log aggregator URL]
