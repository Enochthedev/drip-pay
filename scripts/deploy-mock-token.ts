/**
 * Deploy Mock ERC20 tokens for testnet testing
 *
 * Usage:
 *   npx hardhat run scripts/deploy-mock-token.ts --network sepolia
 */

import { ethers } from 'hardhat'

async function main() {
  const network = await ethers.provider.getNetwork()

  console.log('\n🪙  Deploying Mock USDC to', network.name)
  console.log('============================================\n')

  const [deployer] = await ethers.getSigners()
  console.log('Deploying with account:', deployer.address)

  // Deploy Mock USDC (6 decimals)
  const MockERC20 = await ethers.getContractFactory('MockERC20')
  const usdc = await MockERC20.deploy('USD Coin (Test)', 'USDC', 6)

  await usdc.waitForDeployment()
  const usdcAddress = await usdc.getAddress()

  console.log('\n✅ Mock USDC deployed:', usdcAddress)

  // Mint some tokens to deployer for testing
  const mintAmount = ethers.parseUnits('10000', 6) // 10,000 USDC
  await usdc.mint(deployer.address, mintAmount)

  console.log('💰 Minted', ethers.formatUnits(mintAmount, 6), 'USDC to', deployer.address)
  console.log()

  console.log('📋 Use this address in your frontend:')
  console.log(`   Token Address: ${usdcAddress}`)
  console.log(`   Symbol: USDC`)
  console.log(`   Decimals: 6`)
  console.log()

  // Save deployment info
  const fs = await import('fs')
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    token: {
      name: 'USD Coin (Test)',
      symbol: 'USDC',
      decimals: 6,
      address: usdcAddress,
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  }

  fs.mkdirSync('deployments', { recursive: true })
  fs.writeFileSync(
    `deployments/mock-usdc-${network.name}-${Date.now()}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  )

  console.log('💾 Deployment info saved\n')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Deployment failed:', error)
    process.exit(1)
  })
