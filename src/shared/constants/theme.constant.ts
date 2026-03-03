import { Platform } from 'react-native'

export const BaseColors = {
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const

export const NeutralColors = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
  950: '#030712',
} as const

export const PrimaryColors = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
  950: '#172554',
} as const

export const SuccessColors = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
} as const

export const WarningColors = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
} as const

export const DangerColors = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
} as const

export const Colors = {
  ...BaseColors,
  neutral: NeutralColors,
  primary: PrimaryColors,
  success: SuccessColors,
  warning: WarningColors,
  danger: DangerColors,
} as const

export const StatusColors = {
  success: {
    background: SuccessColors[100],
    text: SuccessColors[800],
    border: SuccessColors[500],
    button: SuccessColors[500],
    buttonText: BaseColors.white,
  },
  warning: {
    background: WarningColors[100],
    text: WarningColors[800],
    border: WarningColors[500],
    button: WarningColors[500],
    buttonText: BaseColors.white,
  },
  danger: {
    background: DangerColors[100],
    text: DangerColors[800],
    border: DangerColors[500],
    button: DangerColors[500],
    buttonText: BaseColors.white,
  },
  waiting: {
    background: NeutralColors[100],
    text: NeutralColors[700],
    border: NeutralColors[400],
    button: NeutralColors[400],
    buttonText: BaseColors.white,
  },
  info: {
    background: PrimaryColors[100],
    text: PrimaryColors[800],
    border: PrimaryColors[500],
    button: PrimaryColors[500],
    buttonText: BaseColors.white,
  },
} as const

export const TextContrast = {
  high: {
    primary: NeutralColors[800],
    secondary: NeutralColors[600],
    tertiary: NeutralColors[500],
  },
  medium: {
    primary: NeutralColors[700],
    secondary: NeutralColors[500],
    tertiary: NeutralColors[400],
  },
  background: {
    light: BaseColors.white,
    medium: NeutralColors[50],
    dark: NeutralColors[100],
  },
} as const

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const

export const Shadows = {
  none: {},
  sm: {
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
} as const

export const Fonts = Platform.select({
  ios: {
    regular: 'Inter_Regular',
    medium: 'Inter_Medium',
    semibold: 'Inter_SemiBold',
    bold: 'Inter_Bold',
  },
  android: {
    regular: 'Inter_Regular',
    medium: 'Inter_Medium',
    semibold: 'Inter_SemiBold',
    bold: 'Inter_Bold',
  },
  default: {
    regular: 'Inter_Regular',
    medium: 'Inter_Medium',
    semibold: 'Inter_SemiBold',
    bold: 'Inter_Bold',
  },
})!
