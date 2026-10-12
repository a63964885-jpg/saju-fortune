import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing } from './theme';

export function Chip({
  label,
  sub,
  selected,
  onPress,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
      {sub ? <Text style={[styles.sub, selected && styles.selectedSub]}>{sub}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.text, fontSize: 15, fontWeight: '600' },
  selectedText: { color: colors.gold },
  sub: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  selectedSub: { color: colors.textOnNightMuted },
});
