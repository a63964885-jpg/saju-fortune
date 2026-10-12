import { StyleSheet, Text, View } from 'react-native';

import type { FortuneCategory } from '../types/saju';
import { categoryColor, colors, spacing } from './theme';

/** 탭 하나의 내용: 점수 + 한 줄 요약, 소주제, 추천 태그, 행운 아이템 */
export function CategoryView({ category }: { category: FortuneCategory }) {
  const accent = categoryColor[category.key];
  return (
    <View style={styles.container}>
      <View style={[styles.scoreCard, { borderColor: accent }]}>
        <Text style={[styles.scoreLabel, { color: accent }]}>{category.tab} 점수</Text>
        <Text style={[styles.score, { color: accent }]}>
          {category.score}
          <Text style={styles.scoreMax}> / 100</Text>
        </Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${category.score}%`, backgroundColor: accent }]} />
        </View>
        <Text style={styles.headline}>{category.headline}</Text>
      </View>

      {category.sections.map((s) => (
        <View key={s.title} style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <Text style={styles.sectionTitle}>{s.title}</Text>
          </View>
          <Text style={styles.body}>{s.body}</Text>
        </View>
      ))}

      {category.tags && (
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <Text style={styles.sectionTitle}>잘 맞는 분야</Text>
          </View>
          <View style={styles.tags}>
            {category.tags.map((t) => (
              <Text key={t} style={[styles.tag, { color: accent, borderColor: accent }]}>
                {t}
              </Text>
            ))}
          </View>
        </View>
      )}

      <View style={styles.luckyRow}>
        {category.lucky.map((l) => (
          <View key={l.label} style={styles.lucky}>
            <Text style={styles.luckyLabel}>{l.label}</Text>
            <Text style={[styles.luckyValue, { color: accent }]}>{l.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  scoreCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  scoreLabel: { fontSize: 14, fontWeight: '700' },
  score: { fontSize: 44, fontWeight: '800' },
  scoreMax: { fontSize: 16, color: colors.textMuted, fontWeight: '400' },
  track: { alignSelf: 'stretch', height: 8, borderRadius: 4, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  headline: { fontSize: 17, fontWeight: '700', color: colors.text, textAlign: 'center', marginTop: spacing.xs },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },
  luckyRow: { flexDirection: 'row', gap: spacing.sm },
  lucky: {
    flex: 1,
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  luckyLabel: { fontSize: 12, color: colors.textMuted },
  luckyValue: { fontSize: 15, fontWeight: '800' },
});
