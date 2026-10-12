import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../components/theme';
import { ELEMENTS, ELEMENT_LABEL } from '../lib/saju';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.elements}>
          {ELEMENTS.map((el) => (
            <Text key={el} style={[styles.element, { color: ELEMENT_LABEL[el].color }]}>
              {ELEMENT_LABEL[el].hanja}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>사주풀이</Text>
        <Text style={styles.subtitle}>
          태어난 연·월·일·시로 나의 사주팔자와{'\n'}오행, 평생의 흐름을 알아보세요.
        </Text>
      </View>

      <Link href="/input" asChild>
        <Pressable style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonText}>평생사주 보기</Text>
        </Pressable>
      </Link>
      <Text style={styles.notice}>재미로 보는 운세이며, 입력한 정보는 저장되지 않습니다.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  hero: { alignItems: 'center', gap: spacing.md },
  elements: { flexDirection: 'row', gap: spacing.md },
  element: { fontSize: 28, fontWeight: '700' },
  title: { fontSize: 36, fontWeight: '800', color: colors.primary },
  subtitle: { fontSize: 16, lineHeight: 24, color: colors.textMuted, textAlign: 'center' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  notice: { textAlign: 'center', fontSize: 12, color: colors.textMuted },
});
