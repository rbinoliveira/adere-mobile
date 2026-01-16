import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { ScrollViewPadding } from '@/application/design/design-tokens'
import { useAuth } from '@/application/hooks/auth'
import { useMedications } from '@/application/hooks/medications'
import { useNotifications } from '@/application/hooks/notifications'
import {
  DailyTipCard,
  GreetingCard,
  HomeHeader,
  NextMedicationCard,
  QuickActionsSection,
  TodayMedicationsSection,
} from '@/application/screens/home/components'
import { Medication } from '@/application/types/medication'
import { updateMedicationStatuses } from '@/application/utils/medication-status'

export function HomeScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const { scheduleNotifications } = useNotifications()
  const { medications: fetchedMedications, loading: _medicationsLoading } =
    useMedications()
  const [takenMedications, setTakenMedications] = useState<
    Record<string, Date>
  >({})

  const baseMedications = useMemo(
    () => fetchedMedications || [],
    [fetchedMedications],
  )

  const medications = useMemo(() => {
    const medsWithTaken = baseMedications.map((med) => ({
      ...med,
      takenAt: takenMedications[med.id],
    }))
    return updateMedicationStatuses(medsWithTaken)
  }, [baseMedications, takenMedications])

  const nextMedication = useMemo(() => {
    const now = new Date()
    const upcoming = medications
      .filter((m) => m.scheduledTime > now && !m.takenAt)
      .sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime())
    return upcoming[0]
  }, [medications])

  useEffect(() => {
    scheduleNotifications(medications)
  }, [medications, scheduleNotifications])

  function handleProfilePress() {
    router.push('/(authenticated)/settings')
  }

  function handleViewMoreTips() {
    router.push('/(authenticated)/tips')
  }

  function handleViewHistory() {
    router.push('/(authenticated)/history')
  }

  function handleViewHelp() {
    router.push('/(authenticated)/doctor')
  }

  const markMedicationAsTaken = useCallback((medication: Medication) => {
    const now = new Date()
    setTakenMedications((prev) => ({
      ...prev,
      [medication.id]: now,
    }))

    const toastType = medication.status === 'very_delayed' ? 'info' : 'success'
    const toastTitle =
      medication.status === 'very_delayed'
        ? 'Remédio tomado com atraso'
        : 'Registrado!'

    Toast.show({
      type: toastType,
      text1: toastTitle,
      text2: `${medication.name} marcado como tomado.`,
    })
  }, [])

  const handleMedicationAction = useCallback(
    (medication: Medication) => {
      if (medication.status === 'waiting') {
        Toast.show({
          type: 'info',
          text1: 'Aguarde o horário',
          text2: 'Ainda não é hora de tomar.',
        })
        return
      }

      if (medication.takenAt) {
        Toast.show({
          type: 'info',
          text1: 'Já registrado',
          text2: 'Este remédio já foi marcado.',
        })
        return
      }

      if (medication.status === 'very_delayed') {
        Alert.alert(
          'Remédio muito atrasado',
          `${medication.name} está muito atrasado.\n\nRecomendamos consultar seu médico antes de tomar.\n\nDeseja marcar como tomado mesmo assim?`,
          [
            {
              text: 'Consultar Médico',
              style: 'cancel',
            },
            {
              text: 'Tomar Agora',
              style: 'destructive',
              onPress: () => markMedicationAsTaken(medication),
            },
          ],
          { cancelable: true },
        )
        return
      }

      markMedicationAsTaken(medication)
    },
    [markMedicationAsTaken],
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ScrollViewPadding.bottom }}
      >
        <HomeHeader onProfilePress={handleProfilePress} />
        <GreetingCard userName={user?.name || ''} />
        <NextMedicationCard
          scheduledTime={nextMedication?.scheduledTime}
          medicationName={nextMedication?.name}
        />
        <TodayMedicationsSection
          medications={medications}
          onMedicationAction={handleMedicationAction}
        />
        <DailyTipCard onViewMorePress={handleViewMoreTips} />
        <QuickActionsSection
          onHistoryPress={handleViewHistory}
          onHelpPress={handleViewHelp}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
