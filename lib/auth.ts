import { verify } from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './db'

export interface JWTPayload {
  userId: string
  address: string
  iat?: number
  exp?: number
}

/**
 * Verify JWT token from Authorization header
 */
export async function verifyAuth(request: NextRequest): Promise<JWTPayload | null> {
  const token = request.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JWTPayload

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return null
    }

    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

/**
 * Generate a random nonce for wallet signature
 */
export function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

/**
 * Create a message for wallet signing
 */
export function createSignMessage(address: string, nonce: string): string {
  return `Welcome to DripPay!\n\nSign this message to authenticate your wallet.\n\nWallet: ${address}\nNonce: ${nonce}\n\nThis request will not trigger any blockchain transaction or cost any gas fees.`
}
