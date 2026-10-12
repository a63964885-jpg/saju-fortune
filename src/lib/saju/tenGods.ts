import type { Element, SajuResult, TenGodGroup, TenGodLevel } from '../../types/saju';
import { STEM_ELEMENT } from './constants';

// 상생: 목→화→토→금→수→목
const GENERATES: Record<Element, Element> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
};
// 상극: 목→토, 토→수, 수→화, 화→금, 금→목
const CONTROLS: Record<Element, Element> = {
  wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood',
};

/** 일간 오행(me)에서 본 다른 오행의 십신 그룹 */
export function tenGodOf(me: Element, other: Element): TenGodGroup {
  if (other === me) return '비겁';
  if (GENERATES[me] === other) return '식상';
  if (CONTROLS[me] === other) return '재성';
  if (CONTROLS[other] === me) return '관성';
  return '인성';
}

/** 일간 자신을 뺀 7글자에서 십신 그룹별 개수를 센다. */
export function countTenGods(result: SajuResult): Record<TenGodGroup, number> {
  const me = STEM_ELEMENT[result.dayMaster];
  const count: Record<TenGodGroup, number> = { 비겁: 0, 식상: 0, 재성: 0, 관성: 0, 인성: 0 };
  for (const p of result.pillars) {
    if (p.label !== '일주') count[tenGodOf(me, p.stemElement)] += 1;
    count[tenGodOf(me, p.branchElement)] += 1;
  }
  return count;
}

export function levelOf(n: number): TenGodLevel {
  if (n === 0) return 'weak';
  if (n <= 2) return 'balanced';
  return 'strong';
}
