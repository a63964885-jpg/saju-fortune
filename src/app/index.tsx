import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoldButton } from '../components/GoldButton';
import { Stars } from '../components/Stars';
import { colors, fonts, gradients, spacing } from '../components/theme';
import { ELEMENTS, ELEMENT_LABEL } from '../lib/saju';

const FEATURES = [
  { symbol: '✦', title: '재물운', desc: '돈이 들어오는 흐름' },
  { symbol: '♡', title: '애정운', desc: '나의 연애와 인연' },
  { symbol: '◆', title: '직업운', desc: '잘 맞는 일과 분야' },
];

export default function Home() {
  return (
    <LinearGradient colors={gradients.night} style={styles.flex}>
      <Stars />
      <SafeAreaView style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.moonGlow}>
            <View style={styles.moon} />
          </View>
          <Text style={styles.eyebrow}>나의 사주팔자 이야기</Text>
          <Text style={styles.title}>사주풀이</Text>
          <Text style={styles.subtitle}>
            태어난 순간의 하늘이 알려주는{'\n'}나의 재물 · 사랑 · 일의 흐름
          </Text>
          <View style={styles.elements}>
            {ELEMENTS.map((el) => (
              <View key={el} style={[styles.elementDot, { borderColor: ELEMENT_LABEL[el].color }]}>
                <Text style={styles.elementText}>{ELEMENT_LABEL[el].hanja}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.feature}>
              <Text style={styles.featureSymbol}>{f.symbol}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottom}>
          <GoldButton label="내 사주 보러 가기" onPress={() => router.push('/input')} />
          <Text style={styles.notice}>재미로 보는 운세예요 · 입력한 정보는 저장되지 않아요</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  hero: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl },
  moonGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(232,194,122,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  moon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.gold,
    shadowColor: colors.gold,
    shadowOpacity: 0.8,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  eyebrow: { color: colors.gold, fontSize: 13, letterSpacing: 2 },
  title: { fontFamily: fonts.title, fontSize: 46, color: colors.textOnNight, lineHeight: 58 },
  subtitle: { fontSize: 15, lineHeight: 24, color: colors.textOnNightMuted, textAlign: 'center' },
  elements: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  elementDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  elementText: { fontFamily: fonts.title, color: colors.textOnNight, fontSize: 16 },
  features: { flexDirection: 'row', gap: spacing.sm },
  feature: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.md,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  featureSymbol: { color: colors.gold, fontSize: 18 },
  featureTitle: { fontFamily: fonts.title, color: colors.textOnNight, fontSize: 15 },
  featureDesc: { color: colors.textOnNightMuted, fontSize: 11 },
  bottom: { gap: spacing.md, marginBottom: spacing.sm },
  notice: { textAlign: 'center', fontSize: 12, color: colors.textOnNightMuted },
});
