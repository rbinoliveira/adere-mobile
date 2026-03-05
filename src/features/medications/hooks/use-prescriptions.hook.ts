import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { getAdherenceRecords } from '@/features/medications/services/adherence.service'
import {
  buildTodayMedications,
  getNextMedication,
  subscribeToPrescriptions,
} from '@/features/medications/services/prescriptions.service'
import {
  Prescription,
  TodayMedication,
} from '@/features/medications/types/prescription'

type UsePrescriptionsResult = {
  prescriptions: Prescription[]
  todayMedications: TodayMedication[]
  nextMedication: TodayMedication | null
  loading: boolean
  error: Error | null
  refetchTaken: () => Promise<void>
}

export function usePrescriptions(): UsePrescriptionsResult {
  const { user } = useAuth()
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [takenKeys, setTakenKeys] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      queueMicrotask(() => setLoading(false))
      return
    }

    const unsubscribe = subscribeToPrescriptions(
      user.uid,
      (data) => {
        setPrescriptions(data)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [user])

  // Fetch today's adherence records to mark medications as 'taken'
  const fetchTakenToday = useCallback(async () => {
    if (!user) return
    const today = new Date().toISOString().slice(0, 10)
    const records = await getAdherenceRecords(user.uid, today, today).catch(
      () => [],
    )
    const keys = new Set(
      records.map((r) => `${r.prescriptionId}-${r.scheduledTime}`),
    )
    setTakenKeys(keys)
  }, [user])

  useEffect(() => {
    queueMicrotask(() => {
      fetchTakenToday().catch(() => undefined)
    })
  }, [fetchTakenToday])

  // Apply 'taken' status on top of time-based status
  const todayMedications: TodayMedication[] = buildTodayMedications(
    prescriptions,
  ).map((med) => {
    const key = `${med.prescription.id}-${med.scheduledTime}`
    if (takenKeys.has(key)) {
      return { ...med, status: 'taken' }
    }
    return med
  })

  const nextMedication = getNextMedication(todayMedications)

  return {
    prescriptions,
    todayMedications,
    nextMedication,
    loading,
    error,
    refetchTaken: fetchTakenToday,
  }
}
