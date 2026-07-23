"""CLI: score interrater reliability for one run set against a CSV of hand-coded turns.

Reports human-vs-judge agreement per coder and language, which is the contrast that licenses using
judge codes as data.
The cross-language contrast is attempted per rater and reported as unavailable when the coding design
varied coder and language together.
"""
from __future__ import annotations

import argparse
from pathlib import Path

from tutoring_check.evaluation.reliability import (
    Agreement,
    compare,
    cross_language,
    filter_by_coder,
    format_matrix,
    format_table,
    languages,
    load_human_codes,
    load_judge_codes,
)

ENGLISH = "English (US)"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Interrater reliability for evaluated tutoring conversations.")
    parser.add_argument("--runs", type=Path, required=True, help="Run-set dir holding evaluation_transcript*.jsonl.")
    parser.add_argument(
        "--human",
        type=Path,
        default=None,
        help="CSV of hand-coded turns. Omit to run judge-only: the annotator against itself across each translation.",
    )
    parser.add_argument("--bootstrap", type=int, default=5000, help="Bootstrap resamples per CI.")
    return parser


def run(args: argparse.Namespace) -> int:
    judge = load_judge_codes(args.runs)
    print(f"judge-coded turns: {len(judge)}")

    if args.human is not None:
        _report_human_vs_judge(args, judge)

    # JUDGE cross-language: the annotator against itself on each translation, English as the reference.
    # This is the whole report when no human codes are supplied.
    print(f"\nlanguages present: {', '.join(languages(judge))}")
    matrix: dict[str, list[Agreement]] = {}
    for language in languages(judge):
        if language == ENGLISH:
            continue
        try:
            results = cross_language(judge, ENGLISH, language, n_boot=args.bootstrap)
        except ValueError as exc:
            print(f"\nJUDGE: {ENGLISH} vs {language} — NOT COMPUTABLE\n  {exc}")
            continue
        matrix[language] = results
        print(format_table(results, title=f"JUDGE: {ENGLISH} vs {language} (same annotator, translated stimulus)"))
    if matrix:
        print(format_matrix(matrix, title=f"JUDGE: {ENGLISH} vs each language — kappa per dimension"))
    return 0


def _report_human_vs_judge(args: argparse.Namespace, judge: dict) -> None:
    """Report human-vs-judge agreement and the human cross-language contrast (only when human codes exist)."""
    human, coders = load_human_codes(args.human)

    shared = set(human) & set(judge)
    if not shared:
        raise ValueError("human and judge codes share no (scenario, language, turn_id) keys")
    print(f"human-coded turns: {len(human)}   shared with judge: {len(shared)}")

    # load_human_codes rejects a doubly-coded unit, so reaching here means no unit has two humans on it
    # and human-human kappa has nothing to cross-tabulate.
    print(f"coders: {', '.join(sorted(set(coders.values())))}   (no unit double-coded; human-human kappa not computable)")

    # The design grid: which coder saw which scenarios in which language, and which cells are empty.
    print("\nDESIGN")
    grid: dict[tuple[str, str], set[str]] = {}
    for (scenario, language, _), coder in coders.items():
        grid.setdefault((coder, language), set()).add(scenario)
    all_langs = languages(human)
    print(f"  {'':10s}" + "".join(lang.rjust(34) for lang in all_langs))
    for coder in sorted(set(coders.values())):
        row = f"  {coder:10s}"
        for lang in all_langs:
            scenarios = grid.get((coder, lang))
            row += (", ".join(sorted(s.removesuffix("-en") for s in scenarios)) if scenarios else "—").rjust(34)
        print(row)

    cells: dict[str, list[Agreement]] = {}
    for coder in sorted(set(coders.values())):
        subset = filter_by_coder(human, coders, coder)
        for language in languages(subset):
            results = compare(subset, judge, language=language, n_boot=args.bootstrap)
            cells[f"{coder.replace('coder_', 'c')}/{language.split()[0][:2].lower()}"] = results
            print(format_table(results, title=f"HUMAN {coder} vs JUDGE — {language}"))

    print(format_matrix(cells, title="HUMAN vs JUDGE — kappa across every filled cell"))

    for language in languages(human):
        if language == ENGLISH:
            continue
        try:
            results = cross_language(human, ENGLISH, language, coders=coders, n_boot=args.bootstrap)
        except ValueError as exc:
            print(f"\nHUMAN: {ENGLISH} vs {language} — NOT COMPUTABLE\n  {exc}")
            continue
        print(format_table(results, title=f"HUMAN: {ENGLISH} vs {language} (same rater, translated stimulus)"))


def main() -> int:
    parser = build_parser()
    return run(parser.parse_args())


if __name__ == "__main__":
    raise SystemExit(main())
