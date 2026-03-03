import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import {
  CardSpacing,
  IconSizes,
  Spacing,
} from '@/shared/constants/design-tokens'

type DailyTipCardProps = {
  onViewMorePress?: () => void
}

const DAILY_TIPS = [
  'Se esquecer de tomar um remédio, tome assim que lembrar. Mas se já estiver próximo do próximo horário, pule a dose esquecida e continue normalmente.',
  'Tome seus remédios sempre no mesmo horário para criar um hábito e não esquecer.',
  'Guarde seus medicamentos em local fresco e seco, longe da luz solar direta.',
  'Nunca pare de tomar um medicamento sem orientação médica, mesmo se estiver se sentindo melhor.',
  'Beba bastante água ao tomar medicamentos para ajudar na absorção.',
]

function getTodayTip(): string {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  )
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}

export function DailyTipCard({ onViewMorePress }: DailyTipCardProps) {
  const tip = getTodayTip()

  return (
    <View className="w-full" style={{ marginTop: Spacing.lg }}>
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full rounded-2xl"
        style={{ padding: CardSpacing.padding }}
      >
        <View
          className="flex-row items-center"
          style={{ gap: Spacing.sm, marginBottom: Spacing.sm }}
        >
          <FontAwesome
            name="lightbulb-o"
            size={IconSizes.large}
            color="#FCD34D"
          />
          <Text className="text-white font-inter-bold text-lg">
            Dica do Dia
          </Text>
        </View>

        <Text
          className="text-white font-inter text-base leading-6"
          style={{ marginBottom: Spacing.md }}
        >
          {tip}
        </Text>

        <Pressable
          onPress={onViewMorePress}
          className="bg-white/20 rounded-lg self-start"
          style={{ paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md }}
        >
          <Text className="text-white font-inter-semibold text-base">
            Ver Mais Dicas
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}
