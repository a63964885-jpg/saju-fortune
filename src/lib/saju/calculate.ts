import { Lunar, Solar } from 'lunar-javascript';

import type { BirthInput, Element, Pillar, SajuResult } from '../../types/saju';
import {
  BRANCH_ELEMENT,
  BRANCH_KO,
  ELEMENTS,
  HOUR_BRANCHES,
  STEM_ELEMENT,
  STEM_KO,
} from './constants';

function makePillar(label: Pillar['label'], stem: string, branch: string): Pillar {
  return {
    label,
    stem,
    branch,
    stemKo: STEM_KO[stem],
    branchKo: BRANCH_KO[branch],
    stemElement: STEM_ELEMENT[stem],
    branchElement: BRANCH_ELEMENT[branch],
  };
}

export function calculateSaju(input: BirthInput): SajuResult {
  // 시간을 모르면 정오로 계산하고 시주는 결과에서 뺀다.
  const hour = input.hourBranch === null ? 12 : HOUR_BRANCHES[input.hourBranch].hour;

  const lunar =
    input.calendar === 'solar'
      ? Solar.fromYmdHms(input.year, input.month, input.day, hour, 0, 0).getLunar()
      : Lunar.fromYmdHms(input.year, input.leapMonth ? -input.month : input.month, input.day, hour, 0, 0);
  const ec = lunar.getEightChar();

  const pillars: Pillar[] = [];
  if (input.hourBranch !== null) {
    pillars.push(makePillar('시주', ec.getTimeGan(), ec.getTimeZhi()));
  }
  pillars.push(
    makePillar('일주', ec.getDayGan(), ec.getDayZhi()),
    makePillar('월주', ec.getMonthGan(), ec.getMonthZhi()),
    makePillar('년주', ec.getYearGan(), ec.getYearZhi()),
  );

  const elementCount = Object.fromEntries(ELEMENTS.map((e) => [e, 0])) as Record<Element, number>;
  for (const p of pillars) {
    elementCount[p.stemElement] += 1;
    elementCount[p.branchElement] += 1;
  }
  const sorted = [...ELEMENTS].sort((a, b) => elementCount[b] - elementCount[a]);

  return {
    input,
    solarDate: lunar.getSolar().toYmd(),
    pillars,
    dayMaster: ec.getDayGan(),
    elementCount,
    strongest: sorted[0],
    weakest: sorted[sorted.length - 1],
  };
}
