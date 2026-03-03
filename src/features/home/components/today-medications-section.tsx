import React from 'react'
import { Text, View } from 'react-native'

import { Medication } from '@/features/medications/types/medication'
import { Spacing } from '@/shared/constants/design-tokens'

import { MedicationCard } from './medication-card'

type TodayMedicationsSectionProps = {
  medications: Medication[]
  onMedicationAction?: (medication: Medication) => void
}

export function TodayMedicationsSection({
  medications,
  onMedicationAction,
}: TodayMedicationsSectionProps) {
  const remainingCount = medications.filter(
    (m) => !m.takenAt && m.status !== 'waiting',
  ).length

  return (
    <View className="w-full" style={{ marginTop: Spacing.lg }}>
      {/* Section Header */}
      <View
        className="flex-row items-center justify-between"
        style={{ marginBottom: Spacing.md }}
      >
        <Text className="text-text-one font-inter-bold text-xl">
          Remédios de Hoje
        </Text>
        <Text className="text-primary font-inter-semibold text-base">
          {remainingCount} restantes
        </Text>
      </View>

      {/* Medication Cards */}
      {medications.map((medication) => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          onAction={onMedicationAction}
        />
      ))}

      {medications.length === 0 && (
        <View className="bg-white rounded-2xl p-6 items-center justify-center">
          <Text className="text-text-five font-inter text-sm text-center">
            Nenhum remédio para hoje.
          </Text>
        </View>
      )}
    </View>
  )
}
