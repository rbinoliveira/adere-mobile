import { z } from 'zod'

const server = z.object({})

const client = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
  EXPO_PUBLIC_APP_NAME: z.string().min(1),
  EXPO_PUBLIC_FIREBASE_API_KEY: z.string(),
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  EXPO_PUBLIC_FIREBASE_APP_ID: z.string(),
  EXPO_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: z.string(),
})

const processEnv = {
  EXPO_PUBLIC_API_URL:
    process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333',
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'adere',
  EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  EXPO_PUBLIC_FIREBASE_PROJECT_ID:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
  EXPO_PUBLIC_GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
}

// ────────────────────────────────
// Environment validation setup
// ────────────────────────────────

const merged = server.merge(client)

const isServer = typeof window === 'undefined'

const parsed = isServer
  ? merged.safeParse(processEnv)
  : client.safeParse(processEnv)

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,
  )
  if (!__DEV__) {
    throw new Error('Invalid environment variables')
  }
  console.warn(
    '⚠️ Copy .env.example to .env and fill in your Firebase credentials.',
  )
}

// Use validated data when available, fall back to raw processEnv in dev
const envData = parsed.success
  ? parsed.data
  : (processEnv as typeof parsed.data)

const env = new Proxy(envData, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined

    if (!isServer && !prop.startsWith('EXPO_PUBLIC_'))
      throw new Error(
        process.env.NODE_ENV === 'production'
          ? '❌ Attempted to access a server-side environment variable on the client'
          : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
      )

    if (prop.startsWith('EXPO_PUBLIC_')) {
      const envValue = process.env[prop]
      if (envValue !== undefined) {
        return envValue
      }
    }

    return target[prop as keyof typeof target]
  },
})

export { env }
