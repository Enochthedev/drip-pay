import { prisma } from '../db'
import crypto from 'crypto'

/**
 * Dispatch webhook to registered endpoints
 */
export async function dispatchWebhook(
  userId: string,
  eventType: string,
  payload: any
) {
  try {
    // Find active webhooks for this user and event type
    const webhooks = await prisma.webhook.findMany({
      where: {
        userId,
        isActive: true,
        events: {
          has: eventType,
        },
      },
    })

    if (webhooks.length === 0) {
      console.log(`No webhooks registered for user ${userId} and event ${eventType}`)
      return
    }

    // Send webhook to each endpoint
    for (const webhook of webhooks) {
      await sendWebhook(webhook, eventType, payload)
    }
  } catch (error) {
    console.error('Error dispatching webhooks:', error)
  }
}

/**
 * Send webhook to a specific endpoint
 */
async function sendWebhook(
  webhook: any,
  eventType: string,
  payload: any
) {
  const timestamp = Math.floor(Date.now() / 1000)

  const webhookPayload = {
    id: crypto.randomUUID(),
    event: eventType,
    timestamp,
    data: payload,
  }

  // Create HMAC signature
  const signature = crypto
    .createHmac('sha256', webhook.secret)
    .update(JSON.stringify(webhookPayload))
    .digest('hex')

  // Create delivery record
  const delivery = await prisma.webhookDelivery.create({
    data: {
      webhookId: webhook.id,
      eventType,
      payload: webhookPayload,
      status: 'pending',
      attempts: 0,
    },
  })

  // Send webhook request
  try {
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-DripPay-Signature': signature,
        'X-DripPay-Event': eventType,
        'X-DripPay-Timestamp': timestamp.toString(),
      },
      body: JSON.stringify(webhookPayload),
    })

    const responseText = await response.text()

    // Update delivery record
    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: response.ok ? 'success' : 'failed',
        statusCode: response.status,
        response: responseText,
        attempts: 1,
      },
    })

    if (!response.ok) {
      console.error(`Webhook delivery failed: ${response.status} - ${responseText}`)
      await scheduleRetry(delivery.id)
    }
  } catch (error: any) {
    console.error('Webhook delivery error:', error)

    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: 'failed',
        response: error.message,
        attempts: 1,
      },
    })

    await scheduleRetry(delivery.id)
  }
}

/**
 * Schedule webhook retry
 */
async function scheduleRetry(deliveryId: string) {
  // Exponential backoff: 1min, 5min, 30min, 2h, 12h
  const delivery = await prisma.webhookDelivery.findUnique({
    where: { id: deliveryId },
  })

  if (!delivery) return

  const retryDelays = [60, 300, 1800, 7200, 43200] // in seconds
  const nextDelay = retryDelays[Math.min(delivery.attempts, retryDelays.length - 1)]

  const nextRetry = new Date(Date.now() + nextDelay * 1000)

  await prisma.webhookDelivery.update({
    where: { id: deliveryId },
    data: {
      nextRetry,
    },
  })
}

/**
 * Process pending webhook deliveries (for retry mechanism)
 * This should be called periodically by a cron job
 */
export async function processPendingWebhooks() {
  const now = new Date()

  const pendingDeliveries = await prisma.webhookDelivery.findMany({
    where: {
      status: 'failed',
      attempts: {
        lt: 5, // Max 5 attempts
      },
      nextRetry: {
        lte: now,
      },
    },
    include: {
      webhook: true,
    },
  })

  for (const delivery of pendingDeliveries) {
    await retryWebhook(delivery)
  }
}

/**
 * Retry a failed webhook delivery
 */
async function retryWebhook(delivery: any) {
  const webhook = delivery.webhook

  const signature = crypto
    .createHmac('sha256', webhook.secret)
    .update(JSON.stringify(delivery.payload))
    .digest('hex')

  try {
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-DripPay-Signature': signature,
        'X-DripPay-Event': delivery.eventType,
        'X-DripPay-Retry': 'true',
      },
      body: JSON.stringify(delivery.payload),
    })

    const responseText = await response.text()

    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: response.ok ? 'success' : 'failed',
        statusCode: response.status,
        response: responseText,
        attempts: { increment: 1 },
        nextRetry: response.ok ? null : undefined,
      },
    })

    if (!response.ok && delivery.attempts < 4) {
      await scheduleRetry(delivery.id)
    }
  } catch (error: any) {
    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: 'failed',
        response: error.message,
        attempts: { increment: 1 },
      },
    })

    if (delivery.attempts < 4) {
      await scheduleRetry(delivery.id)
    }
  }
}
