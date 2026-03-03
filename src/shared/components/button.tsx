import { Pressable, PressableProps, Text } from 'react-native'

import { cn } from '@/shared/utils/cn'

type ButtonProps = PressableProps & {
  variant?: 'google' | 'apple' | 'login' | 'ghost'
  label?: string
  icon?: React.ReactNode
  className?: string
  labelClassName?: string
}

export function Button({
  variant = 'login',
  label,
  icon,
  className,
  labelClassName,
  ...props
}: ButtonProps) {
  const variants = {
    login: [
      'bg-primary h-[52px] justify-center items-center gap-2 flex-row',
      'rounded-lg',
    ],
    google: [
      'bg-white border-2 border-border h-[52px] justify-center items-center ',
      'gap-2 flex-row w-full rounded-lg',
    ],
    apple: [
      'bg-black h-[52px] justify-center items-center ',
      'gap-2 flex-row w-full rounded-lg',
    ],
    ghost: [''],
  }

  const textVariants = {
    login: ['text-white font-inter-semibold'],
    google: ['text-text-six font-inter-semibold text-sm'],
    apple: ['text-white font-inter-semibold text-sm'],
    ghost: [''],
  }

  return (
    <Pressable {...props} className={cn(className, ...variants[variant])}>
      {icon}
      {label && (
        <Text className={cn(labelClassName, ...textVariants[variant])}>
          {label}
        </Text>
      )}
    </Pressable>
  )
}
