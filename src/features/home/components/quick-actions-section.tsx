import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import {
  CardSpacing,
  IconSizes,
  Spacing,
} from '@/shared/constants/design-tokens'
import { triggerLightFeedback } from '@/shared/utils/haptic-feedback'

type QuickActionsSectionProps = {
  onHistoryPress?: () => void
  onHelpPress?: () => void
}

type QuickActionCardProps = {
  icon: keyof typeof FontAwesome.glyphMap
  iconColor: string
  title: string
  subtitle: string
  onPress?: () => void
}

const QUICK_ACTION_CARD_MIN_HEIGHT = { minHeight: 120 } as const
const QUICK_ACTION_ICON_SIZE = { width: 56, height: 56 } as const

function QuickActionCard({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
}: QuickActionCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = async () => {
    await triggerLightFeedback()
    onPress?.()
  }

  const handlePressIn = () => {
    setIsPressed(true)
    triggerLightFeedback()
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`flex-1 bg-white rounded-2xl items-center justify-center border border-gray-100 ${
        isPressed ? 'opacity-80' : 'opacity-100'
      }`}
      style={{
        padding: CardSpacing.padding,
        ...QUICK_ACTION_CARD_MIN_HEIGHT,
        ...CardSpacing.shadow,
      }}
    >
      <View
        className="rounded-full items-center justify-center"
        style={{
          ...QUICK_ACTION_ICON_SIZE,
          backgroundColor: `${iconColor}15`,
          marginBottom: Spacing.sm,
        }}
      >
        <FontAwesome name={icon} size={IconSizes.large} color={iconColor} />
      </View>
      <Text className="text-text-one font-inter-bold text-base text-center">
        {title}
      </Text>
      <Text className="text-text-three font-inter text-sm text-center mt-1">
        {subtitle}
      </Text>
    </Pressable>
  )
}

export function QuickActionsSection({
  onHistoryPress,
  onHelpPress,
}: QuickActionsSectionProps) {
  return (
    <View
      className="w-full flex-row"
      style={{ marginTop: Spacing.lg, gap: Spacing.md }}
    >
      <QuickActionCard
        icon="file-text-o"
        iconColor="#3B82F6"
        title="Histórico"
        subtitle="Ver remédios tomados"
        onPress={onHistoryPress}
      />
      <QuickActionCard
        icon="question-circle"
        iconColor="#10B981"
        title="Ajuda"
        subtitle="Como usar o app"
        onPress={onHelpPress}
      />
    </View>
  )
}
