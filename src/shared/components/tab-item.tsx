import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Text, View } from 'react-native'

type TabTitle = 'Início' | 'Remédios' | 'Progresso' | 'Médico'

type TabItemProps = {
  focused: boolean
  title: TabTitle
}

const TAB_ICONS: Record<TabTitle, keyof typeof FontAwesome.glyphMap> = {
  Início: 'home',
  Remédios: 'medkit',
  Progresso: 'bar-chart',
  Médico: 'stethoscope',
}

export function TabItem({ focused, title }: TabItemProps) {
  const iconName = TAB_ICONS[title]
  const color = focused ? '#3B82F6' : '#9CA3AF'

  return (
    <View className="items-center justify-center py-2">
      <FontAwesome name={iconName} size={22} color={color} />
      <Text
        className={`text-xs mt-1 font-inter-medium ${focused ? 'text-primary' : 'text-gray-400'}`}
      >
        {title}
      </Text>
    </View>
  )
}
