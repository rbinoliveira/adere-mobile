import { useCallback, useEffect, useState } from 'react'

import {
  areNotificationsEnabled,
  requestNotificationPermissions,
  scheduleMedicationsNotifications,
  setNotificationsEnabled,
} from '@/features/medications/services/notifications'
import { Medication } from '@/features/medications/types/medication'

export function useNotifications() {
  const [enabled, setEnabled] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSettings() {
      const isEnabled = await areNotificationsEnabled()
      setEnabled(isEnabled)
      setLoading(false)
    }
    loadSettings()
  }, [])

  const toggleNotifications = useCallback(async (value: boolean) => {
    await setNotificationsEnabled(value)
    setEnabled(value)
  }, [])

  const scheduleNotifications = useCallback(
    async (medications: Medication[]) => {
      if (!enabled) return
      await scheduleMedicationsNotifications(medications)
    },
    [enabled],
  )

  const requestPermissions = useCallback(async () => {
    return await requestNotificationPermissions()
  }, [])

  return {
    enabled,
    loading,
    toggleNotifications,
    scheduleNotifications,
    requestPermissions,
  }
}
