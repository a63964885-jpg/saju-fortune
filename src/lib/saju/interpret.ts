import categories from '../../data/interpretations/categories.json';
import dayMasters from '../../data/interpretations/dayMasters.json';
import elements from '../../data/interpretations/elements.json';
import type { Element, FortuneCategory, SajuResult, TenGodLevel } from '../../types/saju';
import { ELEMENT_LABEL, STEM_ELEMENT, STEM_KO } from './constants';
import { countTenGods, levelOf } from './tenGods';

type DayMasterKey = keyof typeof dayMasters;

function pillarElement(result: SajuResult, label: string): Element | null {
  const pillar = result.pillars.find((p) => p.label === label);
  return pillar ? pillar.branchElement : null;
}

function clampScore(n: number): number {
  return Math.max(45, Math.min(97, n));
}

function headline(h: { high: string; mid: string; low: string }, score: number): string {
  if (score >= 80) return h.high;
  if (score >= 65) return h.mid;
  return h.low;
}

/** 연속된 시기의 키워드가 같으면 묶는다. 예: 초년·중년은 '열정과 표현', 말년은 '안정과 신뢰'의 시기예요. */
function lifeFlow(stages: [string, string][]): string {
  const groups: { names: string[]; keyword: string }[] = [];
  for (const [name, keyword] of stages) {
    const last = groups[groups.length - 1];
    if (last && last.keyword === keyword) last.names.push(name);
    else groups.push({ names: [name], keyword });
  }
  if (groups.length === 1) return `평생 '${groups[0].keyword}'의 기운이 이어져요.`;
  return `${groups.map((g) => `${g.names.join('·')}은 '${g.keyword}'`).join(', ')}의 시기예요.`;
}

const LEVEL_BONUS: Record<TenGodLevel, number> = { weak: -6, balanced: 15, strong: 7 };

/** 결과를 총평·재물운·애정운·직업운 4개 탭으로 나눈다. */
export function interpret(result: SajuResult): FortuneCategory[] {
  const dm = dayMasters[result.dayMaster as DayMasterKey];
  const me = STEM_ELEMENT[result.dayMaster];
  const gods = countTenGods(result);
  const name = result.input.name || '당신';

  // 행운 아이템은 가장 부족한 오행으로 보완한다.
  const lucky = categories.lucky[result.weakest];
  const weak = ELEMENT_LABEL[result.weakest];
  const strong = ELEMENT_LABEL[result.strongest];

  // 초년=년주, 중년=월주, 말년=시주(모르면 일주)
  const early = elements[pillarElement(result, '년주')!];
  const middle = elements[pillarElement(result, '월주')!];
  const late = elements[pillarElement(result, '시주') ?? pillarElement(result, '일주')!];

  // 애정운의 배우자 별: 남성은 재성, 여성은 관성
  const spouse = result.input.gender === 'male' ? gods.재성 : gods.관성;
  const dayBranch = pillarElement(result, '일주')!;

  const wealthScore = clampScore(
    62 + LEVEL_BONUS[levelOf(gods.재성)] + (gods.식상 > 0 ? 8 : 0) - (gods.비겁 >= 3 ? 8 : 0),
  );
  const loveScore = clampScore(
    62 + LEVEL_BONUS[levelOf(spouse)] + (gods.식상 > 0 ? 5 : 0) + (gods.인성 > 0 ? 3 : 0),
  );
  const careerScore = clampScore(
    60 + LEVEL_BONUS[levelOf(gods.관성)] + (gods.식상 > 0 ? 8 : 0) + (gods.인성 > 0 ? 5 : 0),
  );
  const overallScore = Math.round((wealthScore + loveScore + careerScore) / 3);

  return [
    {
      key: 'overview',
      tab: '총평',
      score: overallScore,
      headline: `${STEM_KO[result.dayMaster]}(${result.dayMaster}) 일간, '${dm.symbol}'의 기운을 타고났어요`,
      sections: [
        { title: `${name}님은 이런 사람`, body: dm.summary },
        {
          title: '인생의 흐름',
          body: `${lifeFlow([
            ['초년', early.keyword],
            ['중년', middle.keyword],
            ['말년', late.keyword],
          ])} ${middle.middle}`,
        },
        {
          title: '오행 균형',
          body: `${strong.ko}(${strong.hanja}) 기운이 가장 강하고 ${weak.ko}(${weak.hanja}) 기운이 가장 약해요. ${elements[result.weakest].lack}`,
        },
      ],
      lucky: [
        { label: '행운의 색', value: lucky.color },
        { label: '행운의 숫자', value: lucky.number },
        { label: '행운의 물건', value: lucky.item },
      ],
    },
    {
      key: 'wealth',
      tab: '재물운',
      score: wealthScore,
      headline: headline(categories.wealth.headline, wealthScore),
      sections: [
        { title: '타고난 재물 그릇', body: categories.wealth.nature[me] },
        { title: '돈이 들어오는 흐름', body: categories.wealth.flow[levelOf(gods.재성)] },
        { title: '조심할 점', body: categories.wealth.caution[levelOf(gods.비겁)] },
      ],
      lucky: [
        { label: '돈 부르는 색', value: lucky.color },
        { label: '행운의 숫자', value: lucky.number },
      ],
    },
    {
      key: 'love',
      tab: '애정운',
      score: loveScore,
      headline: headline(categories.love.headline, loveScore),
      sections: [
        { title: '나의 연애 스타일', body: categories.love.nature[me] },
        { title: '인연의 흐름', body: categories.love.flow[levelOf(spouse)] },
        { title: '잘 맞는 관계', body: categories.love.advice[dayBranch] },
      ],
      lucky: [
        { label: '데이트 컬러', value: lucky.color },
        { label: '인연의 방향', value: lucky.direction },
      ],
    },
    {
      key: 'career',
      tab: '직업운',
      score: careerScore,
      headline: headline(categories.career.headline, careerScore),
      sections: [
        { title: '나의 일하는 스타일', body: categories.career.nature[me] },
        { title: '조직과 명예', body: categories.career.status[levelOf(gods.관성)] },
        { title: '재능 발휘', body: categories.career.talent[levelOf(gods.식상)] },
      ],
      tags: categories.career.jobs[me],
      lucky: [
        { label: '행운의 방향', value: lucky.direction },
        { label: '행운의 물건', value: lucky.item },
      ],
    },
  ];
}
