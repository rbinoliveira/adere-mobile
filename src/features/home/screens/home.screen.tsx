import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { DailyTipCard } from '@/features/home/components/daily-tip-card'
import { GreetingCard } from '@/features/home/components/greeting-card'
import { MedicationStatusCard } from '@/features/home/components/medication-status-card'
import { NextMedicationCard } from '@/features/home/components/next-medication-card'
import { QuickActionsSection } from '@/features/home/components/quick-actions-section'
import { usePrescriptions } from '@/features/medications/hooks/use-prescriptions.hook'
import { markMedicationTaken } from '@/features/medications/services/adherence.service'
import { TodayMedication } from '@/features/medications/types/prescription'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Avatar } from '@/shared/components/avatar'
import { Icon } from '@/shared/components/icons/icon'
import { NeutralColors } from '@/shared/constants/theme.constant'

export function HomeScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { todayMedications, nextMedication, loading, refetchTaken } =
    usePrescriptions()
  const [markingId, setMarkingId] = useState<string | null>(null)

  const patientName = user?.displayName ?? 'Paciente'

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

  const remaining = todayMedications.filter((m) => m.status !== 'taken').length

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F5" />
      <View
        className="flex-1 bg-neutral-400"
        style={{ paddingTop: insets.top }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-3 bg-neutral-400">
          <View>
            <PlatformText fontSize={18} fontWeight={700} color="neutral-900">
              Meus Remédios
            </PlatformText>
            <PlatformText fontSize={13} color="neutral-600">
              {new Date().toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
              })}
            </PlatformText>
          </View>

          <TouchableOpacity onPress={() => router.push('/(private)/profile')}>
            <Avatar
              photo={user?.photoURL ?? undefined}
              name={user?.displayName ?? undefined}
              size="sm"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={homeScrollStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 3.1 — Card de saudação */}
          <GreetingCard patientName={patientName} />

          <View className="h-3" />

          {/* 3.2 — Próximo remédio (se houver) */}
          {nextMedication && !loading ? (
            <NextMedicationCard
              medicationName={nextMedication.prescription.medicationName}
              time={nextMedication.scheduledTime}
              minutesUntil={-nextMedication.minutesDiff}
            />
          ) : null}

          <View className="h-4" />

          {/* 3.3 — Remédios de Hoje */}
          <View className="flex-row items-center justify-between mb-3">
            <PlatformText fontSize={17} fontWeight={700} color="neutral-900">
              Remédios de Hoje
            </PlatformText>
            {!loading && (
              <View className="bg-accent-500/10 px-3 py-1 rounded-full">
                <PlatformText fontSize={12} color="accent-500" fontWeight={600}>
                  {remaining} restante{remaining !== 1 ? 's' : ''}
                </PlatformText>
              </View>
            )}
          </View>

          {loading ? (
            <View className="bg-base-white rounded-2xl p-6 items-center">
              <Icon iconName="clock" size={32} color={NeutralColors[400]} />
              <PlatformText fontSize={14} color="neutral-500" className="mt-2">
                Carregando seus remédios...
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

          <View className="h-4" />

          {/* 3.4 — Dica do Dia */}
          <DailyTipCard onSeeMore={() => Alert.alert('Dicas', 'Em breve!')} />

          <View className="h-4" />

          {/* 3.4 — Ações rápidas */}
          <QuickActionsSection
            onHistoryPress={() => router.push('/(private)/progress')}
            onHelpPress={() =>
              Alert.alert(
                'Ajuda',
                'Toque no botão do remédio para marcá-lo como tomado. Em caso de dúvida, contate seu dentista.',
              )
            }
          />
        </ScrollView>
      </View>
    </>
  )
}

const homeScrollStyles = StyleSheet.create({
  contentContainer: { padding: 16, paddingBottom: 40 },
})
