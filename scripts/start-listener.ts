/**
 * Start blockchain event listeners for all supported chains
 * This should be run as a separate process (e.g., with PM2 or as a systemd service)
 */

import { listenForSubscriptionEvents } from '../lib/blockchain/event-listener'
import { SUPPORTED_CHAINS } from '../lib/blockchain/config'
import { processPendingWebhooks } from '../lib/blockchain/webhook-dispatcher'

async function main() {
  console.log('Starting DripPay blockchain event listeners...')

  // Start listeners for all supported chains
  const chainIds = Object.keys(SUPPORTED_CHAINS).map(Number)

  for (const chainId of chainIds) {
    const chainConfig = SUPPORTED_CHAINS[chainId]

    if (chainConfig.subscriptionContract) {
      console.log(`Starting listener for ${chainConfig.name} (Chain ID: ${chainId})`)
      listenForSubscriptionEvents(chainId)
    } else {
      console.log(`Skipping ${chainConfig.name} - no contract deployed yet`)
    }
  }

  // Process pending webhooks every minute
  setInterval(async () => {
    try {
      await processPendingWebhooks()
    } catch (error) {
      console.error('Error processing pending webhooks:', error)
    }
  }, 60000)

  console.log('\n✅ Event listeners started!')
  console.log('Press Ctrl+C to stop')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
