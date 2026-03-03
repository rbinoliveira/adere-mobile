import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Image } from 'expo-image'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

import { LoginForm } from '@/features/auth/components/login-form'
import { useAuth } from '@/features/auth/hooks/auth.hook'
import googleIcon from '@/shared/assets/icons/google.svg'
import { Button } from '@/shared/components/button'
import { Header } from '@/shared/components/header'
import ScreenWrapper from '@/shared/components/screen-wrapper'
import { Separator } from '@/shared/components/separator'
import { SupportCard } from '@/shared/components/support-card'

const styles = StyleSheet.create({
  icon: { height: 16, width: 16 },
})

export function LoginScreen() {
  const { signInWithGoogle, signInWithApple, isAppleAuthAvailable } = useAuth()

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle()
    } catch (error: unknown) {
      if ((error as { code?: string })?.code !== 'SIGN_IN_CANCELLED') {
        Toast.show({
          type: 'error',
          text1: 'Erro no login',
          text2: 'Não foi possível fazer login com o Google.',
        })
      }
    }
  }

  async function handleAppleSignIn() {
    try {
      await signInWithApple()
    } catch (error: unknown) {
      if ((error as { code?: string })?.code !== 'ERR_REQUEST_CANCELED') {
        Toast.show({
          type: 'error',
          text1: 'Erro no login',
          text2: 'Não foi possível fazer login com a Apple.',
        })
      }
    }
  }

  return (
    <>
      <Header title="Bem-vindo(a)" description="Acesse sua conta" />

      <ScreenWrapper
        statusBarStyle="light"
        hasSafeArea={false}
        className="py-5"
      >
        <LoginForm />
        <Separator label="ou" className="my-4" />
        <Button
          onPress={handleGoogleSignIn}
          label="Continuar com Google"
          variant="google"
          icon={<Image source={googleIcon} alt="" style={styles.icon} />}
        />
        {Platform.OS === 'ios' && isAppleAuthAvailable && (
          <Button
            onPress={handleAppleSignIn}
            label="Continuar com Apple"
            variant="apple"
            icon={<FontAwesome name="apple" size={18} color="white" />}
            className="mt-3"
          />
        )}
        <SupportCard />
      </ScreenWrapper>
    </>
  )
}
