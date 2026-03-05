import { collection, onSnapshot, query, where } from 'firebase/firestore'

import {
  MedicationStatus,
  Prescription,
  TodayMedication,
} from '@/features/medications/types/prescription'
import { db } from '@/shared/libs/firebase'

/**
 * Subscribes to active prescriptions for a patient in real-time.
 * Returns an unsubscribe function.
 */
export function subscribeToPrescriptions(
  patientId: string,
  onData: (prescriptions: Prescription[]) => void,
  onError?: (error: Error) => void,
): () => void {
  const q = query(
    collection(db, 'prescriptions'),
    where('patientId', '==', patientId),
    where('isActive', '==', true),
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const prescriptions: Prescription[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Prescription, 'id'>),
      }))
      onData(prescriptions)
    },
    (error) => onError?.(error),
  )
}

/**
 * Calculates the status and minute diff for a medication at a given time today.
 */
export function getMedicationStatus(scheduledTime: string): {
  status: MedicationStatus
  minutesDiff: number
} {
  const now = new Date()
  const [hourStr, minStr] = scheduledTime.split(':')
  const scheduled = new Date()
  scheduled.setHours(
    parseInt(hourStr ?? '0', 10),
    parseInt(minStr ?? '0', 10),
    0,
    0,
  )

  const minutesDiff = Math.floor((now.getTime() - scheduled.getTime()) / 60000)

  let status: MedicationStatus
  if (minutesDiff < -30) {
    status = 'wait'
  } else if (minutesDiff <= 30) {
    status = 'on-time'
  } else if (minutesDiff <= 120) {
    status = 'late'
  } else {
    status = 'very-late'
  }

  return { status, minutesDiff }
}

/**
 * Builds the list of today's medications from active prescriptions,
 * filtering only times that are scheduled for today (within active date range).
 */
export function buildTodayMedications(
  prescriptions: Prescription[],
): TodayMedication[] {
  const today = new Date()
  const result: TodayMedication[] = []

  for (const prescription of prescriptions) {
    const start = new Date(prescription.startDate)
    const end = new Date(start)
    end.setDate(end.getDate() + prescription.durationDays)

    // Compare date-only to avoid time-of-day excluding the last day
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )
    const startDate = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    )
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())

    if (todayDate < startDate || todayDate > endDate) continue

    for (const time of prescription.times) {
      const { status, minutesDiff } = getMedicationStatus(time)
      result.push({ prescription, scheduledTime: time, minutesDiff, status })
    }
  }

  // Sort by scheduled time
  return result.sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
}

/**
 * Returns the next upcoming medication (smallest positive minutesDiff or closest wait)
 */
export function getNextMedication(
  todayMeds: TodayMedication[],
): TodayMedication | null {
  const upcoming = todayMeds
    .filter((m) => m.status === 'wait' || m.status === 'on-time')
    .sort((a, b) => a.minutesDiff - b.minutesDiff)

  return upcoming[0] ?? null
}
