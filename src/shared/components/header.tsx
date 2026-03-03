import { LinearGradient } from 'expo-linear-gradient'
import { View } from 'react-native'

import { Text } from '@/shared/components/text'

type HeaderProps = {
  title: string
  description: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <LinearGradient
      colors={['#3B82F6', '#1E40AF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="w-full h-[164px] relative items-center justify-center gap-1"
    >
      <Text className="font-inter-bold text-2xl text-white">{title}</Text>
      <Text className="text-text-four text-sm font-inter-medium">
        {description}
      </Text>
      <View className="absolute left-[-64px] bottom-[-64px] h-32 w-32 rounded-full opacity-10 bg-white" />
      <View className="absolute right-[-80px] top-[-80px] h-40 w-40 rounded-full opacity-10 bg-white" />
    </LinearGradient>
  )
}
