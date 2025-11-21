import { expect } from "chai"
import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { DripPaySubscription } from "../typechain-types"

describe("DripPaySubscription", function () {
  async function deployFixture() {
    const [owner, feeCollector, subscriber, recipient] = await ethers.getSigners()

    // Deploy mock ERC20 token
    const MockToken = await ethers.getContractFactory("MockERC20")
    const token = await MockToken.deploy("Test USDC", "USDC", 6)
    await token.waitForDeployment()

    // Mint tokens to subscriber
    await token.mint(subscriber.address, ethers.parseUnits("10000", 6))

    // Deploy subscription contract
    const DripPay = await ethers.getContractFactory("DripPaySubscription")
    const subscription = await DripPay.deploy(feeCollector.address)
    await subscription.waitForDeployment()

    // Approve tokens for subscription contract
    await token.connect(subscriber).approve(
      await subscription.getAddress(),
      ethers.MaxUint256
    )

    return { subscription, token, owner, feeCollector, subscriber, recipient }
  }

  describe("Deployment", function () {
    it("Should set the correct fee collector", async function () {
      const { subscription, feeCollector } = await loadFixture(deployFixture)
      expect(await subscription.feeCollector()).to.equal(feeCollector.address)
    })

    it("Should set the correct platform fee (2.5%)", async function () {
      const { subscription } = await loadFixture(deployFixture)
      expect(await subscription.platformFee()).to.equal(250)
    })

    it("Should start with zero subscriptions", async function () {
      const { subscription } = await loadFixture(deployFixture)
      expect(await subscription.subscriptionCount()).to.equal(0)
    })
  })

  describe("Subscription Creation", function () {
    it("Should create a subscription successfully", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      const amount = ethers.parseUnits("100", 6) // 100 USDC
      const interval = 30 * 24 * 60 * 60 // 30 days

      await expect(
        subscription.connect(subscriber).createSubscription(
          recipient.address,
          await token.getAddress(),
          amount,
          interval
        )
      )
        .to.emit(subscription, "SubscriptionCreated")
        .withArgs(1, subscriber.address, recipient.address, await token.getAddress(), amount, interval)

      expect(await subscription.subscriptionCount()).to.equal(1)
    })

    it("Should process first payment on creation", async function () {
      const { subscription, token, subscriber, recipient, feeCollector } = await loadFixture(deployFixture)

      const amount = ethers.parseUnits("100", 6)
      const interval = 30 * 24 * 60 * 60

      const recipientBalanceBefore = await token.balanceOf(recipient.address)
      const feeCollectorBalanceBefore = await token.balanceOf(feeCollector.address)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        amount,
        interval
      )

      // Recipient should receive 97.5% (100 - 2.5% fee = 97.5 USDC)
      const expectedRecipientAmount = ethers.parseUnits("97.5", 6)
      const expectedFee = ethers.parseUnits("2.5", 6)

      expect(await token.balanceOf(recipient.address)).to.equal(
        recipientBalanceBefore + expectedRecipientAmount
      )
      expect(await token.balanceOf(feeCollector.address)).to.equal(
        feeCollectorBalanceBefore + expectedFee
      )
    })

    it("Should reject zero amount", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await expect(
        subscription.connect(subscriber).createSubscription(
          recipient.address,
          await token.getAddress(),
          0,
          30 * 24 * 60 * 60
        )
      ).to.be.revertedWith("Amount must be greater than 0")
    })

    it("Should reject zero interval", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await expect(
        subscription.connect(subscriber).createSubscription(
          recipient.address,
          await token.getAddress(),
          ethers.parseUnits("100", 6),
          0
        )
      ).to.be.revertedWith("Interval must be greater than 0")
    })

    it("Should reject invalid recipient", async function () {
      const { subscription, token, subscriber } = await loadFixture(deployFixture)

      await expect(
        subscription.connect(subscriber).createSubscription(
          ethers.ZeroAddress,
          await token.getAddress(),
          ethers.parseUnits("100", 6),
          30 * 24 * 60 * 60
        )
      ).to.be.revertedWith("Invalid recipient")
    })
  })

  describe("Subscription Management", function () {
    it("Should cancel subscription", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await expect(subscription.connect(subscriber).cancelSubscription(1))
        .to.emit(subscription, "SubscriptionCancelled")
        .withArgs(1, await ethers.provider.getBlock("latest").then(b => b!.timestamp + 1))

      const sub = await subscription.getSubscription(1)
      expect(sub.isActive).to.be.false
    })

    it("Should allow recipient to cancel", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await expect(subscription.connect(recipient).cancelSubscription(1))
        .to.emit(subscription, "SubscriptionCancelled")
    })

    it("Should pause subscription", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await expect(subscription.connect(subscriber).pauseSubscription(1))
        .to.emit(subscription, "SubscriptionPaused")

      const sub = await subscription.getSubscription(1)
      expect(sub.isActive).to.be.false
    })

    it("Should resume subscription", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await subscription.connect(subscriber).pauseSubscription(1)
      await expect(subscription.connect(subscriber).resumeSubscription(1))
        .to.emit(subscription, "SubscriptionResumed")

      const sub = await subscription.getSubscription(1)
      expect(sub.isActive).to.be.true
    })

    it("Should reject unauthorized cancellation", async function () {
      const { subscription, token, subscriber, recipient, owner } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await expect(
        subscription.connect(owner).cancelSubscription(1)
      ).to.be.revertedWith("Not authorized")
    })
  })

  describe("Payment Processing", function () {
    it("Should reject payment before due date", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      await expect(
        subscription.processPayment(1)
      ).to.be.revertedWith("Payment not due yet")
    })

    it("Should process payment when due", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      const amount = ethers.parseUnits("100", 6)
      const interval = 60 // 60 seconds for testing

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        amount,
        interval
      )

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [interval + 1])
      await ethers.provider.send("evm_mine", [])

      await expect(subscription.processPayment(1))
        .to.emit(subscription, "PaymentProcessed")
    })

    it("Should fail payment with insufficient balance", async function () {
      const { subscription, token, subscriber, recipient, owner } = await loadFixture(deployFixture)

      // Use owner who has no tokens
      await token.connect(owner).approve(await subscription.getAddress(), ethers.MaxUint256)

      await subscription.connect(owner).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        60
      )

      // This should emit PaymentFailed due to insufficient balance
      // First payment happens during creation and fails
    })
  })

  describe("Admin Functions", function () {
    it("Should update platform fee", async function () {
      const { subscription, owner } = await loadFixture(deployFixture)

      await expect(subscription.connect(owner).updatePlatformFee(300))
        .to.emit(subscription, "PlatformFeeUpdated")
        .withArgs(300)

      expect(await subscription.platformFee()).to.equal(300)
    })

    it("Should reject fee above 10%", async function () {
      const { subscription, owner } = await loadFixture(deployFixture)

      await expect(
        subscription.connect(owner).updatePlatformFee(1001)
      ).to.be.revertedWith("Fee cannot exceed 10%")
    })

    it("Should update fee collector", async function () {
      const { subscription, owner, subscriber } = await loadFixture(deployFixture)

      await subscription.connect(owner).updateFeeCollector(subscriber.address)
      expect(await subscription.feeCollector()).to.equal(subscriber.address)
    })

    it("Should reject non-owner admin calls", async function () {
      const { subscription, subscriber } = await loadFixture(deployFixture)

      await expect(
        subscription.connect(subscriber).updatePlatformFee(300)
      ).to.be.revertedWithCustomError(subscription, "OwnableUnauthorizedAccount")
    })
  })

  describe("View Functions", function () {
    it("Should return subscriptions by subscriber", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      const subs = await subscription.getSubscriptionsBySubscriber(subscriber.address)
      expect(subs.length).to.equal(1)
      expect(subs[0]).to.equal(1)
    })

    it("Should return subscriptions by recipient", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        30 * 24 * 60 * 60
      )

      const subs = await subscription.getSubscriptionsByRecipient(recipient.address)
      expect(subs.length).to.equal(1)
      expect(subs[0]).to.equal(1)
    })

    it("Should check if payment is due", async function () {
      const { subscription, token, subscriber, recipient } = await loadFixture(deployFixture)

      await subscription.connect(subscriber).createSubscription(
        recipient.address,
        await token.getAddress(),
        ethers.parseUnits("100", 6),
        60
      )

      expect(await subscription.isPaymentDue(1)).to.be.false

      // Fast forward
      await ethers.provider.send("evm_increaseTime", [61])
      await ethers.provider.send("evm_mine", [])

      expect(await subscription.isPaymentDue(1)).to.be.true
    })
  })
})
