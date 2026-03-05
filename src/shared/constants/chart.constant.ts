/**
 * Chart-related constants for consistent visualization across the app
 */

/**
 * Tooltip configuration constants
 */
export const TOOLTIP = {
  /** Default auto-hide duration in milliseconds */
  DURATION: 2000,
  /** Default horizontal offset from touch point */
  X_OFFSET: -30,
  /** Default vertical offset from touch point */
  Y_OFFSET: -60,
  /** Z-index for tooltip positioning */
  Z_INDEX: 1000,
} as const

/**
 * Chart dimensions and spacing
 */
export const CHART = {
  /** Default bar chart height */
  BAR_HEIGHT: 120,
  /** Default bar chart height (shorter variant) */
  BAR_HEIGHT_SHORT: 100,
  /** Default bar width for monthly charts */
  BAR_WIDTH: 8,
  /** Default bar border radius */
  BAR_RADIUS: 2,
  /** Bar border radius (larger variant) */
  BAR_RADIUS_LARGE: 3,
  /** Gap between double bars in cost chart */
  DOUBLE_BAR_GAP: 2,
} as const

/**
 * Progress circle constants
 */
export const PROGRESS_CIRCLE = {
  /** Circle diameter */
  SIZE: 50,
  /** Border width */
  BORDER_WIDTH: 4,
} as const
