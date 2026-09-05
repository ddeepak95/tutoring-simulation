"""Write one topic's conversations out as plain text, for pasting into a doc.

    python viz/tutor_comparison/to_doc.py --topic speed

The comparison page is for reading two columns against each other in a browser.

No markup of any kind: the text lands in the doc as text and gets styled there.
Structure is carried by blank lines - one between turns, two between conversations.

Mandarin turns get their reading on the line above the one it belongs to.
The page does this with <ruby>, one reading over each character, which a document has no way to do.
So the alignment here is line-level and the pairing is by position along the line.
`readings()` is the page's own function, so the two never disagree about how a character is read.

Reads runs/ through extract.py rather than scraping the generated tutor_comparison.html.
Run it from anywhere - paths resolve from __file__, not the working directory.
"""
import argparse
import json
import sys
from pathlib import Path

import extract
from extract import LANGS, MODELS, TOPICS, readings

HERE = Path(__file__).resolve().parent


def paragraphs(text: str) -> list[str]:
    """A turn split into its own lines, blanks dropped.

    Turns are sometimes several paragraphs, and the breaks inside them are part of the transcript.
    Blank lines separate turns, so a turn's own breaks are plain newlines within the block.
    """
    return [p.strip() for p in text.split("\n") if p.strip()]


def reading_line(text: str) -> str:
    """The pinyin for one line, as a line.

    Punctuation, digits and Latin come back from readings() with an empty reading.
    They are printed as themselves so the reading keeps its place along the sentence rather than
    collapsing into a row of bare syllables.
    """
    return " ".join(reading or chunk for chunk, reading in readings(text))


def render_turn(label: str, text: str, zh: bool) -> list[str]:
    """One speaker's turn as display lines: for Mandarin, each line preceded by its reading."""
    lines = []
    for i, para in enumerate(paragraphs(text)):
        if zh:
            lines.append(reading_line(para))
        lines.append(f"{label}: {para}" if i == 0 else para)
    return lines


def render(topic: str) -> tuple[str, int]:
    """The whole document for one topic, and the number of conversations in it."""
    tkey, tlabel, root, bare = next(t for t in TOPICS if t[0] == topic)
    questions = json.loads((extract.ROOT / "data/topics_ci.json").read_text(encoding="utf-8"))
    question = next((t["question"] for t in questions["topics"] if t["id"] == tkey), "")

    sections = []
    for mk, mname, vendor in MODELS:
        for lk, lname, unit in LANGS:
            cell = f"{mk}-{lk}" if bare else f"{tkey}-{mk}-{lk}"
            got = extract.read(root / cell / "r0" / "transcript.jsonl", unit)
            if not got:
                print(f"  skipped {cell} - no finished run", file=sys.stderr)
                continue
            turns = []
            for ex in got["exchanges"]:
                for label, key in (("Tutor", "tutor"), ("Student", "student")):
                    turns.append("\n".join(render_turn(label, ex[key], lk == "zh")))
            sections.append("\n\n".join([
                f"{mname} — {lname}",
                f"{vendor}. Student: {got['student']}. {len(got['exchanges'])} exchanges.",
                *turns,
            ]))

    head = [tlabel]
    if question:
        head.append(question)
    head.append(f"{len(sections)} conversations: {len(MODELS)} tutor models x {len(LANGS)} "
                f"languages, one run each. Mandarin turns carry the pinyin on the line above.")
    # Sections are separated by a wider gap than turns are, since nothing else marks where one
    # conversation stops and the next starts once the headings are plain text.
    return "\n\n".join(head) + "\n\n\n" + "\n\n\n".join(sections) + "\n", len(sections)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    keys = [t[0] for t in TOPICS]
    ap.add_argument("--topic", default="speed", choices=keys, metavar="KEY",
                    help=f"which topic to write out ({', '.join(keys)}); default speed")
    args = ap.parse_args()

    doc, n = render(args.topic)
    if not n:
        print(f"no finished runs for {args.topic} - nothing to write", file=sys.stderr)
        return 1

    out = HERE / f"{args.topic}_conversations.txt"
    out.write_text(doc, encoding="utf-8")
    print(f"wrote {out.name} ({out.stat().st_size / 1024:.0f} KB), {n} conversations")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
