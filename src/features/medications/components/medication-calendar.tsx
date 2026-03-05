import { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { Prescription } from '@/features/medications/types/prescription'
import { PlatformText } from '@/features/platform/components/platform-text'
import { AccentColors, BaseColors } from '@/shared/constants/theme.constant'

type MedicationCalendarProps = {
  prescriptions: Prescription[]
}

function getWeekDays(startOffset = 0): Date[] {
  const days: Date[] = []
  const today = new Date()
  for (let i = startOffset; i < startOffset + 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function getMedicationsForDay(
  prescriptions: Prescription[],
  date: Date,
): { name: string; times: string[] }[] {
  const result: { name: string; times: string[] }[] = []

  for (const p of prescriptions) {
    const start = new Date(p.startDate)
    const end = new Date(start)
    end.setDate(end.getDate() + p.durationDays)

    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )
    const startOnly = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    )
    const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate())

    if (dateOnly >= startOnly && dateOnly <= endOnly) {
      result.push({ name: p.medicationName, times: p.times })
    }
  }
  return result
}

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export function MedicationCalendar({ prescriptions }: MedicationCalendarProps) {
  const [selectedDay, setSelectedDay] = useState(0) // index into weekDays
  const weekDays = getWeekDays(0)
  const selectedDate = weekDays[selectedDay] ?? weekDays[0]!
  const medsForDay = getMedicationsForDay(prescriptions, selectedDate)
  const today = new Date()

  return (
    <View testID="medication-calendar">
      <PlatformText
        fontSize={16}
        fontWeight={700}
        color="neutral-900"
        className="mb-3"
      >
        Calendário de Remédios
      </PlatformText>

      {/* Week strip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <View className="flex-row gap-2">
          {weekDays.map((day, i) => {
            const isToday =
              day.getDate() === today.getDate() &&
              day.getMonth() === today.getMonth()
            const isSelected = i === selectedDay
            const hasMeds = getMedicationsForDay(prescriptions, day).length > 0
            const dayBgStyle = isSelected
              ? calendarStyles.daySelected
              : isToday
                ? calendarStyles.dayToday
                : calendarStyles.dayDefault

            return (
              <TouchableOpacity
                key={day.toISOString()}
                onPress={() => setSelectedDay(i)}
                className="items-center w-14 py-2 rounded-2xl"
                style={dayBgStyle}
              >
                <PlatformText
                  fontSize={12}
                  color={isSelected ? 'base-white' : 'neutral-600'}
                >
                  {DAY_LABELS[day.getDay()]}
                </PlatformText>
                <PlatformText
                  fontSize={17}
                  fontWeight={700}
                  color={isSelected ? 'base-white' : 'neutral-900'}
                >
                  {day.getDate()}
                </PlatformText>
                <PlatformText
                  fontSize={11}
                  color={isSelected ? 'base-white' : 'neutral-500'}
                >
                  {MONTH_LABELS[day.getMonth()]}
                </PlatformText>
                {hasMeds && (
                  <View
                    className="w-1.5 h-1.5 rounded-full mt-1"
                    style={
                      isSelected
                        ? calendarStyles.dotSelected
                        : calendarStyles.dotDefault
                    }
                  />
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      {/* Meds for selected day */}
      {medsForDay.length === 0 ? (
        <View className="bg-base-white rounded-2xl p-4 items-center">
          <PlatformText fontSize={14} color="neutral-500">
            Nenhum remédio neste dia
          </PlatformText>
        </View>
      ) : (
        medsForDay.map((med) => (
          <View
            key={`${med.name}-${med.times.join('-')}`}
            className="bg-base-white rounded-2xl p-4 mb-2"
          >
            <PlatformText
              fontSize={15}
              fontWeight={700}
              color="neutral-900"
              className="mb-1"
            >
              {med.name}
            </PlatformText>
            <View className="flex-row flex-wrap gap-2">
              {med.times.map((t) => (
                <View
                  key={t}
                  className="px-3 py-1 rounded-full"
                  style={calendarStyles.timeChip}
                >
                  <PlatformText
                    fontSize={13}
                    fontWeight={600}
                    color="accent-500"
                  >
                    {t}
                  </PlatformText>
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  )
}

const calendarStyles = StyleSheet.create({
  dayDefault: { backgroundColor: BaseColors.white },
  daySelected: { backgroundColor: AccentColors[500] },
  dayToday: { backgroundColor: `${AccentColors[500]}20` },
  dotDefault: { backgroundColor: AccentColors[500] },
  dotSelected: { backgroundColor: BaseColors.white },
  timeChip: { backgroundColor: `${AccentColors[500]}15` },
})
