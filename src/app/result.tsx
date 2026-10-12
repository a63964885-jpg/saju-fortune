import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';

import { CategoryView } from '../components/CategoryView';
import { ElementBar } from '../components/ElementBar';
import { FortuneTabs } from '../components/FortuneTabs';
import { PillarTable } from '../components/PillarTable';
import { SectionCard } from '../components/SectionCard';
import { colors, spacing } from '../components/theme';
import { calculateSaju, HOUR_BRANCHES, interpret } from '../lib/saju';
import type { BirthInput, FortuneCategory } from '../types/saju';

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
    return { saju, categories: interpret(saju) };
  } catch {
    // 존재하지 않는 날짜(예: 2월 30일)는 lunar-javascript가 예외를 던진다.
    return null;
  }
}

export default function Result() {
  const params = useLocalSearchParams<Params>();
  const input = parseParams(params);
  const [activeKey, setActiveKey] = useState<FortuneCategory['key']>('overview');
  // 웹 정적 빌드의 HTML에는 쿼리 파라미터가 없으므로, 마운트 후에 결과를 그려 하이드레이션 불일치를 막는다.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const computed = input ? compute(input) : null;

  if (!mounted) return null;

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

  const { saju, categories } = computed;
  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const hourText = input.hourBranch === null ? '시간 모름' : HOUR_BRANCHES[input.hourBranch].name;
  const calendarText = input.calendar === 'solar' ? '양력' : input.leapMonth ? '음력(윤달)' : '음력';

  const share = () =>
    Share.share({
      message: `[사주풀이] ${input.name || '나'}의 사주: ${saju.pillars
        .map((p) => `${p.stem}${p.branch}`)
        .join(' ')}\n\n${categories
        .map((c) => `${c.tab} ${c.score}점 - ${c.headline}`)
        .join('\n')}`,
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

      <FortuneTabs categories={categories} active={active.key} onChange={setActiveKey} />

      <CategoryView category={active} />

      {active.key === 'overview' && (
        <>
          <SectionCard title="사주명식">
            <PillarTable pillars={saju.pillars} />
          </SectionCard>
          <SectionCard title="오행 분석">
            <ElementBar count={saju.elementCount} />
          </SectionCard>
        </>
      )}

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
