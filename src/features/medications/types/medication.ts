export type MedicationStatus =
  | 'on_time'
  | 'delayed'
  | 'very_delayed'
  | 'waiting'
  | 'taken'

export type MedicationForm =
  | 'comprimido'
  | 'capsula'
  | 'pilula'
  | 'pastilha'
  | 'dragea'
  | 'xarope'
  | 'gotas'
  | 'solucao_oral'
  | 'suspensao_oral'
  | 'pomada'
  | 'creme'
  | 'pasta'
  | 'spray'
  | 'liquido'

export type MedicationType = 'pill' | 'liquid' | 'topical' | 'other'

export type Medication = {
  id: string
  name: string
  dose: string
  form: MedicationForm
  scheduledTime: Date
  instructions: string
  status: MedicationStatus
  delayMinutes?: number
  takenAt?: Date
}

export function getMedicationType(form: MedicationForm): MedicationType {
  const pillForms: MedicationForm[] = [
    'comprimido',
    'capsula',
    'pilula',
    'pastilha',
    'dragea',
  ]
  const liquidForms: MedicationForm[] = [
    'xarope',
    'gotas',
    'solucao_oral',
    'suspensao_oral',
    'liquido',
  ]
  const topicalForms: MedicationForm[] = ['pomada', 'creme', 'pasta', 'spray']

  if (pillForms.includes(form)) return 'pill'
  if (liquidForms.includes(form)) return 'liquid'
  if (topicalForms.includes(form)) return 'topical'
  return 'other'
}

export function getFormLabel(form: MedicationForm): string {
  const labels: Record<MedicationForm, string> = {
    comprimido: 'Comprimido',
    capsula: 'Cápsula',
    pilula: 'Pílula',
    pastilha: 'Pastilha',
    dragea: 'Drágea',
    xarope: 'Xarope',
    gotas: 'Gotas',
    solucao_oral: 'Solução oral',
    suspensao_oral: 'Suspensão oral',
    pomada: 'Pomada',
    creme: 'Creme',
    pasta: 'Pasta',
    spray: 'Spray',
    liquido: 'Líquido',
  }
  return labels[form]
}

export function getInstructionTitle(form: MedicationForm): string {
  const topicalForms: MedicationForm[] = ['pomada', 'creme', 'pasta']
  return topicalForms.includes(form) ? 'Como usar:' : 'Como tomar:'
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function getTypeColor(type: MedicationType): string {
  const colors: Record<MedicationType, string> = {
    pill: 'bg-green-500',
    liquid: 'bg-red-500',
    topical: 'bg-blue-500',
    other: 'bg-gray-500',
  }
  return colors[type]
}

const TYPE_HEX_COLORS: Record<MedicationType, string> = {
  pill: '#22C55E',
  liquid: '#EF4444',
  topical: '#3B82F6',
  other: '#6B7280',
}

export function getTypeHexColor(type: MedicationType): string {
  return TYPE_HEX_COLORS[type]
}

const TYPE_ICONS = {
  pill: 'circle',
  liquid: 'tint',
  topical: 'hand-paper-o',
  other: 'medkit',
} as const

export function getTypeIcon(
  type: MedicationType,
): (typeof TYPE_ICONS)[MedicationType] {
  return TYPE_ICONS[type]
}
