import { StyleSheet, Text, View } from 'react-native';

import { ELEMENTS, ELEMENT_LABEL } from '../lib/saju';
import type { Element } from '../types/saju';
import { colors, spacing } from './theme';

/** 오행 분포를 가로 막대로 보여준다. */
export function ElementBar({ count }: { count: Record<Element, number> }) {
  const max = Math.max(...Object.values(count), 1);
  return (
    <View style={styles.container}>
      {ELEMENTS.map((el) => {
        const { color, ko, hanja } = ELEMENT_LABEL[el];
        return (
          <View key={el} style={styles.row}>
            <Text style={[styles.label, { color }]}>
              {hanja} {ko}
            </Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(count[el] / max) * 100}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{count[el]}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { width: 48, fontWeight: '700' },
  track: { flex: 1, height: 12, borderRadius: 6, backgroundColor: colors.border, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6 },
  value: { width: 20, textAlign: 'right', color: colors.text },
});
