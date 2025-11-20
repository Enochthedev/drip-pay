// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DripPaySubscription
 * @dev Smart contract for managing recurring subscription payments on blockchain
 */
contract DripPaySubscription is ReentrancyGuard, Ownable {

    struct Subscription {
        address subscriber;
        address recipient;
        address tokenAddress;
        uint256 amount;
        uint256 interval; // in seconds
        uint256 nextPayment;
        bool isActive;
        uint256 createdAt;
    }

    // State variables
    uint256 public subscriptionCount;
    mapping(uint256 => Subscription) public subscriptions;
    mapping(address => uint256[]) public subscriberSubscriptions;
    mapping(address => uint256[]) public recipientSubscriptions;

    // Platform fee (in basis points, e.g., 250 = 2.5%)
    uint256 public platformFee = 250;
    address public feeCollector;

    // Events
    event SubscriptionCreated(
        uint256 indexed subscriptionId,
        address indexed subscriber,
        address indexed recipient,
        address tokenAddress,
        uint256 amount,
        uint256 interval
    );

    event SubscriptionCancelled(
        uint256 indexed subscriptionId,
        uint256 timestamp
    );

    event SubscriptionPaused(
        uint256 indexed subscriptionId,
        uint256 timestamp
    );

    event SubscriptionResumed(
        uint256 indexed subscriptionId,
        uint256 timestamp
    );

    event PaymentProcessed(
        uint256 indexed subscriptionId,
        uint256 amount,
        uint256 timestamp
    );

    event PaymentFailed(
        uint256 indexed subscriptionId,
        string reason,
        uint256 timestamp
    );

    event PlatformFeeUpdated(uint256 newFee);

    constructor(address _feeCollector) {
        feeCollector = _feeCollector;
    }

    /**
     * @dev Create a new subscription
     * @param recipient Address receiving the payments
     * @param tokenAddress ERC20 token address
     * @param amount Payment amount per interval
     * @param interval Payment interval in seconds
     */
    function createSubscription(
        address recipient,
        address tokenAddress,
        uint256 amount,
        uint256 interval
    ) external returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        require(tokenAddress != address(0), "Invalid token");
        require(amount > 0, "Amount must be greater than 0");
        require(interval > 0, "Interval must be greater than 0");

        subscriptionCount++;
        uint256 subscriptionId = subscriptionCount;

        subscriptions[subscriptionId] = Subscription({
            subscriber: msg.sender,
            recipient: recipient,
            tokenAddress: tokenAddress,
            amount: amount,
            interval: interval,
            nextPayment: block.timestamp + interval,
            isActive: true,
            createdAt: block.timestamp
        });

        subscriberSubscriptions[msg.sender].push(subscriptionId);
        recipientSubscriptions[recipient].push(subscriptionId);

        emit SubscriptionCreated(
            subscriptionId,
            msg.sender,
            recipient,
            tokenAddress,
            amount,
            interval
        );

        // Process first payment immediately
        _processPayment(subscriptionId);

        return subscriptionId;
    }

    /**
     * @dev Cancel a subscription
     * @param subscriptionId ID of the subscription to cancel
     */
    function cancelSubscription(uint256 subscriptionId) external {
        Subscription storage sub = subscriptions[subscriptionId];
        require(
            msg.sender == sub.subscriber || msg.sender == sub.recipient,
            "Not authorized"
        );
        require(sub.isActive, "Subscription not active");

        sub.isActive = false;

        emit SubscriptionCancelled(subscriptionId, block.timestamp);
    }

    /**
     * @dev Pause a subscription (only subscriber can pause)
     * @param subscriptionId ID of the subscription to pause
     */
    function pauseSubscription(uint256 subscriptionId) external {
        Subscription storage sub = subscriptions[subscriptionId];
        require(msg.sender == sub.subscriber, "Only subscriber can pause");
        require(sub.isActive, "Subscription not active");

        sub.isActive = false;

        emit SubscriptionPaused(subscriptionId, block.timestamp);
    }

    /**
     * @dev Resume a paused subscription
     * @param subscriptionId ID of the subscription to resume
     */
    function resumeSubscription(uint256 subscriptionId) external {
        Subscription storage sub = subscriptions[subscriptionId];
        require(msg.sender == sub.subscriber, "Only subscriber can resume");
        require(!sub.isActive, "Subscription already active");

        sub.isActive = true;
        sub.nextPayment = block.timestamp + sub.interval;

        emit SubscriptionResumed(subscriptionId, block.timestamp);
    }

    /**
     * @dev Process a subscription payment
     * @param subscriptionId ID of the subscription
     */
    function processPayment(uint256 subscriptionId) external nonReentrant returns (bool) {
        Subscription storage sub = subscriptions[subscriptionId];
        require(sub.isActive, "Subscription not active");
        require(block.timestamp >= sub.nextPayment, "Payment not due yet");

        return _processPayment(subscriptionId);
    }

    /**
     * @dev Internal function to process payment
     */
    function _processPayment(uint256 subscriptionId) private returns (bool) {
        Subscription storage sub = subscriptions[subscriptionId];

        IERC20 token = IERC20(sub.tokenAddress);

        // Check allowance
        uint256 allowance = token.allowance(sub.subscriber, address(this));
        if (allowance < sub.amount) {
            emit PaymentFailed(
                subscriptionId,
                "Insufficient allowance",
                block.timestamp
            );
            return false;
        }

        // Check balance
        uint256 balance = token.balanceOf(sub.subscriber);
        if (balance < sub.amount) {
            emit PaymentFailed(
                subscriptionId,
                "Insufficient balance",
                block.timestamp
            );
            return false;
        }

        // Calculate platform fee
        uint256 fee = (sub.amount * platformFee) / 10000;
        uint256 recipientAmount = sub.amount - fee;

        // Transfer tokens
        bool feeTransfer = true;
        if (fee > 0) {
            feeTransfer = token.transferFrom(
                sub.subscriber,
                feeCollector,
                fee
            );
        }

        bool recipientTransfer = token.transferFrom(
            sub.subscriber,
            sub.recipient,
            recipientAmount
        );

        if (!feeTransfer || !recipientTransfer) {
            emit PaymentFailed(
                subscriptionId,
                "Transfer failed",
                block.timestamp
            );
            return false;
        }

        // Update next payment time
        sub.nextPayment = block.timestamp + sub.interval;

        emit PaymentProcessed(subscriptionId, sub.amount, block.timestamp);

        return true;
    }

    /**
     * @dev Batch process multiple subscription payments
     * @param subscriptionIds Array of subscription IDs to process
     */
    function batchProcessPayments(uint256[] calldata subscriptionIds) external {
        for (uint256 i = 0; i < subscriptionIds.length; i++) {
            Subscription storage sub = subscriptions[subscriptionIds[i]];
            if (sub.isActive && block.timestamp >= sub.nextPayment) {
                _processPayment(subscriptionIds[i]);
            }
        }
    }

    /**
     * @dev Get subscription details
     */
    function getSubscription(uint256 subscriptionId)
        external
        view
        returns (
            address subscriber,
            address recipient,
            address tokenAddress,
            uint256 amount,
            uint256 interval,
            uint256 nextPayment,
            bool isActive
        )
    {
        Subscription memory sub = subscriptions[subscriptionId];
        return (
            sub.subscriber,
            sub.recipient,
            sub.tokenAddress,
            sub.amount,
            sub.interval,
            sub.nextPayment,
            sub.isActive
        );
    }

    /**
     * @dev Get all subscription IDs for a subscriber
     */
    function getSubscriptionsBySubscriber(address subscriber)
        external
        view
        returns (uint256[] memory)
    {
        return subscriberSubscriptions[subscriber];
    }

    /**
     * @dev Get all subscription IDs for a recipient
     */
    function getSubscriptionsByRecipient(address recipient)
        external
        view
        returns (uint256[] memory)
    {
        return recipientSubscriptions[recipient];
    }

    /**
     * @dev Check if payment is due for a subscription
     */
    function isPaymentDue(uint256 subscriptionId) external view returns (bool) {
        Subscription memory sub = subscriptions[subscriptionId];
        return sub.isActive && block.timestamp >= sub.nextPayment;
    }

    /**
     * @dev Update platform fee (only owner)
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%");
        platformFee = newFee;
        emit PlatformFeeUpdated(newFee);
    }

    /**
     * @dev Update fee collector address (only owner)
     */
    function updateFeeCollector(address newCollector) external onlyOwner {
        require(newCollector != address(0), "Invalid address");
        feeCollector = newCollector;
    }
}
