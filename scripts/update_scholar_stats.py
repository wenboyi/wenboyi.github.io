#!/usr/bin/env python3
"""Fetch Google Scholar citation metrics and write _data/scholar.yml."""

from __future__ import annotations

import re
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

SCHOLAR_ID = "9YmflWMAAAAJ"
SCHOLAR_URL = f"https://scholar.google.ca/citations?user={SCHOLAR_ID}&hl=en"
PROFILE_URL = f"{SCHOLAR_URL}&oi=ao"
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_data" / "scholar.yml"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)


def fetch_html(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read().decode("utf-8", errors="replace")
    except Exception:
        result = subprocess.run(
            ["curl", "-sS", "-L", "-A", USER_AGENT, "--fail", url],
            capture_output=True,
            text=True,
            timeout=30,
            check=True,
        )
        return result.stdout


def parse_sidebar_stats(html: str) -> dict[str, int] | None:
    cells = re.findall(r'class="gsc_rsb_std"[^>]*>(\d+)', html)
    if len(cells) < 5:
        cells = re.findall(r"gsc_rsb_std[^>]*>(\d+)", html)
    if len(cells) < 5:
        return None
    return {
        "citations": int(cells[0]),
        "h_index": int(cells[2]),
        "i10_index": int(cells[4]),
    }


def parse_paper_stats(html: str) -> dict[str, int] | None:
    cites = [int(n) for n in re.findall(r'class="gsc_a_ac[^"]*"[^>]*>(\d+)', html)]
    if not cites:
        cites = [int(n) for n in re.findall(r"gsc_a_ac[^>]*>(\d+)", html)]
    if not cites:
        return None
    ranked = sorted(cites, reverse=True)
    h_index = 0
    for i, count in enumerate(ranked, start=1):
        if count >= i:
            h_index = i
        else:
            break
    return {
        "citations": sum(cites),
        "h_index": h_index,
        "i10_index": sum(1 for count in cites if count >= 10),
    }


def write_yaml(stats: dict[str, int]) -> None:
    updated = datetime.now(timezone.utc).strftime("%b %Y")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        (
            "# Google Scholar metrics rendered at build time so the publications page\n"
            "# never shows dashes if live scraping is blocked. Refresh locally with\n"
            "#   python3 scripts/update_scholar_stats.py\n"
            "# or via the weekly GitHub Action.\n"
            "\n"
            f"citations: {stats['citations']}\n"
            f"h_index: {stats['h_index']}\n"
            f"i10_index: {stats['i10_index']}\n"
            f'updated: "{updated}"\n'
            f'url: "{PROFILE_URL}"\n'
        ),
        encoding="utf-8",
    )


def main() -> int:
    try:
        html = fetch_html(SCHOLAR_URL)
    except (urllib.error.URLError, TimeoutError, subprocess.CalledProcessError, OSError) as exc:
        print(f"Could not fetch Google Scholar: {exc}", file=sys.stderr)
        return 0

    stats = parse_sidebar_stats(html) or parse_paper_stats(html)
    if stats is None:
        print("Google Scholar HTML did not contain citation metrics; leaving existing file unchanged.", file=sys.stderr)
        return 0

    write_yaml(stats)
    print(
        f"Updated {OUTPUT.relative_to(ROOT)}: "
        f"citations={stats['citations']}, h-index={stats['h_index']}, i10-index={stats['i10_index']}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
