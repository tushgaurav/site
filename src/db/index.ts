import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const rejectUnauthorized = process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
const useSSL =
  process.env.DATABASE_URI?.includes('sslmode=') ||
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== undefined

const client = postgres(process.env.DATABASE_URI!, {
  prepare: false,
  ssl: useSSL
    ? {
        rejectUnauthorized,
      }
    : undefined,
})

const db = drizzle(client, { schema })

export { db }
