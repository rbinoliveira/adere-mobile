import { useCallback, useState } from 'react'
import type { GestureResponderEvent } from 'react-native'

type TooltipState = {
  visible: boolean
  x: number
  y: number
  content: string
  subContent?: string
}

type TooltipConfig = {
  /** Horizontal offset from touch point (default: -30) */
  xOffset?: number
  /** Vertical offset from touch point (default: -60) */
  yOffset?: number
  /** Auto-hide duration in milliseconds (default: 2000) */
  duration?: number
}

type ShowTooltipParams = {
  event: GestureResponderEvent
  content: string
  subContent?: string
}

const DEFAULT_CONFIG: Required<TooltipConfig> = {
  xOffset: -30,
  yOffset: -60,
  duration: 2000,
}

/**
 * Custom hook for managing chart tooltip state and interactions
 *
 * @param config - Optional configuration for tooltip positioning and behavior
 * @returns Tooltip state and control functions
 *
 * @example
 * ```tsx
 * const { tooltip, showTooltip, hideTooltip } = useChartTooltip()
 *
 * const handlePress = (value: number, event: GestureResponderEvent) => {
 *   showTooltip({
 *     event,
 *     content: `${value}`,
 *   })
 * }
 *
 * return (
 *   <>
 *     <ChartTooltip {...tooltip} />
 *     <TouchableOpacity onPress={handlePress}>
 *       <Bar />
 *     </TouchableOpacity>
 *   </>
 * )
 * ```
 */
export function useChartTooltip(config: TooltipConfig = {}) {
  const { xOffset, yOffset, duration } = { ...DEFAULT_CONFIG, ...config }

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    subContent: undefined,
  })

  const showTooltip = useCallback(
    ({ event, content, subContent }: ShowTooltipParams) => {
      const { locationX, locationY } = event.nativeEvent

      setTooltip({
        visible: true,
        x: locationX + xOffset,
        y: locationY + yOffset,
        content,
        subContent,
      })

      // Auto-hide after duration
      setTimeout(() => {
        setTooltip((prev) => ({ ...prev, visible: false }))
      }, duration)
    },
    [xOffset, yOffset, duration],
  )

  const hideTooltip = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }, [])

  return {
    tooltip,
    showTooltip,
    hideTooltip,
  }
}
