import { StyleSheet, Text, View } from 'react-native';

import type { FortuneCategory } from '../types/saju';
import { ScoreRing } from './ScoreRing';
import { SectionCard } from './SectionCard';
import { categoryColor, colors, fonts, radius, shadow, spacing } from './theme';

/** 탭 하나의 내용: 점수 + 한 줄 요약, 소주제, 추천 태그, 행운 아이템 */
export function CategoryView({ category }: { category: FortuneCategory }) {
  const accent = categoryColor[category.key];
  return (
    <View style={styles.container}>
      <View style={styles.scoreCard}>
        <Text style={[styles.scoreLabel, { color: accent }]}>나의 {category.tab}</Text>
        <ScoreRing score={category.score} color={accent} />
        <Text style={styles.headline}>“{category.headline}”</Text>
      </View>

      {category.sections.map((s) => (
        <SectionCard key={s.title} title={s.title} accent={accent}>
          {s.body}
        </SectionCard>
      ))}

      {category.tags && (
        <SectionCard title="잘 맞는 분야" accent={accent}>
          <View style={styles.tags}>
            {category.tags.map((t) => (
              <Text key={t} style={[styles.tag, { color: accent, backgroundColor: `${accent}14` }]}>
                {t}
              </Text>
            ))}
          </View>
        </SectionCard>
      )}

      <View style={styles.luckyCard}>
        <Text style={styles.luckyTitle}>✦ 행운 아이템</Text>
        <View style={styles.luckyRow}>
          {category.lucky.map((l) => (
            <View key={l.label} style={styles.lucky}>
              <Text style={styles.luckyLabel}>{l.label}</Text>
              <Text style={styles.luckyValue}>{l.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  scoreCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.md,
    ...shadow,
  },
  scoreLabel: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  headline: { fontFamily: fonts.title, fontSize: 18, lineHeight: 27, color: colors.text, textAlign: 'center' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: {
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    fontSize: 13,
    fontWeight: '700',
    overflow: 'hidden',
  },
  luckyCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg - 4,
    gap: spacing.md,
  },
  luckyTitle: { fontFamily: fonts.title, color: colors.gold, fontSize: 16 },
  luckyRow: { flexDirection: 'row', gap: spacing.sm },
  lucky: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  luckyLabel: { fontSize: 12, color: colors.textOnNightMuted },
  luckyValue: { fontSize: 15, fontWeight: '800', color: colors.textOnNight },
});
