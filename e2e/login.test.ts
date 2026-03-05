import { by, device, element, expect } from 'detox'

describe('Login', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should show login screen on launch', async () => {
    await expect(element(by.text('Bem-vindo'))).toBeVisible()
    await expect(element(by.id('email-input'))).toBeVisible()
    await expect(element(by.id('password-input'))).toBeVisible()
    await expect(element(by.id('login-button'))).toBeVisible()
  })

  it('should show error with invalid credentials', async () => {
    await element(by.id('email-input')).typeText('invalid@test.com')
    await element(by.id('password-input')).typeText('wrongpassword')
    await element(by.id('login-button')).tap()
    await expect(
      element(by.text('Email ou senha incorretos. Tente novamente.')),
    ).toBeVisible()
  })

  it('should navigate to recover-password screen', async () => {
    await element(by.text('Esqueceu a senha?')).tap()
    await expect(element(by.text('Recuperar senha'))).toBeVisible()
  })
})
