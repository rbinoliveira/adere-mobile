const { platformSelect } = require('nativewind/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        border: '#D1D5DB',
        'border-two': '#BFDBFE',
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#EFF6FF',
          dark: '#1D4ED8',
        },
        primary: '#3B82F6',
        'primary-light': '#EFF6FF',
        'text-one': '#1F2937',
        'text-two': '#ADAEBC',
        'text-three': '#4B5563',
        'text-four': '#DBEAFE',
        'text-five': '#6B7280',
        'text-six': '#374151',
        success: {
          DEFAULT: '#10B981',
          bg: '#D1FAE5',
          text: '#065F46',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FEF3C7',
          text: '#92400E',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: '#FEE2E2',
          text: '#991B1B',
        },
        waiting: {
          DEFAULT: '#9CA3AF',
          bg: '#F3F4F6',
          text: '#374151',
        },
        'status-success': '#10B981',
        'status-success-bg': '#D1FAE5',
        'status-success-text': '#065F46',
        'status-warning': '#F59E0B',
        'status-warning-bg': '#FEF3C7',
        'status-warning-text': '#92400E',
        'status-danger': '#EF4444',
        'status-danger-bg': '#FEE2E2',
        'status-danger-text': '#991B1B',
        'status-waiting': '#9CA3AF',
        'status-waiting-bg': '#F3F4F6',
        'status-waiting-text': '#374151',
      },
      fontFamily: {
        inter: platformSelect({
          ios: 'Inter_Regular',
          android: 'Inter_Regular',
          default: 'Inter, sans-serif',
        }),
        'inter-medium': platformSelect({
          ios: 'Inter_Medium',
          android: 'Inter_Medium',
          default: 'Inter, sans-serif',
        }),
        'inter-semibold': platformSelect({
          ios: 'Inter_SemiBold',
          android: 'Inter_SemiBold',
          default: 'Inter, sans-serif',
        }),
        'inter-bold': platformSelect({
          ios: 'Inter_Bold',
          android: 'Inter_Bold',
          default: 'Inter, sans-serif',
        }),
      },
    },
  },
  plugins: [],
}
