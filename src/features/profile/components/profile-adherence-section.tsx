import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import {
  AccentColors,
  SuccessColors,
  WarningColors,
} from '@/shared/constants/theme.constant'

import type { ProfileAdherenceStats } from '../hooks/use-profile.hook'

type ProfileAdherenceSectionProps = {
  loading: boolean
  stats: ProfileAdherenceStats
}

export function ProfileAdherenceSection({
  loading,
  stats,
}: ProfileAdherenceSectionProps) {
  return (
    <View className="px-5">
      <PlatformText
        fontSize={16}
        fontWeight={700}
        color="neutral-900"
        className="mb-3"
      >
        Aderência — últimos 30 dias
      </PlatformText>

      {loading ? (
        <View className="bg-base-white rounded-2xl p-4 items-center">
          <PlatformText fontSize={14} color="neutral-500">
            Carregando...
          </PlatformText>
        </View>
      ) : (
        <>
          <View className="bg-base-white rounded-2xl p-5 items-center mb-3">
            <PlatformText
              fontSize={48}
              fontWeight={700}
              style={{
                color:
                  stats.adherencePercent >= 80
                    ? SuccessColors[700]
                    : stats.adherencePercent >= 50
                      ? WarningColors[500]
                      : AccentColors[500],
              }}
            >
              {stats.adherencePercent}%
            </PlatformText>
            <PlatformText fontSize={15} color="neutral-600">
              dos remédios tomados
            </PlatformText>
          </View>

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
                doses tomadas
              </PlatformText>
            </View>
            <View className="flex-1 bg-base-white rounded-2xl p-4 items-center">
              <PlatformText
                fontSize={24}
                fontWeight={700}
                style={{ color: SuccessColors[700] }}
              >
                {stats.onTimePercent}%
              </PlatformText>
              <PlatformText
                fontSize={12}
                color="neutral-600"
                className="text-center mt-1"
              >
                no horário
              </PlatformText>
            </View>
            <View className="flex-1 bg-base-white rounded-2xl p-4 items-center">
              <PlatformText
                fontSize={24}
                fontWeight={700}
                style={{ color: WarningColors[500] }}
              >
                {stats.lateCount}
              </PlatformText>
              <PlatformText
                fontSize={12}
                color="neutral-600"
                className="text-center mt-1"
              >
                com atraso
              </PlatformText>
            </View>
          </View>
        </>
      )}
    </View>
  )
}
