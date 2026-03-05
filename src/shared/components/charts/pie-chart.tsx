import React, { useMemo } from 'react'
import { GestureResponderEvent, Pressable, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { PlatformText } from '@/features/platform/components/platform-text'
import { AccentColors } from '@/shared/constants/theme.constant'
import { useChartTooltip } from '@/shared/hooks/chart-tooltip.hook'

import { ChartTooltip } from '../chart-tooltip'

type PieChartData = {
  label: string
  value: number
  id?: string
}

type PieChartProps = {
  data: PieChartData[]
  label?: string
  size?: number
  innerRadius?: number
  className?: string
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + amount)
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount)
  const b = Math.min(255, (num & 0x0000ff) + amount)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function getAngleFromPoint(
  centerX: number,
  centerY: number,
  x: number,
  y: number,
): number {
  const dx = x - centerX
  const dy = y - centerY
  let angle = Math.atan2(dy, dx)
  if (angle < 0) angle += 2 * Math.PI
  angle += Math.PI / 2
  if (angle >= 2 * Math.PI) angle -= 2 * Math.PI
  return angle
}

function createArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const angleDiff = endAngle - startAngle

  // Detecta círculo completo com margem maior para garantir
  const isFullCircle = angleDiff >= 2 * Math.PI - 0.01

  if (isFullCircle) {
    // Desenha dois semicírculos para formar um círculo completo
    const start = {
      x: centerX + radius * Math.cos(startAngle),
      y: centerY + radius * Math.sin(startAngle),
    }
    const mid = {
      x: centerX + radius * Math.cos(startAngle + Math.PI),
      y: centerY + radius * Math.sin(startAngle + Math.PI),
    }
    return [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 1 1 ${mid.x} ${mid.y}`,
      `A ${radius} ${radius} 0 1 1 ${start.x} ${start.y}`,
    ].join(' ')
  }

  const start = {
    x: centerX + radius * Math.cos(startAngle),
    y: centerY + radius * Math.sin(startAngle),
  }
  const end = {
    x: centerX + radius * Math.cos(endAngle),
    y: centerY + radius * Math.sin(endAngle),
  }

  const largeArcFlag = angleDiff > Math.PI ? 1 : 0

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
  ].join(' ')
}

export function PieChart({
  data,
  label,
  size = 70,
  innerRadius = 0.8,
  className,
}: PieChartProps) {
  const { tooltip, showTooltip } = useChartTooltip({
    duration: 3000,
    xOffset: -30,
    yOffset: -40,
  })

  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0)
  }, [data])

  const arcs = useMemo(() => {
    if (total === 0) return []

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 4
    const innerRadiusValue = radius * innerRadius

    let currentAngle = -Math.PI / 2

    return data.map((item, index) => {
      const percentage = item.value / total
      const angle = percentage * 2 * Math.PI
      const startAngle = currentAngle
      let endAngle = currentAngle + angle

      if (data.length === 1 || Math.abs(angle - 2 * Math.PI) < 0.001) {
        endAngle = startAngle + 2 * Math.PI
      }

      const path = createArcPath(centerX, centerY, radius, startAngle, endAngle)

      const colorAmount = data.length <= 4 ? index * 0.15 : index * 0.075
      const color = lightenColor(
        AccentColors[500],
        Math.round(colorAmount * 255),
      )

      currentAngle = endAngle

      return {
        ...item,
        path,
        color,
        percentage,
        index,
        startAngle,
        endAngle,
        centerX,
        centerY,
        radius,
        innerRadiusValue,
      }
    })
  }, [data, total, size, innerRadius])

  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 4
    const strokeWidth = 8

    const distance = Math.sqrt(
      Math.pow(locationX - centerX, 2) + Math.pow(locationY - centerY, 2),
    )

    // Verifica se o clique está dentro da área do stroke (8px de largura)
    if (
      distance < radius - strokeWidth / 2 ||
      distance > radius + strokeWidth / 2
    ) {
      return
    }

    const angle = getAngleFromPoint(centerX, centerY, locationX, locationY)

    const clickedArc = arcs.find((arc) => {
      const start = arc.startAngle
      const end = arc.endAngle

      if (end < start) {
        return angle >= start || angle <= end
      }
      return angle >= start && angle <= end
    })

    if (clickedArc) {
      // Use 1 decimal place for more accuracy
      const percentage = (clickedArc.percentage * 100).toFixed(1)

      // Cria um evento modificado com coordenadas relativas ao gráfico
      const modifiedEvent = {
        ...event,
        nativeEvent: {
          ...event.nativeEvent,
          locationX,
          locationY,
        },
      }

      showTooltip({
        event: modifiedEvent as GestureResponderEvent,
        content: clickedArc.label,
        subContent: `${percentage}%`,
      })
    }
  }

  return (
    <View className={className}>
      <View className="items-center justify-center gap-2.5 relative">
        <Pressable onPress={handlePress}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {arcs.map((arc) => (
              <Path
                key={arc.index}
                d={arc.path}
                fill="none"
                stroke={arc.color}
                strokeWidth={8}
                strokeLinecap="round"
              />
            ))}
          </Svg>
        </Pressable>
        <ChartTooltip {...tooltip} />
        {label && (
          <PlatformText
            fontSize={12}
            className="max-w-[80px] text-center uppercase text-[8px]"
          >
            {label}
          </PlatformText>
        )}
      </View>
    </View>
  )
}
