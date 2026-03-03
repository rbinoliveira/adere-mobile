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
  | 'labelSmall'

export const Typography: Record<
  TypographyVariant,
  TextStyle & { fontFamily: string }
> = {
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontFamily: Fonts.semibold,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontFamily: Fonts.semibold,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  h6: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelSmall: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
} as const
