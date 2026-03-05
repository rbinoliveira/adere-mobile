import React, { Fragment } from 'react'
import {
  DimensionValue,
  GestureResponderEvent,
  Pressable,
  View,
} from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

import { PlatformText } from '@/features/platform/components/platform-text'
import { ChartTooltip } from '@/shared/components/chart-tooltip'
import { CHART } from '@/shared/constants/chart.constant'
import { useChartTooltip } from '@/shared/hooks/chart-tooltip.hook'

type BarData = {
  label: string
  value: number
  key?: string
}

type DualBarData = {
  label: string
  primaryValue: number
  secondaryValue: number
  key?: string
}

type TooltipFormatter = (data: BarData | DualBarData) => {
  content: string
  subContent?: string
}

type BarChartProps = {
  data: BarData[] | DualBarData[]
  height?: number
  barWidth?: DimensionValue
  barGap?: number
  barRadius?: number
  primaryBarColor?: string
  secondaryBarColor?: string
  labelSize?: string
  formatTooltip?: TooltipFormatter
  mode?: 'single' | 'dual' | 'stacked'
  tooltipOptions?: {
    xOffset?: number
    yOffset?: number
  }
  className?: string
}

const colorMap: Record<string, string> = {
  'bg-accent-500': '#C3161C',
  'bg-base-black': '#000000',
  'bg-neutral-700': '#72777A',
}

function getColorFromClass(colorClass: string): string {
  return colorMap[colorClass] || '#C3161C'
}

function createTopRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const r = Math.min(radius, width / 2, height)
  return `
    M ${x} ${y + height}
    L ${x} ${y + r}
    Q ${x} ${y} ${x + r} ${y}
    L ${x + width - r} ${y}
    Q ${x + width} ${y} ${x + width} ${y + r}
    L ${x + width} ${y + height}
    Z
  `
}

function createBottomRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const r = Math.min(radius, width / 2, height)
  return `
    M ${x} ${y}
    L ${x + width} ${y}
    L ${x + width} ${y + height - r}
    Q ${x + width} ${y + height} ${x + width - r} ${y + height}
    L ${x + r} ${y + height}
    Q ${x} ${y + height} ${x} ${y + height - r}
    L ${x} ${y}
    Z
  `
}

export function BarChart({
  data,
  height = 100,
  barWidth = CHART.BAR_WIDTH,
  barGap,
  barRadius = CHART.BAR_RADIUS,
  primaryBarColor = 'bg-accent-500',
  secondaryBarColor = 'bg-base-black',
  labelSize = 'text-[8px]',
  formatTooltip,
  mode = 'single',
  tooltipOptions = {},
  className,
}: BarChartProps) {
  const [chartWidth, setChartWidth] = React.useState<number>(0)

  const { tooltip, showTooltip } = useChartTooltip({
    duration: 2000,
    xOffset: tooltipOptions.xOffset || -25,
    yOffset: tooltipOptions.yOffset || -60,
  })

  const primaryColor = getColorFromClass(primaryBarColor)
  const secondaryColor = getColorFromClass(secondaryBarColor)

  const maxValue = Math.max(
    ...data.map((d) => {
      if (mode === 'dual') {
        const dualData = d as DualBarData
        return Math.max(dualData.primaryValue, dualData.secondaryValue)
      }
      if (mode === 'stacked') {
        const dualData = d as DualBarData
        return dualData.primaryValue + dualData.secondaryValue
      }
      return (d as BarData).value
    }),
    1,
  )

  const chartHeight = height - 30
  const padding = 10

  const getItemKey = (item: BarData | DualBarData, index: number) => {
    return item.key || `${item.label}-${index}`
  }

  const handlePress = (event: GestureResponderEvent) => {
    if (!formatTooltip) return

    const { locationX, locationY } = event.nativeEvent
    const numericBarWidth =
      typeof barWidth === 'string' ? 8 : (barWidth as number)
    const actualChartWidth = chartWidth || 240

    if (mode === 'dual') {
      const barGap = 2
      const groupWidth = numericBarWidth * 2 + barGap
      const groupSpacing = groupWidth + 10
      const groupIndex = Math.floor(locationX / groupSpacing)

      if (groupIndex >= 0 && groupIndex < data.length) {
        const item = data[groupIndex] as DualBarData
        const tooltipData = formatTooltip(item)
        const groupX = groupIndex * groupSpacing + groupWidth / 2

        showTooltip({
          event: {
            ...event,
            nativeEvent: {
              ...event.nativeEvent,
              locationX: groupX,
              locationY: event.nativeEvent.locationY,
            },
          } as GestureResponderEvent,
          content: tooltipData.content,
          subContent: tooltipData.subContent,
        })
      }
    } else if (mode === 'stacked') {
      if (typeof barWidth === 'string' && barWidth.includes('%')) {
        const slotWidth = actualChartWidth / data.length
        const barIndex = Math.floor(locationX / slotWidth)

        if (barIndex >= 0 && barIndex < data.length) {
          const item = data[barIndex] as DualBarData
          const tooltipData = formatTooltip(item)
          const barX = (barIndex + 0.5) * slotWidth

          showTooltip({
            event: {
              ...event,
              nativeEvent: {
                ...event.nativeEvent,
                locationX: barX,
                locationY: event.nativeEvent.locationY,
              },
            } as GestureResponderEvent,
            content: tooltipData.content,
            subContent: tooltipData.subContent,
          })
        }
      } else {
        const slotWidth = actualChartWidth / data.length
        const barIndex = Math.floor(locationX / slotWidth)

        if (barIndex >= 0 && barIndex < data.length) {
          const item = data[barIndex] as DualBarData
          const tooltipData = formatTooltip(item)
          const barX = (barIndex + 0.5) * slotWidth

          showTooltip({
            event: {
              ...event,
              nativeEvent: {
                ...event.nativeEvent,
                locationX: barX,
                locationY: event.nativeEvent.locationY,
              },
            } as GestureResponderEvent,
            content: tooltipData.content,
            subContent: tooltipData.subContent,
          })
        }
      }
    } else {
      if (typeof barWidth === 'string' && barWidth.includes('%')) {
        const slotWidth = actualChartWidth / data.length
        const barIndex = Math.floor(locationX / slotWidth)

        if (barIndex >= 0 && barIndex < data.length) {
          const item = data[barIndex] as BarData
          const tooltipData = formatTooltip(item)
          const barX = (barIndex + 0.5) * slotWidth

          showTooltip({
            event: {
              ...event,
              nativeEvent: {
                ...event.nativeEvent,
                locationX: barX,
                locationY,
              },
            } as GestureResponderEvent,
            content: tooltipData.content,
            subContent: tooltipData.subContent,
          })
        }
      } else {
        const barSpacing = numericBarWidth + 10
        const barIndex = Math.floor(locationX / barSpacing)

        if (barIndex >= 0 && barIndex < data.length) {
          const item = data[barIndex] as BarData
          const tooltipData = formatTooltip(item)
          const barX = barIndex * barSpacing + numericBarWidth / 2

          showTooltip({
            event: {
              ...event,
              nativeEvent: {
                ...event.nativeEvent,
                locationX: barX,
                locationY: event.nativeEvent.locationY,
              },
            } as GestureResponderEvent,
            content: tooltipData.content,
            subContent: tooltipData.subContent,
          })
        }
      }
    }
  }

  if (mode === 'stacked') {
    const stackedData = data as DualBarData[]
    const useFixedPixelMode =
      barGap !== undefined && typeof barWidth === 'number'

    if (useFixedPixelMode) {
      const numericBarWidth = barWidth as number
      const totalWidth =
        stackedData.length * numericBarWidth + (stackedData.length - 1) * barGap

      return (
        <View className={className} style={{ height }}>
          <View className="relative items-center">
            <Pressable
              onPress={handlePress}
              onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
            >
              <Svg width={totalWidth} height={chartHeight}>
                {stackedData.map((item, index) => {
                  const totalValue = item.primaryValue + item.secondaryValue
                  const totalHeight =
                    (totalValue / maxValue) * (chartHeight - padding * 2)
                  const primaryHeight =
                    (item.primaryValue / maxValue) * (chartHeight - padding * 2)
                  const secondaryHeight =
                    (item.secondaryValue / maxValue) *
                    (chartHeight - padding * 2)

                  const xPos = index * (numericBarWidth + barGap)
                  const primaryYPos = chartHeight - padding - primaryHeight
                  const secondaryYPos = chartHeight - padding - totalHeight

                  return (
                    <Fragment key={getItemKey(item, index)}>
                      <Path
                        d={createBottomRoundedRectPath(
                          xPos,
                          primaryYPos,
                          numericBarWidth,
                          primaryHeight,
                          barRadius,
                        )}
                        fill={primaryColor}
                      />
                      <Path
                        d={createTopRoundedRectPath(
                          xPos,
                          secondaryYPos,
                          numericBarWidth,
                          secondaryHeight,
                          barRadius,
                        )}
                        fill={secondaryColor}
                      />
                    </Fragment>
                  )
                })}
              </Svg>
            </Pressable>
            <ChartTooltip {...tooltip} />
          </View>
          <View
            className="flex-row mt-2"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: totalWidth, justifyContent: 'space-between' }}
          >
            {data.map((item, index) => (
              <PlatformText
                key={getItemKey(item, index)}
                color="neutral-700"
                className={labelSize}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: numericBarWidth as number,
                  textAlign: 'center',
                }}
              >
                {item.label}
              </PlatformText>
            ))}
          </View>
        </View>
      )
    }

    return (
      <View className={className} style={{ height }}>
        <View className="relative">
          <Pressable
            onPress={handlePress}
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          >
            <Svg
              width="100%"
              height={chartHeight}
              viewBox={`0 0 100 ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {stackedData.map((item, index) => {
                const totalValue = item.primaryValue + item.secondaryValue

                const totalHeight =
                  (totalValue / maxValue) * (chartHeight - padding * 2)
                const primaryHeight =
                  (item.primaryValue / maxValue) * (chartHeight - padding * 2)
                const secondaryHeight =
                  (item.secondaryValue / maxValue) * (chartHeight - padding * 2)

                const totalBars = stackedData.length
                const slotWidth = 100 / totalBars

                let barWidthValue: number
                if (typeof barWidth === 'string') {
                  const percentageValue = parseFloat(barWidth.replace('%', ''))
                  barWidthValue = (percentageValue / 100) * slotWidth
                } else {
                  barWidthValue = ((barWidth as number) / 240) * slotWidth * 2.4
                }

                const centerX = (index + 0.5) * slotWidth
                const xPos = centerX - barWidthValue / 2

                return (
                  <Fragment key={getItemKey(item, index)}>
                    <Rect
                      x={xPos}
                      y={chartHeight - padding - primaryHeight}
                      width={barWidthValue}
                      height={primaryHeight}
                      fill={primaryColor}
                      rx={0}
                      ry={0}
                    />
                    <Rect
                      x={xPos}
                      y={chartHeight - padding - totalHeight}
                      width={barWidthValue}
                      height={secondaryHeight}
                      fill={secondaryColor}
                      rx={barRadius}
                      ry={barRadius}
                    />
                  </Fragment>
                )
              })}
            </Svg>
          </Pressable>
          <ChartTooltip {...tooltip} />
        </View>
        <View className="flex-row justify-around mt-2">
          {data.map((item, index) => (
            <PlatformText
              key={getItemKey(item, index)}
              color="neutral-700"
              className={labelSize}
            >
              {item.label}
            </PlatformText>
          ))}
        </View>
      </View>
    )
  }

  if (mode === 'dual') {
    const dualData = data as DualBarData[]
    const barGap = 2
    const numericBarWidth = typeof barWidth === 'number' ? barWidth : 4
    const groupWidth = numericBarWidth * 2 + barGap

    return (
      <View className={className} style={{ height }}>
        <View className="relative">
          <Pressable
            onPress={handlePress}
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          >
            <Svg width="100%" height={chartHeight}>
              {dualData.map((item, index) => {
                const startX = index * (groupWidth + 10)

                const bar1Height =
                  (item.primaryValue / maxValue) * (chartHeight - padding * 2)
                const bar2Height =
                  (item.secondaryValue / maxValue) * (chartHeight - padding * 2)

                return (
                  <Fragment key={getItemKey(item, index)}>
                    <Rect
                      x={startX}
                      y={chartHeight - padding - bar1Height}
                      width={numericBarWidth}
                      height={bar1Height}
                      fill={primaryColor}
                      rx={barRadius}
                      ry={barRadius}
                    />
                    <Rect
                      x={startX + numericBarWidth + barGap}
                      y={chartHeight - padding - bar2Height}
                      width={numericBarWidth}
                      height={bar2Height}
                      fill={secondaryColor}
                      rx={barRadius}
                      ry={barRadius}
                    />
                  </Fragment>
                )
              })}
            </Svg>
          </Pressable>
          <ChartTooltip {...tooltip} />
        </View>
        <View className="flex-row justify-around mt-2">
          {data.map((item, index) => (
            <PlatformText
              key={getItemKey(item, index)}
              color="neutral-700"
              className={labelSize}
            >
              {item.label}
            </PlatformText>
          ))}
        </View>
      </View>
    )
  }

  const singleData = data as BarData[]
  const useFixedPixelMode = barGap !== undefined && typeof barWidth === 'number'

  if (useFixedPixelMode) {
    const numericBarWidth = barWidth as number
    const totalWidth =
      singleData.length * numericBarWidth + (singleData.length - 1) * barGap

    return (
      <View className={className} style={{ height }}>
        <View className="relative items-center">
          <Pressable
            onPress={handlePress}
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          >
            <Svg width={totalWidth} height={chartHeight}>
              {singleData.map((item, index) => {
                const barHeight =
                  (item.value / maxValue) * (chartHeight - padding * 2)
                const xPos = index * (numericBarWidth + barGap)
                const yPos = chartHeight - padding - barHeight

                return (
                  <Path
                    key={getItemKey(item, index)}
                    d={createTopRoundedRectPath(
                      xPos,
                      yPos,
                      numericBarWidth,
                      barHeight,
                      barRadius,
                    )}
                    fill={primaryColor}
                  />
                )
              })}
            </Svg>
          </Pressable>
          <ChartTooltip {...tooltip} />
        </View>
        <View
          className="flex-row mt-2"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: totalWidth, justifyContent: 'space-between' }}
        >
          {data.map((item, index) => (
            <PlatformText
              key={getItemKey(item, index)}
              color="neutral-700"
              className={labelSize}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: numericBarWidth, textAlign: 'center' }}
            >
              {item.label}
            </PlatformText>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View className={className} style={{ height }}>
      <View className="relative">
        <Pressable
          onPress={handlePress}
          onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
        >
          <Svg
            width="100%"
            height={chartHeight}
            viewBox={`0 0 100 ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {singleData.map((item, index) => {
              const barHeight =
                (item.value / maxValue) * (chartHeight - padding * 2)

              const totalBars = singleData.length
              const slotWidth = 100 / totalBars

              let barWidthValue: number
              if (typeof barWidth === 'string') {
                const percentageValue = parseFloat(barWidth.replace('%', ''))
                barWidthValue = (percentageValue / 100) * slotWidth
              } else {
                // For numeric barWidth, use it as percentage of slot
                barWidthValue = ((barWidth as number) / 240) * slotWidth * 2.4
              }

              const centerX = (index + 0.5) * slotWidth
              const xPos = centerX - barWidthValue / 2

              return (
                <Rect
                  key={getItemKey(item, index)}
                  x={xPos}
                  y={chartHeight - padding - barHeight}
                  width={barWidthValue}
                  height={barHeight}
                  fill={primaryColor}
                  rx={barRadius}
                  ry={barRadius}
                />
              )
            })}
          </Svg>
        </Pressable>
        <ChartTooltip {...tooltip} />
      </View>
      <View className="flex-row justify-around mt-2">
        {data.map((item, index) => (
          <PlatformText
            key={getItemKey(item, index)}
            color="neutral-700"
            className={labelSize}
          >
            {item.label}
          </PlatformText>
        ))}
      </View>
    </View>
  )
}
