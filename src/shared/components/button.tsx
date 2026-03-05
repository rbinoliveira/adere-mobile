import { ReactNode } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { BaseColors } from '@/shared/constants/theme.constant'
import { cn } from '@/shared/libs/tw-merge'

type ButtonProps = TouchableOpacityProps & {
  variant?: 'primary' | 'outline' | 'unstyled'
  children: ReactNode
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  children,
  isLoading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  if (variant === 'unstyled') {
    return (
      <TouchableOpacity
        disabled={disabled}
        className={cn(className)}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        className={cn(
          'items-center justify-center h-14 rounded-[0.8125rem] border border-neutral-300',
          (isLoading || disabled) && 'opacity-60',
          className,
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <View className="items-center flex-row gap-2">
            <ActivityIndicator size="small" color={BaseColors.black} />
          </View>
        ) : typeof children === 'string' ? (
          <PlatformText fontSize={17} color="base-black">
            {children}
          </PlatformText>
        ) : (
          children
        )}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      className={cn(
        'items-center justify-center h-14 bg-accent-600 rounded-[0.8125rem]',
        (isLoading || disabled) && 'opacity-60',
        className,
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <View className="items-center flex-row gap-2">
          <ActivityIndicator size="small" color={BaseColors.white} />
          <PlatformText fontSize={17} color="base-white">
            Aguarde...
          </PlatformText>
        </View>
      ) : typeof children === 'string' ? (
        <PlatformText fontSize={17} color="base-white">
          {children}
        </PlatformText>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
