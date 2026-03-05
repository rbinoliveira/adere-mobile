// eslint-disable-next-line @typescript-eslint/no-require-imports
const { platformSelect } = require('nativewind/theme')

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Default text color
        default: '#1C1C1C',
        // Colors synchronized with src/shared/constants/theme.constant.ts
        // Base colors - BaseColors
        base: {
          white: '#FFFFFF', // BaseColors.white
          black: '#000000', // BaseColors.black
        },
        // Neutral colors - NeutralColors
        neutral: {
          100: '#E0E0E0', // NeutralColors[100]
          200: '#EFF2F4', // NeutralColors[200]
          300: '#E5E9EC', // NeutralColors[300]
          350: '#EBEBEB', // NeutralColors[350]
          400: '#F2F4F5', // NeutralColors[400]
          450: '#D9D9D9', // NeutralColors[450]
          500: '#AEAEB2', // NeutralColors[500]
          600: '#979C9E', // NeutralColors[600]
          700: '#72777A', // NeutralColors[700]
          800: '#494949', // NeutralColors[800]
          850: '#3C3C43', // NeutralColors[850]
          900: '#1C1C1C', // NeutralColors[900]
          950: '#1C1C1C', // NeutralColors[950]
        },
        // Accent colors - AccentColors
        accent: {
          500: '#C3161C', // AccentColors[500]
          600: '#FF453A', // AccentColors[600]
          950: '#FA0000', // AccentColors[950]
        },
        // Red colors - RedColors (same as AccentColors)
        red: {
          500: '#C3161C', // RedColors[500]
          600: '#FF453A', // RedColors[600]
          950: '#FA0000', // RedColors[950]
        },
        // Success colors - SuccessColors
        success: {
          500: '#50E51C', // SuccessColors[500]
          600: '#35CE00', // SuccessColors[600]
          700: '#26A324', // SuccessColors[700]
          950: '#0EAC4F', // SuccessColors[950]
        },
        // Green colors - GreenColors (same as SuccessColors)
        green: {
          500: '#50E51C', // GreenColors[500]
          600: '#35CE00', // GreenColors[600]
          700: '#26A324', // GreenColors[700]
          950: '#0EAC4F', // GreenColors[950]
        },
        // Warning colors - WarningColors
        warning: {
          400: '#FCD922', // WarningColors[400]
          500: '#F8D310', // WarningColors[500]
          950: '#F4C138', // WarningColors[950]
        },
        // Yellow colors - YellowColors (same as WarningColors)
        yellow: {
          400: '#FCD922', // YellowColors[400]
          500: '#F8D310', // YellowColors[500]
          950: '#F4C138', // YellowColors[950]
        },
        // Info colors - InfoColors
        info: {
          950: '#0059DA', // InfoColors[950]
        },
        // Blue colors - BlueColors (same as InfoColors)
        blue: {
          950: '#0059DA', // BlueColors[950]
        },
        // Orange colors - OrangeColors
        orange: {
          950: '#FF8800', // OrangeColors[950]
        },
        // Pink colors - PinkColors
        pink: {
          950: '#FF0091', // PinkColors[950]
        },
        // Purple colors - PurpleColors
        purple: {
          950: '#9933CE', // PurpleColors[950]
        },
        // Brown colors - BrownColors
        brown: {
          950: '#904500', // BrownColors[950]
        },
      },
      fontFamily: {
        sans: platformSelect({
          ios: 'Montserrat',
          android: 'Montserrat',
          default: 'Montserrat',
        }),
        montserrat: platformSelect({
          ios: 'Montserrat',
          android: 'Montserrat',
          default: 'Montserrat',
        }),
        averia: platformSelect({
          ios: 'AveriaSerifLibre',
          android: 'AveriaSerifLibre',
          default: 'AveriaSerifLibre',
        }),
      },
    },
  },
  plugins: [],
}
