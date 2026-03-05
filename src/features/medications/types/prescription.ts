import { Timestamp } from 'firebase/firestore'

export type Prescription = {
  id: string
  patientId: string
  medicationName: string
  dosage: string
  times: string[] // "HH:mm"
  startDate: string // ISO
  durationDays: number
  version: number
  isActive: boolean
  updatedAt: Timestamp
  instructions?: string // Como tomar
}

export type MedicationStatus =
  | 'on-time' // no horário (até 30min antes)
  | 'late' // atrasado (30min–2h)
  | 'very-late' // muito atrasado (>2h)
  | 'wait' // aguardar horário (ainda não chegou)
  | 'taken' // já tomado

export type TodayMedication = {
  prescription: Prescription
  scheduledTime: string // "HH:mm" — horário específico do dia
  minutesDiff: number // positivo = atraso, negativo = ainda não chegou
  status: MedicationStatus
}
