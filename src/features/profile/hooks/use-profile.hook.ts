import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { usePrescriptions } from '@/features/medications/hooks/use-prescriptions.hook'
import {
  AdherenceRecord,
  getAdherenceRecords,
} from '@/features/medications/services/adherence.service'
import type { Prescription } from '@/features/medications/types/prescription'

export type ProfileAdherenceStats = {
  totalExpected: number
  totalTaken: number
  onTimeCount: number
  lateCount: number
  adherencePercent: number
  onTimePercent: number
}

function getLast30Days(): { from: string; to: string } {
  const to = new Date()
  const from = new Date()
  from.setDate(from.getDate() - 30)
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  }
}

function computeStats(
  records: AdherenceRecord[],
  totalExpected: number,
): ProfileAdherenceStats {
  const totalTaken = records.length
  const onTimeCount = records.filter(
    (r) => Math.abs(r.minutesDiff) <= 30,
  ).length
  const lateCount = totalTaken - onTimeCount
  const adherencePercent =
    totalExpected > 0 ? Math.round((totalTaken / totalExpected) * 100) : 0
  const onTimePercent =
    totalTaken > 0 ? Math.round((onTimeCount / totalTaken) * 100) : 0
  return {
    totalExpected,
    totalTaken,
    onTimeCount,
    lateCount,
    adherencePercent,
    onTimePercent,
  }
}

export type UseProfileResult = {
  loadingStats: boolean
  records: AdherenceRecord[]
  stats: ProfileAdherenceStats
  prescriptions: Prescription[]
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth()
  const { prescriptions } = usePrescriptions()
  const [records, setRecords] = useState<AdherenceRecord[]>([])
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!user) return
    const { from, to } = getLast30Days()
    getAdherenceRecords(user.uid, from, to)
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoadingStats(false))
  }, [user])

  const totalExpected = prescriptions.reduce((acc, p) => {
    return acc + Math.min(p.durationDays, 30) * p.times.length
  }, 0)

  const stats = computeStats(records, totalExpected)

  return { loadingStats, records, stats, prescriptions }
}
