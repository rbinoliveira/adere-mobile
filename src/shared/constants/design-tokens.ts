export {
  BorderRadius,
  Colors,
  Fonts,
  IconSizes,
  Shadows,
  Spacing,
  StatusColors,
  TextContrast,
} from './theme.constant'

export const CardSpacing = {
  padding: Spacing.md,
  gap: Spacing.md,
  borderRadius: 16,
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
} as const

export const ScrollViewPadding = {
  bottom: 100,
  top: 20,
} as const

export const BUTTON_MIN_HEIGHT = {
  minHeight: 52,
} as const

export const STEP_NUMBER_SIZE = {
  width: 24,
  height: 24,
} as const
