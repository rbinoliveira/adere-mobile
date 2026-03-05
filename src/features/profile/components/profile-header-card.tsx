import { View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Avatar } from '@/shared/components/avatar'

type ProfileHeaderCardProps = {
  photoURL?: string
  displayName?: string
  email?: string
}

export function ProfileHeaderCard({
  photoURL,
  displayName,
  email,
}: ProfileHeaderCardProps) {
  return (
    <View className="items-center py-6 px-5">
      <Avatar photo={photoURL} name={displayName} size="xl" />
      <PlatformText
        fontSize={20}
        fontWeight={700}
        color="neutral-900"
        className="mt-4"
      >
        {displayName ?? 'Paciente'}
      </PlatformText>
      <PlatformText fontSize={14} color="neutral-600" className="mt-1">
        {email ?? ''}
      </PlatformText>
    </View>
  )
}
