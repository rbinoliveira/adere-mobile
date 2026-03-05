import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { PlatformText } from '@/features/platform/components/platform-text'
import { PurpleColors } from '@/shared/constants/theme.constant'

const DAILY_TIPS = [
  'Enquanto estiver tomando antibiótico, não beba bebidas alcoólicas.',
  'Tome seu remédio sempre no mesmo horário para manter o efeito.',
  'Nunca pare o antibiótico antes do prazo, mesmo se sentir melhora.',
  'Beba bastante água ao longo do dia para ajudar o remédio a agir.',
  'Se esquecer uma dose, tome assim que lembrar — mas nunca dobre a dose.',
]

function getTodayTip(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  )
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length] ?? DAILY_TIPS[0]!
}

type DailyTipCardProps = {
  onSeeMore?: () => void
}

export function DailyTipCard({ onSeeMore }: DailyTipCardProps) {
  const tip = getTodayTip()

  return (
    <View className="rounded-2xl p-4" style={styles.card}>
      <View className="flex-row items-center gap-2 mb-2">
        <PlatformText fontSize={18}>💡</PlatformText>
        <PlatformText fontSize={15} fontWeight={700} color="base-white">
          Dica do Dia
        </PlatformText>
      </View>

      <PlatformText
        fontSize={14}
        color="base-white"
        className="opacity-90 mb-3"
      >
        {tip}
      </PlatformText>

      <TouchableOpacity
        className="self-start bg-white/20 rounded-full px-4 py-1.5"
        onPress={onSeeMore}
      >
        <PlatformText fontSize={13} fontWeight={600} color="base-white">
          Ver Mais Dicas
        </PlatformText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: PurpleColors[950] },
})
