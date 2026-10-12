# 사주풀이 (saju-fortune)

생년월일시를 입력하면 사주팔자(4주 8자), 오행 분포, 평생사주 풀이를 보여주는 Expo 앱입니다.

- 서비스 계획서: [docs/PLAN.md](docs/PLAN.md)
- 레퍼런스: [docs/REFERENCES.md](docs/REFERENCES.md)

## 실행

```bash
npm install
npx expo start        # 폰의 Expo Go로 QR 스캔, 또는 w 키로 웹 실행
```

## 폴더 구조

```
saju-fortune/
├── docs/
│   ├── PLAN.md                 # 서비스 계획서
│   └── REFERENCES.md           # 레퍼런스 분석
├── references/
│   ├── crawl_unsin.py          # Firecrawl 레퍼런스 수집 스크립트
│   ├── requirements.txt
│   └── data/                   # 수집 결과 (git 제외)
├── src/
│   ├── app/                    # Expo Router 화면 (파일 = 화면)
│   │   ├── _layout.tsx         # 스택 네비게이션
│   │   ├── index.tsx           # 홈
│   │   ├── input.tsx           # 정보 입력
│   │   └── result.tsx          # 결과
│   ├── components/             # 사주표, 오행 막대, 카드, 칩, 테마
│   ├── lib/saju/               # 만세력 계산·풀이 로직
│   │   ├── constants.ts        # 천간·지지·오행·시진 표
│   │   ├── calculate.ts        # 생년월일시 → 4주·오행
│   │   └── interpret.ts        # 4주 → 풀이 섹션
│   ├── data/interpretations/   # 일간 10종·오행 5종 풀이 문구 (JSON)
│   └── types/
├── assets/                     # 아이콘·스플래시
├── .env.example                # FIRECRAWL_API_KEY
├── app.json
└── package.json
```

## 웹 배포 (GitHub Pages)

```bash
npm run deploy        # 웹 빌드 후 gh-pages 브랜치로 푸시
```
배포 주소: https://<github-username>.github.io/saju-fortune/
