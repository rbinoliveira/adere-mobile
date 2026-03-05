import { Image, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import Logo from '@/shared/assets/images/logo.png'

export function LoginHeader() {
  return (
    <View className="items-center mb-10">
      <Image source={Logo} className="w-28 h-28 mb-6" resizeMode="contain" />

      <PlatformText
        fontSize={32}
        fontWeight={700}
        color="base-white"
        className="text-center"
      >
        Bem-vindo
      </PlatformText>

      <PlatformText
        fontSize={17}
        color="base-white"
        className="text-center mt-1 opacity-80"
      >
        Acesse sua conta
      </PlatformText>
    </View>
  )
}
