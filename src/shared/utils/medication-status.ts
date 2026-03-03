import { Medication, MedicationStatus } from '@/shared/types/medication'

export function calculateMedicationStatus(
  scheduledTime: Date,
  takenAt?: Date,
): MedicationStatus {
  if (takenAt) {
    return 'taken'
  }

  const now = new Date()
  const diffMinutes = Math.floor(
    (now.getTime() - scheduledTime.getTime()) / (60 * 1000),
  )

  if (diffMinutes < -15) {
    return 'waiting'
  }
  if (diffMinutes <= 15) {
    return 'on_time'
  }
  if (diffMinutes <= 120) {
    return 'delayed'
  }
  return 'very_delayed'
}

export function calculateDelayMinutes(scheduledTime: Date): number | undefined {
  const now = new Date()
  const diffMinutes = Math.floor(
    (now.getTime() - scheduledTime.getTime()) / (60 * 1000),
  )

  if (diffMinutes > 0) {
    return diffMinutes
  }
  return undefined
}

export function updateMedicationStatuses(
  medications: Medication[],
): Medication[] {
  return medications.map((medication) => {
    const status = calculateMedicationStatus(
      medication.scheduledTime,
      medication.takenAt,
    )
    const delayMinutes = calculateDelayMinutes(medication.scheduledTime)

    return {
      ...medication,
      status,
      delayMinutes,
    }
  })
}
