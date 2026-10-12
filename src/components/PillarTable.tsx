import { StyleSheet, Text, View } from 'react-native';

import { ELEMENT_LABEL } from '../lib/saju';
import type { Element, Pillar } from '../types/saju';
import { colors, spacing } from './theme';

function Cell({ hanja, ko, element }: { hanja: string; ko: string; element: Element }) {
  const { color, hanja: elHanja } = ELEMENT_LABEL[element];
  return (
    <View style={[styles.cell, { borderColor: color }]}>
      <Text style={[styles.hanja, { color }]}>{hanja}</Text>
      <Text style={styles.ko}>
        {ko} · {elHanja}
      </Text>
    </View>
  );
}

/** 사주명식: 시주·일주·월주·년주를 천간/지지 두 줄로 보여준다. */
export function PillarTable({ pillars }: { pillars: Pillar[] }) {
  return (
    <View style={styles.row}>
      {pillars.map((p) => (
        <View key={p.label} style={styles.column}>
          <Text style={styles.label}>{p.label}</Text>
          <Cell hanja={p.stem} ko={p.stemKo} element={p.stemElement} />
          <Cell hanja={p.branch} ko={p.branchKo} element={p.branchElement} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  column: { flex: 1, maxWidth: 88, alignItems: 'stretch', gap: spacing.xs },
  label: { textAlign: 'center', color: colors.textMuted, fontSize: 13 },
  cell: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  hanja: { fontSize: 28, fontWeight: '700' },
  ko: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
