import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { usePrescriptions } from '@/features/medications/hooks/use-prescriptions.hook'
import {
  AdherenceRecord,
  getAdherenceRecords,
} from '@/features/medications/services/adherence.service'
import {
  AccentColors,
  SuccessColors,
  WarningColors,
} from '@/shared/constants/theme.constant'

// ─── Date helpers ────────────────────────────────────────────────────────────

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function getLast7Days(): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d
  })
}

export function getLast4Weeks(): { label: string; from: string; to: string }[] {
  return Array.from({ length: 4 }, (_, i) => {
    const to = new Date()
    to.setDate(to.getDate() - i * 7)
    const from = new Date(to)
    from.setDate(from.getDate() - 6)
    return {
      label: `S${4 - i}`,
      from: isoDate(from),
      to: isoDate(to),
    }
  }).reverse()
}

export const DAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type AdherenceStats = {
  totalTaken: number
  totalExpected: number
  onTime: number
  late: number
  adherencePct: number
  onTimePct: number
  adherenceColor: string
}

export type ChartDataPoint = { label: string; value: number; key: string }
export type PieDataPoint = { id: string; label: string; value: number }

export type UseAdherenceResult = {
  loading: boolean
  records: AdherenceRecord[]
  stats: AdherenceStats
  dailyData: ChartDataPoint[]
  weeklyData: ChartDataPoint[]
  pieData: PieDataPoint[]
}

export function useAdherence(): UseAdherenceResult {
  const { user } = useAuth()
  const { prescriptions } = usePrescriptions()
  const [records, setRecords] = useState<AdherenceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const from = new Date()
    from.setDate(from.getDate() - 30)
    getAdherenceRecords(user.uid, isoDate(from), isoDate(new Date()))
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const totalTaken = records.length
  const onTime = records.filter((r) => Math.abs(r.minutesDiff) <= 30).length
  const late = totalTaken - onTime
  const totalExpected = prescriptions.reduce(
    (acc, p) => acc + Math.min(p.durationDays, 30) * p.times.length,
    0,
  )
  const adherencePct =
    totalExpected > 0 ? Math.round((totalTaken / totalExpected) * 100) : 0
  const onTimePct = totalTaken > 0 ? Math.round((onTime / totalTaken) * 100) : 0
  const adherenceColor =
    adherencePct >= 80
      ? SuccessColors[700]
      : adherencePct >= 50
        ? WarningColors[500]
        : AccentColors[500]

  const last7 = getLast7Days()
  const dailyData: ChartDataPoint[] = last7.map((day) => {
    const dayStr = isoDate(day)
    return {
      label: DAY_SHORT[day.getDay()] ?? '',
      value: records.filter((r) => r.date === dayStr).length,
      key: dayStr,
    }
  })

  const weeks = getLast4Weeks()
  const weeklyData: ChartDataPoint[] = weeks.map((w) => ({
    label: w.label,
    value: records.filter((r) => r.date >= w.from && r.date <= w.to).length,
    key: w.from,
  }))

  const pieData: PieDataPoint[] =
    totalTaken > 0
      ? [
          { id: 'on-time', label: 'No horário', value: onTime },
          { id: 'late', label: 'Atrasado', value: late },
        ]
      : [{ id: 'empty', label: 'Sem dados', value: 1 }]

  return {
    loading,
    records,
    stats: {
      totalTaken,
      totalExpected,
      onTime,
      late,
      adherencePct,
      onTimePct,
      adherenceColor,
    },
    dailyData,
    weeklyData,
    pieData,
  }
}
