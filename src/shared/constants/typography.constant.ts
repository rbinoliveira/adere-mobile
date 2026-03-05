import { TextStyle } from 'react-native'

import { Fonts } from './theme.constant'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'button'
  | 'label'

export type TypographyWeight = 'regular' | 'medium' | 'semiBold' | 'bold'

export const Typography: Record<
  TypographyVariant,
  TextStyle & { fontFamily: string }
> = {
  h1: {
    fontFamily: Fonts.serif,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h4: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  h5: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
}

export const getFontFamily = (weight: TypographyWeight = 'regular'): string => {
  const weightMap = {
    regular: 'Montserrat_400Regular',
    medium: 'Montserrat_500Medium',
    semiBold: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
  }

  return weightMap[weight]
}

export const getSerifFontFamily = (
  weight: 'regular' | 'bold' = 'regular',
): string => {
  const weightMap = {
    regular: 'AveriaSerifLibre_400Regular',
    bold: 'AveriaSerifLibre_700Bold',
  }

  return weightMap[weight]
}
