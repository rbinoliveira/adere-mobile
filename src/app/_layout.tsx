import 'react-native-reanimated'
import '@/shared/styles/global.css'

import {
  AveriaSerifLibre_400Regular as averiaSerifLibre400Regular,
  AveriaSerifLibre_700Bold as averiaSerifLibre700Bold,
} from '@expo-google-fonts/averia-serif-libre'
import {
  Montserrat_400Regular as montserrat400Regular,
  Montserrat_500Medium as montserrat500Medium,
  Montserrat_600SemiBold as montserrat600SemiBold,
  Montserrat_700Bold as montserrat700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from '@/features/auth/hooks/auth.hook'
import { queryClient } from '@/shared/config/react-query'

// Suppress known warnings from dependencies
LogBox.ignoreLogs([
  'SafeAreaView has been deprecated and will be removed in a future release',
  'Sending `onAnimatedValueUpdate` with no listeners registered',
  'Ignoring DevTools app debug target',
])

// Ignore all warnings (use only if specific ignores don't work)
if (__DEV__) {
  LogBox.ignoreAllLogs()
}

SplashScreen.preventAutoHideAsync().catch((error) => {
  console.warn('SplashScreen.preventAutoHideAsync error:', error)
})

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    montserrat400Regular,
    montserrat500Medium,
    montserrat600SemiBold,
    montserrat700Bold,
    averiaSerifLibre400Regular,
    averiaSerifLibre700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch((error) => {
        console.warn('SplashScreen.hideAsync error:', error)
      })
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
