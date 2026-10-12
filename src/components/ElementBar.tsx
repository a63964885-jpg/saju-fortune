import { StyleSheet, Text, View } from 'react-native';

import { ELEMENTS, ELEMENT_LABEL } from '../lib/saju';
import type { Element } from '../types/saju';
import { colors, fonts, spacing } from './theme';

/** 오행 분포를 동그라미 + 세로 막대로 보여준다. */
export function ElementBar({ count }: { count: Record<Element, number> }) {
  const max = Math.max(...Object.values(count), 1);
  return (
    <View style={styles.row}>
      {ELEMENTS.map((el) => {
        const { color, ko, hanja } = ELEMENT_LABEL[el];
        return (
          <View key={el} style={styles.column}>
            <Text style={[styles.value, { color }]}>{count[el]}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { height: `${(count[el] / max) * 100}%`, backgroundColor: color }]} />
            </View>
            <View style={[styles.badge, { backgroundColor: color }]}>
              <Text style={styles.badgeText}>{hanja}</Text>
            </View>
            <Text style={styles.label}>{ko}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: spacing.xs },
  column: { alignItems: 'center', gap: spacing.xs + 2 },
  value: { fontSize: 15, fontWeight: '800' },
  track: {
    width: 14,
    height: 72,
    borderRadius: 7,
    backgroundColor: colors.primarySoft,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  fill: { width: '100%', borderRadius: 7 },
  badge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontFamily: fonts.title, color: '#FFFFFF', fontSize: 16 },
  label: { fontSize: 12, color: colors.textMuted },
});
