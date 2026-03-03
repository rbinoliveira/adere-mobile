import { StatusBar } from 'expo-status-bar'
import { ReactNode, useMemo } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { cn } from '@/shared/utils/cn'

type ScreenWrapperProps = {
  children: ReactNode
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  className?: string
  hasSafeArea?: boolean
  statusBarStyle?: 'light' | 'auto'
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
})

export default function ScreenWrapper({
  hasSafeArea = true,
  statusBarStyle = 'auto',
  className,
  ...props
}: ScreenWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={className}
    >
      <StatusBar style={statusBarStyle} />
      {hasSafeArea ? (
        <SafeAreaView className="flex-1 bg-background">
          <ScreenWrapperScroll {...props} />
        </SafeAreaView>
      ) : (
        <ScreenWrapperScroll {...props} />
      )}
    </KeyboardAvoidingView>
  )
}

export function ScreenWrapperScroll({
  children,
  justifyContent = 'center',
  alignItems = 'center',
}: ScreenWrapperProps) {
  const contentContainerStyle = useMemo(
    () => ({
      flexGrow: 1,
      justifyContent,
      alignItems,
    }),
    [justifyContent, alignItems],
  )

  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      className={cn('px-5')}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}
