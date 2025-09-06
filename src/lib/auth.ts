import { betterAuth } from 'better-auth'
import { reactStartCookies } from 'better-auth/react-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/server/db'

export const auth = betterAuth({
  basePath: '/api/auth',
  database: drizzleAdapter(db, { provider: 'pg' }),
  // Turn on what you need:
  emailAndPassword: { enabled: true },
  // security hardening for prod:
  cookies: { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' },
  trustedOrigins: [process.env.PUBLIC_URL ?? 'http://localhost:3000'],
  plugins: [reactStartCookies()],
})
