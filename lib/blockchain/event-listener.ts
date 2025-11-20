import { getPublicClient } from './client'
import { getChainConfig } from './config'
import { SUBSCRIPTION_ABI } from './contracts/subscription-abi'
import { prisma } from '../db'
import { dispatchWebhook } from './webhook-dispatcher'

/**
 * Listen for subscription events on a specific chain
 */
export async function listenForSubscriptionEvents(chainId: number) {
  const chainConfig = getChainConfig(chainId)

  if (!chainConfig?.subscriptionContract) {
    console.error(`No subscription contract configured for chain ${chainId}`)
    return
  }

  const client = getPublicClient(chainId)

  console.log(`Starting event listener for chain ${chainId}...`)

  // Get last synced block
  let lastSyncedBlock = await getLastSyncedBlock(chainId)

  // Listen for new blocks and process events
  client.watchBlockNumber({
    onBlockNumber: async (blockNumber) => {
      try {
        // Process events from last synced block to current
        await processEventsInRange(chainId, lastSyncedBlock + BigInt(1), blockNumber)
        lastSyncedBlock = blockNumber

        // Update sync status
        await updateLastSyncedBlock(chainId, Number(blockNumber))
      } catch (error) {
        console.error(`Error processing events for chain ${chainId}:`, error)
      }
    },
  })
}

/**
 * Process events in a block range
 */
async function processEventsInRange(
  chainId: number,
  fromBlock: bigint,
  toBlock: bigint
) {
  const chainConfig = getChainConfig(chainId)
  if (!chainConfig?.subscriptionContract) return

  const client = getPublicClient(chainId)

  // Get all subscription events
  const logs = await client.getLogs({
    address: chainConfig.subscriptionContract as `0x${string}`,
    events: SUBSCRIPTION_ABI,
    fromBlock,
    toBlock,
  })

  for (const log of logs) {
    await processEvent(chainId, log)
  }
}

/**
 * Process a single event log
 */
async function processEvent(chainId: number, log: any) {
  try {
    const eventName = log.eventName

    switch (eventName) {
      case 'SubscriptionCreated':
        await handleSubscriptionCreated(chainId, log)
        break
      case 'SubscriptionCancelled':
        await handleSubscriptionCancelled(chainId, log)
        break
      case 'SubscriptionPaused':
        await handleSubscriptionPaused(chainId, log)
        break
      case 'SubscriptionResumed':
        await handleSubscriptionResumed(chainId, log)
        break
      case 'PaymentProcessed':
        await handlePaymentProcessed(chainId, log)
        break
      case 'PaymentFailed':
        await handlePaymentFailed(chainId, log)
        break
      default:
        console.log(`Unknown event: ${eventName}`)
    }
  } catch (error) {
    console.error('Error processing event:', error)
  }
}

/**
 * Handle SubscriptionCreated event
 */
async function handleSubscriptionCreated(chainId: number, log: any) {
  const { subscriptionId, subscriber, recipient, tokenAddress, amount, interval } = log.args

  console.log(`SubscriptionCreated: ${subscriptionId} on chain ${chainId}`)

  // Find or create subscription in database
  // This is typically done from the frontend, but we can sync here as backup
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
  })

  if (!existingSubscription) {
    console.log('Subscription not found in DB, skipping (should be created from frontend)')
    return
  }

  // Create event
  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: existingSubscription.id,
      eventType: 'created',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
      metadata: {
        subscriber,
        recipient,
        tokenAddress,
        amount: amount.toString(),
        interval: interval.toString(),
      },
    },
  })

  // Dispatch webhook
  await dispatchWebhook(existingSubscription.plan.creatorId, 'subscription.created', {
    subscriptionId: existingSubscription.id,
    subscriber,
    recipient,
    amount: amount.toString(),
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Handle SubscriptionCancelled event
 */
async function handleSubscriptionCancelled(chainId: number, log: any) {
  const { subscriptionId } = log.args

  console.log(`SubscriptionCancelled: ${subscriptionId} on chain ${chainId}`)

  const subscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
    include: {
      plan: true,
    },
  })

  if (!subscription) return

  // Update subscription status
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'cancelled',
      endDate: new Date(),
    },
  })

  // Create event
  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'cancelled',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
    },
  })

  // Dispatch webhook
  await dispatchWebhook(subscription.plan.creatorId, 'subscription.cancelled', {
    subscriptionId: subscription.id,
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Handle SubscriptionPaused event
 */
async function handleSubscriptionPaused(chainId: number, log: any) {
  const { subscriptionId } = log.args

  console.log(`SubscriptionPaused: ${subscriptionId} on chain ${chainId}`)

  const subscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
    include: {
      plan: true,
    },
  })

  if (!subscription) return

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: 'paused' },
  })

  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'paused',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
    },
  })

  await dispatchWebhook(subscription.plan.creatorId, 'subscription.paused', {
    subscriptionId: subscription.id,
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Handle SubscriptionResumed event
 */
async function handleSubscriptionResumed(chainId: number, log: any) {
  const { subscriptionId } = log.args

  console.log(`SubscriptionResumed: ${subscriptionId} on chain ${chainId}`)

  const subscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
    include: {
      plan: true,
    },
  })

  if (!subscription) return

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: 'active' },
  })

  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'resumed',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
    },
  })

  await dispatchWebhook(subscription.plan.creatorId, 'subscription.resumed', {
    subscriptionId: subscription.id,
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Handle PaymentProcessed event
 */
async function handlePaymentProcessed(chainId: number, log: any) {
  const { subscriptionId, amount } = log.args

  console.log(`PaymentProcessed: ${subscriptionId} on chain ${chainId}`)

  const subscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
    include: {
      plan: true,
      subscriber: true,
    },
  })

  if (!subscription) return

  // Create payment record
  await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      userId: subscription.subscriberId,
      amount: amount.toString(),
      currency: subscription.plan.currency,
      status: 'completed',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
      tokenAddress: subscription.plan.tokenAddress,
      fromAddress: subscription.subscriber.address,
      toAddress: subscription.plan.tokenAddress,
    },
  })

  // Update subscription
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      lastPaymentDate: new Date(),
      failedPayments: 0,
    },
  })

  await dispatchWebhook(subscription.plan.creatorId, 'payment.succeeded', {
    subscriptionId: subscription.id,
    amount: amount.toString(),
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Handle PaymentFailed event
 */
async function handlePaymentFailed(chainId: number, log: any) {
  const { subscriptionId, reason } = log.args

  console.log(`PaymentFailed: ${subscriptionId} on chain ${chainId}`)

  const subscription = await prisma.subscription.findFirst({
    where: {
      chainId,
      subscriptionId: subscriptionId.toString(),
    },
    include: {
      plan: true,
    },
  })

  if (!subscription) return

  // Increment failed payments
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      failedPayments: { increment: 1 },
    },
  })

  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'payment_failed',
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
      chainId,
      metadata: { reason },
    },
  })

  await dispatchWebhook(subscription.plan.creatorId, 'payment.failed', {
    subscriptionId: subscription.id,
    reason,
    chainId,
    txHash: log.transactionHash,
  })
}

/**
 * Get last synced block for a chain
 */
async function getLastSyncedBlock(chainId: number): Promise<bigint> {
  const sync = await prisma.blockchainSync.findUnique({
    where: { chainId },
  })

  if (sync) {
    return BigInt(sync.lastSyncedBlock)
  }

  // Start from current block if no sync record
  const client = getPublicClient(chainId)
  const currentBlock = await client.getBlockNumber()

  await prisma.blockchainSync.create({
    data: {
      chainId,
      lastSyncedBlock: Number(currentBlock),
      contractAddress: getChainConfig(chainId)?.subscriptionContract || '',
      syncStatus: 'syncing',
    },
  })

  return currentBlock
}

/**
 * Update last synced block
 */
async function updateLastSyncedBlock(chainId: number, blockNumber: number) {
  await prisma.blockchainSync.upsert({
    where: { chainId },
    update: {
      lastSyncedBlock: blockNumber,
      lastSyncedAt: new Date(),
      syncStatus: 'synced',
    },
    create: {
      chainId,
      lastSyncedBlock: blockNumber,
      contractAddress: getChainConfig(chainId)?.subscriptionContract || '',
      syncStatus: 'synced',
    },
  })
}
