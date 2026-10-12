import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip } from '../components/Chip';
import { colors, spacing } from '../components/theme';
import { HOUR_BRANCHES } from '../lib/saju';
import type { CalendarType, Gender } from '../types/saju';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Field label="이름">
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="홍길동"
          placeholderTextColor={colors.textMuted}
        />
      </Field>

      <Field label="성별">
        <View style={styles.chips}>
          <Chip label="여성" selected={gender === 'female'} onPress={() => setGender('female')} />
          <Chip label="남성" selected={gender === 'male'} onPress={() => setGender('male')} />
        </View>
      </Field>

      <Field label="생년월일">
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

      <Field label="태어난 시간">
        <View style={styles.chips}>
          <Chip label="모름" selected={hourBranch === null} onPress={() => setHourBranch(null)} />
          {HOUR_BRANCHES.map((h, i) => (
            <Chip
              key={h.name}
              label={`${h.name} ${h.range}`}
              selected={hourBranch === i}
              onPress={() => setHourBranch(i)}
            />
          ))}
        </View>
      </Field>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={submit} accessibilityRole="button">
        <Text style={styles.buttonText}>결과 보기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  field: { gap: spacing.sm },
  label: { fontSize: 15, fontWeight: '700', color: colors.text },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 16,
    color: colors.text,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  dateYear: { flex: 2, textAlign: 'center' },
  dateSmall: { flex: 1, textAlign: 'center' },
  unit: { color: colors.textMuted, marginRight: spacing.xs },
  error: { color: '#C0392B' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});
