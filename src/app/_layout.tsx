import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../components/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="input" options={{ title: '정보 입력' }} />
        <Stack.Screen name="result" options={{ title: '평생사주 결과' }} />
      </Stack>
    </>
  );
}
