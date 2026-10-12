import dayMasters from '../../data/interpretations/dayMasters.json';
import elements from '../../data/interpretations/elements.json';
import type { Element, ReadingSection, SajuResult } from '../../types/saju';
import { ELEMENT_LABEL, STEM_KO } from './constants';

type DayMasterKey = keyof typeof dayMasters;

function pillarElement(result: SajuResult, label: string): Element | null {
  const pillar = result.pillars.find((p) => p.label === label);
  return pillar ? pillar.branchElement : null;
}

/** 평생사주 풀이 섹션을 만든다. 일간(日干)으로 성향을, 각 기둥의 지지로 시기별 운을 본다. */
export function interpret(result: SajuResult): ReadingSection[] {
  const dm = dayMasters[result.dayMaster as DayMasterKey];

  // 초년=년주, 중년=월주, 말년=시주(모르면 일주)
  const early = elements[pillarElement(result, '년주')!];
  const middle = elements[pillarElement(result, '월주')!];
  const late = elements[pillarElement(result, '시주') ?? pillarElement(result, '일주')!];

  const strong = ELEMENT_LABEL[result.strongest];
  const weak = ELEMENT_LABEL[result.weakest];

  return [
    {
      title: '평생사주 총평',
      body: `${result.input.name || '당신'}님은 ${STEM_KO[result.dayMaster]}(${result.dayMaster}) 일간, '${dm.symbol}'의 기운을 타고났습니다. ${dm.summary}`,
    },
    { title: '초년운', body: `[${early.keyword}] ${early.early}` },
    { title: '중년운', body: `[${middle.keyword}] ${middle.middle}` },
    { title: '말년운', body: `[${late.keyword}] ${late.late}` },
    { title: '성격운', body: dm.personality },
    { title: '애정운', body: dm.love },
    { title: '재물운', body: dm.wealth },
    { title: '건강운', body: dm.health },
    {
      title: '오행 균형',
      body: `가장 강한 기운은 ${strong.ko}(${strong.hanja}), 가장 약한 기운은 ${weak.ko}(${weak.hanja})입니다. ${elements[result.strongest].excess} ${elements[result.weakest].lack}`,
    },
  ];
}
