import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import {
  formatTime,
  getFormLabel,
  getInstructionTitle,
  getMedicationType,
  getTypeColor,
  getTypeIcon,
  Medication,
  MedicationStatus,
} from '@/features/medications/types/medication'
import {
  BUTTON_MIN_HEIGHT,
  CardSpacing,
  IconSizes,
  Spacing,
  STEP_NUMBER_SIZE,
} from '@/shared/constants/design-tokens'
import { triggerLightFeedback } from '@/shared/utils/haptic-feedback'
import { generateStepByStepInstructions } from '@/shared/utils/step-by-step-instructions'

type MedicationCardProps = {
  medication: Medication
  onAction?: (medication: Medication) => void
}

function getStatusConfig(status: MedicationStatus, delayMinutes?: number) {
  const configs: Record<
    MedicationStatus,
    {
      badgeColor: string
      badgeTextColor: string
      statusText: string
      buttonColor: string
      buttonTextColor: string
      buttonText: string
      buttonIcon: keyof typeof FontAwesome.glyphMap
    }
  > = {
    on_time: {
      badgeColor: 'bg-green-100',
      badgeTextColor: 'text-green-700',
      statusText: 'No horário',
      buttonColor: 'bg-green-500',
      buttonTextColor: 'text-white',
      buttonText: 'Marcar como Tomado',
      buttonIcon: 'check',
    },
    delayed: {
      badgeColor: 'bg-yellow-100',
      badgeTextColor: 'text-yellow-700',
      statusText: `${delayMinutes || 0} min atrasado`,
      buttonColor: 'bg-yellow-500',
      buttonTextColor: 'text-white',
      buttonText: 'Tomar Agora',
      buttonIcon: 'clock-o',
    },
    very_delayed: {
      badgeColor: 'bg-red-100',
      badgeTextColor: 'text-red-700',
      statusText: 'Muito atrasado',
      buttonColor: 'bg-red-500',
      buttonTextColor: 'text-white',
      buttonText: 'Consultar Médico',
      buttonIcon: 'exclamation-triangle',
    },
    waiting: {
      badgeColor: 'bg-gray-100',
      badgeTextColor: 'text-gray-600',
      statusText: delayMinutes ? `Em ${delayMinutes} horas` : 'Aguardando',
      buttonColor: 'bg-gray-200',
      buttonTextColor: 'text-gray-600',
      buttonText: 'Aguardar Horário',
      buttonIcon: 'clock-o',
    },
    taken: {
      badgeColor: 'bg-green-100',
      badgeTextColor: 'text-green-700',
      statusText: 'Tomado',
      buttonColor: 'bg-green-100',
      buttonTextColor: 'text-green-700',
      buttonText: 'Tomado',
      buttonIcon: 'check-circle',
    },
  }
  return configs[status]
}

function getTimeIcon(date: Date): {
  icon: keyof typeof FontAwesome.glyphMap
  color: string
} {
  const hours = date.getHours()
  if (hours >= 6 && hours < 12) {
    return { icon: 'sun-o', color: '#F59E0B' }
  } else if (hours >= 12 && hours < 18) {
    return { icon: 'sun-o', color: '#F97316' }
  } else {
    return { icon: 'moon-o', color: '#6366F1' }
  }
}

export function MedicationCard({ medication, onAction }: MedicationCardProps) {
  const [isPressed, setIsPressed] = useState(false)
  const type = getMedicationType(medication.form)
  const typeColor = getTypeColor(type)
  const typeIcon = getTypeIcon(type)
  const isTaken = !!medication.takenAt
  const displayStatus = isTaken ? 'taken' : medication.status
  const statusConfig = getStatusConfig(displayStatus, medication.delayMinutes)
  const timeFormatted = formatTime(medication.scheduledTime)
  const timeIcon = getTimeIcon(medication.scheduledTime)
  const instructionTitle = getInstructionTitle(medication.form)
  const formLabel = getFormLabel(medication.form)
  const isDisabled = medication.status === 'waiting' || isTaken
  const stepByStepInstructions = useMemo(
    () =>
      generateStepByStepInstructions(medication.form, medication.instructions),
    [medication.form, medication.instructions],
  )
  const showStepByStep = stepByStepInstructions.length > 1

  const handlePress = async () => {
    if (isDisabled) return
    await triggerLightFeedback()
    onAction?.(medication)
  }

  const handlePressIn = () => {
    if (!isDisabled) {
      setIsPressed(true)
      triggerLightFeedback()
    }
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <View
      className="w-full bg-white rounded-2xl mb-4 border border-gray-100"
      style={{
        padding: CardSpacing.padding,
        ...CardSpacing.shadow,
      }}
    >
      {/* Header Row */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-center gap-4 flex-1">
          <View
            className={`w-14 h-14 rounded-full ${typeColor} items-center justify-center`}
          >
            <FontAwesome name={typeIcon} size={IconSizes.large} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-text-one font-inter-bold text-lg">
              {medication.name}
            </Text>
            <Text className="text-text-three font-inter-medium text-base mt-1">
              {medication.dose} - {formLabel}
            </Text>
          </View>
        </View>

        {/* Time and Status */}
        <View className="items-end">
          <View className="flex-row items-center gap-1">
            <FontAwesome
              name={timeIcon.icon}
              size={14}
              color={timeIcon.color}
            />
            <Text className="text-text-one font-inter-bold text-base">
              {timeFormatted}
            </Text>
          </View>
          <View
            className={`${statusConfig.badgeColor} px-3 py-1 rounded-full mt-1`}
          >
            <Text
              className={`${statusConfig.badgeTextColor} font-inter-semibold text-xs`}
            >
              {statusConfig.statusText}
            </Text>
          </View>
        </View>
      </View>

      {/* Instructions */}
      <View className="mb-4">
        <Text className="text-text-one font-inter-semibold text-base mb-2">
          {instructionTitle}
        </Text>
        {showStepByStep ? (
          <View style={{ gap: Spacing.sm }}>
            {stepByStepInstructions.map((step) => (
              <View key={step.step} className="flex-row items-start gap-2">
                <View
                  className="bg-primary rounded-full items-center justify-center"
                  style={STEP_NUMBER_SIZE}
                >
                  <Text className="text-white font-inter-bold text-xs">
                    {step.step}
                  </Text>
                </View>
                <Text className="text-text-three font-inter text-base leading-6 flex-1">
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-text-three font-inter text-base leading-6">
            {medication.instructions}
          </Text>
        )}
      </View>

      {/* Action Button */}
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`${statusConfig.buttonColor} rounded-lg flex-row items-center justify-center gap-3 ${
          isPressed && !isDisabled ? 'opacity-80' : 'opacity-100'
        } ${isDisabled ? 'opacity-60' : ''}`}
        disabled={isDisabled}
        style={{
          ...BUTTON_MIN_HEIGHT,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.md,
        }}
      >
        <FontAwesome
          name={statusConfig.buttonIcon}
          size={IconSizes.medium}
          color={
            isTaken
              ? '#15803d'
              : medication.status === 'waiting'
                ? '#6B7280'
                : 'white'
          }
        />
        <Text
          className={`${statusConfig.buttonTextColor} font-inter-bold text-base`}
        >
          {statusConfig.buttonText}
        </Text>
      </Pressable>
    </View>
  )
}
