import { ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { TextInput, TextInputProps, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { NeutralColors } from '@/shared/constants/theme.constant'
import { cn } from '@/shared/libs/tw-merge'

type InputTheme = 'dark' | 'light'

type InputProps<T extends FieldValues = FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText'
> & {
  icon?: ReactNode
  name?: Path<T>
  control?: Control<T>
  defaultValue?: PathValue<T, Path<T>>
  error?: FieldError
  errorClassName?: string
  theme?: InputTheme
}

const themeStyles: Record<
  InputTheme,
  { border: string; text: string; placeholder: number }
> = {
  dark: {
    border: 'border-white/30',
    text: 'text-base-white',
    placeholder: NeutralColors[500],
  },
  light: {
    border: 'border-neutral-300',
    text: 'text-neutral-900',
    placeholder: NeutralColors[500],
  },
}

export function Input<T extends FieldValues = FieldValues>({
  icon,
  name,
  control,
  defaultValue = '' as PathValue<T, Path<T>>,
  error,
  errorClassName = 'text-accent-500',
  theme = 'dark',
  ...props
}: InputProps<T>) {
  const styles = themeStyles[theme]

  const renderIcon = () => {
    if (!icon) return null
    return <View className="mr-3">{icon}</View>
  }

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value },
          fieldState: { error: fieldError },
        }) => (
          <View>
            <View
              className={cn(
                'flex-row items-center h-14 px-4 rounded-lg border bg-transparent',
                styles.border,
              )}
            >
              {renderIcon()}
              <TextInput
                className={cn(
                  'flex-1 text-[17px] font-montserrat',
                  styles.text,
                )}
                placeholderTextColor={styles.placeholder}
                value={value ?? ''}
                onChangeText={onChange}
                {...props}
              />
            </View>
            {(fieldError ?? error)?.message && (
              <PlatformText fontSize={12} className={`${errorClassName} mt-1`}>
                {(fieldError ?? error)?.message}
              </PlatformText>
            )}
          </View>
        )}
      />
    )
  }

  return (
    <View>
      <View
        className={cn(
          'flex-row items-center h-14 px-4 rounded-lg border bg-transparent',
          styles.border,
        )}
      >
        {renderIcon()}
        <TextInput
          className={cn('flex-1 text-[17px]', styles.text)}
          placeholderTextColor={styles.placeholder}
          {...props}
        />
      </View>
      {error?.message && (
        <PlatformText fontSize={12} className={`${errorClassName} mt-1`}>
          {error.message}
        </PlatformText>
      )}
    </View>
  )
}

Input.displayName = 'Input'
