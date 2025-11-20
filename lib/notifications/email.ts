import { Resend } from 'resend'
import { env } from '../env'

/**
 * Email notification service using Resend
 * Sends transactional emails for subscription events
 */

let resend: Resend | null = null

if (env.RESEND_API_KEY) {
  resend = new Resend(env.RESEND_API_KEY)
}

interface EmailOptions {
  to: string
  subject: string
  html: string
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend || !env.EMAIL_FROM) {
    console.warn('Email service not configured. Skipping email:', options.subject)
    return false
  }

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Email templates
 */

export async function sendLowBalanceWarning(
  email: string,
  address: string,
  subscriptionName: string,
  currentBalance: string,
  requiredAmount: string,
  currency: string
) {
  return sendEmail({
    to: email,
    subject: `⚠️ Low Balance Warning - ${subscriptionName}`,
    html: `
      <h2>Low Balance Warning</h2>
      <p>Your wallet <code>${address}</code> has insufficient funds for the next payment.</p>

      <p><strong>Subscription:</strong> ${subscriptionName}</p>
      <p><strong>Current Balance:</strong> ${currentBalance} ${currency}</p>
      <p><strong>Required Amount:</strong> ${requiredAmount} ${currency}</p>

      <p>Please top up your wallet to avoid subscription cancellation.</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">View Dashboard</a></p>
    `,
  })
}

export async function sendPaymentSuccessful(
  email: string,
  subscriptionName: string,
  amount: string,
  currency: string,
  txHash: string,
  nextBillingDate: Date
) {
  return sendEmail({
    to: email,
    subject: `✅ Payment Successful - ${subscriptionName}`,
    html: `
      <h2>Payment Processed Successfully</h2>
      <p>Your subscription payment has been processed.</p>

      <p><strong>Subscription:</strong> ${subscriptionName}</p>
      <p><strong>Amount:</strong> ${amount} ${currency}</p>
      <p><strong>Transaction:</strong> <code>${txHash}</code></p>
      <p><strong>Next Billing Date:</strong> ${nextBillingDate.toLocaleDateString()}</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">View Dashboard</a></p>
    `,
  })
}

export async function sendPaymentFailed(
  email: string,
  subscriptionName: string,
  amount: string,
  currency: string,
  reason: string,
  attemptsRemaining: number
) {
  return sendEmail({
    to: email,
    subject: `❌ Payment Failed - ${subscriptionName}`,
    html: `
      <h2>Payment Failed</h2>
      <p>We were unable to process your subscription payment.</p>

      <p><strong>Subscription:</strong> ${subscriptionName}</p>
      <p><strong>Amount:</strong> ${amount} ${currency}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p><strong>Retry Attempts Remaining:</strong> ${attemptsRemaining}</p>

      <p>Please ensure your wallet has sufficient ${currency} balance and token approval.</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">Update Payment Method</a></p>
    `,
  })
}

export async function sendSubscriptionCancelled(
  email: string,
  subscriptionName: string,
  reason: 'user_cancelled' | 'payment_failed' | 'expired'
) {
  const reasonText = {
    user_cancelled: 'You cancelled the subscription',
    payment_failed: 'Multiple payment failures',
    expired: 'Subscription expired',
  }

  return sendEmail({
    to: email,
    subject: `🚫 Subscription Cancelled - ${subscriptionName}`,
    html: `
      <h2>Subscription Cancelled</h2>
      <p>Your subscription has been cancelled.</p>

      <p><strong>Subscription:</strong> ${subscriptionName}</p>
      <p><strong>Reason:</strong> ${reasonText[reason]}</p>

      <p>You can resubscribe anytime from your dashboard.</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/plans">Browse Plans</a></p>
    `,
  })
}

export async function sendSubscriptionCreated(
  email: string,
  subscriptionName: string,
  amount: string,
  currency: string,
  interval: string,
  nextBillingDate: Date
) {
  return sendEmail({
    to: email,
    subject: `🎉 Welcome to ${subscriptionName}`,
    html: `
      <h2>Subscription Activated!</h2>
      <p>Thank you for subscribing.</p>

      <p><strong>Plan:</strong> ${subscriptionName}</p>
      <p><strong>Amount:</strong> ${amount} ${currency} / ${interval}</p>
      <p><strong>Next Billing Date:</strong> ${nextBillingDate.toLocaleDateString()}</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">Manage Subscription</a></p>
    `,
  })
}

export async function sendPaymentReminder(
  email: string,
  subscriptionName: string,
  amount: string,
  currency: string,
  billingDate: Date
) {
  return sendEmail({
    to: email,
    subject: `🔔 Upcoming Payment - ${subscriptionName}`,
    html: `
      <h2>Payment Reminder</h2>
      <p>Your subscription payment is coming up soon.</p>

      <p><strong>Subscription:</strong> ${subscriptionName}</p>
      <p><strong>Amount:</strong> ${amount} ${currency}</p>
      <p><strong>Billing Date:</strong> ${billingDate.toLocaleDateString()}</p>

      <p>Please ensure your wallet has sufficient balance.</p>

      <p><a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">View Dashboard</a></p>
    `,
  })
}
