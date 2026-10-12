# 레퍼런스

## 1. 운세의 신 — 평생사주
- 입력: https://www.unsin.co.kr/unse/saju/total/form
- 결과: https://www.unsin.co.kr/unse/saju/total/result
- 운영: (주)스포츠조선

### 수집 방법
결과 URL을 GET으로 열면 빈 템플릿만 온다. 입력 폼(`#frm`)을 POST로 제출해야 결과가 채워진다.
`references/crawl_unsin.py`는 Firecrawl `scrape`의 `actions`(`executeJavascript` → `wait`)로 브라우저에서 폼을 채워 제출하고, 그 결과 페이지를 가져온다.

| 폼 필드 | 값 |
|---|---|
| `user_name` | 이름 |
| `sex` | `남` / `여` |
| `birth_yyyy`, `birth_mm`, `birth_dd` | `1990`, `05`, `15` |
| `birth_hh` | `0`(모름), `01`(子), `02`(丑), `04`(寅) … `22`(亥) |
| `birth_solunar` | `S_C` 양력, `L_C` 음력 평달, `L_L` 음력 윤달 |

```bash
python3 -m venv .venv && .venv/bin/pip install -r references/requirements.txt
.venv/bin/python references/crawl_unsin.py --name 홍길동 --sex 여 --year 1990 --month 5 --day 15 --hour 14
```
결과는 `references/data/`에 JSON(섹션별)과 Markdown(원문)으로 저장된다.

### 분석 — 우리 앱에 반영한 점
| 레퍼런스 구성 | 관찰 | 우리 앱 |
|---|---|---|
| 사주명식 표 | 천간·지지를 이미지로 표시, 십신(비견·상관 등) 병기 | 텍스트 한자 + 한글 독음 + 오행 색. 십신은 향후 추가 |
| 오행분석 | 목화토금수 분포 | 막대그래프로 개수 표시 |
| 평생사주 총평 → 초년/중년/말년운 | 총평 후 시기별 흐름 | 같은 순서로 구성 (년주/월주/시주 기준) |
| 건강·체질·사회·성격·인품·이성·애정·재물 등 17개 섹션 | 섹션당 300~1,000자로 분량이 많다 | 핵심 9개 카드로 압축해 모바일 가독성을 높였다 |
| 재물모으는법·재테크비법 | 실용 조언형 섹션 | 오행 균형 카드의 보완 조언으로 반영 |
| 화면 | PC형 레이아웃, 메뉴와 광고가 많다 | 입력→결과 2단계, 카드형 UI, 공유 버튼 |

### 검증에 활용
양력 1990-05-15 미시(여)로 수집한 결과의 십신 배치는 다음과 같다.
- 천간: 상관·일간·겁재·비견
- 지지: 정인·편인·편관·정관

이는 우리 앱이 계산한 `癸未 庚辰 辛巳 庚午`(일간 庚)에서 도출되는 십신과 모두 일치한다.

### 저작권 주의
수집한 풀이 문장은 해당 사이트의 저작물이다. **앱에는 구성과 흐름만 참고했고, 풀이 문구(`src/data/interpretations/`)는 직접 새로 작성했다.**
`references/data/`는 개인 학습용이며 `.gitignore`로 저장소에 올리지 않는다.

## 2. 청월당 — 2027 월하소녀 신년운세
- https://cheongwoldang.com/b/moongirl2027/result?page=4
- 결과 페이지는 카카오 로그인 뒤에서만 볼 수 있다. 그래서 Firecrawl로는 로그인 화면만 수집되고 본문은 확인하지 못했다.
- 반영한 점: 운세를 **분야별(재물운·애정운·직업운)로 나눠** 보여주는 구성
- 차별점: 레퍼런스보다 설명을 줄였다. 탭마다 점수와 한 줄 요약을 먼저 보여주고, 소주제 3개는 각 2~3문장으로 제한했다.

## 3. 기술 문서
- Expo Router 설치: https://docs.expo.dev/router/installation/
- Expo 웹 정적 빌드: https://docs.expo.dev/router/web/static-rendering/
- lunar-javascript (만세력): https://github.com/6tail/lunar-javascript
- Firecrawl scrape actions: https://docs.firecrawl.dev/features/scrape
- GitHub CLI `gh repo create`: https://cli.github.com/manual/gh_repo_create
- GitHub Pages: https://docs.github.com/pages
