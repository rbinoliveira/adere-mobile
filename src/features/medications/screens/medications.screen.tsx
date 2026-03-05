import { useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { MedicationStatusCard } from '@/features/home/components/medication-status-card'
import { MedicationCalendar } from '@/features/medications/components/medication-calendar'
import { usePrescriptions } from '@/features/medications/hooks/use-prescriptions.hook'
import { markMedicationTaken } from '@/features/medications/services/adherence.service'
import { TodayMedication } from '@/features/medications/types/prescription'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { NeutralColors } from '@/shared/constants/theme.constant'

export function MedicationsScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()
  const { prescriptions, todayMedications, loading, refetchTaken } =
    usePrescriptions()
  const [markingId, setMarkingId] = useState<string | null>(null)

  async function handleMarkTaken(medication: TodayMedication) {
    if (!user) return
    const itemId = `${medication.prescription.id}-${medication.scheduledTime}`
    try {
      setMarkingId(itemId)
      await markMedicationTaken(user.uid, medication)
      await refetchTaken()
    } catch {
      Alert.alert('Erro', 'Não foi possível registrar. Tente novamente.')
    } finally {
      setMarkingId(null)
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F5" />
      <View
        className="flex-1 bg-neutral-400"
        style={{ paddingTop: insets.top }}
      >
        {/* Header */}
        <View className="px-5 py-4 bg-neutral-400">
          <PlatformText fontSize={22} fontWeight={700} color="neutral-900">
            Remédios
          </PlatformText>
          <PlatformText fontSize={13} color="neutral-600" className="mt-0.5">
            {prescriptions.length} prescrição
            {prescriptions.length !== 1 ? 'ões' : ''} ativa
            {prescriptions.length !== 1 ? 's' : ''}
          </PlatformText>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={medicationsScrollStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Remédios de Hoje */}
          <PlatformText
            fontSize={16}
            fontWeight={700}
            color="neutral-900"
            className="mb-3"
          >
            Hoje
          </PlatformText>

          {loading ? (
            <View className="bg-base-white rounded-2xl p-6 items-center">
              <Icon iconName="clock" size={32} color={NeutralColors[400]} />
              <PlatformText fontSize={14} color="neutral-500" className="mt-2">
                Carregando...
              </PlatformText>
            </View>
          ) : todayMedications.length === 0 ? (
            <View className="bg-base-white rounded-2xl p-6 items-center">
              <Icon iconName="pill" size={36} color={NeutralColors[400]} />
              <PlatformText
                fontSize={15}
                color="neutral-500"
                className="mt-3 text-center"
              >
                Nenhum remédio para hoje
              </PlatformText>
            </View>
          ) : (
            todayMedications.map((med) => (
              <MedicationStatusCard
                key={`${med.prescription.id}-${med.scheduledTime}`}
                medication={med}
                onMarkTaken={handleMarkTaken}
                markingId={markingId ?? undefined}
              />
            ))
          )}

          {/* 5.2 — Calendário */}
          {!loading && prescriptions.length > 0 && (
            <View className="mt-6">
              <MedicationCalendar prescriptions={prescriptions} />
            </View>
          )}

          {/* Lista completa de prescrições ativas */}
          {prescriptions.length > 0 && (
            <>
              <PlatformText
                fontSize={16}
                fontWeight={700}
                color="neutral-900"
                className="mt-6 mb-3"
              >
                Todas as Prescrições
              </PlatformText>

              {prescriptions.map((prescription) => (
                <View
                  key={prescription.id}
                  className="bg-base-white rounded-2xl p-4 mb-3"
                >
                  <View className="flex-row items-center gap-3 mb-2">
                    <View className="w-10 h-10 rounded-full bg-info-950/10 items-center justify-center">
                      <Icon iconName="pill" size={22} color="#0059DA" />
                    </View>
                    <View className="flex-1">
                      <PlatformText
                        fontSize={16}
                        fontWeight={700}
                        color="neutral-900"
                      >
                        {prescription.medicationName}
                      </PlatformText>
                      <PlatformText fontSize={13} color="neutral-600">
                        {prescription.dosage}
                      </PlatformText>
                    </View>
                  </View>

                  <View className="gap-1 pl-1">
                    <PlatformText fontSize={13} color="neutral-700">
                      <PlatformText
                        fontSize={13}
                        fontWeight={600}
                        color="neutral-900"
                      >
                        Horários:{' '}
                      </PlatformText>
                      {prescription.times.join(' • ')}
                    </PlatformText>
                    <PlatformText fontSize={13} color="neutral-700">
                      <PlatformText
                        fontSize={13}
                        fontWeight={600}
                        color="neutral-900"
                      >
                        Duração:{' '}
                      </PlatformText>
                      {prescription.durationDays} dias
                    </PlatformText>
                    {prescription.instructions ? (
                      <PlatformText fontSize={13} color="neutral-700">
                        <PlatformText
                          fontSize={13}
                          fontWeight={600}
                          color="neutral-900"
                        >
                          Como tomar:{' '}
                        </PlatformText>
                        {prescription.instructions}
                      </PlatformText>
                    ) : null}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </>
  )
}

const medicationsScrollStyles = StyleSheet.create({
  contentContainer: { padding: 16, paddingBottom: 40 },
})
