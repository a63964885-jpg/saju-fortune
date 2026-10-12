import type { Element } from '../../types/saju';

export const STEM_KO: Record<string, string> = {
  甲: '갑', 乙: '을', 丙: '병', 丁: '정', 戊: '무',
  己: '기', 庚: '경', 辛: '신', 壬: '임', 癸: '계',
};

export const BRANCH_KO: Record<string, string> = {
  子: '자', 丑: '축', 寅: '인', 卯: '묘', 辰: '진', 巳: '사',
  午: '오', 未: '미', 申: '신', 酉: '유', 戌: '술', 亥: '해',
};

export const STEM_ELEMENT: Record<string, Element> = {
  甲: 'wood', 乙: 'wood', 丙: 'fire', 丁: 'fire', 戊: 'earth',
  己: 'earth', 庚: 'metal', 辛: 'metal', 壬: 'water', 癸: 'water',
};

export const BRANCH_ELEMENT: Record<string, Element> = {
  子: 'water', 丑: 'earth', 寅: 'wood', 卯: 'wood', 辰: 'earth', 巳: 'fire',
  午: 'fire', 未: 'earth', 申: 'metal', 酉: 'metal', 戌: 'earth', 亥: 'water',
};

export const ELEMENTS: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export const ELEMENT_LABEL: Record<Element, { hanja: string; ko: string; color: string }> = {
  wood: { hanja: '木', ko: '목', color: '#3E8E5A' },
  fire: { hanja: '火', ko: '화', color: '#D2493A' },
  earth: { hanja: '土', ko: '토', color: '#B8862E' },
  metal: { hanja: '金', ko: '금', color: '#8A8F98' },
  water: { hanja: '水', ko: '수', color: '#2F5FA8' },
};

/** 12시진. hour는 계산에 쓰는 대표 시각(시진의 중간) */
export const HOUR_BRANCHES = [
  { name: '자시', range: '23:30~01:29', hour: 0 },
  { name: '축시', range: '01:30~03:29', hour: 2 },
  { name: '인시', range: '03:30~05:29', hour: 4 },
  { name: '묘시', range: '05:30~07:29', hour: 6 },
  { name: '진시', range: '07:30~09:29', hour: 8 },
  { name: '사시', range: '09:30~11:29', hour: 10 },
  { name: '오시', range: '11:30~13:29', hour: 12 },
  { name: '미시', range: '13:30~15:29', hour: 14 },
  { name: '신시', range: '15:30~17:29', hour: 16 },
  { name: '유시', range: '17:30~19:29', hour: 18 },
  { name: '술시', range: '19:30~21:29', hour: 20 },
  { name: '해시', range: '21:30~23:29', hour: 22 },
];
