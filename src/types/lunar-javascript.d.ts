// lunar-javascript는 타입 정의를 제공하지 않아 사용하는 API만 선언한다.
declare module 'lunar-javascript' {
  interface EightChar {
    getYearGan(): string;
    getYearZhi(): string;
    getMonthGan(): string;
    getMonthZhi(): string;
    getDayGan(): string;
    getDayZhi(): string;
    getTimeGan(): string;
    getTimeZhi(): string;
  }

  interface Lunar {
    getEightChar(): EightChar;
    getSolar(): Solar;
  }

  interface Solar {
    getLunar(): Lunar;
    toYmd(): string;
  }

  export const Solar: {
    fromYmdHms(y: number, m: number, d: number, h: number, mi: number, s: number): Solar;
  };

  export const Lunar: {
    // 윤달은 month를 음수로 넘긴다.
    fromYmdHms(y: number, m: number, d: number, h: number, mi: number, s: number): Lunar;
  };
}
