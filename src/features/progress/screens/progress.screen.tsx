import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { PlatformText } from '@/features/platform/components/platform-text'

import { AdherenceOverviewCard } from '../components/adherence-overview-card'
import { AdherenceSummaryCards } from '../components/adherence-summary-cards'
import { DailyBarChartCard } from '../components/daily-bar-chart-card'
import { RecentHistoryList } from '../components/recent-history-list'
import { WeeklyBarChartCard } from '../components/weekly-bar-chart-card'
import { useAdherence } from '../hooks/use-adherence.hook'

export function ProgressScreen() {
  const insets = useSafeAreaInsets()
  const { loading, records, stats, dailyData, weeklyData, pieData } =
    useAdherence()

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F5" />
      <ScrollView
        className="flex-1 bg-neutral-400"
        style={{ paddingTop: insets.top }}
        contentContainerStyle={progressScrollStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 py-4">
          <PlatformText fontSize={22} fontWeight={700} color="neutral-900">
            Progresso
          </PlatformText>
          <PlatformText fontSize={13} color="neutral-600" className="mt-0.5">
            Acompanhe sua aderência aos remédios
          </PlatformText>
        </View>

        <View className="px-4 gap-4">
          <AdherenceOverviewCard
            loading={loading}
            stats={stats}
            pieData={pieData}
          />
          {!loading && <AdherenceSummaryCards stats={stats} />}
          <DailyBarChartCard loading={loading} data={dailyData} />
          <WeeklyBarChartCard loading={loading} data={weeklyData} />
          <RecentHistoryList records={records} />
        </View>
      </ScrollView>
    </>
  )
}

const progressScrollStyles = StyleSheet.create({
  contentContainer: { paddingBottom: 40 },
})
