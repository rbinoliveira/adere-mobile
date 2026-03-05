import { by, device, element, expect } from 'detox'

describe('Medications', () => {
  beforeAll(async () => {
    await device.launchApp()
    // Sign in with a test account
    await element(by.id('email-input')).typeText('paciente@teste.com')
    await element(by.id('password-input')).typeText('senha123')
    await element(by.id('login-button')).tap()
    // Wait for home screen to load
    await waitFor(element(by.text('Início')))
      .toBeVisible()
      .withTimeout(10000)
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should show the home screen with medication cards', async () => {
    await expect(element(by.text('Remédios de Hoje'))).toBeVisible()
  })

  it('should navigate to medications tab', async () => {
    await element(by.text('Remédios')).tap()
    await expect(element(by.text('Meus Remédios'))).toBeVisible()
  })

  it('should show medication calendar', async () => {
    await element(by.text('Remédios')).tap()
    // Week strip should be visible
    await expect(element(by.id('medication-calendar'))).toBeVisible()
  })
})
