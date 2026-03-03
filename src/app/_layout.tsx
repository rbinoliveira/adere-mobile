import 'react-native-reanimated'
import '@/shared/styles/globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { AuthProvider, useAuth } from '@/features/auth/hooks/auth.hook'
import InterBold from '@/shared/assets/fonts/Inter_Bold.ttf'
import InterMedium from '@/shared/assets/fonts/Inter_Medium.ttf'
import InterRegular from '@/shared/assets/fonts/Inter_Regular.ttf'
import InterSemiBold from '@/shared/assets/fonts/Inter_SemiBold.ttf'
import { queryClient } from '@/shared/config/react-query'

SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (loading) return

    const inAuth = segments[0] === '(authenticated)'

    if (user && !inAuth) {
      router.replace('/(authenticated)')
    } else if (!user && inAuth) {
      router.replace('/login')
    }
  }, [router, user, loading, segments])

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="recover-password" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_Regular: InterRegular,
    Inter_Medium: InterMedium,
    Inter_SemiBold: InterSemiBold,
    Inter_Bold: InterBold,
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  )
}
