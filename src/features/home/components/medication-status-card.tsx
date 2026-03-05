import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { TodayMedication } from '@/features/medications/types/prescription'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import {
  NeutralColors,
  SuccessColors,
  WarningColors,
} from '@/shared/constants/theme.constant'

type MedicationStatusCardProps = {
  medication: TodayMedication
  onMarkTaken?: (medication: TodayMedication) => Promise<void>
  markingId?: string // prescriptionId+time being marked right now
}

const STATUS_CONFIG = {
  'on-time': {
    label: 'No horário',
    labelColor: '#26A324' as const,
    borderColor: '#26A324',
    iconColor: SuccessColors[700],
    buttonLabel: 'Marcar como Tomado',
    buttonBg: '#26A324',
  },
  late: {
    label: '⚠ Atrasado',
    labelColor: '#F8D310' as const,
    borderColor: '#F8D310',
    iconColor: WarningColors[500],
    buttonLabel: 'Tomar Agora',
    buttonBg: '#F8D310',
  },
  'very-late': {
    label: '🔴 Muito atrasado',
    labelColor: '#C3161C' as const,
    borderColor: '#C3161C',
    iconColor: '#C3161C',
    buttonLabel: 'Tomar com Cuidado',
    buttonBg: '#C3161C',
  },
  wait: {
    label: 'Aguardar horário',
    labelColor: '#72777A' as const,
    borderColor: NeutralColors[300],
    iconColor: NeutralColors[600],
    buttonLabel: 'Aguardar Horário',
    buttonBg: NeutralColors[350],
  },
  taken: {
    label: '✓ Tomado',
    labelColor: '#26A324' as const,
    borderColor: '#26A324',
    iconColor: SuccessColors[700],
    buttonLabel: 'Tomado',
    buttonBg: '#26A324',
  },
}

export function MedicationStatusCard({
  medication,
  onMarkTaken,
  markingId,
}: MedicationStatusCardProps) {
  const { prescription, scheduledTime, status } = medication
  const config = STATUS_CONFIG[status]
  const itemId = `${prescription.id}-${scheduledTime}`
  const isMarking = markingId === itemId
  const isWait = status === 'wait'
  const isTaken = status === 'taken'

  return (
    <View
      className="bg-base-white rounded-2xl p-4 mb-3"
      style={[styles.card, { borderLeftColor: config.borderColor }]}
    >
      {/* Header: nome + horário + status */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-row items-center gap-3 flex-1">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: `${config.borderColor}15` }}
          >
            <Icon iconName="pill" size={22} color={config.iconColor} />
          </View>
          <View className="flex-1">
            <PlatformText
              fontSize={16}
              fontWeight={700}
              color="neutral-900"
              numberOfLines={1}
            >
              {prescription.medicationName}
            </PlatformText>
            <PlatformText fontSize={13} color="neutral-600">
              {prescription.dosage}
            </PlatformText>
          </View>
        </View>

        <View className="items-end">
          <View className="flex-row items-center gap-1">
            <Icon iconName="clock" size={14} color={config.iconColor} />
            <PlatformText
              fontSize={15}
              fontWeight={700}
              style={{ color: config.iconColor }}
            >
              {scheduledTime}
            </PlatformText>
          </View>
          <PlatformText fontSize={12} style={{ color: config.labelColor }}>
            {config.label}
          </PlatformText>
        </View>
      </View>

      {/* Como tomar */}
      {prescription.instructions ? (
        <View className="mb-3">
          <PlatformText fontSize={13} fontWeight={600} color="neutral-700">
            Como tomar:
          </PlatformText>
          <PlatformText fontSize={13} color="neutral-600" className="mt-0.5">
            {prescription.instructions}
          </PlatformText>
        </View>
      ) : null}

      {/* Botão de ação */}
      <TouchableOpacity
        className="rounded-xl h-12 items-center justify-center flex-row gap-2"
        style={[
          getStatusButtonStyle(status),
          (isWait || isTaken || isMarking) && statusButtonStyles.disabled,
        ]}
        disabled={isWait || isTaken || isMarking}
        onPress={() => onMarkTaken?.(medication)}
      >
        {isMarking ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            {!isWait && !isTaken && (
              <Icon
                iconName="clock"
                size={18}
                color={isWait ? NeutralColors[700] : '#fff'}
              />
            )}
            <PlatformText
              fontSize={15}
              fontWeight={600}
              color={isWait ? 'neutral-700' : 'base-white'}
            >
              {config.buttonLabel}
            </PlatformText>
          </>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderLeftWidth: 4 },
})

const statusButtonStyles = StyleSheet.create({
  disabled: { opacity: 0.6 },
  late: { backgroundColor: STATUS_CONFIG.late.buttonBg },
  onTime: { backgroundColor: STATUS_CONFIG['on-time'].buttonBg },
  taken: { backgroundColor: STATUS_CONFIG.taken.buttonBg },
  veryLate: { backgroundColor: STATUS_CONFIG['very-late'].buttonBg },
  wait: { backgroundColor: STATUS_CONFIG.wait.buttonBg },
})

function getStatusButtonStyle(
  status: keyof typeof STATUS_CONFIG,
): (typeof statusButtonStyles)['onTime'] {
  switch (status) {
    case 'on-time':
      return statusButtonStyles.onTime
    case 'late':
      return statusButtonStyles.late
    case 'very-late':
      return statusButtonStyles.veryLate
    case 'wait':
      return statusButtonStyles.wait
    case 'taken':
      return statusButtonStyles.taken
  }
}
