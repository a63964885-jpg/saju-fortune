export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export type Gender = 'male' | 'female';

export type CalendarType = 'solar' | 'lunar';

export interface BirthInput {
  name: string;
  gender: Gender;
  calendar: CalendarType;
  leapMonth: boolean;
  year: number;
  month: number;
  day: number;
  /** 0~11 시진 인덱스(자시=0). 모르면 null */
  hourBranch: number | null;
}

export interface Pillar {
  label: '시주' | '일주' | '월주' | '년주';
  stem: string;
  branch: string;
  stemKo: string;
  branchKo: string;
  stemElement: Element;
  branchElement: Element;
}

export interface SajuResult {
  input: BirthInput;
  solarDate: string;
  /** 시주(모르면 제외), 일주, 월주, 년주 순서 */
  pillars: Pillar[];
  dayMaster: string;
  elementCount: Record<Element, number>;
  strongest: Element;
  weakest: Element;
}

export interface ReadingSection {
  title: string;
  body: string;
}
