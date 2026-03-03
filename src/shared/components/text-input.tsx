import Ionicons from '@expo/vector-icons/Ionicons'
import React, { forwardRef, ReactNode, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInput, TouchableOpacity, View } from 'react-native'

import { Text } from '@/shared/components/text'
import { cn } from '@/shared/utils/cn'

type InputTextProps<T extends FieldValues> = {
  label?: string
  labelDescription?: string
  labelIcon?: ReactNode
  name: Path<T>
  control: Control<T>
  placeholder: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address'
  ref?: React.RefObject<TextInput | null>
  returnKeyType?: 'next' | 'done'
  className?: string
  onSubmitEditing?: () => void
}

function InputTextComponent<T extends FieldValues>(
  {
    label,
    labelDescription,
    labelIcon,
    name,
    control,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    returnKeyType = 'done',
    onSubmitEditing,
    className,
  }: InputTextProps<T>,
  ref: React.ForwardedRef<TextInput>,
) {
  const [hidden, setHidden] = useState(secureTextEntry)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className={className}>
          {label && (
            <View className="flex-row gap-3 mb-3">
              <View className="bg-primary rounded-full w-10 h-10 justify-center items-center">
                {labelIcon}
              </View>
              <View>
                <Text className="font-inter-semibold leading-[1.5]">
                  {label}
                </Text>
                <Text className="text-xs leading-[1.333]">
                  {labelDescription}
                </Text>
              </View>
            </View>
          )}

          <View
            className={cn(
              'flex-row items-center border border-border bg-white rounded-lg px-4',
              'h-[52px] border-2',
              error && 'border-red-500',
              isFocused && 'border-primary',
            )}
          >
            <TextInput
              className="flex-1 text-sm py-[0.625rem]"
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              onBlur={() => {
                onBlur()
                setIsFocused(false)
              }}
              onFocus={() => setIsFocused(true)}
              onChangeText={onChange}
              value={value}
              keyboardType={keyboardType}
              autoCapitalize={name === 'email' ? 'none' : undefined}
              ref={ref}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              secureTextEntry={hidden}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setHidden(!hidden)}>
                {hidden ? (
                  <Ionicons name="eye" size={20} color="#6b7280" />
                ) : (
                  <Ionicons name="eye-off" size={20} color="#6b7280" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {error && (
            <Text className="text-red-500 mt-2 text-xs">{error.message}</Text>
          )}
        </View>
      )}
    />
  )
}

type InputTextType = <T extends FieldValues = FieldValues>(
  props: InputTextProps<T> & { ref?: React.ForwardedRef<TextInput> },
) => ReturnType<typeof InputTextComponent<T>>

export const InputText = forwardRef(InputTextComponent) as InputTextType
