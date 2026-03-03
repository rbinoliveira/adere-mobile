import { Text, View } from 'react-native'

import { cn } from '@/shared/utils/cn'

type SeparatorProps = {
  label?: string
  className?: string
}

export function Separator({ label, className }: SeparatorProps) {
  return (
    <View className={cn('flex-row items-center gap-3', className)}>
      <View className="h-[1px] bg-border flex-1" />
      <Text className="text-text-five text-xs leading-[1.33]">{label}</Text>
      <View className="h-[1px] bg-border flex-1" />
    </View>
  )
}
