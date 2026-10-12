import { router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip } from '../components/Chip';
import { GoldButton } from '../components/GoldButton';
import { colors, fonts, gradients, radius, shadow, spacing } from '../components/theme';
import { HOUR_BRANCHES } from '../lib/saju';
import type { CalendarType, Gender } from '../types/saju';

function Field({ step, label, children }: { step: number; label: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Text style={styles.step}>{step}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

export default function Input() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('female');
  const [calendar, setCalendar] = useState<CalendarType>('solar');
  const [leapMonth, setLeapMonth] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hourBranch, setHourBranch] = useState<number | null>(null);
  const [error, setError] = useState('');

  const submit = () => {
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    if (!(y >= 1900 && y <= 2100) || !(m >= 1 && m <= 12) || !(d >= 1 && d <= 31)) {
      setError('생년월일을 정확히 입력해 주세요. (1900~2100년)');
      return;
    }
    if (calendar === 'solar' && new Date(y, m - 1, d).getDate() !== d) {
      setError(`${y}년 ${m}월에는 ${d}일이 없습니다.`);
      return;
    }
    setError('');
    router.push({
      pathname: '/result',
      params: {
        name: name.trim(),
        gender,
        calendar,
        leap: leapMonth && calendar === 'lunar' ? '1' : '0',
        year: String(y),
        month: String(m),
        day: String(d),
        hour: hourBranch === null ? '' : String(hourBranch),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={gradients.night} style={styles.hero}>
        <Text style={styles.heroTitle}>태어난 순간을 알려주세요</Text>
        <Text style={styles.heroSub}>정확할수록 풀이가 정밀해져요</Text>
      </LinearGradient>

      <View style={styles.container}>
        <Field step={1} label="이름과 성별">
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="이름 (선택)"
            placeholderTextColor={colors.textMuted}
          />
          <View style={styles.chips}>
            <View style={styles.flex}>
              <Chip label="여성" selected={gender === 'female'} onPress={() => setGender('female')} />
            </View>
            <View style={styles.flex}>
              <Chip label="남성" selected={gender === 'male'} onPress={() => setGender('male')} />
            </View>
          </View>
        </Field>

        <Field step={2} label="생년월일">
          <View style={styles.chips}>
            <Chip label="양력" selected={calendar === 'solar'} onPress={() => setCalendar('solar')} />
            <Chip label="음력" selected={calendar === 'lunar'} onPress={() => setCalendar('lunar')} />
            {calendar === 'lunar' && (
              <Chip label="윤달" selected={leapMonth} onPress={() => setLeapMonth(!leapMonth)} />
            )}
          </View>
          <View style={styles.dateRow}>
            <TextInput
              style={[styles.input, styles.dateYear]}
              value={year}
              onChangeText={setYear}
              placeholder="1990"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              maxLength={4}
            />
            <Text style={styles.unit}>년</Text>
            <TextInput
              style={[styles.input, styles.dateSmall]}
              value={month}
              onChangeText={setMonth}
              placeholder="5"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.unit}>월</Text>
            <TextInput
              style={[styles.input, styles.dateSmall]}
              value={day}
              onChangeText={setDay}
              placeholder="15"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.unit}>일</Text>
          </View>
        </Field>

        <Field step={3} label="태어난 시간">
          <View style={styles.hourGrid}>
            <View style={styles.hourCell}>
              <Chip label="모름" sub="시간 미상" selected={hourBranch === null} onPress={() => setHourBranch(null)} />
            </View>
            {HOUR_BRANCHES.map((h, i) => (
              <View key={h.name} style={styles.hourCell}>
                <Chip
                  label={h.name}
                  sub={h.range}
                  selected={hourBranch === i}
                  onPress={() => setHourBranch(i)}
                />
              </View>
            ))}
          </View>
        </Field>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <GoldButton label="사주 풀이 보기" onPress={submit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xl },
  flex: { flex: 1 },
  hero: { paddingTop: spacing.md, paddingBottom: spacing.xl + spacing.lg, paddingHorizontal: spacing.lg, gap: spacing.xs },
  heroTitle: { fontFamily: fonts.title, fontSize: 24, color: colors.textOnNight },
  heroSub: { fontSize: 14, color: colors.textOnNightMuted },
  container: {
    padding: spacing.md,
    gap: spacing.md,
    marginTop: -spacing.xl,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg - 4,
    gap: spacing.md - 4,
    ...shadow,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  step: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 22,
    overflow: 'hidden',
  },
  label: { fontFamily: fonts.title, fontSize: 17, color: colors.text },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: 16,
    color: colors.text,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  dateYear: { flex: 2, minWidth: 0, textAlign: 'center' },
  dateSmall: { flex: 1, minWidth: 0, textAlign: 'center' },
  unit: { color: colors.textMuted, marginRight: spacing.xs },
  hourGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.xs / 2 },
  hourCell: { width: '33.33%', padding: spacing.xs / 2 },
  error: { color: '#C0392B', textAlign: 'center' },
});
