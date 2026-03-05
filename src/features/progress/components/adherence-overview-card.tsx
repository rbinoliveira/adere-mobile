import { StyleSheet, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { PieChart } from '@/shared/components/charts/pie-chart'
import { AccentColors, SuccessColors } from '@/shared/constants/theme.constant'

import type { AdherenceStats, PieDataPoint } from '../hooks/use-adherence.hook'

type Props = {
  loading: boolean
  stats: AdherenceStats
  pieData: PieDataPoint[]
}

export function AdherenceOverviewCard({ loading, stats, pieData }: Props) {
  return (
    <View className="bg-base-white rounded-2xl p-5">
      <PlatformText
        fontSize={14}
        fontWeight={600}
        color="neutral-700"
        className="mb-4"
      >
        Aderência — últimos 30 dias
      </PlatformText>

      {loading ? (
        <View className="h-24 items-center justify-center">
          <PlatformText fontSize={14} color="neutral-500">
            Carregando...
          </PlatformText>
        </View>
      ) : (
        <View className="flex-row items-center gap-6">
          <PieChart data={pieData} size={100} innerRadius={0.75} />

          <View className="flex-1 gap-3">
            <View>
              <PlatformText
                fontSize={48}
                fontWeight={700}
                style={[
                  overviewStyles.percentText,
                  { color: stats.adherenceColor },
                ]}
              >
                {stats.adherencePct}%
              </PlatformText>
              <PlatformText fontSize={13} color="neutral-600">
                das doses tomadas
              </PlatformText>
            </View>

            <View className="flex-row items-center gap-1.5">
              <View
                className="w-2.5 h-2.5 rounded-full"
                style={overviewStyles.legendDot}
              />
              <PlatformText fontSize={12} color="neutral-700">
                No horário: {stats.onTimePct}%
              </PlatformText>
            </View>

            <View className="flex-row items-center gap-1.5">
              <View
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: AccentColors[500] }}
              />
              <PlatformText fontSize={12} color="neutral-700">
                Atrasado: {stats.late}
              </PlatformText>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const overviewStyles = StyleSheet.create({
  legendDot: { backgroundColor: SuccessColors[700] },
  percentText: { lineHeight: 52 },
})
