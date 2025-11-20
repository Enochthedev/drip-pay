import cron from 'node-cron'
import { processAllDuePayments, sendPaymentReminders } from './payment-processor'
import { processPendingWebhooks } from '../blockchain/webhook-dispatcher'

/**
 * Cron scheduler for automated tasks
 * Handles payment processing, reminders, and webhook retries
 */

export function startCronJobs() {
  console.log('🕐 Starting cron jobs...')

  // Process due payments every 10 minutes
  cron.schedule('*/10 * * * *', async () => {
    console.log('⏰ Running payment processor...')
    try {
      const result = await processAllDuePayments()
      console.log(
        `✅ Payment processing complete: ${result.processed} processed, ${result.failed} failed, ${result.skipped} skipped`
      )
    } catch (error) {
      console.error('Error in payment processing cron:', error)
    }
  })

  // Send payment reminders daily at 9 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Sending payment reminders...')
    try {
      await sendPaymentReminders()
      console.log('✅ Payment reminders sent')
    } catch (error) {
      console.error('Error sending payment reminders:', error)
    }
  })

  // Retry failed webhooks every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      await processPendingWebhooks()
    } catch (error) {
      console.error('Error processing pending webhooks:', error)
    }
  })

  // Clean up old data monthly
  cron.schedule('0 0 1 * *', async () => {
    console.log('⏰ Running monthly cleanup...')
    try {
      await cleanupOldData()
      console.log('✅ Cleanup complete')
    } catch (error) {
      console.error('Error in cleanup cron:', error)
    }
  })

  console.log('✅ All cron jobs started')
}

/**
 * Clean up old data to keep database performant
 */
async function cleanupOldData() {
  const { prisma } = await import('../db')

  // Delete webhook deliveries older than 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const deleted = await prisma.webhookDelivery.deleteMany({
    where: {
      createdAt: {
        lt: thirtyDaysAgo,
      },
      status: 'success', // Only delete successful deliveries
    },
  })

  console.log(`Deleted ${deleted.count} old webhook deliveries`)
}
