// 밤하늘(남보라) + 달빛(금색) 테마
export const colors = {
  night: '#15132B',
  nightMid: '#2A2253',
  nightEnd: '#4A3A78',
  gold: '#E8C27A',
  goldDeep: '#C79A45',
  background: '#F6F2EC',
  surface: '#FFFFFF',
  primary: '#3D2F6E',
  primarySoft: '#EEEAF6',
  text: '#25213A',
  textMuted: '#7C7690',
  textOnNight: '#F4EFFF',
  textOnNightMuted: '#B9B0D6',
  border: '#E9E3DA',
};

export const gradients = {
  night: [colors.night, colors.nightMid, colors.nightEnd] as const,
  gold: ['#F2D592', '#D9A955'] as const,
};

export const fonts = {
  title: 'GowunBatang_700Bold',
  serif: 'GowunBatang_400Regular',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const radius = { md: 14, lg: 20, pill: 999 };

export const shadow = {
  shadowColor: '#2A2253',
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};

export const categoryColor = {
  overview: '#6A4FB0',
  wealth: '#C8922E',
  love: '#D2557F',
  career: '#3A6BD0',
} as const;

/** 카테고리 탭에서 쓰는 기호 */
export const categorySymbol = {
  overview: '☾',
  wealth: '✦',
  love: '♡',
  career: '◆',
} as const;
