import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import {
  LoginFormSchema,
  loginFormSchema,
} from '@/features/auth/schemas/login-form.schema'
import loginIcon from '@/shared/assets/icons/login.svg'
import { Button } from '@/shared/components/button'
import { InputText } from '@/shared/components/text-input'

const styles = StyleSheet.create({
  icon: { height: 16, width: 16 },
})

export function LoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginFormSchema),
  })

  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const passwordRef = useRef<TextInput | null>(null)

  async function onSubmit({ email, password }: LoginFormSchema) {
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (error: unknown) {
      let message = 'Ocorreu um erro ao fazer login. Tente novamente.'

      if (error?.code === 'auth/invalid-credential') {
        message = 'E-mail ou senha incorretos.'
      } else if (error?.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado.'
      } else if (error?.code === 'auth/wrong-password') {
        message = 'Senha incorreta.'
      } else if (error?.code === 'auth/too-many-requests') {
        message = 'Muitas tentativas. Tente novamente mais tarde.'
      } else if (error?.code === 'auth/user-disabled') {
        message = 'Esta conta foi desativada.'
      }

      Toast.show({
        type: 'error',
        text1: 'Erro no login',
        text2: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="w-full">
      <InputText
        control={control}
        name="email"
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        label="E-mail"
        labelDescription="Seu endereço de email"
        labelIcon={<FontAwesome name={'envelope'} size={14} color={'white'} />}
        className="mb-4"
        editable={!isLoading}
      />
      <InputText
        ref={passwordRef}
        control={control}
        name="password"
        placeholder="Digite sua senha"
        secureTextEntry
        onSubmitEditing={handleSubmit(onSubmit)}
        label="Senha"
        labelDescription="Digite sua senha"
        labelIcon={<FontAwesome name={'lock'} size={14} color={'white'} />}
        className="mb-[0.625rem]"
        editable={!isLoading}
      />
      <Button
        onPress={() => router.push('/recover-password')}
        className="self-end mb-[1.125rem]"
        label="Esqueceu a senha?"
        variant="ghost"
        labelClassName="text-primary text-xs font-inter-medium"
        disabled={isLoading}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        label={isLoading ? 'Entrando...' : 'Entrar'}
        variant="login"
        icon={
          !isLoading && <Image source={loginIcon} alt="" style={styles.icon} />
        }
        disabled={isLoading}
      />
    </View>
  )
}
