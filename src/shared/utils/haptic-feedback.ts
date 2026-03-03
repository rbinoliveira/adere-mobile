import * as Haptics from 'expo-haptics'

export async function triggerSuccessFeedback() {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}

export async function triggerWarningFeedback() {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
}

export async function triggerErrorFeedback() {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
}

export async function triggerLightFeedback() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export async function triggerMediumFeedback() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

export async function triggerHeavyFeedback() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}
