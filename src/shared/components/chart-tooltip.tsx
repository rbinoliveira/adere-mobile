import React from 'react'
import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'

type ChartTooltipProps = {
  visible: boolean
  x: number
  y: number
  content: string
  subContent?: string
}

export function ChartTooltip({
  visible,
  x,
  y,
  content,
  subContent,
}: ChartTooltipProps) {
  if (!visible) return null

  return (
    <View
      className="absolute bg-base-black rounded-md px-2 py-1 z-10"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ left: x, top: y }}
      pointerEvents="none"
    >
      <PlatformText color="base-white" className="text-[10px] font-medium">
        {content}
      </PlatformText>
      {subContent && (
        <PlatformText color="base-white" className="text-[9px]">
          {subContent}
        </PlatformText>
      )}
    </View>
  )
}
