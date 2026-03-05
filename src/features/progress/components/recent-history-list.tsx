import { View } from 'react-native'

import { AdherenceRecord } from '@/features/medications/services/adherence.service'
import { PlatformText } from '@/features/platform/components/platform-text'
import { SuccessColors, WarningColors } from '@/shared/constants/theme.constant'

type Props = {
  records: AdherenceRecord[]
}

export function RecentHistoryList({ records }: Props) {
  if (records.length === 0) return null

  const sorted = records
    .slice()
    .sort((a, b) => b.takenAt.seconds - a.takenAt.seconds)
    .slice(0, 10)

  return (
    <View className="bg-base-white rounded-2xl p-5">
      <PlatformText
        fontSize={14}
        fontWeight={600}
        color="neutral-700"
        className="mb-3"
      >
        Histórico recente
      </PlatformText>

      {sorted.map((record) => {
        const isOnTime = Math.abs(record.minutesDiff) <= 30
        const dot = isOnTime ? SuccessColors[700] : WarningColors[500]
        const taken = record.takenAt.toDate()

        return (
          <View
            key={record.id}
            className="flex-row items-center gap-3 py-3 border-b border-neutral-200 last:border-b-0"
          >
            <View
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: dot }}
            />
            <View className="flex-1">
              <PlatformText
                fontSize={14}
                fontWeight={600}
                color="neutral-900"
                numberOfLines={1}
              >
                {record.medicationName}
              </PlatformText>
              <PlatformText fontSize={12} color="neutral-600">
                Previsto: {record.scheduledTime} •{' '}
                {isOnTime ? 'No horário' : `${record.minutesDiff}min de atraso`}
              </PlatformText>
            </View>
            <PlatformText fontSize={12} color="neutral-500">
              {taken.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
              })}
            </PlatformText>
          </View>
        )
      })}
    </View>
  )
}
