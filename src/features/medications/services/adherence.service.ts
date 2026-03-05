import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore'

import { TodayMedication } from '@/features/medications/types/prescription'
import { db } from '@/shared/libs/firebase'

export type AdherenceRecord = {
  id: string
  patientId: string
  prescriptionId: string
  medicationName: string
  scheduledTime: string
  takenAt: Timestamp
  date: string // "YYYY-MM-DD"
  minutesDiff: number
}

/**
 * Marks a medication as taken. Idempotent — overwrites if already marked today.
 */
export async function markMedicationTaken(
  patientId: string,
  medication: TodayMedication,
): Promise<void> {
  const today = new Date().toISOString().slice(0, 10)
  const adherenceId = `${patientId}_${medication.prescription.id}_${medication.scheduledTime}_${today}`

  await setDoc(doc(db, 'adherence', adherenceId), {
    patientId,
    prescriptionId: medication.prescription.id,
    medicationName: medication.prescription.medicationName,
    scheduledTime: medication.scheduledTime,
    takenAt: Timestamp.now(),
    date: today,
    minutesDiff: medication.minutesDiff,
  })
}

/**
 * Fetches adherence records for a patient in a date range.
 */
export async function getAdherenceRecords(
  patientId: string,
  fromDate: string, // "YYYY-MM-DD"
  toDate: string, // "YYYY-MM-DD"
): Promise<AdherenceRecord[]> {
  const q = query(
    collection(db, 'adherence'),
    where('patientId', '==', patientId),
    where('date', '>=', fromDate),
    where('date', '<=', toDate),
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AdherenceRecord, 'id'>),
  }))
}
