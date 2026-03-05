import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { SuccessColors } from '@/shared/constants/theme.constant'

type GreetingCardProps = {
  patientName: string
}

function getTodayFormatted(): string {
  const today = new Date()
  return today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function getFirstName(fullName: string): string {
  return fullName.split(' ')[0] ?? fullName
}

export function GreetingCard({ patientName }: GreetingCardProps) {
  const firstName = getFirstName(patientName)
  const today = getTodayFormatted()

  return (
    <View className="bg-base-white rounded-2xl p-4 flex-row items-center gap-4 shadow-sm">
      {/* Ícone de coração — verde, grande para fácil identificação */}
      <View className="w-12 h-12 rounded-full bg-success-600/10 items-center justify-center">
        <Icon iconName="heart" size={26} color={SuccessColors[700]} />
      </View>

      <View className="flex-1">
        <PlatformText fontSize={18} fontWeight={700} color="neutral-900">
          Olá, {firstName}!
        </PlatformText>
        <PlatformText fontSize={14} color="neutral-600" className="mt-0.5">
          Como você está se sentindo hoje?
        </PlatformText>
        <PlatformText
          fontSize={12}
          color="neutral-500"
          className="mt-1 capitalize"
        >
          {today}
        </PlatformText>
      </View>
    </View>
  )
}
