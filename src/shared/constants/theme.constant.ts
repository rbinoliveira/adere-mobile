/**
* Theme constants for Adere Mobile
* Colors migrated from adere-web/src/shared/styles/globals.css
 *
 * IMPORTANT: These colors must be synchronized with tailwind.config.js
 * Any changes to colors here should be reflected in tailwind.config.js
 */

import { Platform } from 'react-native'

/**
 * Base colors
 */
export const BaseColors = {
  black: '#000000',
  white: '#FFFFFF',
}

/**
 * Neutral colors (grayscale)
 */
export const NeutralColors = {
  100: '#E0E0E0',
  200: '#EFF2F4',
  300: '#E5E9EC',
  350: '#EBEBEB',
  400: '#F2F4F5',
  450: '#D9D9D9',
  500: '#AEAEB2',
  600: '#979C9E',
  700: '#72777A',
  800: '#494949',
  850: '#3C3C43',
  900: '#1C1C1C',
  950: '#1C1C1C',
}

/**
 * Accent colors (brand red)
 */
export const AccentColors = {
  500: '#C3161C',
  600: '#FF453A',
  950: '#FA0000',
}

/**
 * Red colors (same as accent)
 */
export const RedColors = {
  500: '#C3161C',
  600: '#FF453A',
  950: '#FA0000',
}

/**
 * Success/Green colors
 */
export const SuccessColors = {
  500: '#50E51C',
  600: '#35CE00',
  700: '#26A324',
  950: '#0EAC4F',
}

export const GreenColors = SuccessColors

/**
 * Warning/Yellow colors
 */
export const WarningColors = {
  400: '#FCD922',
  500: '#F8D310',
  950: '#F4C138',
}

export const YellowColors = WarningColors

/**
 * Info/Blue colors
 */
export const InfoColors = {
  950: '#0059DA',
}

export const BlueColors = InfoColors

/**
 * Other brand colors
 */
export const OrangeColors = {
  950: '#FF8800',
}

export const PinkColors = {
  950: '#FF0091',
}

export const PurpleColors = {
  950: '#9933CE',
}

export const BrownColors = {
  950: '#904500',
}

/**
 * Unified color palette for easy access
 */
export const Colors = {
  // Base
  black: BaseColors.black,
  white: BaseColors.white,

  // Neutral
  neutral: NeutralColors,

  // Brand/Accent
  accent: AccentColors,
  red: RedColors,

  // Status
  success: SuccessColors,
  warning: WarningColors,
  info: InfoColors,

  // Other
  green: GreenColors,
  yellow: YellowColors,
  blue: BlueColors,
  orange: OrangeColors,
  pink: PinkColors,
  purple: PurpleColors,
  brown: BrownColors,

  // Light/Dark mode support (currently same for both modes)
  light: {
    text: NeutralColors[900],
    background: NeutralColors[300],
    tint: AccentColors[500],
    icon: NeutralColors[700],
    tabIconDefault: NeutralColors[700],
    tabIconSelected: AccentColors[500],
  },
  dark: {
    text: NeutralColors[900],
    background: NeutralColors[300],
    tint: AccentColors[500],
    icon: NeutralColors[700],
    tabIconDefault: NeutralColors[700],
    tabIconSelected: AccentColors[500],
  },
}

/**
 * Font families
 * Using Montserrat as primary sans-serif and Averia Serif Libre as serif
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'Montserrat',
    serif: 'AveriaSerifLibre',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'Montserrat',
    serif: 'AveriaSerifLibre',
    mono: 'monospace',
  },
  default: {
    sans: 'Montserrat',
    serif: 'AveriaSerifLibre',
    mono: 'monospace',
  },
})
