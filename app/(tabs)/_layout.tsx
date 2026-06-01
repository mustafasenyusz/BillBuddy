import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Header'ı her sayfada tamamen kapatır
        headerShown: false,
        // Tab Bar'ı görünmez yapar ve yer kaplamasını engeller
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="two" />
    </Tabs>
  );
}