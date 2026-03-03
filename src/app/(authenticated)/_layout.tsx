import { Tabs } from 'expo-router'

import { TabItem } from '@/shared/components/tab-item'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} title="Início" />
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          title: 'Remédios',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} title="Remédios" />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} title="Progresso" />
          ),
        }}
      />
      <Tabs.Screen
        name="doctor"
        options={{
          title: 'Médico',
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} title="Médico" />
          ),
        }}
      />
    </Tabs>
  )
}
