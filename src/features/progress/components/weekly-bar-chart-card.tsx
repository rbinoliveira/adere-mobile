import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { BarChart } from '@/shared/components/charts/bar-chart'
import { Icon } from '@/shared/components/icons/icon'
import { NeutralColors } from '@/shared/constants/theme.constant'

import type { ChartDataPoint } from '../hooks/use-adherence.hook'

type Props = {
  loading: boolean
  data: ChartDataPoint[]
}

export function WeeklyBarChartCard({ loading, data }: Props) {
  return (
    <View className="bg-base-white rounded-2xl p-5">
      <PlatformText
        fontSize={14}
        fontWeight={600}
        color="neutral-700"
        className="mb-4"
      >
        Doses por semana — último mês
      </PlatformText>

      {loading ? (
        <View className="h-20 items-center justify-center">
          <PlatformText fontSize={14} color="neutral-500">
            Carregando...
          </PlatformText>
        </View>
      ) : data.every((d) => d.value === 0) ? (
        <View className="h-20 items-center justify-center gap-2">
          <Icon iconName="clipboard" size={28} color={NeutralColors[400]} />
          <PlatformText fontSize={13} color="neutral-500">
            Nenhuma dose registrada
          </PlatformText>
        </View>
      ) : (
        <BarChart
          data={data}
          height={120}
          barWidth="50%"
          barRadius={6}
          primaryBarColor="bg-accent-500"
          labelSize="text-[11px]"
          formatTooltip={(item) => ({
            content: `${(item as { value: number }).value} dose${(item as { value: number }).value !== 1 ? 's' : ''}`,
            subContent: item.label,
          })}
        />
      )}
    </View>
  )
}
