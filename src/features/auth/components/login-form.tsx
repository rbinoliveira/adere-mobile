import { zodResolver } from '@hookform/resolvers/zod'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Platform, StyleSheet, TextInput, View } from 'react-native'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { LoginSchema, loginSchema } from '@/features/auth/schemas/login.schema'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Button } from '@/shared/components/button'
import { Icon } from '@/shared/components/icons/icon'
import { Input } from '@/shared/components/input'
import { BaseColors } from '@/shared/constants/theme.constant'

export function LoginForm() {
  const router = useRouter()
  const { signIn, signInWithGoogle, signInWithApple } = useAuth()
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(
    null,
  )
  const passwordRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: LoginSchema) {
    try {
      setLoading(true)
      await signIn(data.email, data.password)
      router.replace('/(private)/home')
    } catch {
      Alert.alert(
        'Erro ao entrar',
        'Email ou senha incorretos. Tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    try {
      setSocialLoading('google')
      await signInWithGoogle()
      router.replace('/(private)/home')
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível entrar com Google. Tente novamente.',
      )
    } finally {
      setSocialLoading(null)
    }
  }

  async function handleAppleSignIn() {
    try {
      setSocialLoading('apple')
      await signInWithApple()
      router.replace('/(private)/home')
    } catch (error) {
      console.error('[Apple SignIn Error]', error)
      Alert.alert('Erro', 'Não foi possível entrar com Apple. Tente novamente.')
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <>
      {/* Email e senha — campos grandes para facilitar leitura */}
      <View className="gap-4">
        <Input
          name="email"
          control={control}
          icon={<Icon iconName="envelope" size={24} color={BaseColors.white} />}
          placeholder="Seu endereço de email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          errorClassName="text-accent-600"
          testID="email-input"
        />
        <Input
          name="password"
          control={control}
          icon={<Icon iconName="lock" size={24} color={BaseColors.white} />}
          placeholder="Digite sua senha"
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={handleSubmit(onSubmit)}
          errorClassName="text-accent-600"
          testID="password-input"
        />
      </View>

      <Button
        variant="unstyled"
        className="self-start mt-3 mb-6"
        onPress={() => router.push('/(public)/(auth)/recover-password')}
      >
        <PlatformText fontSize={15} color="base-white" className="underline">
          Esqueceu a senha?
        </PlatformText>
      </Button>

      {/* Botão principal — grande e com texto claro */}
      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
        testID="login-button"
      >
        Entrar
      </Button>

      {/* Divisor */}
      <View className="flex-row items-center my-5 gap-3">
        <View className="flex-1 h-[1px] bg-white/30" />
        <PlatformText fontSize={14} color="base-white">
          ou continue com
        </PlatformText>
        <View className="flex-1 h-[1px] bg-white/30" />
      </View>

      {/* Google */}
      <Button
        variant="outline"
        className="mb-3 border-white/50 bg-white/10 flex-row items-center justify-center gap-3"
        onPress={handleGoogleSignIn}
        isLoading={socialLoading === 'google'}
      >
        <PlatformText fontSize={16} color="base-white" fontWeight={500}>
          Continuar com Google
        </PlatformText>
      </Button>

      {/* Apple — só no iOS */}
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={13}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  appleButton: { height: 56, width: '100%' },
})
