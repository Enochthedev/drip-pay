import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

/**
 * Environment variable validation and type-safety
 * This ensures all required env vars are set and valid
 */
export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),

    // Authentication
    JWT_SECRET: z.string().min(32),

    // Blockchain RPC URLs
    SWELL_RPC_URL: z.string().url().optional(),
    ETHEREUM_RPC_URL: z.string().url().optional(),
    ARBITRUM_RPC_URL: z.string().url().optional(),
    BASE_RPC_URL: z.string().url().optional(),
    POLYGON_RPC_URL: z.string().url().optional(),
    OPTIMISM_RPC_URL: z.string().url().optional(),

    // Smart Contract Addresses
    SWELL_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
    ETHEREUM_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
    ARBITRUM_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
    BASE_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
    POLYGON_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
    OPTIMISM_SUBSCRIPTION_CONTRACT: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),

    // Admin wallet for automated transactions
    ADMIN_PRIVATE_KEY: z.string().regex(/^0x[a-fA-F0-9]{64}$/).optional(),

    // Redis for caching and rate limiting
    REDIS_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Email notifications
    RESEND_API_KEY: z.string().optional(),
    EMAIL_FROM: z.string().email().optional(),

    // Monitoring
    SENTRY_DSN: z.string().url().optional(),

    // Node environment
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },

  client: {
    // Public environment variables
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SWELL_RPC_URL: process.env.SWELL_RPC_URL,
    ETHEREUM_RPC_URL: process.env.ETHEREUM_RPC_URL,
    ARBITRUM_RPC_URL: process.env.ARBITRUM_RPC_URL,
    BASE_RPC_URL: process.env.BASE_RPC_URL,
    POLYGON_RPC_URL: process.env.POLYGON_RPC_URL,
    OPTIMISM_RPC_URL: process.env.OPTIMISM_RPC_URL,
    SWELL_SUBSCRIPTION_CONTRACT: process.env.SWELL_SUBSCRIPTION_CONTRACT,
    ETHEREUM_SUBSCRIPTION_CONTRACT: process.env.ETHEREUM_SUBSCRIPTION_CONTRACT,
    ARBITRUM_SUBSCRIPTION_CONTRACT: process.env.ARBITRUM_SUBSCRIPTION_CONTRACT,
    BASE_SUBSCRIPTION_CONTRACT: process.env.BASE_SUBSCRIPTION_CONTRACT,
    POLYGON_SUBSCRIPTION_CONTRACT: process.env.POLYGON_SUBSCRIPTION_CONTRACT,
    OPTIMISM_SUBSCRIPTION_CONTRACT: process.env.OPTIMISM_SUBSCRIPTION_CONTRACT,
    ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY,
    REDIS_URL: process.env.REDIS_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
