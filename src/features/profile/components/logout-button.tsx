import { Alert, TouchableOpacity, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { Icon } from '@/shared/components/icons/icon'
import { AccentColors } from '@/shared/constants/theme.constant'

type LogoutButtonProps = {
  onLogout: () => void
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  function handlePress() {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: onLogout,
      },
    ])
  }

  return (
    <View className="px-5 mt-8">
      <TouchableOpacity
        className="flex-row items-center justify-center gap-3 h-14 rounded-2xl border border-accent-500"
        onPress={handlePress}
      >
        <Icon iconName="logout" size={20} color={AccentColors[500]} />
        <PlatformText fontSize={16} fontWeight={600} color="accent-500">
          Sair
        </PlatformText>
      </TouchableOpacity>
    </View>
  )
}
