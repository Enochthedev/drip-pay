/**
 * Database initialization script
 * Initializes Prisma database and runs migrations
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function main() {
  console.log('Initializing DripPay database...')

  try {
    // Generate Prisma Client
    console.log('\n1. Generating Prisma Client...')
    await execAsync('npx prisma generate')
    console.log('✅ Prisma Client generated')

    // Run migrations
    console.log('\n2. Running database migrations...')
    await execAsync('npx prisma migrate dev --name init')
    console.log('✅ Migrations completed')

    // Seed database (optional)
    console.log('\n3. Database ready!')
    console.log('\nYou can now start the development server with: npm run dev')

  } catch (error: any) {
    console.error('Error initializing database:', error.message)
    console.error('\nMake sure you have:')
    console.error('1. PostgreSQL running')
    console.error('2. DATABASE_URL configured in .env file')
    console.error('3. Database created')
    process.exit(1)
  }
}

main()
