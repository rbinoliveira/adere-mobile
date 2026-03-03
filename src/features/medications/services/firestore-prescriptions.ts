import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@react-native-firebase/firestore'

import { Medication } from '@/features/medications/types/medication'
import {
  calculateDelayMinutes,
  calculateMedicationStatus,
} from '@/shared/utils/medication-status'
import {
  AdministrationRoute,
  generatePosologyText,
} from '@/shared/utils/posology'

export interface FirestoreMedicine {
  id: string
  name: string
  dose: string
  pharmaceuticalForm: string
  administrationRoute: string
  quantity: number
  intervalHours: number
  durationDays?: number
  whilePain?: boolean
  defaultDosage?: string
  ownerId: string
  patientId?: string
  patientEmail?: string
  scheduledTimes?: string[]
  instructions?: string
  createdAt?: Date
}

export async function fetchMedicinesFromFirestore(
  userEmail: string,
  userId: string,
): Promise<FirestoreMedicine[]> {
  try {
    const db = getFirestore()
    const medicinesRef = collection(db, 'medicines')

    const queries = [
      query(medicinesRef, where('patientEmail', '==', userEmail)),
      query(medicinesRef, where('patientId', '==', userId)),
    ]

    const [snapshotByEmail, snapshotById] = await Promise.all(
      queries.map((q) => getDocs(q)),
    )

    const medicinesMap = new Map<string, FirestoreMedicine>()

    snapshotByEmail.forEach((doc) => {
      medicinesMap.set(doc.id, {
        id: doc.id,
        ...doc.data(),
      } as FirestoreMedicine)
    })

    snapshotById.forEach((doc) => {
      medicinesMap.set(doc.id, {
        id: doc.id,
        ...doc.data(),
      } as FirestoreMedicine)
    })

    return Array.from(medicinesMap.values())
  } catch (error) {
    console.error('Error fetching medicines from Firestore:', error)
    return []
  }
}

function generateScheduledTimes(
  intervalHours: number,
  startTime: string = '08:00',
): string[] {
  const times: string[] = []
  const [startHour, startMinute] = startTime.split(':').map(Number)
  let currentHour = startHour

  while (currentHour < 24) {
    times.push(
      `${String(currentHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`,
    )
    currentHour += intervalHours
  }

  return times
}

export function convertFirestoreMedicineToMedications(
  medicine: FirestoreMedicine,
): Medication[] {
  const medications: Medication[] = []
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const posologyText =
    medicine.defaultDosage ||
    generatePosologyText({
      quantity: medicine.quantity,
      pharmaceuticalForm: medicine.pharmaceuticalForm as Medication['form'],
      administrationRoute: medicine.administrationRoute as AdministrationRoute,
      frequencyHours: medicine.intervalHours,
      daysDuration: medicine.durationDays,
      whilePain: medicine.whilePain,
    })

  const scheduledTimes =
    medicine.scheduledTimes || generateScheduledTimes(medicine.intervalHours)

  scheduledTimes.forEach((timeStr, index) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const scheduledTime = new Date(
      today.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000,
    )

    const status = calculateMedicationStatus(scheduledTime)
    const delayMinutes = calculateDelayMinutes(scheduledTime)

    const medication: Medication = {
      id: `${medicine.id}-${index}`,
      name: medicine.name,
      dose: medicine.dose,
      form: medicine.pharmaceuticalForm as Medication['form'],
      scheduledTime,
      instructions: medicine.instructions || posologyText,
      status,
      delayMinutes,
    }

    medications.push(medication)
  })

  return medications
}
