import { Alert } from 'react-native'

export function handleError(err: unknown) {
  const message = getErrorMessage(err)
  setTimeout(() => {
    Alert.alert('Erro', message)
  }, 100)
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message
  }
  return 'Ocorreu um erro inesperado'
}
