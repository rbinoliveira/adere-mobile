import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Text, View } from 'react-native'

import {
  CardSpacing,
  IconSizes,
  Spacing,
} from '@/shared/constants/design-tokens'

type GreetingCardProps = {
  userName: string
}

const GREETING_ICON_SIZE = { width: 56, height: 56 } as const

export function GreetingCard({ userName }: GreetingCardProps) {
  const firstName = userName?.split(' ')[0] || 'Paciente'

  return (
    <View
      className="w-full bg-white rounded-2xl flex-row items-center border border-gray-100"
      style={{
        padding: CardSpacing.padding,
        gap: Spacing.md,
        ...CardSpacing.shadow,
      }}
    >
      <View
        className="rounded-full bg-green-500 items-center justify-center"
        style={GREETING_ICON_SIZE}
      >
        <FontAwesome name="heart" size={IconSizes.large} color="white" />
      </View>
      <View className="flex-1">
        <Text className="text-text-one font-inter-bold text-lg">
          Olá, {firstName}!
        </Text>
        <Text className="text-text-three font-inter text-base mt-1">
          Como você está se sentindo hoje?
        </Text>
      </View>
    </View>
  )
}
