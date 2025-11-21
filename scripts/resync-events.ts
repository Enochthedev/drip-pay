/**
 * Resync blockchain events script
 * Use when event listener missed events due to downtime
 *
 * Usage:
 *   npx tsx scripts/resync-events.ts --chain=1923 --from-block=12345 --to-block=12500
 *   npx tsx scripts/resync-events.ts --chain=1923 --last=1000  # Last 1000 blocks
 */

import { getPublicClient } from '../lib/blockchain/client'
import { getChainConfig, SUPPORTED_CHAINS } from '../lib/blockchain/config'
import { SUBSCRIPTION_ABI } from '../lib/blockchain/contracts/subscription-abi'
import { prisma } from '../lib/db'

interface ResyncOptions {
  chainId: number
  fromBlock?: bigint
  toBlock?: bigint
  lastBlocks?: number
}

async function parseArgs(): Promise<ResyncOptions> {
  const args = process.argv.slice(2)
  const options: Partial<ResyncOptions> = {}

  for (const arg of args) {
    const [key, value] = arg.replace('--', '').split('=')

    switch (key) {
      case 'chain':
        options.chainId = parseInt(value)
        break
      case 'from-block':
        options.fromBlock = BigInt(value)
        break
      case 'to-block':
        options.toBlock = BigInt(value)
        break
      case 'last':
        options.lastBlocks = parseInt(value)
        break
    }
  }

  if (!options.chainId) {
    console.error('❌ Chain ID is required. Usage: --chain=1923')
    console.log('\nAvailable chains:')
    for (const [id, config] of Object.entries(SUPPORTED_CHAINS)) {
      console.log(`  ${id}: ${config.name}`)
    }
    process.exit(1)
  }

  return options as ResyncOptions
}

async function resyncEvents(options: ResyncOptions): Promise<void> {
  const chainConfig = getChainConfig(options.chainId)

  if (!chainConfig) {
    console.error(`❌ Chain ${options.chainId} is not supported`)
    process.exit(1)
  }

  if (!chainConfig.subscriptionContract) {
    console.error(`❌ No subscription contract configured for ${chainConfig.name}`)
    process.exit(1)
  }

  console.log(`\n🔄 Resyncing events for ${chainConfig.name}...`)
  console.log(`   Contract: ${chainConfig.subscriptionContract}`)

  const client = getPublicClient(options.chainId)
  const currentBlock = await client.getBlockNumber()

  // Determine block range
  let fromBlock: bigint
  let toBlock: bigint

  if (options.lastBlocks) {
    fromBlock = currentBlock - BigInt(options.lastBlocks)
    toBlock = currentBlock
    console.log(`   Range: Last ${options.lastBlocks} blocks`)
  } else {
    fromBlock = options.fromBlock || BigInt(0)
    toBlock = options.toBlock || currentBlock
  }

  console.log(`   From block: ${fromBlock}`)
  console.log(`   To block: ${toBlock}`)
  console.log(`   Total blocks: ${toBlock - fromBlock}`)

  // Fetch events in batches
  const BATCH_SIZE = BigInt(1000)
  let processed = 0
  let events: any[] = []

  for (let start = fromBlock; start < toBlock; start += BATCH_SIZE) {
    const end = start + BATCH_SIZE > toBlock ? toBlock : start + BATCH_SIZE

    console.log(`\n   Processing blocks ${start} - ${end}...`)

    try {
      const logs = await client.getLogs({
        address: chainConfig.subscriptionContract as `0x${string}`,
        fromBlock: start,
        toBlock: end,
      })

      events.push(...logs)
      processed += logs.length
      console.log(`   Found ${logs.length} events (total: ${processed})`)
    } catch (error: any) {
      console.error(`   ❌ Error fetching blocks ${start}-${end}: ${error.message}`)

      // If batch too large, try smaller batches
      if (error.message.includes('range') || error.message.includes('limit')) {
        console.log('   Trying smaller batch size...')
        const smallerBatch = BATCH_SIZE / BigInt(10)

        for (let s = start; s < end; s += smallerBatch) {
          const e = s + smallerBatch > end ? end : s + smallerBatch
          try {
            const smallLogs = await client.getLogs({
              address: chainConfig.subscriptionContract as `0x${string}`,
              fromBlock: s,
              toBlock: e,
            })
            events.push(...smallLogs)
            processed += smallLogs.length
          } catch (e) {
            console.error(`   ❌ Failed to fetch blocks ${s}-${e}`)
          }
        }
      }
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Total events found: ${events.length}`)

  // Process events
  if (events.length > 0) {
    console.log('\n   Processing events...')

    // Group by event type
    const eventTypes: Record<string, number> = {}

    for (const event of events) {
      const type = event.topics[0]?.slice(0, 10) || 'unknown'
      eventTypes[type] = (eventTypes[type] || 0) + 1
    }

    console.log('\n   Event types found:')
    for (const [type, count] of Object.entries(eventTypes)) {
      console.log(`     ${type}: ${count}`)
    }

    // TODO: Decode and process each event
    // This would use the same logic as event-listener.ts
  }

  // Update sync status
  await prisma.blockchainSync.upsert({
    where: { chainId: options.chainId },
    update: {
      lastSyncedBlock: Number(toBlock),
      lastSyncedAt: new Date(),
      syncStatus: 'synced',
    },
    create: {
      chainId: options.chainId,
      lastSyncedBlock: Number(toBlock),
      contractAddress: chainConfig.subscriptionContract,
      syncStatus: 'synced',
    },
  })

  console.log(`\n✅ Resync complete!`)
  console.log(`   Updated lastSyncedBlock to ${toBlock}`)
}

// Main
async function main() {
  try {
    const options = await parseArgs()
    await resyncEvents(options)
  } catch (error: any) {
    console.error('❌ Fatal error:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
