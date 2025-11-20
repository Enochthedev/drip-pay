import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createSignMessage } from '@/lib/auth'
import { verifySignature } from '@/lib/blockchain/client'
import { sign } from 'jsonwebtoken'

/**
 * POST /api/auth/verify
 * Verify wallet signature and return JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, signature } = body

    if (!address || !signature) {
      return NextResponse.json(
        { error: 'Address and signature are required' },
        { status: 400 }
      )
    }

    // Normalize address
    const normalizedAddress = address.toLowerCase()

    // Get user and nonce
    const user = await prisma.user.findUnique({
      where: { address: normalizedAddress },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please request a nonce first.' },
        { status: 404 }
      )
    }

    // Create sign message
    const message = createSignMessage(user.address, user.nonce)

    // Verify signature
    const isValid = await verifySignature(user.address, message, signature)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        address: user.address,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        address: user.address,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify signature' },
      { status: 500 }
    )
  }
}
