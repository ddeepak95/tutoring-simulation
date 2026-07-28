"""CLI: interrater reliability across raters (humans and the LLM judge) for the English runs.

The cross-language report contrasts one rater against itself over a translation; this contrasts
different raters against each other over the same English turns, which is the agreement that says
whether the judge's codes stand in for a human's.
Each hand-rating sheet is aligned to a run by matching its text against the transcript, so the topics
covered are whatever the supplied sheets cover; `--topic` filters the run set to the matching scenarios.
"""
from __future__ import annotations

import argparse
from pathlib import Path

from tutoring_check.evaluation.rating_sheets import load_sheets, load_transcripts
from tutoring_check.evaluation.reliability import (
    compare_pairs,
    compare_panel,
    compare_scales,
    format_group_table,
    format_matrix,
    format_scale_table,
    format_table,
    load_judge_codes,
    load_judge_scales,
    shared_keys,
)

ENGLISH = "English (US)"

# Sheet-filename topic tokens -> the scenario prefix they belong to, for --topic filtering.
TOPIC_SCENARIOS: dict[str, str] = {
    "et": "energy-transfer",
    "g": "gravity",
    "tm": "tree-mass",
}


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Interrater reliability across raters for the English runs.")
    parser.add_argument("--runs", type=Path, required=True, help="Run-set dir holding transcript.jsonl and evaluation_transcript*.jsonl.")
    parser.add_argument(
        "--sheets",
        type=Path,
        required=True,
        help="Dir of hand-rating CSV sheets (one rater x one conversation per file).",
    )
    parser.add_argument(
        "--topic",
        action="append",
        choices=sorted(TOPIC_SCENARIOS),
        help="Restrict to a topic (repeatable). Default: every topic the sheets cover.",
    )
    parser.add_argument("--judge-name", default="judge", help="Name to give the LLM judge in the rater panel.")
    parser.add_argument("--bootstrap", type=int, default=5000, help="Bootstrap resamples per CI.")
    return parser


def run(args: argparse.Namespace) -> int:
    transcripts = load_transcripts(args.runs)
    judge = load_judge_codes(args.runs)
    judge_scales = load_judge_scales(args.runs)

    sheet_paths = sorted(args.sheets.glob("*.csv"))
    if args.topic:
        wanted = {tok for tok in args.topic}
        sheet_paths = [p for p in sheet_paths if _topic_token(p) in wanted]
    if not sheet_paths:
        raise ValueError(f"no rating sheets in {args.sheets}" + (f" for topics {args.topic}" if args.topic else ""))

    by_rater, scales_by_rater = load_sheets(sheet_paths, transcripts, language=ENGLISH)

    # The panel: every human rater plus the judge, all keyed the same way and all on English turns.
    raters = {name: codes for name, codes in sorted(by_rater.items())}
    raters[args.judge_name] = {k: v for k, v in judge.items() if k[1] == ENGLISH}
    # The same panel for the ordinal scale ratings, keyed identically.
    scale_raters = {name: scales_by_rater[name] for name in sorted(scales_by_rater)}
    scale_raters[args.judge_name] = {k: v for k, v in judge_scales.items() if k[1] == ENGLISH}

    print(f"raters: {', '.join(raters)}")
    for name, codes in raters.items():
        scenarios = sorted({k[0] for k in codes})
        print(f"  {name:8s} {len(codes):3d} tutor-turn codes over {', '.join(scenarios)}")

    keys = shared_keys(raters, language=ENGLISH)
    if not keys:
        raise ValueError("the raters share no English turns; check that the sheets align to these runs")
    scenarios = sorted({k[0] for k in keys})
    print(f"\nturns coded by every rater: {len(keys)}  ({', '.join(scenarios)})")

    # Pairwise Cohen's Kappa, held to the panel's common units so every number rests on the same turns.
    pairs = compare_pairs(raters, keys=keys, n_boot=args.bootstrap)
    for (a, b), results in pairs.items():
        print(format_table(results, title=f"{a} vs {b} — move dimensions"))

    matrix = {f"{a[:3]}/{b[:3]}": results for (a, b), results in pairs.items()}
    print(format_matrix(matrix, title="PAIRWISE kappa per move dimension (shared English turns)"))

    # Whole-panel Fleiss' Kappa: one coefficient over all raters at once.
    panel = compare_panel(raters, language=ENGLISH, n_boot=args.bootstrap)
    print(format_group_table(panel, title="PANEL agreement, move dimensions (Fleiss' kappa, all raters)"))

    # Ordinal scale dimensions: Krippendorff's alpha over the whole panel, on the same shared turns.
    scale_keys_missing = [k for k in keys if any(k not in scale_raters[name] for name in scale_raters)]
    if scale_keys_missing:
        raise ValueError(f"{len(scale_keys_missing)} shared turn(s) lack a scale rating from some rater; e.g. {scale_keys_missing[0]}")
    scales = compare_scales(scale_raters, keys=keys, n_boot=args.bootstrap)
    print(format_scale_table(scales, title="PANEL agreement, scale dimensions (Krippendorff's alpha, all raters)"))
    return 0


def _topic_token(path: Path) -> str:
    """The topic token of a sheet, e.g. `et` from `... - et-en-deepak.csv`."""
    slug = path.stem.rsplit(" - ", 1)[-1]
    return slug.split("-", 1)[0].strip().lower()


def main() -> int:
    parser = build_parser()
    return run(parser.parse_args())


if __name__ == "__main__":
    raise SystemExit(main())
