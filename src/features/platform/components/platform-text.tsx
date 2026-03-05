import { Text, TextProps } from 'react-native'

import { cn } from '@/shared/libs/tw-merge'

type FontSize =
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 20
  | 24
  | 28
  | 32
  | 48
  | 64
  | 72
type FontFamily = 'montserrat' | 'averia'
type FontWeight = 300 | 400 | 500 | 600 | 700
type TextColor =
  | 'base-black'
  | 'base-white'
  | 'neutral-500'
  | 'neutral-600'
  | 'neutral-700'
  | 'neutral-800'
  | 'neutral-850'
  | 'neutral-900'
  | 'accent-500'
  | 'accent-600'
  | 'accent-950'
  | 'success-500'
  | 'success-600'
  | 'success-700'
  | 'success-950'
  | 'warning-400'
  | 'warning-500'
  | 'warning-950'
  | 'info-950'
  | 'blue-950'
  | 'orange-950'
  | 'pink-950'
  | 'purple-950'
  | 'brown-950'

type PlatformTextProps = TextProps & {
  fontSize?: FontSize
  fontFamily?: FontFamily
  fontWeight?: FontWeight
  color?: TextColor
  className?: string
}

const fontSizeMap: Record<FontSize, string> = {
  12: 'text-xs',
  13: 'text-[13px]',
  14: 'text-sm',
  15: 'text-[15px]',
  16: 'text-base',
  17: 'text-[17px]',
  18: 'text-lg',
  20: 'text-xl',
  24: 'text-2xl',
  28: 'text-[28px]',
  32: 'text-[32px]',
  48: 'text-[48px]',
  64: 'text-[64px]',
  72: 'text-[72px]',
}

const colorMap: Record<TextColor, string> = {
  'base-black': 'text-base-black',
  'base-white': 'text-base-white',
  'neutral-500': 'text-neutral-500',
  'neutral-600': 'text-neutral-600',
  'neutral-700': 'text-neutral-700',
  'neutral-800': 'text-neutral-800',
  'neutral-850': 'text-neutral-850',
  'neutral-900': 'text-neutral-900',
  'accent-500': 'text-accent-500',
  'accent-600': 'text-accent-600',
  'accent-950': 'text-accent-950',
  'success-500': 'text-success-500',
  'success-600': 'text-success-600',
  'success-700': 'text-success-700',
  'success-950': 'text-success-950',
  'warning-400': 'text-warning-400',
  'warning-500': 'text-warning-500',
  'warning-950': 'text-warning-950',
  'info-950': 'text-info-950',
  'blue-950': 'text-blue-950',
  'orange-950': 'text-orange-950',
  'pink-950': 'text-pink-950',
  'purple-950': 'text-purple-950',
  'brown-950': 'text-brown-950',
}

const fontFamilyWithWeightMap: Record<
  FontFamily,
  Record<FontWeight, string>
> = {
  montserrat: {
    300: 'montserrat400Regular',
    400: 'montserrat400Regular',
    500: 'montserrat500Medium',
    600: 'montserrat600SemiBold',
    700: 'montserrat700Bold',
  },
  averia: {
    300: 'averiaSerifLibre400Regular',
    400: 'averiaSerifLibre400Regular',
    500: 'averiaSerifLibre400Regular',
    600: 'averiaSerifLibre700Bold',
    700: 'averiaSerifLibre700Bold',
  },
}

export function PlatformText({
  fontSize = 16,
  fontFamily = 'montserrat',
  fontWeight = 400,
  color = 'neutral-900',
  className,
  style,
  ...props
}: PlatformTextProps) {
  const resolvedFontFamily = fontFamilyWithWeightMap[fontFamily][fontWeight]

  return (
    <Text
      className={cn(fontSizeMap[fontSize], colorMap[color], className)}
      style={[{ fontFamily: resolvedFontFamily }, style]}
      {...props}
    />
  )
}
