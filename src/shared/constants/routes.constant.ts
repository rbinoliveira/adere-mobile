export const routes = {
  // Public routes
  login: '/login',
  recoverPassword: '/recover-password',

  // Authenticated routes
  home: '/(authenticated)',
  medications: '/(authenticated)/medications',
  progress: '/(authenticated)/progress',
  doctor: '/(authenticated)/doctor',
  history: '/(authenticated)/history',
  settings: '/(authenticated)/settings',
  tips: '/(authenticated)/tips',
} as const

export type RouteKey = keyof typeof routes
export type Route = (typeof routes)[RouteKey]

export const routeToPageName: Record<string, string> = {
  '/(authenticated)': 'HOME',
  '/(authenticated)/index': 'HOME',
  '/(authenticated)/medications': 'MEDICAMENTOS',
  '/(authenticated)/progress': 'PROGRESSO',
  '/(authenticated)/doctor': 'MÉDICO',
  '/(authenticated)/history': 'HISTÓRICO',
  '/(authenticated)/settings': 'CONFIGURAÇÕES',
  '/(authenticated)/tips': 'DICAS',
  '/login': 'LOGIN',
  '/recover-password': 'RECUPERAR SENHA',
}

export function getPageName(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return routeToPageName[normalized] || 'HOME'
}
