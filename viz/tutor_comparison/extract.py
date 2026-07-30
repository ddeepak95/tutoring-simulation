"""Pull the tutor-comparison transcripts into one JSON blob for the page.

Four topics x four tutors x three languages. `tree-mass` was run from data/run_set_tutors.json into
runs/tutors with cell ids like `sonnet-en`; the other three came from data/run_set_topics.json into
runs/topics with ids like `gravity-sonnet-en`. Both shapes are read here so the page does not have
to know where a run came from.

Cells that do not exist yet are skipped rather than raising, so this can be run while a campaign is
still going and the page will show whatever is finished. Topics with nothing finished appear in the
topic dropdown as disabled options.

Writes data.json next to this file. Run it from anywhere - paths are resolved from __file__, not
from the working directory.

Mandarin turns carry a pinyin reading per character alongside the text, so the page can print the
reading above the character. The `pypinyin` package is imported where it is used.
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]

MODELS = [
    ("maverick", "Llama 4 Maverick", "Meta"),
    ("sonnet", "Claude Sonnet 5", "Anthropic"),
    ("grok", "Grok 4.3", "xAI"),
    ("gemini", "Gemini 3.5 Flash", "Google"),
]

# The unit a turn's length is reported in. Chinese is written without spaces, so `text.split()`
# returns one token for a whole sentence - the first pass had the Mandarin tutors at "1.0 words per
# turn", which measured the absence of spaces and nothing else. Characters are the meaningful unit
# there. This does not make the numbers comparable ACROSS languages; it stops them being nonsense
# within one.
LANGS = [("en", "English", "words"), ("ta", "Tamil", "words"), ("zh", "Mandarin", "chars")]

# key, label, where that topic's runs live, and whether the cell ids omit the topic prefix.
TOPICS = [
    ("tree-mass", "Tree mass", ROOT / "runs/tutors", True),
    ("gravity", "Gravity", ROOT / "runs/topics", False),
    ("speed", "Average speed", ROOT / "runs/topics", False),
    ("rust", "Rusting", ROOT / "runs/topics", False),
]


def measure(text: str, unit: str) -> int:
    return len(text.split()) if unit == "words" else len("".join(text.split()))


def is_han(ch: str) -> bool:
    """CJK unified ideographs, main block plus extension A - everything a transcript will contain."""
    return "一" <= ch <= "鿿" or "㐀" <= ch <= "䶿"


def readings(text: str) -> list[list[str]]:
    """Split text into [chunk, reading] pairs; reading is "" for anything that is not a character.

    Han runs come back one pair per character so the page can set the reading over exactly the
    character it belongs to. The run, not the character, is what goes to pypinyin: 长 is chang or
    zhang depending on the word it sits in, and the phrase dictionary only gets to disambiguate if
    it can see the neighbours. Everything else - punctuation, digits, stray Latin - is passed
    through as one unannotated chunk.
    """
    from pypinyin import Style, pinyin

    out: list[list[str]] = []
    run = ""
    run_han = False
    for ch in text + "\0":                      # sentinel flushes the last run
        han = is_han(ch)
        if run and (han != run_han or ch == "\0"):
            if run_han:
                out += [[c, p[0]] for c, p in zip(run, pinyin(run, style=Style.TONE))]
            else:
                out.append([run, ""])
            run = ""
        run_han = han
        run += ch
    return out


def read(path: Path, unit: str, ruby: bool = False) -> dict | None:
    """One transcript, or None if it is missing or never reached session_end.

    The session_end check matters: a run killed part way leaves a transcript behind that looks
    finished if you only test that the file exists.
    """
    if not path.exists():
        return None
    head = end = None
    turns = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        r = json.loads(line)
        if r.get("type") == "session_start":
            head = r
        elif r.get("type") == "session_end":
            end = r
        elif r.get("speaker") in ("tutor", "student"):
            turns.append((r["speaker"], r["content"].strip()))
    if end is None or head is None or len(turns) < 2:
        return None

    exchanges = []
    for i in range(0, len(turns) - 1, 2):
        t, s = turns[i], turns[i + 1]
        ex = {
            "tutor": t[1], "student": s[1],
            "tw": measure(t[1], unit), "sw": measure(s[1], unit),
        }
        if ruby:
            ex["tr"] = readings(t[1])
            ex["sr"] = readings(s[1])
        exchanges.append(ex)

    tw = [e["tw"] for e in exchanges]
    sw = [e["sw"] for e in exchanges]
    return {
        "exchanges": exchanges,
        "unit": unit,
        "tutorWpt": round(sum(tw) / len(tw), 1),
        "studentWpt": round(sum(sw) / len(sw), 1),
        "studentMin": min(sw), "studentMax": max(sw),
        "reasonTutor": end["reasoning_tokens_spent"]["tutor"],
        "student": head["student_profile"]["name"],
    }


def build() -> dict:
    topics_meta = json.loads((ROOT / "data/topics_ci.json").read_text(encoding="utf-8"))["topics"]
    questions = {t["id"]: t["question"] for t in topics_meta}

    data = {
        "models": [{"key": k, "name": n, "vendor": v} for k, n, v in MODELS],
        "langs": [{"key": k, "name": n, "unit": u} for k, n, u in LANGS],
        "topics": [],
        "cells": {},
    }

    for tkey, tlabel, root, bare in TOPICS:
        present = 0
        for mk, _, _ in MODELS:
            for lk, _, unit in LANGS:
                cell = f"{mk}-{lk}" if bare else f"{tkey}-{mk}-{lk}"
                got = read(root / cell / "r0" / "transcript.jsonl", unit, ruby=lk == "zh")
                if got:
                    data["cells"][f"{tkey}-{mk}-{lk}"] = got
                    present += 1
        data["topics"].append({
            "key": tkey, "name": tlabel,
            "question": questions.get(tkey, ""),
            "present": present,
        })
        print(f"  {tkey:11} {present}/12 cells")

    # The run parameters that are constant across every cell, shown once above the grid instead of
    # repeated in each column. Read off one transcript because they are the same in all of them.
    head_path = TOPICS[0][2] / "sonnet-en" / "r0" / "transcript.jsonl"
    zh_path = TOPICS[0][2] / "sonnet-zh" / "r0" / "transcript.jsonl"
    head = json.loads(head_path.read_text(encoding="utf-8").splitlines()[0])
    zh = json.loads(zh_path.read_text(encoding="utf-8").splitlines()[0])
    data["fixed"] = {
        "studentModel": head["student_model"],
        "level": head["level"],
        "registry": head["persona_registry_version"],
        "profile": head["student_profile"],
        "profileZh": zh["student_profile"],
        "turnsPerSpeaker": head["turns_per_speaker"],
    }
    return data


if __name__ == "__main__":
    out = HERE / "data.json"
    payload = build()
    out.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {out.name} ({out.stat().st_size / 1024:.0f} KB), {len(payload['cells'])} cells")
