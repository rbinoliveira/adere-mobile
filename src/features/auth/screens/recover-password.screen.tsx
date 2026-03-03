import React from 'react'

import { RecoverPasswordForm } from '@/features/auth/components/recover-password-form'
import { Header } from '@/shared/components/header'
import ScreenWrapper from '@/shared/components/screen-wrapper'
import { SupportCard } from '@/shared/components/support-card'

export function RecoverPasswordScreen() {
  return (
    <>
      <Header
        title="Perdeu sua senha?"
        description="Informe seu e-mail cadastrado para redefinir sua senha."
      />

      <ScreenWrapper
        statusBarStyle="light"
        hasSafeArea={false}
        className="py-5"
      >
        <RecoverPasswordForm />
        <SupportCard />
      </ScreenWrapper>
    </>
  )
}
