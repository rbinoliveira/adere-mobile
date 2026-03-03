import { MedicationForm } from '@/shared/types/medication'

export interface StepByStepInstruction {
  step: number
  text: string
  icon?: string
}

export function generateStepByStepInstructions(
  form: MedicationForm,
  instructions: string,
): StepByStepInstruction[] {
  const topicalForms: MedicationForm[] = ['pomada', 'creme', 'pasta', 'spray']
  const liquidForms: MedicationForm[] = [
    'xarope',
    'gotas',
    'solucao_oral',
    'suspensao_oral',
    'liquido',
  ]

  if (topicalForms.includes(form)) {
    return [
      {
        step: 1,
        text: 'Lave bem as mãos com água e sabão',
        icon: 'hand-paper-o',
      },
      {
        step: 2,
        text: 'Limpe o local onde vai aplicar',
        icon: 'tint',
      },
      {
        step: 3,
        text: instructions || 'Aplique uma pequena quantidade no local',
        icon: 'hand-paper-o',
      },
      {
        step: 4,
        text: 'Massageie suavemente até absorver',
        icon: 'circle',
      },
    ]
  }

  if (liquidForms.includes(form)) {
    if (
      instructions.toLowerCase().includes('seringa') ||
      instructions.toLowerCase().includes('medir')
    ) {
      return [
        {
          step: 1,
          text: 'Pegue a seringa que vem com o remédio',
          icon: 'medkit',
        },
        {
          step: 2,
          text: 'Encha a seringa até a marca indicada',
          icon: 'tint',
        },
        {
          step: 3,
          text: instructions || 'Coloque a seringa na boca e empurre o líquido',
          icon: 'circle',
        },
        {
          step: 4,
          text: 'Lave a seringa com água após usar',
          icon: 'tint',
        },
      ]
    }
    return [
      {
        step: 1,
        text: 'Agite o frasco antes de usar',
        icon: 'refresh',
      },
      {
        step: 2,
        text: instructions || 'Meça a quantidade indicada',
        icon: 'tint',
      },
      {
        step: 3,
        text: 'Tome o remédio',
        icon: 'circle',
      },
    ]
  }

  if (form === 'pastilha') {
    return [
      {
        step: 1,
        text: 'Coloque a pastilha na boca',
        icon: 'circle',
      },
      {
        step: 2,
        text: instructions || 'Chupe até dissolver completamente',
        icon: 'circle',
      },
      {
        step: 3,
        text: 'Não engula a pastilha inteira',
        icon: 'exclamation-circle',
      },
    ]
  }

  if (
    instructions.toLowerCase().includes('água') ||
    instructions.toLowerCase().includes('engolir')
  ) {
    return [
      {
        step: 1,
        text: 'Pegue um copo com água',
        icon: 'tint',
      },
      {
        step: 2,
        text: instructions || 'Engula o remédio com água',
        icon: 'circle',
      },
      {
        step: 3,
        text: 'Beba mais água para ajudar a engolir',
        icon: 'tint',
      },
    ]
  }

  return [
    {
      step: 1,
      text: instructions || 'Tome o remédio conforme indicado',
      icon: 'medkit',
    },
  ]
}
