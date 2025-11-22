# Webhook Integration Templates

DripPay sends webhooks for subscription and payment events. This guide shows you how to integrate.

## Webhook Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `subscription.created` | New subscription started | User subscribes to a plan |
| `subscription.cancelled` | Subscription ended | User or creator cancels |
| `subscription.paused` | Subscription paused | User pauses subscription |
| `subscription.resumed` | Subscription reactivated | User resumes after pause |
| `payment.succeeded` | Payment processed | Successful billing |
| `payment.failed` | Payment failed | Insufficient funds/allowance |

## Webhook Payload Format

All webhooks follow this structure:

```json
{
  "id": "evt_1a2b3c4d",
  "event": "payment.succeeded",
  "timestamp": 1700000000,
  "data": {
    // Event-specific data
  }
}
```

### Headers

```
Content-Type: application/json
X-DripPay-Signature: sha256_hmac_signature
X-DripPay-Event: payment.succeeded
X-DripPay-Timestamp: 1700000000
```

## Setting Up Webhooks

### 1. Create Endpoint

```bash
curl -X POST https://your-api.com/api/webhooks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/drippay",
    "events": [
      "subscription.created",
      "subscription.cancelled",
      "payment.succeeded",
      "payment.failed"
    ]
  }'
```

Response:
```json
{
  "webhook": {
    "id": "wh_123abc",
    "url": "https://your-app.com/webhooks/drippay",
    "events": ["subscription.created", ...],
    "secret": "whsec_a1b2c3d4...",
    "isActive": true
  }
}
```

**Save the `secret`!** You'll need it to verify webhook signatures.

### 2. Verify Signatures

Always verify webhook signatures to ensure they're from DripPay.

#### Node.js/Express Example

```typescript
import crypto from 'crypto'
import express from 'express'

const app = express()

// Important: Use raw body for signature verification
app.post('/webhooks/drippay',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const signature = req.headers['x-drippay-signature'] as string
    const timestamp = req.headers['x-drippay-timestamp'] as string
    const body = req.body.toString('utf8')

    // Verify signature
    const webhookSecret = process.env.DRIPPAY_WEBHOOK_SECRET!
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature')
      return res.status(401).send('Invalid signature')
    }

    // Prevent replay attacks (optional)
    const currentTime = Math.floor(Date.now() / 1000)
    const timestampNum = parseInt(timestamp)
    if (Math.abs(currentTime - timestampNum) > 300) { // 5 minutes
      return res.status(400).send('Webhook too old')
    }

    // Parse and process webhook
    const event = JSON.parse(body)
    handleWebhook(event)

    res.status(200).send('OK')
  }
)
```

#### Python/Flask Example

```python
import hmac
import hashlib
import time
from flask import Flask, request

app = Flask(__name__)
WEBHOOK_SECRET = 'your-webhook-secret'

@app.route('/webhooks/drippay', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-DripPay-Signature')
    timestamp = request.headers.get('X-DripPay-Timestamp')
    body = request.get_data()

    # Verify signature
    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode(),
        body,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        return 'Invalid signature', 401

    # Prevent replay attacks
    if abs(time.time() - int(timestamp)) > 300:
        return 'Webhook too old', 400

    # Process webhook
    event = request.get_json()
    handle_event(event)

    return 'OK', 200
```

## Event Handlers

### subscription.created

```json
{
  "id": "evt_123",
  "event": "subscription.created",
  "timestamp": 1700000000,
  "data": {
    "subscriptionId": "sub_abc123",
    "subscriber": "0x742d35Cc6634C0532925a3b844Bc9e7595f5E0E0",
    "recipient": "0x123...",
    "amount": "10000000",
    "chainId": 11155111,
    "txHash": "0xabc..."
  }
}
```

**Use case**: Send welcome email, grant access to premium features.

```typescript
async function handleSubscriptionCreated(data: any) {
  // Grant user access
  await db.users.update({
    where: { wallet: data.subscriber },
    data: { isPremium: true }
  })

  // Send welcome email
  await sendEmail({
    to: getUserEmail(data.subscriber),
    template: 'subscription-welcome',
    data: { subscriptionId: data.subscriptionId }
  })

  // Log to analytics
  analytics.track('Subscription Created', {
    userId: data.subscriber,
    amount: data.amount,
    chain: data.chainId
  })
}
```

### subscription.cancelled

```json
{
  "id": "evt_124",
  "event": "subscription.cancelled",
  "timestamp": 1700000100,
  "data": {
    "subscriptionId": "sub_abc123",
    "chainId": 11155111,
    "txHash": "0xdef..."
  }
}
```

**Use case**: Revoke premium access, send cancellation survey.

```typescript
async function handleSubscriptionCancelled(data: any) {
  const subscription = await getSubscription(data.subscriptionId)

  // Revoke access
  await db.users.update({
    where: { wallet: subscription.subscriber },
    data: { isPremium: false }
  })

  // Send cancellation email with survey
  await sendEmail({
    to: getUserEmail(subscription.subscriber),
    template: 'subscription-cancelled',
    data: {
      surveyLink: generateSurveyLink(subscription.id)
    }
  })
}
```

### payment.succeeded

```json
{
  "id": "evt_125",
  "event": "payment.succeeded",
  "timestamp": 1700000200,
  "data": {
    "subscriptionId": "sub_abc123",
    "amount": "10000000",
    "chainId": 11155111,
    "txHash": "0x123..."
  }
}
```

**Use case**: Update billing records, send receipt.

```typescript
async function handlePaymentSucceeded(data: any) {
  // Create invoice record
  await db.invoices.create({
    data: {
      subscriptionId: data.subscriptionId,
      amount: data.amount,
      status: 'paid',
      txHash: data.txHash,
      paidAt: new Date()
    }
  })

  // Extend subscription period
  const subscription = await getSubscription(data.subscriptionId)
  await db.subscriptions.update({
    where: { id: data.subscriptionId },
    data: {
      expiresAt: addMonths(subscription.expiresAt, 1)
    }
  })

  // Send receipt
  await sendReceipt(data)
}
```

### payment.failed

```json
{
  "id": "evt_126",
  "event": "payment.failed",
  "timestamp": 1700000300,
  "data": {
    "subscriptionId": "sub_abc123",
    "reason": "Insufficient balance",
    "chainId": 11155111,
    "txHash": null
  }
}
```

**Use case**: Alert user, attempt retry, grace period.

```typescript
async function handlePaymentFailed(data: any) {
  const subscription = await getSubscription(data.subscriptionId)

  // Increment failed payment counter
  await db.subscriptions.update({
    where: { id: data.subscriptionId },
    data: {
      failedPayments: { increment: 1 }
    }
  })

  // Send urgent email
  await sendEmail({
    to: getUserEmail(subscription.subscriber),
    template: 'payment-failed',
    data: {
      reason: data.reason,
      updateLink: generateUpdatePaymentLink(subscription.id)
    }
  })

  // After 3 failures, downgrade (handled by DripPay)
  if (subscription.failedPayments >= 2) {
    // This is the 3rd failure, prepare for cancellation
    await sendEmail({
      to: getUserEmail(subscription.subscriber),
      template: 'subscription-at-risk'
    })
  }
}
```

## Complete Integration Example

```typescript
// webhooks/drippay.ts
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET = process.env.DRIPPAY_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    // Get signature from headers
    const signature = request.headers.get('x-drippay-signature')
    const timestamp = request.headers.get('x-drippay-timestamp')

    if (!signature || !timestamp) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 })
    }

    // Get raw body
    const body = await request.text()

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Check timestamp (prevent replay attacks)
    const currentTime = Math.floor(Date.now() / 1000)
    if (Math.abs(currentTime - parseInt(timestamp)) > 300) {
      return NextResponse.json({ error: 'Webhook expired' }, { status: 400 })
    }

    // Parse event
    const event = JSON.parse(body)

    // Route to handlers
    switch (event.event) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.data)
        break
      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data)
        break
      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break
      default:
        console.log('Unknown event type:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}

// Event handlers
async function handleSubscriptionCreated(data: any) {
  console.log('New subscription:', data.subscriptionId)
  // Your logic here
}

async function handleSubscriptionCancelled(data: any) {
  console.log('Subscription cancelled:', data.subscriptionId)
  // Your logic here
}

async function handlePaymentSucceeded(data: any) {
  console.log('Payment succeeded:', data.txHash)
  // Your logic here
}

async function handlePaymentFailed(data: any) {
  console.error('Payment failed:', data.reason)
  // Your logic here
}
```

## Testing Webhooks

### Test Locally with ngrok

```bash
# 1. Start your local server
npm run dev

# 2. Expose with ngrok
ngrok http 3000

# 3. Use ngrok URL for webhook
# https://abc123.ngrok.io/webhooks/drippay
```

### Manual Test

Send a test webhook:

```bash
curl -X POST https://your-app.com/webhooks/drippay \
  -H "Content-Type: application/json" \
  -H "X-DripPay-Signature: test" \
  -H "X-DripPay-Event: payment.succeeded" \
  -H "X-DripPay-Timestamp: $(date +%s)" \
  -d '{
    "id": "evt_test",
    "event": "payment.succeeded",
    "timestamp": '$(($(date +%s)))',
    "data": {
      "subscriptionId": "sub_test",
      "amount": "10000000",
      "chainId": 11155111
    }
  }'
```

## Best Practices

1. **Always verify signatures** - Never trust unverified webhooks
2. **Use idempotency** - Store `event.id` to prevent duplicate processing
3. **Return 200 quickly** - Process in background job if needed
4. **Retry failed webhooks** - DripPay retries automatically, but handle on your end too
5. **Log everything** - Keep audit trail of webhook events
6. **Monitor webhook health** - Alert if success rate drops

## Troubleshooting

### Webhook not received
- Check URL is publicly accessible
- Verify firewall allows DripPay IPs
- Test with ngrok locally

### Invalid signature errors
- Ensure you're using raw body (not parsed JSON)
- Check webhook secret is correct
- Verify HMAC algorithm is SHA-256

### Timeouts
- Return 200 immediately
- Process webhook asynchronously
- Don't make external API calls in webhook handler

## Support

Need help? Contact support@drippay.xyz or join our Discord.
