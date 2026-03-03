import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  getFormLabel,
  getMedicationType,
  getTypeHexColor,
  getTypeIcon,
  Medication,
} from '@/features/medications/types/medication'
import { ScrollViewPadding } from '@/shared/constants/design-tokens'

// Mock data - will be replaced with API data later
function getMockAllMedications(): Medication[] {
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
      status: 'on_time',
    },
    {
      id: '2',
      name: 'Metformina',
      dose: '500mg',
      form: 'comprimido',
      scheduledTime: new Date(today.getTime() + 12 * 60 * 60 * 1000),
      instructions: 'Engolir com água, após o almoço',
      status: 'on_time',
    },
    {
      id: '3',
      name: 'Xarope Expectorante',
      dose: '5ml',
      form: 'liquido',
      scheduledTime: new Date(today.getTime() + 22 * 60 * 60 * 1000),
      instructions: 'Medir 5ml na seringa, tomar puro',
      status: 'on_time',
    },
    {
      id: '4',
      name: 'Pomada Cicatrizante',
      dose: 'Uso tópico',
      form: 'pomada',
      scheduledTime: new Date(today.getTime() + 20 * 60 * 60 * 1000),
      instructions: 'Aplicar pequena quantidade no local, massagear suavemente',
      status: 'on_time',
    },
    {
      id: '5',
      name: 'Amoxicilina',
      dose: '500mg',
      form: 'capsula',
      scheduledTime: new Date(today.getTime() + 8 * 60 * 60 * 1000),
      instructions: 'Tomar a cada 8 horas por 7 dias',
      status: 'on_time',
    },
    {
      id: '6',
      name: 'Ibuprofeno',
      dose: '400mg',
      form: 'comprimido',
      scheduledTime: new Date(today.getTime() + 14 * 60 * 60 * 1000),
      instructions: 'Tomar após as refeições, enquanto sentir dor',
      status: 'on_time',
    },
  ]
}

type MedicationListItemProps = {
  medication: Medication
}

function MedicationListItem({ medication }: MedicationListItemProps) {
  const type = getMedicationType(medication.form)
  const typeIcon = getTypeIcon(type)
  const formLabel = getFormLabel(medication.form)

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center gap-3">
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: getTypeHexColor(type) }}
        >
          <FontAwesome name={typeIcon} size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-text-one font-inter-bold text-base">
            {medication.name}
          </Text>
          <Text className="text-text-five font-inter text-sm">
            {medication.dose} - {formLabel}
          </Text>
          <Text
            className="text-text-three font-inter text-xs mt-1"
            numberOfLines={2}
          >
            {medication.instructions}
          </Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
      </View>
    </View>
  )
}

export function MedicationsScreen() {
  const medications = useMemo(() => getMockAllMedications(), [])

  const groupedMedications = useMemo(() => {
    const groups: Record<string, Medication[]> = {
      pill: [],
      liquid: [],
      topical: [],
      other: [],
    }

    medications.forEach((med) => {
      const type = getMedicationType(med.form)
      groups[type].push(med)
    })

    return groups
  }, [medications])

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-5 py-4">
        <Text className="text-text-one font-inter-bold text-xl">
          Meus Remédios
        </Text>
        <Text className="text-text-five font-inter text-sm">
          {medications.length} medicações prescritas
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ScrollViewPadding.bottom }}
      >
        {/* Pills Section */}
        {groupedMedications.pill.length > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center">
                <FontAwesome name="circle" size={12} color="white" />
              </View>
              <Text className="text-text-one font-inter-semibold text-base">
                Comprimidos e Cápsulas
              </Text>
            </View>
            {groupedMedications.pill.map((med) => (
              <MedicationListItem key={med.id} medication={med} />
            ))}
          </View>
        )}

        {/* Liquids Section */}
        {groupedMedications.liquid.length > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">
                <FontAwesome name="tint" size={12} color="white" />
              </View>
              <Text className="text-text-one font-inter-semibold text-base">
                Líquidos e Xaropes
              </Text>
            </View>
            {groupedMedications.liquid.map((med) => (
              <MedicationListItem key={med.id} medication={med} />
            ))}
          </View>
        )}

        {/* Topicals Section */}
        {groupedMedications.topical.length > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                <FontAwesome name="hand-paper-o" size={12} color="white" />
              </View>
              <Text className="text-text-one font-inter-semibold text-base">
                Pomadas e Cremes
              </Text>
            </View>
            {groupedMedications.topical.map((med) => (
              <MedicationListItem key={med.id} medication={med} />
            ))}
          </View>
        )}

        {/* Empty State */}
        {medications.length === 0 && (
          <View className="bg-white rounded-2xl p-6 items-center justify-center">
            <FontAwesome name="medkit" size={48} color="#9CA3AF" />
            <Text className="text-text-five font-inter text-sm text-center mt-4">
              Você ainda não possui medicações prescritas.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
