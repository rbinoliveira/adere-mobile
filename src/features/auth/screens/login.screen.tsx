import { StatusBar } from 'react-native'

import { LoginContainer } from '@/features/auth/components/login-container'
import { LoginFooter } from '@/features/auth/components/login-footer'
import { LoginForm } from '@/features/auth/components/login-form'
import { LoginHeader } from '@/features/auth/components/login-header'

export function LoginScreen() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LoginContainer>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </LoginContainer>
    </>
  )
}
