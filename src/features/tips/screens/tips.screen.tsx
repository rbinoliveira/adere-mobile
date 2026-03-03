import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ScrollViewPadding } from '@/shared/constants/design-tokens'

type Tip = {
  id: string
  title: string
  content: string
  icon: keyof typeof FontAwesome.glyphMap
  color: string
}

const MEDICATION_TIPS: Tip[] = [
  {
    id: '1',
    title: 'Esqueceu de tomar?',
    content:
      'Se esquecer de tomar um remédio, tome assim que lembrar. Mas se já estiver próximo do próximo horário, pule a dose esquecida e continue normalmente. Nunca tome dose dobrada.',
    icon: 'clock-o',
    color: '#3B82F6',
  },
  {
    id: '2',
    title: 'Horário fixo',
    content:
      'Tome seus remédios sempre no mesmo horário para criar um hábito e não esquecer. Use alarmes no celular para lembrar.',
    icon: 'bell',
    color: '#10B981',
  },
  {
    id: '3',
    title: 'Armazenamento',
    content:
      'Guarde seus medicamentos em local fresco e seco, longe da luz solar direta e do alcance de crianças. Verifique sempre a validade.',
    icon: 'home',
    color: '#F59E0B',
  },
  {
    id: '4',
    title: 'Não pare sem orientação',
    content:
      'Nunca pare de tomar um medicamento sem orientação médica, mesmo se estiver se sentindo melhor. O tratamento completo é importante.',
    icon: 'exclamation-triangle',
    color: '#EF4444',
  },
  {
    id: '5',
    title: 'Hidratação',
    content:
      'Beba bastante água ao tomar medicamentos para ajudar na absorção. Evite tomar remédios com leite ou sucos, a menos que indicado.',
    icon: 'tint',
    color: '#06B6D4',
  },
  {
    id: '6',
    title: 'Interações',
    content:
      'Informe seu médico sobre todos os medicamentos que você toma, incluindo vitaminas e suplementos. Alguns remédios podem interagir entre si.',
    icon: 'medkit',
    color: '#8B5CF6',
  },
  {
    id: '7',
    title: 'Efeitos colaterais',
    content:
      'Se sentir algum efeito colateral, não pare de tomar o medicamento por conta própria. Entre em contato com seu médico para orientação.',
    icon: 'info-circle',
    color: '#EC4899',
  },
  {
    id: '8',
    title: 'Alimentação',
    content:
      'Alguns medicamentos devem ser tomados em jejum, outros após as refeições. Siga sempre as orientações do seu médico ou farmacêutico.',
    icon: 'cutlery',
    color: '#F97316',
  },
]

function TipCard({ tip }: { tip: Tip }) {
  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-start gap-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: tip.color }}
        >
          <FontAwesome name={tip.icon} size={18} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-text-one font-inter-bold text-base mb-1">
            {tip.title}
          </Text>
          <Text className="text-text-three font-inter text-sm leading-5">
            {tip.content}
          </Text>
        </View>
      </View>
    </View>
  )
}

export function TipsScreen() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-5 py-4 flex-row items-center gap-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <FontAwesome name="arrow-left" size={20} color="#1F2937" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-text-one font-inter-bold text-xl">
            Dicas de Saúde
          </Text>
          <Text className="text-text-five font-inter text-sm">
            Aprenda a cuidar melhor da sua medicação
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ScrollViewPadding.bottom }}
      >
        {MEDICATION_TIPS.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
