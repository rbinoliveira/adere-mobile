import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { Medication } from '@/features/medications/types/medication'

const NOTIFICATIONS_ENABLED_KEY = '@lucy:notifications_enabled'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medication-reminders', {
      name: 'Lembretes de Medicação',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return finalStatus === 'granted'
}

export async function areNotificationsEnabled(): Promise<boolean> {
  const stored = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY)
  if (stored === null) {
    await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true')
    return true
  }
  return stored === 'true'
}

export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(
    NOTIFICATIONS_ENABLED_KEY,
    enabled ? 'true' : 'false',
  )
  if (!enabled) {
    await cancelAllNotifications()
  }
}

export async function scheduleMedicationNotification(
  medication: Medication,
  scheduledTime: Date,
): Promise<string> {
  const enabled = await areNotificationsEnabled()
  if (!enabled) {
    return ''
  }

  const hasPermission = await requestNotificationPermissions()
  if (!hasPermission) {
    return ''
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora de tomar remédio',
      body: `É hora de tomar ${medication.name} (${medication.dose})`,
      data: { medicationId: medication.id },
      sound: true,
    },
    trigger: {
      type: 'date',
      timestamp: scheduledTime.getTime(),
    },
  })

  return notificationId
}

export async function scheduleMedicationReminder(
  medication: Medication,
  scheduledTime: Date,
  minutesBefore: number = 30,
): Promise<string> {
  const enabled = await areNotificationsEnabled()
  if (!enabled) {
    return ''
  }

  const hasPermission = await requestNotificationPermissions()
  if (!hasPermission) {
    return ''
  }

  const reminderTime = new Date(
    scheduledTime.getTime() - minutesBefore * 60 * 1000,
  )

  if (reminderTime <= new Date()) {
    return ''
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lembrete: Remédio em breve',
      body: `${medication.name} em ${minutesBefore} minutos`,
      data: { medicationId: medication.id, type: 'reminder' },
      sound: true,
    },
    trigger: {
      type: 'date',
      timestamp: reminderTime.getTime(),
    },
  })

  return notificationId
}

export async function scheduleDelayedMedicationReminder(
  medication: Medication,
  scheduledTime: Date,
): Promise<string> {
  const enabled = await areNotificationsEnabled()
  if (!enabled) {
    return ''
  }

  const hasPermission = await requestNotificationPermissions()
  if (!hasPermission) {
    return ''
  }

  const now = new Date()
  const delayMinutes = Math.floor(
    (now.getTime() - scheduledTime.getTime()) / (60 * 1000),
  )

  if (delayMinutes <= 0) {
    return ''
  }

  const reminderTime = new Date(now.getTime() + 5 * 60 * 1000)

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Remédio atrasado',
      body: `${medication.name} está ${delayMinutes} minutos atrasado`,
      data: { medicationId: medication.id, type: 'delayed' },
      sound: true,
    },
    trigger: {
      type: 'date',
      timestamp: reminderTime.getTime(),
    },
  })

  return notificationId
}

export async function cancelNotification(
  notificationId: string,
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId)
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export async function scheduleMedicationsNotifications(
  medications: Medication[],
): Promise<void> {
  await cancelAllNotifications()

  const enabled = await areNotificationsEnabled()
  if (!enabled) {
    return
  }

  const hasPermission = await requestNotificationPermissions()
  if (!hasPermission) {
    return
  }

  const now = new Date()

  for (const medication of medications) {
    if (medication.takenAt) {
      continue
    }

    if (medication.status === 'waiting') {
      await scheduleMedicationNotification(medication, medication.scheduledTime)
      await scheduleMedicationReminder(medication, medication.scheduledTime, 30)
    } else if (
      medication.status === 'delayed' ||
      medication.status === 'very_delayed'
    ) {
      await scheduleDelayedMedicationReminder(
        medication,
        medication.scheduledTime,
      )
    } else if (medication.scheduledTime > now) {
      await scheduleMedicationNotification(medication, medication.scheduledTime)
      await scheduleMedicationReminder(medication, medication.scheduledTime, 30)
    }
  }
}
