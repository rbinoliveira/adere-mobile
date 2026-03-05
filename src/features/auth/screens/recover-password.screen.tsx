import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { z } from 'zod'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { PlatformText } from '@/features/platform/components/platform-text'
import { Button } from '@/shared/components/button'
import { Icon } from '@/shared/components/icons/icon'
import { Input } from '@/shared/components/input'
import { NeutralColors } from '@/shared/constants/theme.constant'

const schema = z.object({
  email: z.email('Email inválido'),
})

type RecoverPasswordSchema = z.infer<typeof schema>

export function RecoverPasswordScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { sendPasswordReset } = useAuth()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const { control, handleSubmit } = useForm<RecoverPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: RecoverPasswordSchema) {
    try {
      setLoading(true)
      await sendPasswordReset(data.email)
      setSent(true)
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível enviar o email. Verifique o endereço e tente novamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        className="flex-1 bg-base-white"
        contentContainerStyle={[
          recoverPasswordStyles.contentContainer,
          { paddingTop: insets.top + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start p-2 -ml-2 mb-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon iconName="arrow-left" size={24} color="#1C1C1C" />
          </TouchableOpacity>

          <PlatformText fontSize={28} fontWeight={700} color="neutral-900">
            Recuperar Senha
          </PlatformText>
          <PlatformText fontSize={15} color="neutral-600" className="mt-1">
            Vamos ajudar você a recuperar sua conta.
          </PlatformText>
        </View>

        <View className="px-6">
          {sent ? (
            /* Estado: email enviado */
            <View className="items-center py-8">
              <View className="w-20 h-20 rounded-full bg-success-600/10 items-center justify-center mb-4">
                <Icon iconName="envelope" size={40} color="#26A324" />
              </View>
              <PlatformText
                fontSize={20}
                fontWeight={700}
                color="neutral-900"
                className="text-center"
              >
                Email enviado!
              </PlatformText>
              <PlatformText
                fontSize={15}
                color="neutral-600"
                className="mt-2 text-center"
              >
                Verifique sua caixa de entrada e siga as instruções para criar
                uma nova senha.
              </PlatformText>
              <PlatformText
                fontSize={13}
                color="neutral-500"
                className="mt-2 text-center"
              >
                Não esqueça de verificar também a pasta de spam.
              </PlatformText>
              <Button className="mt-8 w-full" onPress={() => router.back()}>
                Fazer login
              </Button>
            </View>
          ) : (
            <>
              {/* Como funciona */}
              <View className="bg-neutral-400/30 rounded-xl p-4 mb-6">
                <PlatformText
                  fontSize={15}
                  fontWeight={600}
                  color="neutral-900"
                  className="mb-1"
                >
                  Como funciona?
                </PlatformText>
                <PlatformText fontSize={14} color="neutral-700">
                  O Adere vai te enviar um link para criar uma nova senha.
                  Verifique também sua caixa de spam.
                </PlatformText>
              </View>

              {/* Campo de email */}
              <PlatformText
                fontSize={15}
                fontWeight={600}
                color="neutral-900"
                className="mb-2"
              >
                Seu Email
              </PlatformText>
              <Input
                name="email"
                control={control}
                theme="light"
                icon={
                  <Icon
                    iconName="envelope"
                    size={22}
                    color={NeutralColors[700]}
                  />
                }
                placeholder="seuemail@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="go"
                onSubmitEditing={handleSubmit(onSubmit)}
              />

              <Button
                className="mt-5"
                onPress={handleSubmit(onSubmit)}
                isLoading={loading}
              >
                Enviar Link de Recuperação
              </Button>
            </>
          )}
        </View>

        {/* Opções de suporte */}
        <View className="mt-8 px-6">
          <PlatformText
            fontSize={13}
            color="neutral-500"
            className="text-center mb-4"
          >
            Outras opções
          </PlatformText>

          <TouchableOpacity
            className="flex-row items-center gap-3 py-4 border-b border-neutral-200"
            onPress={() => Linking.openURL('tel:+55')}
          >
            <Icon iconName="phone" size={20} color="#72777A" />
            <PlatformText fontSize={15} color="neutral-800">
              Falar com Suporte
            </PlatformText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-3 py-4 border-b border-neutral-200"
            onPress={() => Linking.openURL('tel:+55')}
          >
            <Icon iconName="whatsapp" size={20} color="#72777A" />
            <PlatformText fontSize={15} color="neutral-800">
              Contatar Dentista/Clínica
            </PlatformText>
          </TouchableOpacity>

          <Button
            variant="unstyled"
            className="mt-5 items-center"
            onPress={() => router.back()}
          >
            <PlatformText fontSize={15} color="neutral-600">
              Lembrou da senha?{' '}
              <PlatformText
                fontSize={15}
                color="accent-500"
                className="underline"
              >
                Fazer login
              </PlatformText>
            </PlatformText>
          </Button>
        </View>
      </ScrollView>
    </>
  )
}

const recoverPasswordStyles = StyleSheet.create({
  contentContainer: { paddingBottom: 40 },
})
