import { StyleSheet, Text, View } from 'react-native';

import { ELEMENT_LABEL } from '../lib/saju';
import type { Element, Pillar } from '../types/saju';
import { colors, fonts, spacing } from './theme';

function Cell({ hanja, ko, element }: { hanja: string; ko: string; element: Element }) {
  const { color, hanja: elHanja, ko: elKo } = ELEMENT_LABEL[element];
  return (
    <View style={[styles.cell, { backgroundColor: `${color}14`, borderColor: `${color}55` }]}>
      <Text style={[styles.hanja, { color }]}>{hanja}</Text>
      <Text style={styles.ko}>{ko}</Text>
      <Text style={[styles.element, { color }]}>
        {elHanja} {elKo}
      </Text>
    </View>
  );
}

/** 사주명식: 시주·일주·월주·년주를 천간/지지 두 줄로 보여준다. 일주(나)는 강조한다. */
export function PillarTable({ pillars }: { pillars: Pillar[] }) {
  return (
    <View style={styles.row}>
      {pillars.map((p) => {
        const isMe = p.label === '일주';
        return (
          <View key={p.label} style={styles.column}>
            <Text style={[styles.label, isMe && styles.labelMe]}>{isMe ? '일주 · 나' : p.label}</Text>
            <Cell hanja={p.stem} ko={p.stemKo} element={p.stemElement} />
            <Cell hanja={p.branch} ko={p.branchKo} element={p.branchElement} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  column: { flex: 1, maxWidth: 84, gap: spacing.xs + 2 },
  label: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginBottom: 2 },
  labelMe: { color: colors.primary, fontWeight: '800' },
  cell: { alignItems: 'center', paddingVertical: spacing.sm + 2, borderWidth: 1, borderRadius: 14 },
  hanja: { fontFamily: fonts.title, fontSize: 30, lineHeight: 36 },
  ko: { fontSize: 12, color: colors.text, fontWeight: '600' },
  element: { fontSize: 11, marginTop: 2, fontWeight: '700' },
});
