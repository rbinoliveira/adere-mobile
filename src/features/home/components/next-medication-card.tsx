import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'

type NextMedicationCardProps = {
  medicationName: string
  time: string // "HH:mm"
  minutesUntil: number
}

function formatTimePeriod(time: string): string {
  const [hourStr] = time.split(':')
  const hour = parseInt(hourStr ?? '0', 10)
  if (hour < 12) return 'Manhã'
  if (hour < 18) return 'Tarde'
  return 'Noite'
}

function formatTimeRemaining(minutes: number): string {
  if (minutes <= 0) return 'Agora'
  if (minutes < 60) return `em ${minutes} minutos`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `em ${hours}h`
  return `em ${hours}h ${mins}min`
}

export function NextMedicationCard({
  medicationName,
  time,
  minutesUntil,
}: NextMedicationCardProps) {
  const period = formatTimePeriod(time)
  const timeRemaining = formatTimeRemaining(minutesUntil)

  return (
    <View className="rounded-2xl p-4 overflow-hidden bg-info-950">
      <View className="flex-row items-center justify-between">
        {/* Lado esquerdo: ícone + info */}
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <Icon iconName="clock" size={22} color="#ffffff" />
          </View>
          <View className="flex-1">
            <PlatformText
              fontSize={13}
              color="base-white"
              className="opacity-80"
            >
              Próximo Remédio
            </PlatformText>
            <PlatformText
              fontSize={16}
              fontWeight={700}
              color="base-white"
              className="mt-0.5"
              numberOfLines={1}
            >
              {medicationName}
            </PlatformText>
            <PlatformText
              fontSize={13}
              color="base-white"
              className="opacity-80 mt-0.5"
            >
              {timeRemaining}
            </PlatformText>
          </View>
        </View>

        {/* Lado direito: hora + período */}
        <View className="items-end ml-2">
          <PlatformText fontSize={28} fontWeight={700} color="base-white">
            {time}
          </PlatformText>
          <PlatformText fontSize={13} color="base-white" className="opacity-80">
            {period}
          </PlatformText>
        </View>
      </View>
    </View>
  )
}
