import { useRouter } from 'expo-router'
import { useEffect } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'

export default function Index() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.replace('/(private)/home')
    } else {
      router.replace('/(public)/(auth)/login')
    }
  }, [user, loading, router])

  return null
}
