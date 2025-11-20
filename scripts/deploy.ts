/**
 * Deployment script for DripPay Subscription Smart Contract
 *
 * This script deploys the DripPaySubscription contract to the specified network
 *
 * Usage with Hardhat:
 * npx hardhat run scripts/deploy.ts --network <network-name>
 *
 * Usage with Forge:
 * forge script scripts/deploy.ts:DeployScript --rpc-url <rpc-url> --broadcast
 */

import { ethers } from 'hardhat'

async function main() {
  console.log('Starting DripPay Subscription deployment...')

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with account:', deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', ethers.formatEther(balance), 'ETH')

  // Fee collector address (replace with actual address or use deployer)
  const feeCollector = process.env.FEE_COLLECTOR_ADDRESS || deployer.address
  console.log('Fee collector address:', feeCollector)

  // Deploy contract
  const DripPaySubscription = await ethers.getContractFactory('DripPaySubscription')
  const contract = await DripPaySubscription.deploy(feeCollector)

  await contract.waitForDeployment()

  const contractAddress = await contract.getAddress()

  console.log('✅ DripPaySubscription deployed to:', contractAddress)
  console.log('')
  console.log('Deployment summary:')
  console.log('-------------------')
  console.log('Network:', (await ethers.provider.getNetwork()).name)
  console.log('Contract Address:', contractAddress)
  console.log('Fee Collector:', feeCollector)
  console.log('Platform Fee:', await contract.platformFee(), 'basis points')
  console.log('')
  console.log('Next steps:')
  console.log('1. Verify contract on block explorer')
  console.log('2. Update .env file with contract address')
  console.log(`   - Add: <CHAIN>_SUBSCRIPTION_CONTRACT="${contractAddress}"`)
  console.log('3. Test the contract with test subscriptions')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
