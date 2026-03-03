import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string().optional(),
  EXPO_PUBLIC_API_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): Env {
  const env = {
    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  }

  const result = envSchema.safeParse(env)

  if (!result.success) {
    console.warn('Invalid environment variables:', result.error.flatten())
    return env as Env
  }

  return result.data
}

export const env = validateEnv()
