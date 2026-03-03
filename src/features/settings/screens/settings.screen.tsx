import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Pressable, ScrollView, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNotifications } from '@/features/medications/hooks/notifications.hook'
import { ScrollViewPadding } from '@/shared/constants/design-tokens'

export function SettingsScreen() {
  const router = useRouter()
  const { enabled, loading, toggleNotifications, requestPermissions } =
    useNotifications()

  async function handleToggleNotifications(value: boolean) {
    if (value) {
      const hasPermission = await requestPermissions()
      if (!hasPermission) {
        return
      }
    }
    await toggleNotifications(value)
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <FontAwesome name="arrow-left" size={20} color="#1F2937" />
        </Pressable>
        <Text className="text-text-one font-inter-bold text-lg">
          Configurações
        </Text>
        <View className="w-9" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: ScrollViewPadding.top,
          paddingBottom: ScrollViewPadding.bottom,
        }}
      >
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-4">
              <Text className="text-text-one font-inter-bold text-base">
                Notificações
              </Text>
              <Text className="text-text-five font-inter text-sm mt-1">
                Receber lembretes para tomar seus remédios
              </Text>
            </View>
            {!loading && (
              <Switch
                value={enabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor="#FFFFFF"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
