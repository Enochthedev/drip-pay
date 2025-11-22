/**
 * Deploy DripPaySubscription to testnets
 *
 * Usage:
 *   npx hardhat run scripts/deploy-testnet.ts --network sepolia
 *   npx hardhat run scripts/deploy-testnet.ts --network baseSepolia
 *   npx hardhat run scripts/deploy-testnet.ts --network swellTestnet
 */

import { ethers } from 'hardhat'

async function main() {
  const network = await ethers.provider.getNetwork()

  console.log('\n🚀 Deploying to', network.name)
  console.log('============================================\n')

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log('Deploying with account:', deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', ethers.formatEther(balance), 'ETH')

  if (balance === 0n) {
    console.error('\n❌ ERROR: Deployer account has no funds!')
    console.log('Get testnet ETH from:')
    console.log('  - Sepolia: https://sepoliafaucet.com')
    console.log('  - Base Sepolia: https://faucet.quicknode.com/base/sepolia')
    console.log('  - Swell: https://faucet.swell.network')
    process.exit(1)
  }

  // Fee collector address (deployer for testnet)
  const feeCollector = deployer.address
  console.log('Fee collector:', feeCollector)
  console.log()

  // Deploy contract
  console.log('📝 Deploying DripPaySubscription contract...')

  const DripPaySubscription = await ethers.getContractFactory('DripPaySubscription')
  const contract = await DripPaySubscription.deploy(feeCollector)

  console.log('⏳ Waiting for deployment...')
  await contract.waitForDeployment()

  const contractAddress = await contract.getAddress()

  console.log('\n✅ Deployment successful!')
  console.log('============================================')
  console.log('Network:', network.name)
  console.log('Chain ID:', network.chainId)
  console.log('Contract Address:', contractAddress)
  console.log('Fee Collector:', feeCollector)
  console.log('Platform Fee:', await contract.platformFee(), 'basis points (2.5%)')
  console.log('============================================\n')

  console.log('📋 Next steps:')
  console.log('1. Update .env file:')
  console.log(`   ${getEnvVarName(network.chainId)}="${contractAddress}"`)
  console.log()
  console.log('2. Verify contract on block explorer:')
  console.log(`   npx hardhat verify --network ${network.name} ${contractAddress} ${feeCollector}`)
  console.log()
  console.log('3. Fund OpenZeppelin Defender Relayer with testnet ETH')
  console.log()
  console.log('4. Deploy mock ERC20 tokens for testing (if needed)')
  console.log()

  // Save deployment info
  const fs = await import('fs')
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    contractAddress,
    feeCollector,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  }

  const filename = `deployments/${network.name}-${Date.now()}.json`
  fs.mkdirSync('deployments', { recursive: true })
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2))
  console.log(`💾 Deployment info saved to: ${filename}\n`)
}

function getEnvVarName(chainId: bigint): string {
  const mapping: Record<string, string> = {
    '11155111': 'ETHEREUM_SUBSCRIPTION_CONTRACT',  // Sepolia
    '84532': 'BASE_SUBSCRIPTION_CONTRACT',         // Base Sepolia
    '1923': 'SWELL_SUBSCRIPTION_CONTRACT',         // Swell (testnet or mainnet)
  }

  return mapping[chainId.toString()] || 'SUBSCRIPTION_CONTRACT'
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Deployment failed:', error)
    process.exit(1)
  })
