import { prisma } from '../db'
import { processPaymentViaDefender } from '../blockchain/defender'
import { getTokenBalance } from '../blockchain/contracts/subscription-service'
import { getChainConfig } from '../blockchain/config'
import { sendPaymentSuccessful, sendPaymentFailed, sendLowBalanceWarning } from '../notifications/email'
import { formatUnits } from 'viem'

/**
 * Payment processor using OpenZeppelin Defender
 * Platform pays gas fees for subscriptions
 */

interface ProcessingResult {
  processed: number
  failed: number
  skipped: number
}

/**
 * Process all due subscription payments using Defender
 */
export async function processAllDuePaymentsViaDefender(): Promise<ProcessingResult> {
  const result: ProcessingResult = {
    processed: 0,
    failed: 0,
    skipped: 0,
  }

  console.log('💰 Processing due payments via Defender...')

  try {
    // Find all active subscriptions that are due for payment
    const dueSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'active',
        nextBillingDate: {
          lte: new Date(),
        },
      },
      include: {
        plan: {
          include: {
            creator: true,
          },
        },
        subscriber: true,
      },
    })

    console.log(`Found ${dueSubscriptions.length} subscriptions due for payment`)

    for (const subscription of dueSubscriptions) {
      try {
        await processSinglePaymentViaDefender(subscription)
        result.processed++
      } catch (error) {
        console.error(`Failed to process payment for subscription ${subscription.id}:`, error)
        result.failed++
      }
    }

    console.log(`✅ Processing complete:`, result)
    return result
  } catch (error) {
    console.error('Error processing due payments:', error)
    return result
  }
}

/**
 * Process a single subscription payment via Defender
 */
async function processSinglePaymentViaDefender(subscription: any): Promise<void> {
  const { plan, subscriber, chainId } = subscription

  console.log(`Processing subscription ${subscription.id} on chain ${chainId}...`)

  // Check token balance before attempting payment
  const hasBalance = await checkSufficientBalance(
    chainId,
    plan.tokenAddress,
    subscriber.address,
    plan.price,
    subscriber.email
  )

  if (!hasBalance) {
    await handleInsufficientBalance(subscription)
    return
  }

  // Get contract address
  const chainConfig = getChainConfig(chainId)
  if (!chainConfig?.subscriptionContract) {
    console.error(`No contract deployed for chain ${chainId}`)
    await handlePaymentFailure(subscription, 'No contract deployed')
    return
  }

  // Process payment via Defender (platform pays gas)
  console.log(`Calling Defender to process payment...`)
  const result = await processPaymentViaDefender(
    chainId,
    chainConfig.subscriptionContract,
    BigInt(subscription.subscriptionId)
  )

  if (result.success) {
    await handlePaymentSuccess(subscription, result.txHash!)
  } else {
    await handlePaymentFailure(subscription, result.error || 'Unknown error')
  }
}

/**
 * Check if user has sufficient balance
 */
async function checkSufficientBalance(
  chainId: number,
  tokenAddress: string,
  walletAddress: string,
  requiredAmount: string,
  userEmail: string | null
): Promise<boolean> {
  try {
    const balance = await getTokenBalance(chainId, tokenAddress, walletAddress)
    const required = BigInt(requiredAmount)

    // If balance is less than required, send warning
    if (balance.balance < required) {
      const chainConfig = getChainConfig(chainId)
      const token = chainConfig?.supportedTokens.find(t => t.address === tokenAddress)

      if (userEmail && token) {
        await sendLowBalanceWarning(
          userEmail,
          walletAddress,
          'Your Subscription',
          formatUnits(balance.balance, token.decimals),
          formatUnits(required, token.decimals),
          token.symbol
        )
      }

      console.log(`⚠️  Insufficient balance for ${walletAddress}`)
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking balance:', error)
    return false
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(subscription: any, txHash: string): Promise<void> {
  const { plan, subscriber } = subscription

  console.log(`✅ Payment successful: ${txHash}`)

  // Update subscription
  const nextBillingDate = calculateNextBillingDate(subscription.nextBillingDate, plan.interval)

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      lastPaymentDate: new Date(),
      nextBillingDate,
      failedPayments: 0, // Reset failed payment counter
    },
  })

  // Create payment record
  await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      userId: subscriber.id,
      amount: plan.price,
      currency: plan.currency,
      status: 'completed',
      txHash,
      chainId: subscription.chainId,
      tokenAddress: plan.tokenAddress,
      fromAddress: subscriber.address,
      toAddress: plan.creator.address,
    },
  })

  // Create event
  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'renewed',
      txHash,
      chainId: subscription.chainId,
    },
  })

  // Send success email
  if (subscriber.email) {
    const chainConfig = getChainConfig(subscription.chainId)
    const token = chainConfig?.supportedTokens.find(t => t.address === plan.tokenAddress)

    if (token) {
      await sendPaymentSuccessful(
        subscriber.email,
        plan.name,
        formatUnits(BigInt(plan.price), token.decimals),
        token.symbol,
        txHash,
        nextBillingDate
      )
    }
  }
}

/**
 * Handle payment failure with dunning management
 */
async function handlePaymentFailure(subscription: any, error: string): Promise<void> {
  const { plan, subscriber } = subscription
  const failedCount = subscription.failedPayments + 1

  console.log(`❌ Payment failed for subscription ${subscription.id}: ${error}`)

  // Update failed payment counter
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      failedPayments: failedCount,
    },
  })

  // Create failed payment event
  await prisma.subscriptionEvent.create({
    data: {
      subscriptionId: subscription.id,
      eventType: 'payment_failed',
      chainId: subscription.chainId,
      metadata: { error, attempt: failedCount },
    },
  })

  // Dunning management: Cancel after 3 failed attempts
  const MAX_FAILED_PAYMENTS = 3

  if (failedCount >= MAX_FAILED_PAYMENTS) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'cancelled',
        endDate: new Date(),
      },
    })

    console.log(`🚫 Subscription ${subscription.id} cancelled after ${failedCount} failed payments`)
  } else {
    // Send failure notification with retry info
    if (subscriber.email) {
      const chainConfig = getChainConfig(subscription.chainId)
      const token = chainConfig?.supportedTokens.find(t => t.address === plan.tokenAddress)

      if (token) {
        await sendPaymentFailed(
          subscriber.email,
          plan.name,
          formatUnits(BigInt(plan.price), token.decimals),
          token.symbol,
          error,
          MAX_FAILED_PAYMENTS - failedCount
        )
      }
    }
  }
}

/**
 * Handle insufficient balance
 */
async function handleInsufficientBalance(subscription: any): Promise<void> {
  // Increment failed payment counter
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      failedPayments: { increment: 1 },
    },
  })

  console.log(`⚠️  Insufficient balance for subscription ${subscription.id}`)
}

/**
 * Calculate next billing date based on interval
 */
function calculateNextBillingDate(currentDate: Date, interval: string): Date {
  const next = new Date(currentDate)

  switch (interval) {
    case 'daily':
      next.setDate(next.getDate() + 1)
      break
    case 'weekly':
      next.setDate(next.getDate() + 7)
      break
    case 'monthly':
      next.setMonth(next.getMonth() + 1)
      break
    case 'yearly':
      next.setFullYear(next.getFullYear() + 1)
      break
  }

  return next
}
