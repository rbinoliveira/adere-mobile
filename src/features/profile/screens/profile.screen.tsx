import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { PlatformText } from '@/features/platform/components/platform-text'

import { LogoutButton } from '../components/logout-button'
import { ProfileAdherenceSection } from '../components/profile-adherence-section'
import { ProfileHeaderCard } from '../components/profile-header-card'
import { ProfilePrescriptionsList } from '../components/profile-prescriptions-list'
import { useProfile } from '../hooks/use-profile.hook'

export function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const { user, signOut } = useAuth()
  const { loadingStats, stats, prescriptions } = useProfile()

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F5" />
      <ScrollView
        className="flex-1 bg-neutral-400"
        style={{ paddingTop: insets.top }}
        contentContainerStyle={profileScrollStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 py-4 bg-neutral-400">
          <PlatformText fontSize={22} fontWeight={700} color="neutral-900">
            Perfil
          </PlatformText>
        </View>

        <ProfileHeaderCard
          photoURL={user?.photoURL ?? undefined}
          displayName={user?.displayName ?? undefined}
          email={user?.email ?? undefined}
        />

        <ProfileAdherenceSection loading={loadingStats} stats={stats} />

        <ProfilePrescriptionsList prescriptions={prescriptions} />

        <LogoutButton onLogout={signOut} />
      </ScrollView>
    </>
  )
}

const profileScrollStyles = StyleSheet.create({
  contentContainer: { paddingBottom: 40 },
})
