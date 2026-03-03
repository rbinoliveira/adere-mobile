import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ScrollViewPadding } from '@/shared/constants/design-tokens'

type StatCardProps = {
  icon: keyof typeof FontAwesome.glyphMap
  iconColor: string
  bgColor: string
  title: string
  value: string
  subtitle?: string
}

function StatCard({
  icon,
  iconColor,
  bgColor,
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-1">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: bgColor }}
      >
        <FontAwesome name={icon} size={18} color={iconColor} />
      </View>
      <Text className="text-text-five font-inter text-xs">{title}</Text>
      <Text className="text-text-one font-inter-bold text-2xl">{value}</Text>
      {subtitle && (
        <Text className="text-text-five font-inter text-xs mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  )
}

type ProgressBarProps = {
  label: string
  value: number
  total: number
  color: string
}

function ProgressBar({ label, value, total, color }: ProgressBarProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-1">
        <Text className="text-text-three font-inter text-sm">{label}</Text>
        <Text className="text-text-one font-inter-semibold text-sm">
          {value}/{total}
        </Text>
      </View>
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </View>
    </View>
  )
}

type DayProgressProps = {
  day: string
  taken: number
  total: number
}

function DayProgress({ day, taken, total }: DayProgressProps) {
  const percentage = total > 0 ? (taken / total) * 100 : 0
  const isComplete = percentage === 100

  return (
    <View className="items-center">
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mb-1 ${
          isComplete ? 'bg-green-500' : 'bg-gray-200'
        }`}
      >
        {isComplete ? (
          <FontAwesome name="check" size={16} color="white" />
        ) : (
          <Text className="text-gray-600 font-inter-bold text-xs">
            {Math.round(percentage)}%
          </Text>
        )}
      </View>
      <Text className="text-text-five font-inter text-xs">{day}</Text>
    </View>
  )
}

// Mock data
function getMockStats() {
  return {
    totalMedications: 6,
    takenToday: 4,
    totalToday: 6,
    streak: 7,
    weeklyProgress: [
      { day: 'Seg', taken: 6, total: 6 },
      { day: 'Ter', taken: 6, total: 6 },
      { day: 'Qua', taken: 5, total: 6 },
      { day: 'Qui', taken: 6, total: 6 },
      { day: 'Sex', taken: 6, total: 6 },
      { day: 'Sáb', taken: 4, total: 6 },
      { day: 'Dom', taken: 4, total: 6 },
    ],
    monthlyStats: {
      taken: 156,
      total: 180,
      missed: 24,
    },
  }
}

export function ProgressScreen() {
  const stats = useMemo(() => getMockStats(), [])
  const adherenceRate = Math.round(
    (stats.monthlyStats.taken / stats.monthlyStats.total) * 100,
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-5 py-4">
        <Text className="text-text-one font-inter-bold text-xl">
          Meu Progresso
        </Text>
        <Text className="text-text-five font-inter text-sm">
          Acompanhe seu tratamento
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ScrollViewPadding.bottom }}
      >
        {/* Stats Cards */}
        <View className="flex-row gap-3 mb-6">
          <StatCard
            icon="check-circle"
            iconColor="#22C55E"
            bgColor="#DCFCE7"
            title="Tomados Hoje"
            value={`${stats.takenToday}/${stats.totalToday}`}
            subtitle="medicações"
          />
          <StatCard
            icon="fire"
            iconColor="#F59E0B"
            bgColor="#FEF3C7"
            title="Sequência"
            value={`${stats.streak}`}
            subtitle="dias seguidos"
          />
        </View>

        {/* Adherence Rate */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <Text className="text-text-one font-inter-bold text-base mb-4">
            Taxa de Adesão
          </Text>
          <View className="items-center mb-4">
            <View className="w-24 h-24 rounded-full border-8 border-green-500 items-center justify-center">
              <Text className="text-text-one font-inter-bold text-2xl">
                {adherenceRate}%
              </Text>
            </View>
          </View>
          <Text className="text-text-five font-inter text-center text-sm">
            Você está indo muito bem! Continue assim.
          </Text>
        </View>

        {/* Weekly Progress */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <Text className="text-text-one font-inter-bold text-base mb-4">
            Esta Semana
          </Text>
          <View className="flex-row justify-between">
            {stats.weeklyProgress.map((day) => (
              <DayProgress
                key={day.day}
                day={day.day}
                taken={day.taken}
                total={day.total}
              />
            ))}
          </View>
        </View>

        {/* Monthly Stats */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <Text className="text-text-one font-inter-bold text-base mb-4">
            Este Mês
          </Text>
          <ProgressBar
            label="Medicações tomadas"
            value={stats.monthlyStats.taken}
            total={stats.monthlyStats.total}
            color="#22C55E"
          />
          <ProgressBar
            label="Medicações perdidas"
            value={stats.monthlyStats.missed}
            total={stats.monthlyStats.total}
            color="#EF4444"
          />
        </View>

        {/* Tips */}
        <View className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <View className="flex-row items-center gap-2 mb-2">
            <FontAwesome name="lightbulb-o" size={16} color="#3B82F6" />
            <Text className="text-blue-700 font-inter-bold text-sm">Dica</Text>
          </View>
          <Text className="text-blue-700 font-inter text-sm">
            Manter uma rotina fixa de horários ajuda a não esquecer seus
            remédios. Use alarmes para lembrar!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
