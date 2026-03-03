import { MedicationForm } from '@/shared/types/medication'

export type AdministrationRoute = 'oral' | 'sublingual' | 'topica'

export interface PosologyData {
  quantity: number
  pharmaceuticalForm: MedicationForm
  administrationRoute: AdministrationRoute
  frequencyHours: number
  daysDuration?: number
  whilePain?: boolean
}

function getActionVerb(form: MedicationForm): string {
  const oralForms: MedicationForm[] = [
    'solucao_oral',
    'suspensao_oral',
    'comprimido',
    'capsula',
    'pilula',
    'dragea',
    'xarope',
    'gotas',
    'liquido',
  ]

  const topicalForms: MedicationForm[] = ['pomada', 'creme', 'pasta', 'spray']

  if (form === 'pastilha') {
    return 'chupar'
  }

  if (topicalForms.includes(form)) {
    return 'aplicar'
  }

  if (oralForms.includes(form)) {
    return 'tomar'
  }

  return 'tomar'
}

function getFormLabel(form: MedicationForm): string {
  const labels: Record<MedicationForm, string> = {
    comprimido: 'comprimido',
    capsula: 'cápsula',
    pilula: 'pílula',
    pastilha: 'pastilha',
    dragea: 'drágea',
    xarope: 'xarope',
    gotas: 'gotas',
    solucao_oral: 'solução oral',
    suspensao_oral: 'suspensão oral',
    pomada: 'pomada',
    creme: 'creme',
    pasta: 'pasta',
    spray: 'spray',
    liquido: 'líquido',
  }
  return labels[form]
}

function getRouteLabel(route: AdministrationRoute): string {
  const labels: Record<AdministrationRoute, string> = {
    oral: 'via oral',
    sublingual: 'via sublingual',
    topica: 'via tópica',
  }
  return labels[route]
}

export function generatePosologyText(data: PosologyData): string {
  const verb = getActionVerb(data.pharmaceuticalForm)
  const formLabel = getFormLabel(data.pharmaceuticalForm)
  const routeLabel = getRouteLabel(data.administrationRoute)

  let posology = `${verb} ${data.quantity} ${formLabel} ${routeLabel} a cada ${data.frequencyHours} hora${data.frequencyHours > 1 ? 's' : ''}`

  if (data.whilePain) {
    posology += ' enquanto houver dor'
  } else if (data.daysDuration) {
    posology += ` por ${data.daysDuration} dia${data.daysDuration > 1 ? 's' : ''}`
  }

  return posology
}
