"""운세의 신(unsin.co.kr) 평생사주 결과 페이지를 Firecrawl로 수집해 레퍼런스로 저장한다.

결과 페이지(/unse/saju/total/result)는 GET으로 열면 빈 템플릿만 나오고,
입력 폼(/unse/saju/total/form)을 POST로 제출해야 내용이 채워진다.
그래서 Firecrawl의 브라우저 actions로 폼을 채우고 제출한 뒤의 페이지를 가져온다.

사용법:
    python references/crawl_unsin.py --name 홍길동 --sex 여 --year 1990 --month 5 --day 15 --hour 14
"""

import argparse
import json
import os
import re
from datetime import datetime
from pathlib import Path

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from firecrawl import Firecrawl

FORM_URL = "https://www.unsin.co.kr/unse/saju/total/form"
DATA_DIR = Path(__file__).parent / "data"

# 결과 페이지의 섹션 제목(페이지에 나오는 순서)
SECTIONS = [
    "평생사주 총평", "초년운", "중년운", "말년운", "건강운", "체질운", "사회운", "사회적성격",
    "성격운", "타고난 성향", "타고난 인품", "이성운", "애정운", "재물운",
    "재물모으는법", "재물손실 막는법", "재테크비법",
]

# 폼의 select 값: 시간은 시진 시작 시각("01","02","04",...,"22"), 모르면 "0"
HOUR_VALUES = ["01", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"]
SOLUNAR = {"solar": "S_C", "lunar": "L_C", "leap": "L_L"}


def hour_value(hour: int | None) -> str:
    """0~23시를 폼의 시진 값으로 바꾼다. 경계는 사이트와 같이 매 홀수시 30분으로 근사한다."""
    if hour is None:
        return "0"
    return HOUR_VALUES[((hour + 1) // 2) % 12]


def build_submit_script(args: argparse.Namespace) -> str:
    values = {
        "user_name": args.name,
        "sex": args.sex,
        "birth_yyyy": str(args.year),
        "birth_mm": f"{args.month:02d}",
        "birth_dd": f"{args.day:02d}",
        "birth_hh": hour_value(args.hour),
        "birth_solunar": SOLUNAR[args.calendar],
    }
    return (
        "const f = document.getElementById('frm');"
        f"const v = {json.dumps(values, ensure_ascii=False)};"
        "for (const [k, val] of Object.entries(v)) { f.elements[k].value = val; }"
        "f.submit();"
    )


def parse_sections(html: str) -> dict[str, str]:
    """섹션 제목이 나온 위치부터 다음 제목 전까지의 텍스트를 섹션 본문으로 본다."""
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "header", "footer"]):
        tag.decompose()
    lines = [ln.strip() for ln in soup.get_text("\n").splitlines() if ln.strip()]

    # 메뉴에도 같은 단어가 나오므로 "평생사주 총평" 이후만 본다.
    start = next((i for i, ln in enumerate(lines) if ln == SECTIONS[0]), None)
    if start is None:
        return {}
    lines = lines[start:]

    result: dict[str, str] = {}
    current = None
    for ln in lines:
        if ln in SECTIONS:
            current = ln
            result.setdefault(current, "")
        elif current:
            if re.match(r"^(카카오|url복사|업체명)", ln):
                break
            result[current] = (result[current] + " " + ln).strip()
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--name", default="홍길동")
    parser.add_argument("--sex", choices=["남", "여"], default="여")
    parser.add_argument("--year", type=int, default=1990)
    parser.add_argument("--month", type=int, default=5)
    parser.add_argument("--day", type=int, default=15)
    parser.add_argument("--hour", type=int, default=None, help="0~23시, 모르면 생략")
    parser.add_argument("--calendar", choices=list(SOLUNAR), default="solar")
    args = parser.parse_args()

    load_dotenv(Path(__file__).parent.parent / ".env")
    api_key = os.environ.get("FIRECRAWL_API_KEY")
    if not api_key:
        raise SystemExit(".env에 FIRECRAWL_API_KEY가 없습니다.")

    doc = Firecrawl(api_key=api_key).scrape(
        FORM_URL,
        formats=["markdown", "html"],
        actions=[
            {"type": "wait", "milliseconds": 1500},
            {"type": "executeJavascript", "script": build_submit_script(args)},
            {"type": "wait", "milliseconds": 4000},
        ],
    )

    sections = parse_sections(doc.html or "")
    if not any(sections.values()):
        raise SystemExit("결과 섹션을 찾지 못했습니다. 폼 제출이 실패했을 수 있습니다.")

    DATA_DIR.mkdir(exist_ok=True)
    stem = f"unsin_{args.year}{args.month:02d}{args.day:02d}"
    output = {
        "source": "https://www.unsin.co.kr/unse/saju/total/result",
        "crawled_at": datetime.now().isoformat(timespec="seconds"),
        "input": vars(args),
        "sections": sections,
    }
    (DATA_DIR / f"{stem}.json").write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    (DATA_DIR / f"{stem}.md").write_text(doc.markdown or "", encoding="utf-8")

    print(f"저장 완료: {DATA_DIR / stem}.json")
    for title, body in sections.items():
        print(f"- {title}: {len(body)}자")


if __name__ == "__main__":
    main()
