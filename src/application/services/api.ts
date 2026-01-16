import { Medication } from '@/application/types/medication'
import {
  calculateDelayMinutes,
  calculateMedicationStatus,
} from '@/application/utils/medication-status'
import {
  AdministrationRoute,
  generatePosologyText,
} from '@/application/utils/posology'

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com'

export interface Prescription {
  id: string
  patientId: string
  activeIngredient: string
  dose: string
  pharmaceuticalForm: string
  administrationRoute: string
  quantity: number
  frequencyHours: number
  daysDuration?: number
  whilePain?: boolean
  scheduledTimes: string[]
  instructions?: string
  createdAt: Date
  doctorId: string
}

export interface PatientPrescriptionsResponse {
  prescriptions: Prescription[]
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getAuthToken()

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function getAuthToken(): Promise<string | null> {
  return null
}

export async function fetchPatientPrescriptions(
  patientId: string,
): Promise<Prescription[]> {
  try {
    const data: PatientPrescriptionsResponse = await fetchWithAuth(
      `/patients/${patientId}/prescriptions`,
    )
    return data.prescriptions.map((prescription) => ({
      ...prescription,
      createdAt: new Date(prescription.createdAt),
    }))
  } catch (error) {
    console.error('Error fetching prescriptions:', error)
    return []
  }
}

export function convertPrescriptionToMedications(
  prescription: Prescription,
): Medication[] {
  const medications: Medication[] = []
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const posologyText = generatePosologyText({
    quantity: prescription.quantity,
    pharmaceuticalForm: prescription.pharmaceuticalForm as Medication['form'],
    administrationRoute:
      prescription.administrationRoute as AdministrationRoute,
    frequencyHours: prescription.frequencyHours,
    daysDuration: prescription.daysDuration,
    whilePain: prescription.whilePain,
  })

  prescription.scheduledTimes.forEach((timeStr, index) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const scheduledTime = new Date(
      today.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000,
    )

    const status = calculateMedicationStatus(scheduledTime)
    const delayMinutes = calculateDelayMinutes(scheduledTime)

    const medication: Medication = {
      id: `${prescription.id}-${index}`,
      name: prescription.activeIngredient,
      dose: prescription.dose,
      form: prescription.pharmaceuticalForm as Medication['form'],
      scheduledTime,
      instructions: prescription.instructions || posologyText,
      status,
      delayMinutes,
    }

    medications.push(medication)
  })

  return medications
}

export async function markMedicationAsTaken(
  patientId: string,
  medicationId: string,
): Promise<void> {
  try {
    await fetchWithAuth(
      `/patients/${patientId}/medications/${medicationId}/taken`,
      {
        method: 'POST',
        body: JSON.stringify({ takenAt: new Date().toISOString() }),
      },
    )
  } catch (error) {
    console.error('Error marking medication as taken:', error)
    throw error
  }
}
