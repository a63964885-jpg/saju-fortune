import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FortuneCategory } from '../types/saju';
import { categoryColor, categorySymbol, colors, radius, shadow, spacing } from './theme';

export function FortuneTabs({
  categories,
  active,
  onChange,
}: {
  categories: FortuneCategory[];
  active: FortuneCategory['key'];
  onChange: (key: FortuneCategory['key']) => void;
}) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {categories.map((c) => {
        const selected = c.key === active;
        const color = categoryColor[c.key];
        return (
          <Pressable
            key={c.key}
            onPress={() => onChange(c.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.tab, selected && { backgroundColor: color }]}
          >
            <Text style={[styles.symbol, { color: selected ? '#FFFFFF' : color }]}>{categorySymbol[c.key]}</Text>
            <Text style={[styles.text, selected && styles.selectedText]}>{c.tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xs + 2,
    gap: spacing.xs,
    ...shadow,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.md, gap: 2 },
  symbol: { fontSize: 16 },
  text: { fontSize: 13, color: colors.textMuted, fontWeight: '700' },
  selectedText: { color: '#FFFFFF' },
});
