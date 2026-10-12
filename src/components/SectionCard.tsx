import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, shadow, spacing } from './theme';

export function SectionCard({
  title,
  accent = colors.primary,
  children,
}: {
  title: string;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <View style={[styles.bar, { backgroundColor: accent }]} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {typeof children === 'string' ? <Text style={styles.body}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg - 4,
    gap: spacing.sm + 2,
    ...shadow,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  bar: { width: 4, height: 16, borderRadius: 2 },
  title: { fontFamily: fonts.title, fontSize: 17, color: colors.text },
  body: { fontSize: 15, lineHeight: 25, color: colors.text },
});
