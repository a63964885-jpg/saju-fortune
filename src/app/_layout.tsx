import { GowunBatang_400Regular, GowunBatang_700Bold, useFonts } from '@expo-google-fonts/gowun-batang';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors, fonts } from '../components/theme';

export default function RootLayout() {
  // 폰트가 로드되기 전에는 시스템 폰트로 먼저 그린다(화면을 막지 않는다).
  useFonts({ GowunBatang_400Regular, GowunBatang_700Bold });

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.night },
          headerTintColor: colors.gold,
          headerTitleStyle: { fontFamily: fonts.title, color: colors.textOnNight },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="input" options={{ title: '사주 정보 입력' }} />
        <Stack.Screen name="result" options={{ title: '사주풀이 결과' }} />
      </Stack>
    </>
  );
}
