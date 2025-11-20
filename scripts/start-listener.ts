/**
 * Start blockchain event listeners and automated services
 * This should be run as a separate process (e.g., with PM2 or as a systemd service)
 */

import { listenForSubscriptionEvents } from '../lib/blockchain/event-listener'
import { SUPPORTED_CHAINS } from '../lib/blockchain/config'
import { startCronJobs } from '../lib/services/cron-scheduler'

async function main() {
  console.log('🚀 Starting DripPay blockchain services...\n')

  // Start blockchain event listeners for all supported chains
  const chainIds = Object.keys(SUPPORTED_CHAINS).map(Number)

  console.log('📡 Starting blockchain event listeners...')
  for (const chainId of chainIds) {
    const chainConfig = SUPPORTED_CHAINS[chainId]

    if (chainConfig.subscriptionContract) {
      console.log(`  ✓ ${chainConfig.name} (Chain ID: ${chainId})`)
      listenForSubscriptionEvents(chainId)
    } else {
      console.log(`  ⊘ ${chainConfig.name} - no contract deployed yet`)
    }
  }

  // Start automated cron jobs
  console.log('\n🕐 Starting automated tasks...')
  startCronJobs()

  console.log('\n✅ All services started!')
  console.log('📊 Monitoring: http://localhost:3000/api/health')
  console.log('Press Ctrl+C to stop\n')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
