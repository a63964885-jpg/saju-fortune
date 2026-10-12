import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';

import { ElementBar } from '../components/ElementBar';
import { PillarTable } from '../components/PillarTable';
import { SectionCard } from '../components/SectionCard';
import { colors, spacing } from '../components/theme';
import { calculateSaju, HOUR_BRANCHES, interpret } from '../lib/saju';
import type { BirthInput } from '../types/saju';

type Params = Record<'name' | 'gender' | 'calendar' | 'leap' | 'year' | 'month' | 'day' | 'hour', string>;

function parseParams(p: Partial<Params>): BirthInput | null {
  const year = Number(p.year);
  const month = Number(p.month);
  const day = Number(p.day);
  if (!year || !month || !day) return null;
  return {
    name: p.name ?? '',
    gender: p.gender === 'male' ? 'male' : 'female',
    calendar: p.calendar === 'lunar' ? 'lunar' : 'solar',
    leapMonth: p.leap === '1',
    year,
    month,
    day,
    hourBranch: p.hour ? Number(p.hour) : null,
  };
}

function compute(input: BirthInput) {
  try {
    const saju = calculateSaju(input);
    return { saju, sections: interpret(saju) };
  } catch {
    // 존재하지 않는 날짜(예: 2월 30일)는 lunar-javascript가 예외를 던진다.
    return null;
  }
}

export default function Result() {
  const params = useLocalSearchParams<Params>();
  const input = parseParams(params);

  const computed = input ? compute(input) : null;

  if (!input || !computed) {
    return (
      <View style={styles.empty}>
        <Text style={styles.meta}>입력 정보가 없거나 존재하지 않는 날짜입니다.</Text>
        <Link href="/input" style={styles.link}>
          다시 입력하기
        </Link>
      </View>
    );
  }

  const { saju, sections } = computed;
  const hourText = input.hourBranch === null ? '시간 모름' : HOUR_BRANCHES[input.hourBranch].name;
  const calendarText = input.calendar === 'solar' ? '양력' : input.leapMonth ? '음력(윤달)' : '음력';

  const share = () =>
    Share.share({
      message: `[사주풀이] ${input.name || '나'}의 사주: ${saju.pillars
        .map((p) => `${p.stem}${p.branch}`)
        .join(' ')}\n\n${sections[0].body}`,
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{input.name || '당신'}님의 평생사주</Text>
        <Text style={styles.meta}>
          {calendarText} {input.year}.{input.month}.{input.day} · {hourText} ·{' '}
          {input.gender === 'male' ? '남' : '여'}
          {input.calendar === 'lunar' ? ` (양력 ${saju.solarDate})` : ''}
        </Text>
      </View>

      <SectionCard title="사주명식">
        <PillarTable pillars={saju.pillars} />
      </SectionCard>

      <SectionCard title="오행 분석">
        <ElementBar count={saju.elementCount} />
      </SectionCard>

      {sections.map((s) => (
        <SectionCard key={s.title} title={s.title}>
          {s.body}
        </SectionCard>
      ))}

      <Pressable style={styles.button} onPress={share} accessibilityRole="button">
        <Text style={styles.buttonText}>결과 공유하기</Text>
      </Pressable>
      <Text style={styles.notice}>사주풀이는 재미와 참고용입니다.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xl },
  header: { alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.lg },
  link: { color: colors.primary, fontWeight: '700' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  notice: { textAlign: 'center', fontSize: 12, color: colors.textMuted },
});
