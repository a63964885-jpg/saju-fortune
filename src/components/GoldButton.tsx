import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, gradients, radius, spacing } from './theme';

export function GoldButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
      <LinearGradient colors={gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.pill,
    shadowColor: colors.goldDeep,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  button: { borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  text: { fontFamily: fonts.title, fontSize: 18, color: colors.night, letterSpacing: 0.5 },
});
