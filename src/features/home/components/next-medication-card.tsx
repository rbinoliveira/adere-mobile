import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { IconSizes, Spacing } from '@/shared/constants/design-tokens'

type NextMedicationCardProps = {
  medicationName?: string
  scheduledTime?: Date
}

function getPeriodOfDay(date: Date): string {
  const hours = date.getHours()
  if (hours >= 5 && hours < 12) return 'Manhã'
  if (hours >= 12 && hours < 18) return 'Tarde'
  return 'Noite'
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function getCountdownText(targetTime: Date, currentTime: Date): string {
  const diffMs = targetTime.getTime() - currentTime.getTime()

  if (diffMs <= 0) {
    return 'Agora!'
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const remainingMinutes = diffMinutes % 60

  if (diffHours > 0) {
    if (remainingMinutes > 0) {
      return `em ${diffHours}h ${remainingMinutes}min`
    }
    return `em ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  }

  return `em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`
}

const DEFAULT_SHADOW_STYLE = {
  shadowColor: '#3B82F6',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
} as const

const ICON_CONTAINER_SIZE = { width: 56, height: 56 } as const

export function NextMedicationCard({
  medicationName,
  scheduledTime,
}: NextMedicationCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [defaultTime] = useState(() => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 30)
    return now
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const nextTime = scheduledTime || defaultTime
  const countdown = getCountdownText(nextTime, currentTime)
  const period = getPeriodOfDay(nextTime)
  const timeFormatted = formatTime(nextTime)

  return (
    <View className="w-full mt-4">
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#1E40AF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full rounded-2xl"
        style={{
          padding: Spacing.lg,
          ...DEFAULT_SHADOW_STYLE,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View
              className="rounded-full bg-white/30 items-center justify-center"
              style={ICON_CONTAINER_SIZE}
            >
              <FontAwesome
                name="clock-o"
                size={IconSizes.large}
                color="white"
              />
            </View>
            <View>
              <Text className="text-white font-inter-bold text-lg">
                Próximo Remédio
              </Text>
              {medicationName && (
                <Text className="text-white/90 font-inter-semibold text-base mt-1">
                  {medicationName}
                </Text>
              )}
              <Text className="text-white/80 font-inter text-base mt-1">
                {countdown}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-white font-inter-bold text-3xl">
              {timeFormatted}
            </Text>
            <Text className="text-white/80 font-inter text-base mt-1">
              {period}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}
