import React, { useState } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'

import { Spacing } from '@/shared/design/design-tokens'
import { cn } from '@/shared/utils/cn'
import { triggerLightFeedback } from '@/shared/utils/haptic-feedback'

type AccessibleButtonProps = PressableProps & {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  label?: string
  icon?: React.ReactNode
  className?: string
  labelClassName?: string
  showHapticFeedback?: boolean
  minHeight?: number
}

const MIN_TOUCH_SIZE = 44

export function AccessibleButton({
  variant = 'primary',
  label,
  icon,
  className,
  labelClassName,
  showHapticFeedback = true,
  minHeight = MIN_TOUCH_SIZE,
  onPress,
  disabled,
  ...props
}: AccessibleButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: [
      'bg-primary',
      isPressed ? 'opacity-80' : 'opacity-100',
      disabled && 'opacity-50',
    ],
    secondary: [
      'bg-gray-200',
      isPressed ? 'opacity-80' : 'opacity-100',
      disabled && 'opacity-50',
    ],
    success: [
      'bg-green-500',
      isPressed ? 'opacity-80' : 'opacity-100',
      disabled && 'opacity-50',
    ],
    warning: [
      'bg-yellow-500',
      isPressed ? 'opacity-80' : 'opacity-100',
      disabled && 'opacity-50',
    ],
    danger: [
      'bg-red-500',
      isPressed ? 'opacity-80' : 'opacity-100',
      disabled && 'opacity-50',
    ],
    ghost: ['bg-transparent', isPressed ? 'opacity-60' : 'opacity-100'],
  }

  const textVariants = {
    primary: ['text-white font-inter-bold'],
    secondary: ['text-gray-700 font-inter-bold'],
    success: ['text-white font-inter-bold'],
    warning: ['text-white font-inter-bold'],
    danger: ['text-white font-inter-bold'],
    ghost: ['text-text-one font-inter-semibold'],
  }

  const handlePressIn = () => {
    setIsPressed(true)
    if (showHapticFeedback && !disabled) {
      triggerLightFeedback()
    }
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const handlePress = async (
    e: Parameters<NonNullable<PressableProps['onPress']>>[0],
  ) => {
    if (disabled) return
    if (showHapticFeedback) {
      await triggerLightFeedback()
    }
    onPress?.(e)
  }

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      className={cn(
        'justify-center items-center gap-2 flex-row rounded-lg',
        className,
        ...variants[variant],
      )}
      style={[
        {
          minHeight,
          minWidth: MIN_TOUCH_SIZE,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
        },
        props.style,
      ]}
    >
      {icon}
      {label && (
        <Text
          className={cn(labelClassName, ...textVariants[variant], 'text-base')}
        >
          {label}
        </Text>
      )}
    </Pressable>
  )
}
