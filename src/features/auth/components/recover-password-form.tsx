import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import {
  RecoverPasswordFormSchema,
  recoverpasswordFormSchema,
} from '@/features/auth/schemas/recover-password-form.schema'
import loginIcon from '@/shared/assets/icons/login.svg'
import { Button } from '@/shared/components/button'
import { InputText } from '@/shared/components/text-input'

const styles = StyleSheet.create({
  icon: { height: 16, width: 16 },
})

export function RecoverPasswordForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(recoverpasswordFormSchema),
  })

  const { recoverPassword } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit({ email }: RecoverPasswordFormSchema) {
    setIsLoading(true)
    try {
      await recoverPassword(email)
      Toast.show({
        type: 'success',
        text1: 'E-mail enviado!',
        text2: 'Verifique sua caixa de entrada para redefinir sua senha.',
      })
      router.back()
    } catch (error: unknown) {
      let message = 'Não foi possível enviar o e-mail. Tente novamente.'

      if (error?.code === 'auth/user-not-found') {
        message = 'Não encontramos uma conta com este e-mail.'
      } else if (error?.code === 'auth/invalid-email') {
        message = 'E-mail inválido.'
      } else if (error?.code === 'auth/too-many-requests') {
        message = 'Muitas tentativas. Tente novamente mais tarde.'
      }

      Toast.show({
        type: 'error',
        text1: 'Erro ao recuperar senha',
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
        label="E-mail"
        labelDescription="Seu endereço de email"
        labelIcon={<FontAwesome name={'envelope'} size={14} color={'white'} />}
        className="mb-4"
        onSubmitEditing={handleSubmit(onSubmit)}
        editable={!isLoading}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        label={isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        variant="login"
        icon={
          !isLoading && <Image source={loginIcon} alt="" style={styles.icon} />
        }
        disabled={isLoading}
      />
      <Button
        onPress={() => router.back()}
        className="self-center mt-4"
        label="Lembrou da senha? Fazer login"
        variant="ghost"
        labelClassName="text-primary text-xs font-inter-medium"
        disabled={isLoading}
      />
    </View>
  )
}
