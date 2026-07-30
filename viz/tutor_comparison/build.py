"""Read the transcripts, inline them into template.html, write tutor_comparison.html.

One command does the whole thing:

    python viz/tutor_comparison/build.py

It calls extract.py's build() directly, so there is no separate step to forget and no stale
data.json to publish by accident. Pass --keep-json to also drop the intermediate on disk.

The assertions below are the reason this is a script and not a one-liner. Every one of them stands
for something that actually broke: a removed element whose JavaScript stayed behind and threw on
load, a theme token defined in the light block but not the dark one, a `</` inside transcript text
closing the <script> tag early. They cost nothing to run and they fail loudly at build time instead
of quietly in the browser.
"""
import argparse
import json
import sys
from pathlib import Path

from extract import build

HERE = Path(__file__).resolve().parent

# Elements that were removed from the page. Each was deleted along with the JavaScript that wrote
# to it; if a name reappears here, a half-finished edit has left a reference to something that no
# longer exists, which throws at render time and blanks the grid.
REMOVED = ("foot-note", "topicseg", "lede", "<footer", "standfirst", "eyebrow")

# Theme tokens must be defined in all four blocks - :root, the prefers-color-scheme query, and the
# two explicit [data-theme] overrides - or the page half-changes when the viewer hits the toggle.
THEMED = ("--bub-tutor:", "--bub-tutor-edge:", "--bub-stu:", "--bub-stu-edge:")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--keep-json", action="store_true", help="also write the intermediate data.json")
    args = ap.parse_args()

    tpl = (HERE / "template.html").read_text(encoding="utf-8")
    for dead in REMOVED:
        assert dead not in tpl, f"template still references removed element {dead!r}"
    for tok in THEMED:
        n = tpl.count(tok)
        assert n == 4, f"{tok} defined {n}x, expected 4 (root, media, data-theme dark, light)"
    assert "__DATA__" in tpl, "template has no __DATA__ placeholder to fill"

    data = build()
    if not data["cells"]:
        print("no finished runs found - nothing to build", file=sys.stderr)
        return 1
    if args.keep_json:
        (HERE / "data.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")

    # `</` anywhere in the payload would close the <script> element early. Transcripts are model
    # output and can contain anything, so escape rather than trust.
    payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    out_html = tpl.replace("__DATA__", payload)
    assert "__DATA__" not in out_html

    out = HERE / "tutor_comparison.html"
    out.write_text(out_html, encoding="utf-8")

    missing = [(t["key"], t["present"]) for t in data["topics"] if t["present"] != 12]
    if missing:
        print("  incomplete topics (shown disabled in the dropdown): "
              + ", ".join(f"{k} {n}/12" for k, n in missing))
    print(f"wrote {out.name} ({out.stat().st_size / 1024:.0f} KB), {len(data['cells'])} cells")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
