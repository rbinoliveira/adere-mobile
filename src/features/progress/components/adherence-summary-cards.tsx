import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { SuccessColors, WarningColors } from '@/shared/constants/theme.constant'

import type { AdherenceStats } from '../hooks/use-adherence.hook'

type Props = {
  stats: AdherenceStats
}

export function AdherenceSummaryCards({ stats }: Props) {
  return (
    <View className="flex-row gap-3">
      <View className="flex-1 bg-base-white rounded-2xl p-4 items-center">
        <PlatformText fontSize={24} fontWeight={700} color="neutral-900">
          {stats.totalTaken}
        </PlatformText>
        <PlatformText
          fontSize={12}
          color="neutral-600"
          className="text-center mt-1"
        >
          doses{'\n'}tomadas
        </PlatformText>
      </View>
      <View className="flex-1 bg-base-white rounded-2xl p-4 items-center">
        <PlatformText
          fontSize={24}
          fontWeight={700}
          style={{ color: SuccessColors[700] }}
        >
          {stats.onTime}
        </PlatformText>
        <PlatformText
          fontSize={12}
          color="neutral-600"
          className="text-center mt-1"
        >
          no{'\n'}horário
        </PlatformText>
      </View>
      <View className="flex-1 bg-base-white rounded-2xl p-4 items-center">
        <PlatformText
          fontSize={24}
          fontWeight={700}
          style={{ color: WarningColors[500] }}
        >
          {stats.late}
        </PlatformText>
        <PlatformText
          fontSize={12}
          color="neutral-600"
          className="text-center mt-1"
        >
          com{'\n'}atraso
        </PlatformText>
      </View>
    </View>
  )
}
