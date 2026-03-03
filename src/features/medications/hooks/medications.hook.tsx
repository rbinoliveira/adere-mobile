import { getAuth } from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import {
  convertFirestoreMedicineToMedications,
  fetchMedicinesFromFirestore,
} from '@/features/medications/services/firestore-prescriptions'
import { Medication } from '@/features/medications/types/medication'

export function useMedications() {
  const { user } = useAuth()
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadMedications() {
      if (!user) {
        setMedications([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const auth = getAuth()
        const currentUser = auth.currentUser

        if (!currentUser || !currentUser.email) {
          setMedications([])
          setLoading(false)
          return
        }

        const medicines = await fetchMedicinesFromFirestore(
          currentUser.email,
          currentUser.uid,
        )

        const allMedications: Medication[] = []
        medicines.forEach((medicine) => {
          const meds = convertFirestoreMedicineToMedications(medicine)
          allMedications.push(...meds)
        })

        setMedications(allMedications)
      } catch (err) {
        console.error('Error loading medications:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
        setMedications([])
      } finally {
        setLoading(false)
      }
    }

    loadMedications()
  }, [user])

  return { medications, loading, error }
}
