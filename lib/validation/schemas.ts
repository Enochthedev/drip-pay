import { z } from 'zod'

/**
 * Reusable validation schemas for API inputs
 */

// Ethereum address validation
export const ethereumAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')

// Transaction hash validation
export const txHashSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash')

// Chain ID validation
export const chainIdSchema = z.number().int().positive()

// Subscription interval validation
export const intervalSchema = z.enum(['daily', 'weekly', 'monthly', 'yearly'])

// Subscription status validation
export const subscriptionStatusSchema = z.enum(['active', 'paused', 'cancelled', 'expired'])

// Payment status validation
export const paymentStatusSchema = z.enum(['pending', 'completed', 'failed'])

// Auth schemas
export const getNonceSchema = z.object({
  address: ethereumAddressSchema,
})

export const verifySignatureSchema = z.object({
  address: ethereumAddressSchema,
  signature: z.string().min(1),
})

// Subscription plan schemas
export const createPlanSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  price: z.string().regex(/^\d+$/, 'Price must be a positive integer string'),
  currency: z.string().min(1).max(10),
  interval: intervalSchema,
  chainId: chainIdSchema,
  tokenAddress: ethereumAddressSchema,
})

export const updatePlanSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  isActive: z.boolean().optional(),
})

// Subscription schemas
export const createSubscriptionSchema = z.object({
  planId: z.string().cuid(),
  txHash: txHashSchema.optional(),
  subscriptionId: z.string().optional(),
})

export const updateSubscriptionSchema = z.object({
  action: z.enum(['pause', 'resume', 'cancel']),
  txHash: txHashSchema.optional(),
})

// Payment schemas
export const createPaymentSchema = z.object({
  subscriptionId: z.string().cuid(),
  txHash: txHashSchema,
  amount: z.string().regex(/^\d+$/, 'Amount must be a positive integer string'),
  currency: z.string().min(1).max(10),
  tokenAddress: ethereumAddressSchema,
  toAddress: ethereumAddressSchema.optional(),
  chainId: chainIdSchema,
  blockNumber: z.number().int().positive().optional(),
})

// Webhook schemas
export const createWebhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.enum([
    'subscription.created',
    'subscription.cancelled',
    'subscription.paused',
    'subscription.resumed',
    'payment.succeeded',
    'payment.failed',
  ])).min(1),
})

export const updateWebhookSchema = z.object({
  isActive: z.boolean().optional(),
  events: z.array(z.string()).optional(),
})

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const subscriptionQuerySchema = z.object({
  type: z.enum(['subscriber', 'creator']).optional(),
  status: subscriptionStatusSchema.optional(),
  ...paginationSchema.shape,
})

export const paymentQuerySchema = z.object({
  subscriptionId: z.string().cuid().optional(),
  status: paymentStatusSchema.optional(),
  ...paginationSchema.shape,
})
