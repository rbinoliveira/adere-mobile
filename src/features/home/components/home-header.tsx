import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

function getFormattedDate(): string {
  const now = new Date()
  const day = now.getDate()
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  const month = months[now.getMonth()]
  return `Hoje, ${day} de ${month}`
}

type HomeHeaderProps = {
  onProfilePress?: () => void
}

export function HomeHeader({ onProfilePress }: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between w-full py-3">
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
          <FontAwesome name="medkit" size={18} color="white" />
        </View>
        <View>
          <Text className="text-text-one font-inter-bold text-lg">
            Meus Remédios
          </Text>
          <Text className="text-text-five font-inter text-sm">
            {getFormattedDate()}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={onProfilePress}
        className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center"
      >
        <FontAwesome name="user" size={18} color="#6B7280" />
      </Pressable>
    </View>
  )
}
