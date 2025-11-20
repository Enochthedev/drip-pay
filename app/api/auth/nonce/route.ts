import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateNonce } from '@/lib/auth'

/**
 * GET /api/auth/nonce
 * Get or create a nonce for wallet authentication
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Normalize address to lowercase
    const normalizedAddress = address.toLowerCase()

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { address: normalizedAddress },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          address: normalizedAddress,
          nonce: generateNonce(),
        },
      })
    } else {
      // Generate new nonce
      user = await prisma.user.update({
        where: { address: normalizedAddress },
        data: { nonce: generateNonce() },
      })
    }

    return NextResponse.json({
      nonce: user.nonce,
      address: user.address,
    })
  } catch (error) {
    console.error('Nonce generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    )
  }
}
