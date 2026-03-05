import { TouchableOpacity, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { AccentColors } from '@/shared/constants/theme.constant'

type QuickAction = {
  icon: React.ReactNode
  label: string
  sublabel: string
  onPress: () => void
}

type QuickActionsSectionProps = {
  onHistoryPress: () => void
  onHelpPress: () => void
}

export function QuickActionsSection({
  onHistoryPress,
  onHelpPress,
}: QuickActionsSectionProps) {
  const actions: QuickAction[] = [
    {
      icon: <Icon iconName="calendar" size={28} color={AccentColors[500]} />,
      label: 'Histórico',
      sublabel: 'Ver remédios tomados',
      onPress: onHistoryPress,
    },
    {
      icon: <Icon iconName="phone" size={28} color={AccentColors[500]} />,
      label: 'Ajuda',
      sublabel: 'Como usar o app',
      onPress: onHelpPress,
    },
  ]

  return (
    <View className="flex-row gap-3">
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          className="flex-1 bg-base-white rounded-2xl p-4 items-center gap-2"
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View className="w-14 h-14 rounded-full bg-accent-500/10 items-center justify-center">
            {action.icon}
          </View>
          <PlatformText fontSize={15} fontWeight={700} color="neutral-900">
            {action.label}
          </PlatformText>
          <PlatformText
            fontSize={12}
            color="neutral-600"
            className="text-center"
          >
            {action.sublabel}
          </PlatformText>
        </TouchableOpacity>
      ))}
    </View>
  )
}
