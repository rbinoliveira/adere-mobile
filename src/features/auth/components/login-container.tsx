import { ReactNode } from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import LoginBg from '@/shared/assets/images/login-bg.png'

type LoginContainerProps = {
  children: ReactNode
}

export function LoginContainer({ children }: LoginContainerProps) {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-base-black">
      <ImageBackground
        source={LoginBg}
        className="flex-1 w-full h-full"
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="flex-grow"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              className="flex-1 px-8 bg-black/50"
              style={{
                paddingTop: insets.top + 96,
              }}
            >
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}
