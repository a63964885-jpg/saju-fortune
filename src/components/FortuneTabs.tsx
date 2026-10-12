import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FortuneCategory } from '../types/saju';
import { categoryColor, colors, spacing } from './theme';

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
        return (
          <Pressable
            key={c.key}
            onPress={() => onChange(c.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.tab, selected && { backgroundColor: categoryColor[c.key] }]}
          >
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
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xs,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: 999 },
  text: { fontSize: 15, color: colors.textMuted, fontWeight: '600' },
  selectedText: { color: '#FFFFFF', fontWeight: '800' },
});
