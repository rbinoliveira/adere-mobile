import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

import { Prescription } from '@/features/medications/types/prescription'

// ─── Types ──────────────────────────────────────────────────────────────────

type ScheduledNotificationRecord = {
  prescriptionId: string
  version: number
  notificationIds: string[]
}

// ─── Storage key ────────────────────────────────────────────────────────────

const STORAGE_KEY = '@adere:notification-records'

// ─── Notification appearance ─────────────────────────────────────────────

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

// ─── 4.1: Permission request ────────────────────────────────────────────────

/**
 * Requests notification permission from the OS.
 * Returns true if granted.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()

  if (existingStatus === 'granted') return true

  const { status } = await Notifications.requestPermissionsAsync()
  return status === 'granted'
}

// ─── Local storage helpers ───────────────────────────────────────────────────

async function getRecords(): Promise<ScheduledNotificationRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ScheduledNotificationRecord[]) : []
  } catch {
    return []
  }
}

async function saveRecords(
  records: ScheduledNotificationRecord[],
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

// ─── 4.2: Schedule notifications for a prescription ────────────────────────

/**
 * Schedules local notifications for every daily time in a prescription,
 * across its entire active date range.
 * Avoids scheduling past dates.
 */
export async function schedulePrescriptionNotifications(
  prescription: Prescription,
): Promise<void> {
  const notificationIds: string[] = []
  const now = new Date()

  const start = new Date(prescription.startDate)

  for (let day = 0; day < prescription.durationDays; day++) {
    const date = new Date(start)
    date.setDate(date.getDate() + day)

    for (const time of prescription.times) {
      const [hourStr, minStr] = time.split(':')
      const trigger = new Date(date)
      trigger.setHours(
        parseInt(hourStr ?? '0', 10),
        parseInt(minStr ?? '0', 10),
        0,
        0,
      )

      // Don't schedule past notifications
      if (trigger <= now) continue

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Hora do remédio!',
          body: `${prescription.medicationName} — ${prescription.dosage}`,
          data: {
            prescriptionId: prescription.id,
            time,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: trigger,
        },
      })

      notificationIds.push(id)
    }
  }

  // Save record locally
  const records = await getRecords()
  const existing = records.findIndex(
    (r) => r.prescriptionId === prescription.id,
  )
  const record: ScheduledNotificationRecord = {
    prescriptionId: prescription.id,
    version: prescription.version,
    notificationIds,
  }

  if (existing >= 0) {
    records[existing] = record
  } else {
    records.push(record)
  }

  await saveRecords(records)
}

// ─── 4.2: Cancel notifications for a prescription ───────────────────────────

/**
 * Cancels all scheduled notifications for a prescription and removes the record.
 */
export async function cancelPrescriptionNotifications(
  prescriptionId: string,
): Promise<void> {
  const records = await getRecords()
  const record = records.find((r) => r.prescriptionId === prescriptionId)

  if (!record) return

  await Promise.all(
    record.notificationIds.map((id) =>
      Notifications.cancelScheduledNotificationAsync(id).catch(() => {}),
    ),
  )

  const updated = records.filter((r) => r.prescriptionId !== prescriptionId)
  await saveRecords(updated)
}

// ─── 4.3: Sync all prescriptions (version-aware, offline-first) ─────────────

/**
 * Intelligently syncs prescriptions with local notifications:
 * - New prescription → schedule
 * - Version changed → cancel old + reschedule
 * - Same version → skip (idempotent)
 * - isActive = false → cancel
 */
export async function syncPrescriptionsWithNotifications(
  prescriptions: Prescription[],
): Promise<void> {
  const records = await getRecords()
  const recordMap = new Map(records.map((r) => [r.prescriptionId, r]))

  for (const prescription of prescriptions) {
    if (!prescription.isActive) {
      await cancelPrescriptionNotifications(prescription.id)
      continue
    }

    const existing = recordMap.get(prescription.id)

    if (!existing) {
      // New prescription — schedule it
      await schedulePrescriptionNotifications(prescription)
    } else if (existing.version !== prescription.version) {
      // Version changed — cancel and reschedule
      await cancelPrescriptionNotifications(prescription.id)
      await schedulePrescriptionNotifications(prescription)
    }
    // Same version → do nothing
  }

  // Cancel notifications for prescriptions no longer in the list
  const activeIds = new Set(prescriptions.map((p) => p.id))
  for (const record of records) {
    if (!activeIds.has(record.prescriptionId)) {
      await cancelPrescriptionNotifications(record.prescriptionId)
    }
  }
}
