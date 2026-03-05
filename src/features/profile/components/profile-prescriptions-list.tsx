import { View } from 'react-native'

import type { Prescription } from '@/features/medications/types/prescription'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { AccentColors } from '@/shared/constants/theme.constant'

type ProfilePrescriptionsListProps = {
  prescriptions: Prescription[]
}

export function ProfilePrescriptionsList({
  prescriptions,
}: ProfilePrescriptionsListProps) {
  return (
    <View className="px-5 mt-6">
      <PlatformText
        fontSize={16}
        fontWeight={700}
        color="neutral-900"
        className="mb-3"
      >
        Prescrições ativas
      </PlatformText>
      {prescriptions.length === 0 ? (
        <View className="bg-base-white rounded-2xl p-4 items-center">
          <PlatformText fontSize={14} color="neutral-500">
            Nenhuma prescrição ativa
          </PlatformText>
        </View>
      ) : (
        prescriptions.map((p) => (
          <View
            key={p.id}
            className="bg-base-white rounded-2xl p-4 mb-2 flex-row items-center gap-3"
          >
            <Icon iconName="pill" size={20} color={AccentColors[500]} />
            <View className="flex-1">
              <PlatformText fontSize={14} fontWeight={600} color="neutral-900">
                {p.medicationName}
              </PlatformText>
              <PlatformText fontSize={12} color="neutral-600">
                {p.dosage} • {p.times.join(', ')}
              </PlatformText>
            </View>
          </View>
        ))
      )}
    </View>
  )
}
