import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  formatTime,
  getFormLabel,
  getMedicationType,
  getTypeColor,
  getTypeIcon,
  Medication,
} from '@/features/medications/types/medication'
import { ScrollViewPadding } from '@/shared/constants/design-tokens'

type HistoryScreenProps = {
  medications?: Medication[]
}

function formatDate(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const dateStr = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )
  const yesterdayOnly = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate(),
  )

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Hoje'
  }
  if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return 'Ontem'
  }
  return dateStr
}

function HistoryMedicationCard({ medication }: { medication: Medication }) {
  const type = getMedicationType(medication.form)
  const typeColor = getTypeColor(type)
  const typeIcon = getTypeIcon(type)
  const formLabel = getFormLabel(medication.form)
  const timeFormatted = formatTime(
    medication.takenAt || medication.scheduledTime,
  )
  const dateFormatted = medication.takenAt
    ? formatDate(medication.takenAt)
    : formatDate(medication.scheduledTime)

  return (
    <View className="w-full bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View
            className={`w-10 h-10 rounded-full ${typeColor} items-center justify-center`}
          >
            <FontAwesome name={typeIcon} size={18} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-text-one font-inter-bold text-base">
              {medication.name}
            </Text>
            <Text className="text-text-five font-inter text-sm">
              {medication.dose} - {formLabel}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-text-three font-inter-medium text-sm">
            {dateFormatted}
          </Text>
          <Text className="text-text-one font-inter-bold text-base">
            {timeFormatted}
          </Text>
        </View>
      </View>

      <View className="mt-3 pt-3 border-t border-gray-100">
        <View className="flex-row items-center gap-2">
          <FontAwesome name="check-circle" size={16} color="#10B981" />
          <Text className="text-green-600 font-inter-medium text-sm">
            Tomado
          </Text>
        </View>
      </View>
    </View>
  )
}

export function HistoryScreen({
  medications: propsMedications,
}: HistoryScreenProps) {
  const router = useRouter()

  const mockMedications: Medication[] = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return [
      {
        id: '1',
        name: 'Losartana',
        dose: '50mg',
        form: 'capsula',
        scheduledTime: new Date(today.getTime() + 8 * 60 * 60 * 1000),
        instructions: 'Engolir com água, antes do café da manhã',
        status: 'taken',
        takenAt: new Date(today.getTime() + 8 * 60 * 60 * 1000 + 5 * 60 * 1000),
      },
      {
        id: '2',
        name: 'Metformina',
        dose: '500mg',
        form: 'comprimido',
        scheduledTime: new Date(
          today.getTime() - 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
        ),
        instructions: 'Engolir com água, após o almoço',
        status: 'taken',
        takenAt: new Date(
          today.getTime() -
            24 * 60 * 60 * 1000 +
            12 * 60 * 60 * 1000 +
            10 * 60 * 1000,
        ),
      },
      {
        id: '3',
        name: 'Xarope Expectorante',
        dose: '5ml',
        form: 'liquido',
        scheduledTime: new Date(
          today.getTime() - 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000,
        ),
        instructions: 'Medir 5ml na seringa, tomar puro',
        status: 'taken',
        takenAt: new Date(
          today.getTime() - 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000,
        ),
      },
    ]
  }, [])

  const medications = propsMedications || mockMedications

  const groupedMedications = useMemo(() => {
    const grouped: Record<string, Medication[]> = {}
    medications.forEach((med) => {
      if (!med.takenAt) return
      const dateKey = formatDate(med.takenAt)
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(med)
    })

    return Object.entries(grouped).sort((a, b) => {
      const dateA =
        medications.find((m) => formatDate(m.takenAt!) === a[0])?.takenAt ||
        new Date(0)
      const dateB =
        medications.find((m) => formatDate(m.takenAt!) === b[0])?.takenAt ||
        new Date(0)
      return dateB.getTime() - dateA.getTime()
    })
  }, [medications])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <FontAwesome name="arrow-left" size={20} color="#1F2937" />
        </Pressable>
        <Text className="text-text-one font-inter-bold text-lg">Histórico</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: ScrollViewPadding.top,
          paddingBottom: ScrollViewPadding.bottom,
        }}
      >
        {groupedMedications.length === 0 ? (
          <View className="bg-white rounded-2xl p-6 items-center justify-center mt-6">
            <FontAwesome name="file-text-o" size={48} color="#9CA3AF" />
            <Text className="text-text-five font-inter text-sm text-center mt-4">
              Nenhum remédio registrado ainda.
            </Text>
          </View>
        ) : (
          groupedMedications.map(([date, meds]) => (
            <View key={date} className="mb-6">
              <Text className="text-text-one font-inter-bold text-base mb-3">
                {date}
              </Text>
              {meds.map((medication) => (
                <HistoryMedicationCard
                  key={medication.id}
                  medication={medication}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
