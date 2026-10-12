import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from './theme';

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {typeof children === 'string' ? <Text style={styles.body}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.primary },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
});
