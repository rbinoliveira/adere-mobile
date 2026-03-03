import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { ScrollViewPadding } from '@/shared/constants/design-tokens'

type DoctorInfo = {
  id: string
  name: string
  specialty: string
  clinic: string
  phone: string
  email?: string
  address?: string
  nextAppointment?: Date
}

// Mock data - will be replaced with API data later
function getMockDoctorInfo(): DoctorInfo {
  return {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Dentista',
    clinic: 'Clínica Sorriso Perfeito',
    phone: '(11) 99999-9999',
    email: 'dr.joao@clinica.com',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  }
}

type InfoRowProps = {
  icon: keyof typeof FontAwesome.glyphMap
  iconColor: string
  label: string
  value: string
  onPress?: () => void
}

const ICON_BG_OPACITY = '15'

function InfoRow({ icon, iconColor, label, value, onPress }: InfoRowProps) {
  const content = (
    <View className="flex-row items-center py-3 border-b border-gray-100">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${iconColor}${ICON_BG_OPACITY}` }}
      >
        <FontAwesome name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-text-five font-inter text-xs">{label}</Text>
        <Text className="text-text-one font-inter-medium text-sm">{value}</Text>
      </View>
      {onPress && (
        <FontAwesome name="chevron-right" size={14} color="#9CA3AF" />
      )}
    </View>
  )

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>
  }

  return content
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function DoctorScreen() {
  const doctor = useMemo(() => getMockDoctorInfo(), [])

  function handleCallDoctor() {
    const phoneNumber = doctor.phone.replace(/\D/g, '')
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível fazer a ligação.',
      })
    })
  }

  function handleEmailDoctor() {
    if (doctor.email) {
      Linking.openURL(`mailto:${doctor.email}`).catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível abrir o email.',
        })
      })
    }
  }

  function handleOpenMaps() {
    if (doctor.address) {
      const encodedAddress = encodeURIComponent(doctor.address)
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`).catch(
        () => {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Não foi possível abrir o mapa.',
          })
        },
      )
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-5 py-4">
        <Text className="text-text-one font-inter-bold text-xl">
          Meu Médico
        </Text>
        <Text className="text-text-five font-inter text-sm">
          Informações de contato
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: ScrollViewPadding.bottom }}
      >
        {/* Doctor Card */}
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <View className="items-center mb-4">
            <View className="w-20 h-20 rounded-full bg-blue-500 items-center justify-center mb-3">
              <FontAwesome name="user-md" size={36} color="white" />
            </View>
            <Text className="text-text-one font-inter-bold text-lg">
              {doctor.name}
            </Text>
            <Text className="text-text-five font-inter text-sm">
              {doctor.specialty}
            </Text>
            <Text className="text-primary font-inter-medium text-sm mt-1">
              {doctor.clinic}
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={handleCallDoctor}
              className="flex-1 bg-green-500 py-3 rounded-lg flex-row items-center justify-center gap-2"
            >
              <FontAwesome name="phone" size={16} color="white" />
              <Text className="text-white font-inter-semibold text-sm">
                Ligar
              </Text>
            </Pressable>
            {doctor.email && (
              <Pressable
                onPress={handleEmailDoctor}
                className="flex-1 bg-blue-500 py-3 rounded-lg flex-row items-center justify-center gap-2"
              >
                <FontAwesome name="envelope" size={16} color="white" />
                <Text className="text-white font-inter-semibold text-sm">
                  Email
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <Text className="text-text-one font-inter-bold text-base mb-2">
            Informações de Contato
          </Text>

          <InfoRow
            icon="phone"
            iconColor="#22C55E"
            label="Telefone"
            value={doctor.phone}
            onPress={handleCallDoctor}
          />

          {doctor.email && (
            <InfoRow
              icon="envelope"
              iconColor="#3B82F6"
              label="Email"
              value={doctor.email}
              onPress={handleEmailDoctor}
            />
          )}

          {doctor.address && (
            <InfoRow
              icon="map-marker"
              iconColor="#EF4444"
              label="Endereço"
              value={doctor.address}
              onPress={handleOpenMaps}
            />
          )}
        </View>

        {/* Next Appointment */}
        {doctor.nextAppointment && (
          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-100 mb-6">
            <View className="flex-row items-center gap-2 mb-2">
              <FontAwesome name="calendar" size={16} color="#3B82F6" />
              <Text className="text-blue-700 font-inter-bold text-sm">
                Próxima Consulta
              </Text>
            </View>
            <Text className="text-blue-700 font-inter text-sm capitalize">
              {formatDate(doctor.nextAppointment)}
            </Text>
          </View>
        )}

        {/* Tips */}
        <View className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
          <View className="flex-row items-center gap-2 mb-2">
            <FontAwesome name="lightbulb-o" size={16} color="#D97706" />
            <Text className="text-yellow-700 font-inter-bold text-sm">
              Lembrete
            </Text>
          </View>
          <Text className="text-yellow-700 font-inter text-sm">
            Em caso de dúvidas sobre seus medicamentos ou efeitos colaterais,
            entre em contato com seu médico.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
