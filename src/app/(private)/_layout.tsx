import { Tabs, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { AccentColors, NeutralColors } from '@/shared/constants/theme.constant'

export default function PrivateLayout() {
  const { user, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    const inPrivateGroup = segments[0] === '(private)'
    if (!user && inPrivateGroup) {
      router.replace('/(public)/(auth)/login')
    }
  }, [user, segments, loading, router])

  if (loading || !user) return null

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: NeutralColors[200],
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: AccentColors[500],
        tabBarInactiveTintColor: NeutralColors[600],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ color }) => (
            <PlatformText fontSize={12} style={{ color }}>
              Início
            </PlatformText>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon iconName="th-large" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          tabBarLabel: ({ color }) => (
            <PlatformText fontSize={12} style={{ color }}>
              Remédios
            </PlatformText>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon iconName="pill" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarLabel: ({ color }) => (
            <PlatformText fontSize={12} style={{ color }}>
              Progresso
            </PlatformText>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon iconName="clipboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color }) => (
            <PlatformText fontSize={12} style={{ color }}>
              Perfil
            </PlatformText>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon iconName="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
